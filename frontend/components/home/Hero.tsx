'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const heroSlides = [
  {
    id: 1,
    title: "Premium Sports Jerseys",
    subtitle: "Authentic Team Gear",
    description: "Discover our collection of authentic team jerseys from top leagues and sports",
    image: "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg",
    cta: "Shop Now",
    link: "/products"
  },
  {
    id: 2,
    title: "Custom Jersey Design",
    subtitle: "Make It Personal",
    description: "Create your own custom jerseys with names, numbers, and team colors",
    image: "https://images.pexels.com/photos/1618197/pexels-photo-1618197.jpeg",
    cta: "Customize",
    link: "/custom"
  },
  {
    id: 3,
    title: "Latest Collections",
    subtitle: "New Season Arrivals",
    description: "Check out the newest jerseys from this season's hottest teams",
    image: "https://images.pexels.com/photos/1884105/pexels-photo-1884105.jpeg",
    cta: "Explore",
    link: "/products?sort=newest"
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden">
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? 'translate-x-0' : index < currentSlide ? '-translate-x-full' : 'translate-x-full'
          }`}
        >
          <div className="relative h-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/40" />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-4xl px-4">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-jersey-orange text-jersey-orange" />
                  ))}
                </div>
                <h2 className="text-lg md:text-xl font-medium mb-2 text-jersey-orange">
                  {slide.subtitle}
                </h2>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
                  {slide.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href={slide.link}>
                    <Button 
                      size="lg" 
                      className="bg-jersey-orange hover:bg-jersey-orange/90 text-white px-8 py-6 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105"
                    >
                      {slide.cta}
                    </Button>
                  </Link>
                  <Link href="/categories">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-6 text-lg font-semibold rounded-full transition-all duration-300"
                    >
                      Browse Categories
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="sm"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 p-2 rounded-full"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 p-2 rounded-full"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-jersey-orange' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}