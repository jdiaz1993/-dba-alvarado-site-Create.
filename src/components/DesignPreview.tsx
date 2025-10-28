'use client';

import { useState } from 'react';

interface DesignPreviewProps {
  productType: string;
  color: string;
  uploadedFiles: File[];
}

export default function DesignPreview({ productType, color, uploadedFiles }: DesignPreviewProps) {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  // Update preview when files change
  if (uploadedFiles.length !== imageUrls.length) {
    const urls = uploadedFiles.map(file => URL.createObjectURL(file));
    setImageUrls(urls);
  }

  if (productType !== 'shirt-printing') {
    return null;
  }

  // Get color hex code
  const getColorHex = (colorName: string) => {
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
    return colorMap[colorName] || '#FFFFFF';
  };

  const shirtColor = getColorHex(color);

  return (
    <div className="mt-6 p-6 bg-gray-50 rounded-lg border-2 border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Design Preview</h3>
      
      <div className="flex items-center justify-center py-8">
        <div className="relative w-72 h-96">
          {/* T-Shirt Shape using CSS */}
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
            {imageUrls.length > 0 && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-lg flex items-center justify-center p-1 shadow-lg border-3 border-gray-600">
                <img 
                  src={imageUrls[0]} 
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

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Color: <span className="font-semibold" style={{ color: shirtColor }}>{color || 'Select a color'}</span>
        </p>
        {imageUrls.length > 0 && (
          <p className="text-xs text-gray-500 mt-2">
            {imageUrls.length} design{imageUrls.length > 1 ? 's' : ''} uploaded
          </p>
        )}
      </div>
    </div>
  );
}
