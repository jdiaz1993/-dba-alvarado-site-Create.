"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import ProductCarousel from "@/components/ProductCarousel";

export default function Products() {
  const { addItem } = useCart();

  // Ready-to-sell products - Using your actual gallery images
  const readyProducts = [
    {
      id: "ready-water-bottle-1",
      name: "Engraved Water Bottle",
      price: 3599, // $35.99 in cents
      image: "/assets/images/gallery/engraved-water-bottle-example.png",
      description: "Stainless steel bottle with custom laser engraving",
    },
    {
      id: "ready-wood-1",
      name: "Custom Wood Engraving",
      price: 2599, // $25.99 in cents
      image: "/assets/images/gallery/wood-engraving-example.jpg",
      description: "Beautiful wood engraving - custom designs available",
    },
    {
      id: "ready-item-1",
      name: "Custom Engraved Item",
      price: 2999, // $29.99 in cents
      image: "/assets/images/gallery/20251005_144719.jpg",
      description: "Personalized engraved product",
    },
    {
      id: "ready-item-2",
      name: "Custom Design",
      price: 3499, // $34.99 in cents
      image: "/assets/images/gallery/20251019_171633.jpg",
      description: "Custom personalized design",
    },
    {
      id: "ready-item-3",
      name: "Engraved Special",
      price: 2799, // $27.99 in cents
      image: "/assets/images/gallery/20251019_171825.jpg",
      description: "Unique engraved creation",
    },
    {
      id: "ready-item-4",
      name: "Premium Engraving",
      price: 3999, // $39.99 in cents
      image: "/assets/images/gallery/20251019_171927.jpg",
      description: "High-quality premium engraving",
    },
  ];

  const handleAddToCart = (product: typeof readyProducts[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Shop ready-made items or create your own custom design
          </p>
        </div>

        {/* SECTION 1: Ready-to-Sell Products */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Ready to Ship</h2>
              <p className="text-gray-600">Pre-made products available for immediate purchase</p>
            </div>
          </div>

          <ProductCarousel products={readyProducts} onAddToCart={handleAddToCart} />
        </section>

        {/* Divider */}
        <div className="relative mb-16">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-6 bg-gray-50 text-xl font-semibold text-gray-700">OR</span>
          </div>
        </div>

        {/* SECTION 2: Custom Orders */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Custom Orders</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Create your own unique design - choose your product type and upload your artwork
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Custom T-Shirts */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop"
                  alt="Custom T-Shirts"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Custom T-Shirts</h3>
                <p className="text-gray-600 mb-4">High-quality cotton t-shirts with your custom design</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-purple-600">Starting at $20.00</span>
                  <Link 
                    href="/custom-orders?type=shirt-printing" 
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Design Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Custom Water Bottles */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop"
                  alt="Engraved Water Bottles"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Engraved Water Bottles</h3>
                <p className="text-gray-600 mb-4">Stainless steel bottles with laser engraving</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-purple-600">Starting at $35.99</span>
                  <Link 
                    href="/custom-orders?type=water-bottle-engraving" 
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Design Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Custom Wood Engravings */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1452457807411-4979b707c5be?w=800&auto=format&fit=crop"
                  alt="Wood Engravings"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Wood Engravings</h3>
                <p className="text-gray-600 mb-4">Custom wood signs, plaques, and decorations</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-purple-600">Starting at $25.99</span>
                  <Link 
                    href="/custom-orders?type=wood-engraving" 
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Design Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
