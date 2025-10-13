"use client";

import Link from "next/link";

export default function Products() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose your product type and start a custom order
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Product Cards */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">T-Shirt Image</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Custom T-Shirts</h3>
              <p className="text-gray-600 mb-4">High-quality cotton t-shirts with custom printing</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-blue-600">Starting at $20.00</span>
                <Link href="/custom-orders?type=shirt-printing" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                  Custom Order
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Water Bottle Image</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Engraved Water Bottles</h3>
              <p className="text-gray-600 mb-4">Stainless steel bottles with laser engraving</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-blue-600">Starting at $35.99</span>
                <Link href="/custom-orders?type=water-bottle-engraving" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                  Custom Order
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Wood Engraving Image</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Wood Engravings</h3>
              <p className="text-gray-600 mb-4">Custom wood signs and plaques</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-blue-600">Starting at $25.99</span>
                <Link href="/custom-orders?type=wood-engraving" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                  Custom Order
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
