'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';

interface DesignData {
  color: string;
  size: string;
  quantity: number;
  designs: string[];
}

export default function PreviewDesign() {
  const [designData, setDesignData] = useState<any | null>(null);
  const [shirtColor, setShirtColor] = useState('#FFFFFF');
  const router = useRouter();
  const { addItem } = useCart();

  useEffect(() => {
    // Get design data from localStorage
    const savedData = localStorage.getItem('previewDesignData');
    if (savedData) {
      const data = JSON.parse(savedData);
      setDesignData(data);
      
      // Set color
      const colorMap: Record<string, string> = {
        'White': '#FFFFFF',
        'Black': '#000000',
        'Navy': '#1E3A8A',
        'Gray': '#808080',
        'Red': '#DC2626',
        'Blue': '#2563EB',
        'Green': '#16A34A',
        'Pink': '#EC4899',
      };
      setShirtColor(colorMap[data.color] || '#FFFFFF');
    } else {
      // No data found, redirect back to custom orders
      router.push('/custom-orders');
    }
  }, [router]);

  const handleContinueToCart = () => {
    if (!designData) return;
    
    // Add to cart
    const shippingInfo = `${designData.shippingAddress.street}, ${designData.shippingAddress.city}, ${designData.shippingAddress.state} ${designData.shippingAddress.zipCode}, ${designData.shippingAddress.country}`;
    const itemName = `${designData.productInfo.name} - ${designData.color} (Size ${designData.size}) - Ship to: ${shippingInfo}`;
    
    addItem({
      id: `custom-shirt-${Date.now()}`,
      name: itemName,
      price: designData.productInfo.basePrice,
    }, designData.quantity);
    
    // Clear localStorage
    localStorage.removeItem('previewDesignData');
    
    // Redirect to cart
    router.push('/cart');
  };

  if (!designData) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Preview Your Design</h1>
          <p className="text-lg text-gray-600">Review your custom order before adding to cart</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: T-Shirt Preview */}
            <div className="flex items-center justify-center">
              <div className="relative w-72 h-96">
                {/* T-Shirt Shape */}
                <div 
                  className="absolute inset-0 mx-auto"
                  style={{ 
                    width: '200px',
                    height: '240px',
                    backgroundColor: shirtColor,
                    borderRadius: '12px',
                    border: '4px solid #1f2937',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                    clipPath: 'polygon(15% 0%, 85% 0%, 100% 15%, 100% 100%, 0% 100%, 0% 15%)'
                  }}
                >
                  {/* Neck hole */}
                  <div 
                    className="absolute top-2 left-1/2 -translate-x-1/2"
                    style={{ 
                      width: '60px',
                      height: '20px',
                      borderRadius: '50px 50px 0 0',
                      backgroundColor: '#f9fafb',
                      border: '3px solid #1f2937'
                    }}
                  />
                  
                  {/* Design Preview */}
                  {designData.designs.length > 0 && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-lg flex items-center justify-center p-1 shadow-lg border-3 border-gray-600">
                      <img 
                        src={designData.designs[0]} 
                        alt="Design preview"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  )}
                </div>
                
                {/* Left Sleeve */}
                <div 
                  className="absolute top-8 left-2 w-12 h-32 rounded-r-full"
                  style={{ backgroundColor: shirtColor, border: '3px solid #1f2937', boxShadow: '0 5px 15px rgba(0,0,0,0.15)' }}
                />
                
                {/* Right Sleeve */}
                <div 
                  className="absolute top-8 right-2 w-12 h-32 rounded-l-full"
                  style={{ backgroundColor: shirtColor, border: '3px solid #1f2937', boxShadow: '0 5px 15px rgba(0,0,0,0.15)' }}
                />
              </div>
            </div>

            {/* Right: Order Details */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Details</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Color:</span>
                    <span className="font-semibold" style={{ color: shirtColor }}>{designData.color}</span>
                  </div>
                  
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Size:</span>
                    <span className="font-semibold">{designData.size}</span>
                  </div>
                  
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Quantity:</span>
                    <span className="font-semibold">{designData.quantity}</span>
                  </div>
                  
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-semibold text-purple-600">$20.00 each</span>
                  </div>
                  
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-bold text-xl text-purple-600">
                      ${(20 * designData.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Design Files */}
              {designData.designs.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Uploaded Designs</h3>
                  <div className="space-y-2">
                    {designData.designs.map((design, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <img src={design} alt={`Design ${index + 1}`} className="w-16 h-16 object-cover rounded" />
                        <span className="text-sm text-gray-600">Design {index + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={() => router.push('/custom-orders')}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
            >
              Edit Design
            </button>
            <button
              onClick={handleContinueToCart}
              className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
