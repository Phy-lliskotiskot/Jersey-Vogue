# Jersey Vogue E-commerce Platform

A complete, production-ready e-commerce platform specializing in sports apparel and jerseys. Built with modern technologies and best practices.

## 🏆 Features

### 🛒 **Customer Features**
- Modern, responsive storefront with mobile-first design
- Product catalog with advanced filtering and search
- Shopping cart and secure checkout process
- User authentication and profile management
- Order history and tracking
- Product reviews and ratings
- Newsletter subscription
- Wishlist functionality

### 📊 **Admin Features**
- Comprehensive admin dashboard
- Product and category management
- Order management with status tracking
- Customer management
- Inventory tracking
- Sales analytics and reporting
- Role-based access control

### 💳 **Payment & Security**
- Paystack payment integration
- Secure JWT authentication
- Password hashing with bcrypt
- CORS and helmet security
- Input validation and sanitization

### 🚀 **Technical Features**
- RESTful API architecture
- PostgreSQL database with optimized queries
- Redis caching (optional)
- Docker containerization
- Automated database migrations
- Comprehensive error handling
- Logging and monitoring

## 🛠️ **Technology Stack**

### **Frontend**
- **Next.js 13+** - React framework with server-side rendering
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - State management
- **React Hook Form** - Form handling with validation
- **Lucide React** - Modern icon library

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **PostgreSQL** - Primary database
- **Redis** - Caching and session storage
- **JWT** - Authentication tokens
- **Joi** - Data validation
- **Bcrypt** - Password hashing

### **DevOps**
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **GitHub Actions** - CI/CD (ready to configure)

## 📋 **Prerequisites**

- **Node.js** 18+ and npm
- **PostgreSQL** 13+
- **Redis** (optional but recommended)
- **Docker & Docker Compose** (for containerized deployment)

## 🚀 **Quick Start**

### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/jersey-vogue.git
cd jersey-vogue
```

### **2. Environment Setup**

Create environment files from examples:

```bash
# Backend environment
cp backend/.env.example backend/.env

# Frontend environment (create if needed)
echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > frontend/.env.local
```

### **3. Database Setup**

**Option A: Using Docker (Recommended)**
```bash
# Start PostgreSQL and Redis
docker-compose up -d postgres redis

# Wait for services to be ready
docker-compose logs postgres
```

**Option B: Local Installation**
```bash
# Install and start PostgreSQL
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql

# Create database
sudo -u postgres createdb jersey_vogue

# Run schema
psql -h localhost -U postgres -d jersey_vogue -f backend/database/schema.sql
```

### **4. Install Dependencies**
```bash
# Install all dependencies
npm run install:all

# Or install separately
cd frontend && npm install
cd ../backend && npm install
```

### **5. Start Development Servers**
```bash
# Start both frontend and backend
npm run dev

# Or start separately
npm run dev:frontend  # Frontend on http://localhost:3000
npm run dev:backend   # Backend on http://localhost:3001
```

### **6. Access the Application**
- **Storefront**: http://localhost:3000
- **API**: http://localhost:3001
- **Admin Panel**: http://localhost:3000/admin
- **API Health**: http://localhost:3001/health

## 📊 **Default Admin Account**

```
Email: admin@jerseyvogue.com
Password: admin123
```

**⚠️ Important**: Change the admin password immediately after first login!

## 🐳 **Docker Deployment**

### **Full Stack with Docker Compose**
```bash
# Build and start all services
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### **Services**
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379

## 💳 **Payment Setup (Paystack)**

1. **Create Paystack Account**
   - Visit https://paystack.com and create an account
   - Get your API keys from the dashboard

2. **Configure Environment**
   ```bash
   # Add to backend/.env
   PAYSTACK_SECRET_KEY=sk_test_your_secret_key
   PAYSTACK_PUBLIC_KEY=pk_test_your_public_key
   ```

3. **Test Cards for Development**
   ```
   Card Number: 4084084084084081
   Expiry: 12/25
   CVV: 123
   ```

## 📱 **API Documentation**

### **Authentication**
```bash
# Register
POST /auth/register
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}

# Login
POST /auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

### **Products**
```bash
# Get all products
GET /products?page=1&limit=12&category=football&search=jersey

# Get single product
GET /products/:id

# Get featured products
GET /products/featured/list
```

### **Orders**
```bash
# Create order
POST /orders
Authorization: Bearer <token>
{
  "items": [
    {
      "productId": "uuid",
      "quantity": 2,
      "size": "L",
      "color": "Red"
    }
  ],
  "shippingAddress": {...},
  "paymentMethod": "paystack"
}
```

## 🧪 **Testing**

```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test

# Integration tests
npm run test:integration
```

## 📝 **Database Schema**

The system uses a comprehensive PostgreSQL schema with the following main tables:

- **users** - Customer and admin accounts
- **products** - Product catalog
- **categories** - Product categories
- **orders** - Order management
- **order_items** - Order line items
- **reviews** - Product reviews
- **cart_items** - Shopping cart
- **payment_transactions** - Payment tracking

## 🔧 **Configuration**

### **Environment Variables**

**Backend (.env)**
```bash
NODE_ENV=development
PORT=3001
DB_HOST=localhost
DB_NAME=jersey_vogue
DB_USER=postgres
DB_PASSWORD=password
JWT_SECRET=your-secret-key
PAYSTACK_SECRET_KEY=sk_test_xxx
```

**Frontend (.env.local)**
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_xxx
```

## 📈 **Performance Optimization**

- **Database indexing** on frequently queried columns
- **Image optimization** with Next.js Image component
- **Caching** with Redis for sessions and frequently accessed data
- **Pagination** for large data sets
- **Lazy loading** for improved initial page load
- **Gzip compression** for API responses

## 🔐 **Security Features**

- **JWT tokens** with expiration
- **Password hashing** with bcrypt
- **Input validation** with Joi
- **SQL injection protection** with parameterized queries
- **CORS configuration** for API security
- **Helmet.js** for HTTP headers security
- **Rate limiting** (configurable)

## 🚀 **Deployment Options**

### **1. Traditional VPS/Server**
```bash
# Copy files to server
scp -r . user@server:/path/to/app

# Install dependencies
npm run install:all

# Build frontend
cd frontend && npm run build

# Start with PM2
pm2 start ecosystem.config.js
```

### **2. Cloud Platforms**
- **Vercel** (Frontend) + **Heroku** (Backend)
- **AWS** with EC2 and RDS
- **Digital Ocean** App Platform
- **Google Cloud Run**

### **3. Container Orchestration**
- **Kubernetes** manifests (can be provided)
- **Docker Swarm**
- **Rancher**

## 📚 **Additional Resources**

- **API Documentation**: Available at `/api/docs` (can be set up with Swagger)
- **Component Storybook**: Run `npm run storybook` (can be configured)
- **Database ERD**: See `/docs/database-schema.png` (can be generated)

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 **Support**

- **Email**: support@jerseyvogue.com
- **Documentation**: [Wiki](https://github.com/your-username/jersey-vogue/wiki)
- **Issues**: [GitHub Issues](https://github.com/your-username/jersey-vogue/issues)

## 🎯 **Roadmap**

- [ ] Mobile app (React Native)
- [ ] Multi-vendor marketplace
- [ ] Advanced analytics dashboard
- [ ] AI-powered product recommendations
- [ ] Multi-language support
- [ ] Advanced inventory management
- [ ] Subscription box service
- [ ] Social media integration

---

**Jersey Vogue** - *Where Sports Meet Style* 🏆