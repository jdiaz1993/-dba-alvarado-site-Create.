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
      
      <div className="flex items-center justify-center">
        <div className="relative">
          {/* Shirt SVG Preview */}
          <svg width="200" height="240" viewBox="0 0 200 240" className="drop-shadow-lg">
            {/* Shirt Body */}
            <path
              d="M60 40 Q60 20 80 20 L120 20 Q140 20 140 40 L140 180 Q140 200 120 200 L80 200 Q60 200 60 180 Z"
              fill={shirtColor}
              stroke="#333"
              strokeWidth="2"
            />
            {/* Shirt sleeves */}
            <path d="M60 80 L40 120 L50 130 L60 110 Z" fill={shirtColor} stroke="#333" strokeWidth="2" />
            <path d="M140 80 L160 120 L150 130 L140 110 Z" fill={shirtColor} stroke="#333" strokeWidth="2" />
            
            {/* Design Preview Area */}
            {imageUrls.length > 0 && (
              <foreignObject x="70" y="90" width="60" height="60">
                <div className="w-full h-full flex items-center justify-center bg-white/80 rounded">
                  <img 
                    src={imageUrls[0]} 
                    alt="Design preview"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </foreignObject>
            )}
          </svg>
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
