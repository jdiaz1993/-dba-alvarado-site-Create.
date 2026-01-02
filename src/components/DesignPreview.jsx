'use client';

import { useState, useEffect, useRef } from 'react';
import { Card } from 'react-bootstrap';
import DesignEditor from './DesignEditor';

export default function DesignPreview({ productType, color, uploadedFiles, placement, customTexts = [], onTextPositionChange, onTextRotationChange, onPreviewImageReady, capturePreviewRef }) {
  const [imageUrls, setImageUrls] = useState([]);
  const [designPosition, setDesignPosition] = useState({ x: 50, y: 40 });
  const [designSize, setDesignSize] = useState(100);
  const [designRotation, setDesignRotation] = useState(0);

  useEffect(() => {
    const urls = uploadedFiles.map(file => URL.createObjectURL(file));
    setImageUrls(urls);
    
    return () => {
      urls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [uploadedFiles]);

  // Support all product types now
  const supportedTypes = ['t-shirt', 'long-sleeve', 'crew-neck', 'polo', 'hoodie', 'tote-bag', 'shirt-printing'];
  
  // Don't show preview if no product type is selected
  if (!productType || !supportedTypes.includes(productType)) {
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

  // Get product image based on type
  const getProductImage = () => {
    switch(productType) {
      case 'hoodie':
        return '/assets/Stockphotodba/IMG_3192.WEBP';
      case 'polo':
        return '/assets/Stockphotodba/IMG_3189.WEBP';
      case 'tote-bag':
        return '/assets/Stockphotodba/IMG_3190.JPG';
      case 'long-sleeve':
        return '/assets/Stockphotodba/IMG_3187.WEBP';
      case 'crew-neck':
        return '/assets/Stockphotodba/IMG_3188.JPG';
      case 't-shirt':
      case 'shirt-printing':
      default:
        return '/assets/Stockphotodba/IMG_3186.WEBP';
    }
  };

  // Get placement coordinates for real product images
  const getPlacementStyle = () => {
    const baseStyle = {
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0',
      backgroundColor: 'transparent',
      borderRadius: '0',
      boxShadow: 'none',
      zIndex: 10
    };

    // Coordinates adjusted for real product images (approximately)
    // Hoodies have different proportions, so they need adjusted positions
    const isHoodie = productType === 'hoodie';
    const isToteBag = productType === 'tote-bag';
    
    switch(placement) {
      case 'front-center':
        if (isToteBag) {
          return { ...baseStyle, top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: '120px', height: '120px' };
        }
        return { ...baseStyle, top: isHoodie ? '48%' : '40%', left: '50%', transform: 'translate(-50%, -50%)', width: '120px', height: '120px' };
      case 'front-left':
        return { ...baseStyle, top: '45%', left: '35%', transform: 'translate(-50%, -50%)', width: '100px', height: '100px' };
      case 'front-right':
        return { ...baseStyle, top: '45%', right: '35%', transform: 'translate(50%, -50%)', width: '100px', height: '100px' };
      case 'back-center':
        if (isToteBag) {
          return { ...baseStyle, top: '55%', left: '50%', transform: 'translate(-50%, -50%)', width: '120px', height: '120px' };
        }
        return { ...baseStyle, top: isHoodie ? '52%' : '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '120px', height: '120px' };
      case 'side-left':
        return { ...baseStyle, top: '50%', left: '10%', transform: 'translate(-50%, -50%)', width: '80px', height: '80px' };
      case 'side-right':
        return { ...baseStyle, top: '50%', right: '10%', transform: 'translate(50%, -50%)', width: '80px', height: '80px' };
      case 'front-left-chest':
        return { ...baseStyle, top: isHoodie ? '32%' : '28%', left: isHoodie ? '28%' : '30%', transform: 'translate(-50%, -50%)', width: '70px', height: '70px' };
      case 'front-right-chest':
        return { ...baseStyle, top: isHoodie ? '32%' : '28%', right: isHoodie ? '28%' : '30%', transform: 'translate(50%, -50%)', width: '70px', height: '70px' };
      case 'back-full':
        return { ...baseStyle, top: isHoodie ? '52%' : '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '180px', height: '200px' };
      case 'sleeve-left':
        return { ...baseStyle, top: isHoodie ? '48%' : '45%', left: isHoodie ? '3%' : '5%', transform: 'translate(-50%, -50%)', width: '60px', height: '60px' };
      case 'sleeve-right':
        return { ...baseStyle, top: isHoodie ? '48%' : '45%', right: isHoodie ? '3%' : '5%', transform: 'translate(50%, -50%)', width: '60px', height: '60px' };
      case 'hood':
        return { ...baseStyle, top: isHoodie ? '10%' : '8%', left: '50%', transform: 'translate(-50%, -50%)', width: '90px', height: '90px' };
      default:
        if (isToteBag) {
          return { ...baseStyle, top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: '120px', height: '120px' };
        }
        return { ...baseStyle, top: isHoodie ? '48%' : '40%', left: '50%', transform: 'translate(-50%, -50%)', width: '120px', height: '120px' };
    }
  };

  // Debug: log the product type
  console.log('DesignPreview - productType:', productType, 'supported:', supportedTypes.includes(productType));
  
  // Check if we have text items (even if empty, so preview shows while typing)
  const hasTextItems = customTexts && customTexts.length > 0;
  const hasTextWithContent = hasTextItems && customTexts.some(t => t && t.text && t.text.trim().length > 0);
  console.log('DesignPreview - hasTextItems:', hasTextItems, 'hasTextWithContent:', hasTextWithContent, 'customTexts:', customTexts, 'placement:', placement);

  return (
    <Card className="mt-4">
      <Card.Body>
        <Card.Title>Design Preview</Card.Title>
        {productType && (
          <p className="small text-muted mb-3">
            Product: {productType.charAt(0).toUpperCase() + productType.slice(1).replace('-', ' ')}
          </p>
        )}
        
        {(imageUrls.length > 0 || hasTextItems) ? (
            <DesignEditor
              productImage={getProductImage()}
              designImage={imageUrls[0]}
              placement={placement}
              customTexts={customTexts}
              onTextPositionChange={onTextPositionChange}
              onTextRotationChange={onTextRotationChange}
              onPreviewImageReady={onPreviewImageReady}
              capturePreviewRef={capturePreviewRef}
            />
        ) : (
          <div className="d-flex align-items-center justify-content-center py-4">
            <div className="position-relative" style={{ maxWidth: '400px', width: '100%' }}>
              {/* Real Product Image */}
              <img 
                src={getProductImage()}
                alt={`${productType} preview`}
                className="img-fluid"
                style={{
                  width: '100%',
                  height: 'auto'
                }}
              />
              <div className="text-center mt-3">
                <p className="text-muted small mb-0">
                  Upload a design image or add custom text to see the preview
                </p>
              </div>
            </div>
          </div>
        )}

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
