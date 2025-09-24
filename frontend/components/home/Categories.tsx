import Link from 'next/link';
import Image from 'next/image';

const categories = [
  {
    id: 1,
    name: 'Football Jerseys',
    description: 'Official team jerseys and fan gear',
    image: 'https://images.pexels.com/photos/1884105/pexels-photo-1884105.jpeg',
    slug: 'football',
    itemCount: 156
  },
  {
    id: 2,
    name: 'Basketball',
    description: 'NBA and international basketball jerseys',
    image: 'https://images.pexels.com/photos/1618197/pexels-photo-1618197.jpeg',
    slug: 'basketball',
    itemCount: 89
  },
  {
    id: 3,
    name: 'Soccer',
    description: 'World-class soccer team jerseys',
    image: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg',
    slug: 'soccer',
    itemCount: 234
  },
  {
    id: 4,
    name: 'Baseball',
    description: 'MLB and minor league jerseys',
    image: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    slug: 'baseball',
    itemCount: 67
  },
  {
    id: 5,
    name: 'Hockey',
    description: 'NHL and international hockey jerseys',
    image: 'https://images.pexels.com/photos/1372064/pexels-photo-1372064.jpeg',
    slug: 'hockey',
    itemCount: 45
  },
  {
    id: 6,
    name: 'Custom Design',
    description: 'Create your own unique jersey',
    image: 'https://images.pexels.com/photos/2529375/pexels-photo-2529375.jpeg',
    slug: 'custom',
    itemCount: null
  }
];

export default function Categories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Sport
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find the perfect jersey for your favorite sport and team. 
            From professional leagues to custom designs, we have it all.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="aspect-w-16 aspect-h-12 relative h-48">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-2 group-hover:text-jersey-orange transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-200 text-sm mb-2">
                  {category.description}
                </p>
                {category.itemCount && (
                  <p className="text-xs text-gray-300">
                    {category.itemCount} items available
                  </p>
                )}
              </div>
              
              <div className="absolute top-4 right-4 bg-jersey-orange text-white px-3 py-1 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Shop Now
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/categories">
            <button className="bg-jersey-navy text-white px-8 py-3 rounded-full font-semibold hover:bg-jersey-navy/90 transition-colors duration-300">
              View All Categories
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}