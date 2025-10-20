"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import ProductCarousel from "@/components/ProductCarousel";

export default function Products() {
  const { addItem } = useCart();

  // Ready-to-sell products - Update these with your actual products
  const readyProducts = [
    {
      id: "ready-tshirt-1",
      name: "DBA Logo T-Shirt - Black",
      price: 2500, // $25.00 in cents
      image: "/assets/images/products/tshirt-black.jpg",
      description: "Pre-made black t-shirt with DBA logo print",
    },
    {
      id: "ready-bottle-1",
      name: "Engraved Water Bottle - Floral",
      price: 3999, // $39.99 in cents
      image: "/assets/images/products/bottle-floral.jpg",
      description: "Stainless steel bottle with floral engraving design",
    },
    {
      id: "ready-wood-1",
      name: "Welcome Sign - Rustic",
      price: 2999, // $29.99 in cents
      image: "/assets/images/products/wood-welcome.jpg",
      description: "Rustic wood welcome sign, ready to hang",
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
              <div className="h-48 bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                <svg className="w-24 h-24 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 3H8C6.9 3 6 3.9 6 5v14c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H8V5h8v14z"/>
                </svg>
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
              <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <svg className="w-24 h-24 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 3v1H8C6.9 4 6 4.9 6 6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-1V3H9zm7 15H8V6h8v12z"/>
                </svg>
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
              <div className="h-48 bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                <svg className="w-24 h-24 text-amber-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
                </svg>
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
