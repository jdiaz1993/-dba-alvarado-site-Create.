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
        {/* Simple T-Shirt Layout */}
        <div className="relative" style={{ width: '220px', height: '260px' }}>
          {/* Main Shirt Body */}
          <div 
            className="absolute top-12 left-0 right-0 mx-auto w-48 h-52 rounded-b-3xl shadow-xl border-3 border-gray-700"
            style={{ backgroundColor: shirtColor }}
          >
            {/* Design Preview */}
            {imageUrls.length > 0 && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white bg-opacity-95 rounded-lg flex items-center justify-center p-1 shadow-lg border-2 border-gray-400">
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
            className="absolute top-12 left-4 w-16 h-20 rounded-r-2xl border-2 border-gray-700"
            style={{ backgroundColor: shirtColor }}
          />
          
          {/* Right Sleeve */}
          <div 
            className="absolute top-12 right-4 w-16 h-20 rounded-l-2xl border-2 border-gray-700"
            style={{ backgroundColor: shirtColor }}
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
