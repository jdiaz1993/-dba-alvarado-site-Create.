'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ImageUpload from '../../components/ImageUpload';
import { useCart } from '../../context/CartContext';

// Product pricing
const productPrices: Record<string, { name: string; basePrice: number; }> = {
  'shirt-printing': { name: 'Custom T-Shirt Printing', basePrice: 2000 }, // $20.00
  'water-bottle-engraving': { name: 'Engraved Water Bottle', basePrice: 3599 }, // $35.99
  'wood-engraving': { name: 'Custom Wood Engraving', basePrice: 2599 }, // $25.99
  'metal-engraving': { name: 'Metal Engraving', basePrice: 2999 }, // $29.99
  'other': { name: 'Custom Order', basePrice: 0 }, // Price TBD
};

function CustomOrdersContent() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [selectedProjectType, setSelectedProjectType] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [shirtColor, setShirtColor] = useState('');
  const [shirtSize, setShirtSize] = useState('');
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addItem } = useCart();

  useEffect(() => {
    // Get project type from URL parameter
    const type = searchParams.get('type');
    if (type) {
      setSelectedProjectType(type);
    }
  }, [searchParams]);

  const handleImageUpload = (file: File) => {
    setUploadedFiles(prev => [...prev, file]);
    console.log('Uploaded file for custom order:', file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Form submitted');
    console.log('Selected project type:', selectedProjectType);
    console.log('Quantity:', quantity);
    console.log('Shipping address:', shippingAddress);
    
    if (!selectedProjectType) {
      alert('Please select a project type');
      return;
    }

    // Validate shirt color if shirt printing is selected
    if (selectedProjectType === 'shirt-printing' && !shirtColor) {
      alert('Please select a shirt color');
      return;
    }

    // Validate shirt size if shirt printing is selected
    if (selectedProjectType === 'shirt-printing' && !shirtSize) {
      alert('Please select a shirt size');
      return;
    }

    // Validate shipping address
    if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.state || !shippingAddress.zipCode) {
      alert('Please fill out all shipping address fields');
      return;
    }

    const productInfo = productPrices[selectedProjectType];
    
    if (!productInfo) {
      alert('Invalid project type');
      return;
    }

    console.log('Product info:', productInfo);
    console.log('Adding to cart...');

    // Add to cart with shipping address in the name/description
    try {
      const shippingInfo = `${shippingAddress.street}, ${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zipCode}, ${shippingAddress.country}`;
      
      // Build item name with color and size if it's a shirt
      let itemName = productInfo.name;
      if (selectedProjectType === 'shirt-printing') {
        if (shirtColor && shirtSize) {
          itemName = `${productInfo.name} - ${shirtColor} (Size ${shirtSize})`;
        } else if (shirtColor) {
          itemName = `${productInfo.name} - ${shirtColor}`;
        }
      }
      
      addItem({
        id: `custom-${selectedProjectType}-${Date.now()}`,
        name: `${itemName} - Ship to: ${shippingInfo}`,
        price: productInfo.basePrice,
      }, quantity);
      
      console.log('Item added to cart successfully with shipping address');
      
      // Show success message and redirect to cart
      setTimeout(() => {
        alert(`Custom order added to cart!\n\nShipping to:\n${shippingInfo}\n\nPlease proceed to checkout.`);
        router.push('/cart');
      }, 100);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error adding to cart. Please try again.');
    }
  };

  const formatUSD = (cents: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
  };

  const currentPrice = selectedProjectType ? productPrices[selectedProjectType] : null;
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Custom Orders</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tell us about your custom project and we&apos;ll provide you with a personalized quote
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div className="pt-6 border-t">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address *
                </label>
                <input
                  type="text"
                  required
                  value={shippingAddress.street}
                  onChange={(e) => setShippingAddress({...shippingAddress, street: e.target.value})}
                  placeholder="123 Main Street, Apt 4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.state}
                    onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                    placeholder="CA"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.zipCode}
                    onChange={(e) => setShippingAddress({...shippingAddress, zipCode: e.target.value})}
                    placeholder="90001"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country *
                </label>
                <select
                  value={shippingAddress.country}
                  onChange={(e) => setShippingAddress({...shippingAddress, country: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="Mexico">Mexico</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                  <option value="Other">Other (International)</option>
                </select>
              </div>
            </div>

            {/* Project Details */}
            <div className="pt-6 border-t">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Type *
              </label>
              <select 
                value={selectedProjectType}
                onChange={(e) => setSelectedProjectType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a project type</option>
                <option value="shirt-printing">Shirt Printing</option>
                <option value="water-bottle-engraving">Water Bottle Engraving</option>
                <option value="wood-engraving">Wood Engraving</option>
                <option value="metal-engraving">Metal Engraving</option>
                <option value="other">Other</option>
              </select>
              
              {currentPrice && currentPrice.basePrice > 0 && (
                <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-blue-900">Base Price per Item</p>
                      <p className="text-xs text-blue-700">Final price may vary based on customization</p>
                    </div>
                    <p className="text-2xl font-bold text-blue-900">{formatUSD(currentPrice.basePrice)}</p>
                  </div>
                </div>
              )}
              
              {currentPrice && currentPrice.basePrice === 0 && (
                <div className="mt-3 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                  <p className="text-sm text-yellow-800">
                    💡 Price will be determined based on your specifications. We&apos;ll contact you with a quote.
                  </p>
                </div>
              )}
            </div>

            {/* Shirt Color Selection - Only show when shirt printing is selected */}
            {selectedProjectType === 'shirt-printing' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shirt Color *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['White', 'Black', 'Navy', 'Gray', 'Red', 'Blue', 'Green', 'Pink'].map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setShirtColor(color)}
                      className={`py-3 px-4 border-2 rounded-md font-medium transition-all ${
                        shirtColor === color
                          ? 'border-purple-600 bg-purple-50 text-purple-900'
                          : 'border-gray-300 hover:border-gray-400 bg-white text-gray-700'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
                {shirtColor && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected: <span className="font-semibold">{shirtColor}</span>
                  </p>
                )}
              </div>
            )}

            {/* Shirt Size Selection - Only show when shirt printing is selected */}
            {selectedProjectType === 'shirt-printing' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shirt Size *
                </label>
                
                {/* Youth Sizes */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Youth Sizes</p>
                  <div className="grid grid-cols-4 gap-3">
                    {['YS', 'YM', 'YL', 'YXL'].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setShirtSize(size)}
                        className={`py-3 px-4 border-2 rounded-md font-medium transition-all ${
                          shirtSize === size
                            ? 'border-purple-600 bg-purple-50 text-purple-900'
                            : 'border-gray-300 hover:border-gray-400 bg-white text-gray-700'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Adult Sizes */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Adult Sizes</p>
                  <div className="grid grid-cols-4 gap-3">
                    {['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setShirtSize(size)}
                        className={`py-3 px-4 border-2 rounded-md font-medium transition-all ${
                          shirtSize === size
                            ? 'border-purple-600 bg-purple-50 text-purple-900'
                            : 'border-gray-300 hover:border-gray-400 bg-white text-gray-700'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                {shirtSize && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected: <span className="font-semibold">{shirtSize}</span>
                  </p>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity *
              </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Design Description *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Describe your design, colors, text, or any specific requirements..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Design Files (Optional)
              </label>
              <ImageUpload 
                onImageUpload={handleImageUpload}
                maxSize={10}
                acceptedTypes={['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']}
                className="mb-4"
              />
              
              {uploadedFiles.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Uploaded Files ({uploadedFiles.length})
                  </h4>
                  <div className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{file.name}</p>
                            <p className="text-xs text-gray-500">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setUploadedFiles(prev => prev.filter((_, i) => i !== index))}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <p className="text-sm text-gray-500 mt-2">
                💡 <strong>Pro tip:</strong> High-resolution images (300+ DPI) work best for printing. 
                For logos, vector files (SVG, AI, EPS) are preferred.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timeline
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select timeline</option>
                <option value="rush">Rush (1-2 days)</option>
                <option value="standard">Standard (3-5 days)</option>
                <option value="flexible">Flexible (1-2 weeks)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                rows={3}
                placeholder="Any additional information or special requirements..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="newsletter"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-700">
                Subscribe to our newsletter for updates and special offers
              </label>
            </div>

            {currentPrice && currentPrice.basePrice > 0 && (
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-medium text-gray-900">Estimated Total:</span>
                  <span className="text-2xl font-bold text-purple-600">
                    {formatUSD(currentPrice.basePrice * quantity)}
                  </span>
                </div>
                <p className="text-xs text-gray-600">
                  This is a base estimate. Final price will be confirmed before production.
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={!selectedProjectType || (selectedProjectType === 'shirt-printing' && (!shirtColor || !shirtSize))}
              onClick={(e) => {
                console.log('Button clicked');
                if (!selectedProjectType) {
                  e.preventDefault();
                  alert('Please select a project type first');
                }
              }}
              className={`w-full py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold transition-colors ${
                selectedProjectType && !(selectedProjectType === 'shirt-printing' && (!shirtColor || !shirtSize))
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {currentPrice && currentPrice.basePrice > 0 
                ? 'Add to Cart & Continue'
                : 'Submit Custom Order Request'
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function CustomOrders() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">Loading...</div>}>
      <CustomOrdersContent />
    </Suspense>
  );
}
