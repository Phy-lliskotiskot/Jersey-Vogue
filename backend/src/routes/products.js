const express = require('express');
const db = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all products with filters and pagination
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      search,
      minPrice,
      maxPrice,
      sort = 'created_at',
      order = 'DESC',
      inStock
    } = req.query;

    const offset = (page - 1) * limit;
    let whereConditions = ['p.active = true'];
    let queryParams = [];
    let paramIndex = 1;

    // Build WHERE conditions
    if (category) {
      whereConditions.push(`c.slug = $${paramIndex}`);
      queryParams.push(category);
      paramIndex++;
    }

    if (search) {
      whereConditions.push(`(p.name ILIKE $${paramIndex} OR p.description ILIKE $${paramIndex})`);
      queryParams.push(`%${search}%`);
      paramIndex++;
    }

    if (minPrice) {
      whereConditions.push(`p.price >= $${paramIndex}`);
      queryParams.push(parseFloat(minPrice));
      paramIndex++;
    }

    if (maxPrice) {
      whereConditions.push(`p.price <= $${paramIndex}`);
      queryParams.push(parseFloat(maxPrice));
      paramIndex++;
    }

    if (inStock === 'true') {
      whereConditions.push('p.stock_quantity > 0');
    }

    // Validate sort field
    const validSortFields = ['created_at', 'name', 'price', 'average_rating'];
    const sortField = validSortFields.includes(sort) ? sort : 'created_at';
    const sortOrder = order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    // Main query
    const query = `
      SELECT 
        p.*,
        c.name as category_name,
        c.slug as category_slug,
        COALESCE(AVG(r.rating), 0) as average_rating,
        COUNT(r.id) as review_count
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN reviews r ON p.id = r.product_id AND r.approved = true
      ${whereClause}
      GROUP BY p.id, c.name, c.slug
      ORDER BY ${sortField} ${sortOrder}
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;

    queryParams.push(parseInt(limit), offset);

    // Count query for pagination
    const countQuery = `
      SELECT COUNT(DISTINCT p.id) as total
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ${whereClause}
    `;

    const [productsResult, countResult] = await Promise.all([
      db.query(query, queryParams),
      db.query(countQuery, queryParams.slice(0, -2))
    ]);

    const products = productsResult.rows.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: parseFloat(product.price),
      originalPrice: product.original_price ? parseFloat(product.original_price) : null,
      image: product.image_url,
      images: product.images || [],
      sizes: product.sizes || [],
      colors: product.colors || [],
      stockQuantity: product.stock_quantity,
      category: {
        name: product.category_name,
        slug: product.category_slug
      },
      averageRating: parseFloat(product.average_rating),
      reviewCount: parseInt(product.review_count),
      createdAt: product.created_at,
      featured: product.featured,
      onSale: product.on_sale
    }));

    const totalProducts = parseInt(countResult.rows[0].total);
    const totalPages = Math.ceil(totalProducts / limit);

    res.json({
      products,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalProducts,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      },
      filters: {
        category,
        search,
        minPrice,
        maxPrice,
        inStock
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

// Get single product by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const productQuery = `
      SELECT 
        p.*,
        c.name as category_name,
        c.slug as category_slug,
        COALESCE(AVG(r.rating), 0) as average_rating,
        COUNT(r.id) as review_count
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN reviews r ON p.id = r.product_id AND r.approved = true
      WHERE p.id = $1 AND p.active = true
      GROUP BY p.id, c.name, c.slug
    `;

    const productResult = await db.query(productQuery, [id]);

    if (productResult.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const product = productResult.rows[0];

    // Get related products
    const relatedQuery = `
      SELECT 
        p.id, p.name, p.price, p.image_url,
        COALESCE(AVG(r.rating), 0) as average_rating
      FROM products p
      LEFT JOIN reviews r ON p.id = r.product_id AND r.approved = true
      WHERE p.category_id = $1 AND p.id != $2 AND p.active = true
      GROUP BY p.id
      ORDER BY p.created_at DESC
      LIMIT 4
    `;

    const relatedResult = await db.query(relatedQuery, [product.category_id, id]);

    res.json({
      id: product.id,
      name: product.name,
      description: product.description,
      price: parseFloat(product.price),
      originalPrice: product.original_price ? parseFloat(product.original_price) : null,
      image: product.image_url,
      images: product.images || [],
      sizes: product.sizes || [],
      colors: product.colors || [],
      stockQuantity: product.stock_quantity,
      category: {
        id: product.category_id,
        name: product.category_name,
        slug: product.category_slug
      },
      averageRating: parseFloat(product.average_rating),
      reviewCount: parseInt(product.review_count),
      specifications: product.specifications || {},
      featured: product.featured,
      onSale: product.on_sale,
      createdAt: product.created_at,
      relatedProducts: relatedResult.rows.map(p => ({
        id: p.id,
        name: p.name,
        price: parseFloat(p.price),
        image: p.image_url,
        averageRating: parseFloat(p.average_rating)
      }))
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Failed to fetch product' });
  }
});

// Get featured products
router.get('/featured/list', async (req, res) => {
  try {
    const query = `
      SELECT 
        p.id, p.name, p.price, p.original_price, p.image_url,
        c.name as category_name,
        COALESCE(AVG(r.rating), 0) as average_rating,
        COUNT(r.id) as review_count
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN reviews r ON p.id = r.product_id AND r.approved = true
      WHERE p.featured = true AND p.active = true
      GROUP BY p.id, c.name
      ORDER BY p.created_at DESC
      LIMIT 8
    `;

    const result = await db.query(query);

    const featuredProducts = result.rows.map(product => ({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      originalPrice: product.original_price ? parseFloat(product.original_price) : null,
      image: product.image_url,
      category: product.category_name,
      averageRating: parseFloat(product.average_rating),
      reviewCount: parseInt(product.review_count)
    }));

    res.json(featuredProducts);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    res.status(500).json({ message: 'Failed to fetch featured products' });
  }
});

module.exports = router;