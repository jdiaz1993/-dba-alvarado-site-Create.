'use client';

import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

export default function DesignPreview({ productType, color, uploadedFiles }) {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const urls = uploadedFiles.map(file => URL.createObjectURL(file));
    setImageUrls(urls);
    
    return () => {
      urls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [uploadedFiles]);

  if (productType !== 'shirt-printing') {
    return null;
  }

  // Get color hex code
  const getColorHex = (colorName) => {
    const colorMap = {
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
    <Card className="mt-4">
      <Card.Body>
        <Card.Title>Design Preview</Card.Title>
        
        <div className="d-flex align-items-center justify-content-center py-4">
          <div className="position-relative" style={{ width: '288px', height: '384px' }}>
            {/* T-Shirt Shape using CSS */}
            <div 
              className="position-absolute start-50 translate-middle-x"
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
                className="position-absolute top-0 start-50 translate-middle-x"
                style={{ 
                  width: '60px',
                  height: '20px',
                  borderRadius: '50px 50px 0 0',
                  backgroundColor: '#f9fafb',
                  border: '3px solid #1f2937',
                  marginTop: '8px'
                }}
              />
              
              {/* Design Preview */}
              {imageUrls.length > 0 && (
                <div className="position-absolute top-50 start-50 translate-middle w-50 h-50 bg-white rounded d-flex align-items-center justify-content-center p-2 shadow-lg" style={{ border: '3px solid #4b5563', width: '128px', height: '128px' }}>
                  <img 
                    src={imageUrls[0]} 
                    alt="Design preview"
                    className="img-fluid"
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  />
                </div>
              )}
            </div>
            
            {/* Left Sleeve */}
            <div 
              className="position-absolute"
              style={{ 
                top: '32px',
                left: '8px',
                width: '48px',
                height: '128px',
                borderRadius: '0 50px 50px 0',
                backgroundColor: shirtColor, 
                border: '3px solid #1f2937', 
                boxShadow: '0 5px 15px rgba(0,0,0,0.15)' 
              }}
            />
            
            {/* Right Sleeve */}
            <div 
              className="position-absolute"
              style={{ 
                top: '32px',
                right: '8px',
                width: '48px',
                height: '128px',
                borderRadius: '50px 0 0 50px',
                backgroundColor: shirtColor, 
                border: '3px solid #1f2937', 
                boxShadow: '0 5px 15px rgba(0,0,0,0.15)' 
              }}
            />
          </div>
        </div>

        <div className="mt-3 text-center">
          <p className="small text-muted mb-0">
            Color: <span className="fw-bold" style={{ color: shirtColor }}>{color || 'Select a color'}</span>
          </p>
          {imageUrls.length > 0 && (
            <p className="small text-muted mt-2">
              {imageUrls.length} design{imageUrls.length > 1 ? 's' : ''} uploaded
            </p>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
