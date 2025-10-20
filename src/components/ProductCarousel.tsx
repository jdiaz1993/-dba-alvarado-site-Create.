'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface ProductCarouselProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
}

export default function ProductCarousel({ products, onAddToCart }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const formatUSD = (cents: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-100 rounded-lg">
        <p className="text-gray-600">No products available</p>
      </div>
    );
  }

  const currentProduct = products[currentIndex];

  return (
    <div className="relative">
      {/* Main Carousel */}
      <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Image Section */}
        <div className="relative h-96 bg-gray-200">
          <img
            src={currentProduct.image}
            alt={currentProduct.name}
            className="w-full h-full object-contain"
          />
          
          {/* Navigation Arrows */}
          {products.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
                aria-label="Previous product"
              >
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
                aria-label="Next product"
              >
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Product Count Badge */}
          <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {currentIndex + 1} / {products.length}
          </div>
        </div>

        {/* Product Info */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{currentProduct.name}</h3>
          <p className="text-gray-600 mb-4">{currentProduct.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold text-purple-600">
              {formatUSD(currentProduct.price)}
            </div>
            {onAddToCart && (
              <button
                onClick={() => onAddToCart(currentProduct)}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 font-semibold transition-colors"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {products.length > 1 && (
        <div className="mt-4 flex gap-2 justify-center overflow-x-auto pb-2">
          {products.map((product, index) => (
            <button
              key={product.id}
              onClick={() => goToSlide(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex
                  ? 'border-purple-600 ring-2 ring-purple-200'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              aria-label={`View ${product.name}`}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Dot Indicators (Alternative) */}
      {products.length > 1 && products.length <= 5 && (
        <div className="mt-4 flex justify-center gap-2">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-purple-600 w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
