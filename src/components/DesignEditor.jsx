'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Card, Button, ButtonGroup } from 'react-bootstrap';

// Function to capture preview as image using html2canvas or fallback
const capturePreviewImage = async (containerRef, designImage, customTexts, position, size, rotation) => {
  if (!containerRef.current) return null;
  
  const container = containerRef.current;
  
  // Try to use html2canvas if available (can be loaded via CDN)
  if (typeof window !== 'undefined' && window.html2canvas) {
    try {
      const canvas = await window.html2canvas(container, {
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#ffffff',
        scale: 1,
        logging: false
      });
      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error('Error capturing preview with html2canvas:', error);
    }
  }
  
  // Fallback: Create a simple preview from product image with design and text
  return createSimplePreview(containerRef, designImage, customTexts, position, size, rotation);
};

const createSimplePreview = async (containerRef, designImage, customTexts, position, size, rotation) => {
  if (!containerRef.current) return null;
  
  return new Promise((resolve) => {
    const container = containerRef.current;
    const productImg = container.querySelector('img[alt="Product preview"]');
    
    const drawPreview = () => {
      if (!productImg) {
        resolve(null);
        return;
      }
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const imgWidth = productImg.naturalWidth || 400;
      const imgHeight = productImg.naturalHeight || 500;
      canvas.width = imgWidth;
      canvas.height = imgHeight;
      
      // Draw product image
      ctx.drawImage(productImg, 0, 0, imgWidth, imgHeight);
      
      // Draw design image if available
      if (designImage) {
        const designImg = new Image();
        designImg.crossOrigin = 'anonymous';
        designImg.onload = () => {
          const designSize = (size || 100) * (imgWidth / 400); // Scale based on container
          const x = (position?.x || 50) / 100 * imgWidth;
          const y = (position?.y || 50) / 100 * imgHeight;
          
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate((rotation || 0) * Math.PI / 180);
          ctx.drawImage(designImg, -designSize / 2, -designSize / 2, designSize, designSize);
          ctx.restore();
          
          // Draw custom text
          drawCustomTexts(ctx, customTexts, imgWidth, imgHeight);
          
          resolve(canvas.toDataURL('image/png'));
        };
        designImg.onerror = () => {
          // If design image fails, just draw text
          drawCustomTexts(ctx, customTexts, imgWidth, imgHeight);
          resolve(canvas.toDataURL('image/png'));
        };
        designImg.src = designImage;
      } else {
        // No design image, just draw text
        drawCustomTexts(ctx, customTexts, imgWidth, imgHeight);
        resolve(canvas.toDataURL('image/png'));
      }
    };
    
    const drawCustomTexts = (ctx, texts, width, height) => {
      if (!texts || texts.length === 0) return;
      
      texts.forEach(textItem => {
        if (!textItem.text || !textItem.text.trim()) return;
        
        const x = (textItem.position?.x || 50) / 100 * width;
        const y = (textItem.position?.y || 50) / 100 * height;
        const fontSize = (textItem.fontSize || 24) * (width / 400); // Scale font size
        const rotation = textItem.rotation || 0;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation * Math.PI / 180);
        ctx.font = `${fontSize}px ${textItem.fontFamily || 'Arial'}`;
        ctx.fillStyle = textItem.color || '#000000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(textItem.text, 0, 0);
        ctx.restore();
      });
    };
    
    if (productImg && productImg.complete) {
      drawPreview();
    } else if (productImg) {
      productImg.onload = drawPreview;
      productImg.onerror = () => resolve(null);
    } else {
      resolve(null);
    }
  });
};

export default function DesignEditor({ 
  productImage, 
  designImage, 
  placement,
  customTexts = [],
  onPositionChange,
  onSizeChange,
  onRotationChange,
  onTextPositionChange,
  onTextRotationChange,
  onPreviewImageReady,
  capturePreviewRef
}) {
  const [position, setPosition] = useState({ x: 50, y: 40 });
  const [size, setSize] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingText, setIsDraggingText] = useState(null); // Track which text is being dragged
  const [hoveredTextIndex, setHoveredTextIndex] = useState(null); // Track which text is hovered
  const [hoveredDesign, setHoveredDesign] = useState(false); // Track if design is hovered
  const [isRotating, setIsRotating] = useState(false); // Track if rotating design
  const [isRotatingText, setIsRotatingText] = useState(null); // Track which text is being rotated
  const [showRotationDials, setShowRotationDials] = useState(true); // Control visibility of rotation dials
  const [rotationStart, setRotationStart] = useState({ angle: 0, x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const designRef = useRef(null);

  // Update position when placement changes
  useEffect(() => {
    if (placement) {
      const placementPositions = {
        'front-center': { x: 50, y: 40 },
        'front-left-chest': { x: 30, y: 28 },
        'front-right-chest': { x: 70, y: 28 },
        'back-center': { x: 50, y: 50 },
        'back-full': { x: 50, y: 50 },
        'sleeve-left': { x: 5, y: 45 },
        'sleeve-right': { x: 95, y: 45 },
        'hood': { x: 50, y: 10 },
        'front-left': { x: 35, y: 45 },
        'front-right': { x: 65, y: 45 },
        'side-left': { x: 10, y: 50 },
        'side-right': { x: 90, y: 50 },
      };
      const newPos = placementPositions[placement] || { x: 50, y: 40 };
      setPosition(newPos);
      if (onPositionChange) onPositionChange(newPos);
    }
  }, [placement, onPositionChange]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setDragStart({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleTextMouseDown = (e, textIndex) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingText(textIndex);
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setDragStart({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    const newPosition = {
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y))
    };
    
    if (isRotating && designImage) {
      // Calculate rotation based on mouse position relative to design center
      const designCenterX = (position.x / 100) * rect.width;
      const designCenterY = (position.y / 100) * rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      const angle = Math.atan2(mouseY - designCenterY, mouseX - designCenterX) * (180 / Math.PI);
      // Calculate delta from the initial angle, using base rotation
      const baseRotation = rotationStart.baseRotation || rotation;
      const initialAngle = rotationStart.angle || 0;
      const deltaAngle = angle - (initialAngle + baseRotation);
      
      // Normalize the delta to prevent large jumps
      let normalizedDelta = deltaAngle;
      if (normalizedDelta > 180) normalizedDelta -= 360;
      if (normalizedDelta < -180) normalizedDelta += 360;
      
      const newRotation = (baseRotation + normalizedDelta + 360) % 360;
      setRotation(newRotation);
      if (onRotationChange) onRotationChange(newRotation);
    } else if (isRotatingText !== null && customTexts && customTexts[isRotatingText]) {
      // Calculate rotation for text
      const textItem = customTexts[isRotatingText];
      const textCenterX = (textItem.position?.x || 50) / 100 * rect.width;
      const textCenterY = (textItem.position?.y || 50) / 100 * rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      const angle = Math.atan2(mouseY - textCenterY, mouseX - textCenterX) * (180 / Math.PI);
      // Calculate delta from the initial angle, using base rotation
      const baseRotation = rotationStart.baseRotation || (textItem.rotation || 0);
      const initialAngle = rotationStart.angle || 0;
      const deltaAngle = angle - (initialAngle + baseRotation);
      
      // Normalize the delta to prevent large jumps
      let normalizedDelta = deltaAngle;
      if (normalizedDelta > 180) normalizedDelta -= 360;
      if (normalizedDelta < -180) normalizedDelta += 360;
      
      const newRotation = (baseRotation + normalizedDelta + 360) % 360;
      
      if (onTextRotationChange) {
        onTextRotationChange(isRotatingText, newRotation);
      }
    } else if (isDragging && designImage) {
      setPosition(newPosition);
      if (onPositionChange) onPositionChange(newPosition);
    } else if (isDraggingText !== null && customTexts && customTexts[isDraggingText] && onTextPositionChange) {
      onTextPositionChange(isDraggingText, newPosition);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsDraggingText(null);
    setIsRotating(false);
    setIsRotatingText(null);
  };

  const handleRotationDialDown = (e, isText = false, textIndex = null) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isText && textIndex !== null) {
      setIsRotatingText(textIndex);
      const textItem = customTexts[textIndex];
      const currentRotation = textItem.rotation || 0;
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const textCenterX = (textItem.position?.x || 50) / 100 * rect.width;
        const textCenterY = (textItem.position?.y || 50) / 100 * rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const angle = Math.atan2(mouseY - textCenterY, mouseX - textCenterX) * (180 / Math.PI);
        // Store the initial angle relative to current rotation
        setRotationStart({ angle: angle - currentRotation, x: mouseX, y: mouseY, baseRotation: currentRotation });
      }
    } else {
      setIsRotating(true);
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const designCenterX = (position.x / 100) * rect.width;
        const designCenterY = (position.y / 100) * rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const angle = Math.atan2(mouseY - designCenterY, mouseX - designCenterX) * (180 / Math.PI);
        // Store the initial angle relative to current rotation
        setRotationStart({ angle: angle - rotation, x: mouseX, y: mouseY, baseRotation: rotation });
      }
    }
  };

  useEffect(() => {
    if (isDragging || isDraggingText !== null || isRotating || isRotatingText !== null) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isDraggingText, isRotating, isRotatingText, customTexts, position, rotation]);

  // Function to capture preview on demand
  const capturePreview = useCallback(async () => {
    if (!containerRef.current) return null;
    
    try {
      const imageUrl = await capturePreviewImage(containerRef, designImage, customTexts, position, size, rotation);
      if (imageUrl && onPreviewImageReady) {
        onPreviewImageReady(imageUrl);
      }
      return imageUrl;
    } catch (error) {
      console.error('Error capturing preview image:', error);
      return null;
    }
  }, [designImage, customTexts, position, size, rotation, onPreviewImageReady]);

  // Expose capture function via ref
  useEffect(() => {
    if (capturePreviewRef) {
      capturePreviewRef.current = capturePreview;
    }
  }, [capturePreviewRef, capturePreview]);

  // Capture preview image when design changes
  useEffect(() => {
    if (onPreviewImageReady && containerRef.current && (designImage || (customTexts && customTexts.length > 0 && customTexts.some(t => t && t.text && t.text.trim().length > 0)))) {
      // Delay to ensure rendering is complete
      const timeoutId = setTimeout(() => {
        capturePreview();
      }, 1000); // Delay to ensure all elements are rendered
      
      return () => clearTimeout(timeoutId);
    }
  }, [designImage, customTexts, position, size, rotation, onPreviewImageReady, capturePreview]);

  // Keyboard shortcuts for rotation
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Only handle if not typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      if (e.key === 'q' || e.key === 'Q') {
        // Rotate design counter-clockwise
        if (designImage) {
          e.preventDefault();
          handleRotationChange(-15);
        }
      } else if (e.key === 'e' || e.key === 'E') {
        // Rotate design clockwise
        if (designImage) {
          e.preventDefault();
          handleRotationChange(15);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [designImage]);

  const handleSizeChange = (delta) => {
    const newSize = Math.max(20, Math.min(200, size + delta));
    setSize(newSize);
    if (onSizeChange) onSizeChange(newSize);
  };

  const handleRotationChange = (delta) => {
    const newRotation = (rotation + delta) % 360;
    setRotation(newRotation);
    if (onRotationChange) onRotationChange(newRotation);
  };

  const resetPosition = () => {
    const defaultPos = { x: 50, y: 40 };
    setPosition(defaultPos);
    if (onPositionChange) onPositionChange(defaultPos);
  };

  const resetSize = () => {
    setSize(100);
    if (onSizeChange) onSizeChange(100);
  };

  const resetRotation = () => {
    setRotation(0);
    if (onRotationChange) onRotationChange(0);
  };

  // Show preview if there's either a design image OR custom text items (even if empty)
  const hasTextItems = customTexts && customTexts.length > 0;
  const hasTextWithContent = hasTextItems && customTexts.some(t => t && t.text && t.text.trim().length > 0);
  
  // If there's a design image, placement is required. If only text, placement is optional.
  if (designImage && !placement) {
    return null;
  }
  
  if (!designImage && !hasTextItems) {
    return null;
  }
  
  // Debug logging
  console.log('DesignEditor render:', {
    hasDesignImage: !!designImage,
    hasTextItems,
    hasTextWithContent,
    customTextsCount: customTexts?.length || 0,
    customTexts: customTexts,
    placement: placement
  });
  
  // Log each text item details
  if (customTexts && customTexts.length > 0) {
    customTexts.forEach((textItem, idx) => {
      console.log(`Text item ${idx}:`, {
        id: textItem.id,
        text: textItem.text,
        hasText: !!textItem.text,
        textLength: textItem.text?.length || 0,
        trimmedLength: textItem.text?.trim().length || 0,
        position: textItem.position,
        fontSize: textItem.fontSize,
        color: textItem.color
      });
    });
  }

  return (
    <div className="mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="mb-0">Design Editor</h6>
        <div className="d-flex gap-2 align-items-center">
          {designImage && (
            <small className="text-muted me-2">
              💡 Press <kbd>Q</kbd> / <kbd>E</kbd> to rotate design
            </small>
          )}
          <Button 
            variant={showRotationDials ? "success" : "outline-secondary"}
            size="sm"
            onClick={() => setShowRotationDials(!showRotationDials)}
          >
            {showRotationDials ? '✓ Hide Controls' : 'Show Controls'}
          </Button>
          <Button 
            variant="outline-secondary" 
            size="sm"
            onClick={() => {
              resetPosition();
              resetSize();
              resetRotation();
            }}
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Controls */}
      <div className="mb-3 p-3 rounded" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="small fw-semibold mb-2 d-block">Size</label>
            <div className="d-flex align-items-center gap-2">
              <Button 
                variant="outline-secondary" 
                size="sm"
                onClick={() => handleSizeChange(-10)}
              >
                −
              </Button>
              <span className="flex-grow-1 text-center">{size}%</span>
              <Button 
                variant="outline-secondary" 
                size="sm"
                onClick={() => handleSizeChange(10)}
              >
                +
              </Button>
            </div>
          </div>
          <div className="col-md-4">
            <label className="small fw-semibold mb-2 d-block">Rotation</label>
            <div className="d-flex align-items-center gap-2">
              <Button 
                variant="outline-secondary" 
                size="sm"
                onClick={() => handleRotationChange(-15)}
              >
                ↺
              </Button>
              <span className="flex-grow-1 text-center">{rotation}°</span>
              <Button 
                variant="outline-secondary" 
                size="sm"
                onClick={() => handleRotationChange(15)}
              >
                ↻
              </Button>
            </div>
          </div>
          <div className="col-md-4">
            <label className="small fw-semibold mb-2 d-block">Position</label>
            <div className="text-center">
              <span className="small text-muted">
                Drag the design to move it
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Preview with draggable design */}
      <div 
        ref={containerRef}
        className="position-relative"
        style={{ 
          maxWidth: '400px', 
          width: '100%',
          margin: '0 auto',
          cursor: isDragging ? 'grabbing' : 'default'
        }}
      >
        {/* Product Image */}
        <img 
          src={productImage}
          alt="Product preview"
          className="img-fluid"
          style={{
            width: '100%',
            height: 'auto',
            pointerEvents: 'none'
          }}
        />
        
        {/* Draggable Design */}
        {designImage && (
          <div
            ref={designRef}
            onMouseDown={handleMouseDown}
            onMouseEnter={() => {
              setHoveredDesign(true);
              setHoveredTextIndex('design');
            }}
            onMouseLeave={(e) => {
              // Don't hide if moving to rotation dial
              if (!e.relatedTarget || !e.relatedTarget.closest('[data-rotation-dial]')) {
                setHoveredDesign(false);
                setHoveredTextIndex(null);
              }
            }}
            style={{
              position: 'absolute',
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
              width: `${size}px`,
              height: `${size}px`,
              cursor: 'grab',
              zIndex: 10,
              transition: isDragging ? 'none' : 'transform 0.1s ease'
            }}
          >
            <img 
              src={designImage}
              alt="Design"
              className="img-fluid"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                mixBlendMode: 'multiply',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                userSelect: 'none',
                pointerEvents: 'none'
              }}
              draggable={false}
            />
            {/* Floating Rotation Dial for Design - Visible when showRotationDials is true */}
            {designImage && showRotationDials && (
              <div
                data-rotation-dial="design"
                onMouseDown={(e) => handleRotationDialDown(e, false)}
                onMouseEnter={() => {
                  setHoveredDesign(true);
                  setHoveredTextIndex('design');
                }}
                onMouseLeave={(e) => {
                  if (!isRotating) {
                    setHoveredDesign(false);
                    setHoveredTextIndex(null);
                  }
                }}
                style={{
                  position: 'absolute',
                  top: '-35px',
                  right: '-35px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: hoveredDesign || isRotating ? '#4f46e5' : '#6366f1',
                  border: '3px solid white',
                  cursor: isRotating ? 'grabbing' : 'grab',
                  zIndex: 25,
                  pointerEvents: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  transition: hoveredDesign || isRotating ? 'all 0.2s ease' : 'none',
                  transform: hoveredDesign || isRotating ? 'scale(1.15)' : 'scale(1)'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    transform: `rotate(${rotation}deg)`
                  }}
                />
              </div>
            )}
          </div>
        )}

        {/* Custom Text Overlays - Draggable */}
        {customTexts && customTexts.length > 0 && customTexts.map((textItem, index) => {
          if (!textItem) return null;
          const displayText = textItem.text && textItem.text.trim().length > 0 
            ? textItem.text 
            : 'Enter text...';
          console.log(`Rendering text item ${index}:`, {
            text: displayText,
            position: textItem.position,
            fontSize: textItem.fontSize,
            color: textItem.color,
            rotation: textItem.rotation
          });
          const handleTextRotation = (delta) => {
            if (onTextRotationChange) {
              const newRotation = ((textItem.rotation || 0) + delta + 360) % 360;
              onTextRotationChange(index, newRotation);
            }
          };

          return (
            <div
              data-text-item={index}
              key={textItem.id || index}
              onMouseDown={(e) => handleTextMouseDown(e, index)}
              onMouseEnter={() => setHoveredTextIndex(index)}
              onMouseLeave={(e) => {
                // Don't hide if moving to rotation dial
                if (!e.relatedTarget || !e.relatedTarget.closest(`[data-rotation-dial="text-${index}"]`)) {
                  setHoveredTextIndex(null);
                }
              }}
              style={{
                position: 'absolute',
                left: `${textItem.position?.x || 50}%`,
                top: `${textItem.position?.y || 50}%`,
                transform: `translate(-50%, -50%) rotate(${textItem.rotation || 0}deg)`,
                fontSize: `${textItem.fontSize || 24}px`,
                fontFamily: textItem.fontFamily || 'Arial',
                color: textItem.color || '#000000',
                fontWeight: 'bold',
                zIndex: 20,
                whiteSpace: 'nowrap',
                cursor: isDraggingText === index ? 'grabbing' : 'grab',
                userSelect: 'none',
                padding: '8px 14px',
                backgroundColor: 'transparent',
                borderRadius: '6px',
                border: 'none',
                transition: isDraggingText === index ? 'none' : 'all 0.2s ease',
                display: 'inline-block',
                minWidth: 'fit-content',
                pointerEvents: 'auto',
                opacity: textItem.text && textItem.text.trim().length > 0 ? 1 : 0.7
              }}
            >
              {displayText}
              {/* Floating Rotation Dial for Text - Visible when showRotationDials is true */}
              {showRotationDials && (
              <div
                data-rotation-dial={`text-${index}`}
                onMouseDown={(e) => handleRotationDialDown(e, true, index)}
                onMouseEnter={() => setHoveredTextIndex(index)}
                onMouseLeave={(e) => {
                  if (!isRotatingText || isRotatingText !== index) {
                    // Only hide if not currently rotating this text
                    if (!e.relatedTarget || !e.relatedTarget.closest(`[data-text-item="${index}"]`)) {
                      setHoveredTextIndex(null);
                    }
                  }
                }}
                style={{
                  position: 'absolute',
                  top: '-35px',
                  right: '-35px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: (hoveredTextIndex === index || isRotatingText === index) ? '#4f46e5' : '#6366f1',
                  border: '3px solid white',
                  cursor: isRotatingText === index ? 'grabbing' : 'grab',
                  zIndex: 25,
                  pointerEvents: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  transition: (hoveredTextIndex === index || isRotatingText === index) ? 'all 0.2s ease' : 'none',
                  transform: (hoveredTextIndex === index || isRotatingText === index) ? 'scale(1.15)' : 'scale(1)'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    transform: `rotate(${textItem.rotation || 0}deg)`
                  }}
                />
              </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

