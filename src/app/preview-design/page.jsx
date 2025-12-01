'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Row, Col, Card, Button, ButtonGroup } from 'react-bootstrap';
import { useCart } from '../../context/CartContext';

export default function PreviewDesign() {
  const [designData, setDesignData] = useState(null);
  const [shirtColor, setShirtColor] = useState('#FFFFFF');
  const [placement, setPlacement] = useState('front');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const router = useRouter();
  const { addItem } = useCart();

  useEffect(() => {
    // Get design data from localStorage
    const savedData = localStorage.getItem('previewDesignData');
    if (savedData) {
      const data = JSON.parse(savedData);
      setDesignData(data);
      
      // Set color
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
      setShirtColor(colorMap[data.color] || '#FFFFFF');
    } else {
      // No data found, redirect back to custom orders
      router.push('/custom-orders');
    }
  }, [router]);

  const handleMouseDown = (e) => {
    setDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleContinueToCart = () => {
    if (!designData) return;
    
    // Add to cart with placement info
    const shippingInfo = `${designData.shippingAddress.street}, ${designData.shippingAddress.city}, ${designData.shippingAddress.state} ${designData.shippingAddress.zipCode}, ${designData.shippingAddress.country}`;
    const itemName = `${designData.productInfo.name} - ${designData.color} (Size ${designData.size}) - ${placement.toUpperCase()} PRINT - Ship to: ${shippingInfo}`;
    
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
    return <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }} className="d-flex align-items-center justify-content-center">Loading...</div>;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }} className="py-5">
      <Container>
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold mb-3">Preview Your Design</h1>
          <p className="lead text-muted">Review your custom order before adding to cart</p>
        </div>

        <Card className="shadow">
          <Card.Body className="p-5">
            {/* Placement Controls */}
            <div className="mb-4 d-flex gap-2 justify-content-center">
              <ButtonGroup>
                <Button 
                  variant={placement === 'front' ? 'primary' : 'outline-secondary'}
                  onClick={() => setPlacement('front')}
                >
                  Front
                </Button>
                <Button 
                  variant={placement === 'back' ? 'primary' : 'outline-secondary'}
                  onClick={() => setPlacement('back')}
                >
                  Back
                </Button>
              </ButtonGroup>
            </div>

            <Row className="g-4">
              {/* Left: T-Shirt Preview */}
              <Col md={6}>
                <div className="d-flex align-items-center justify-content-center">
                  <div 
                    className="position-relative"
                    style={{ width: '288px', height: '384px' }}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                  >
                    {/* T-Shirt Shape */}
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
                      
                      {/* Draggable Design Preview */}
                      {designData.designs.length > 0 && (
                        <div 
                          className="position-absolute w-50 h-50 bg-white rounded d-flex align-items-center justify-content-center p-1 shadow-lg"
                          style={{
                            left: `${position.x}px`,
                            top: `${position.y}px`,
                            transform: 'translate(-50%, -50%)',
                            border: '3px solid #4b5563',
                            width: '128px',
                            height: '128px',
                            cursor: 'move'
                          }}
                          onMouseDown={handleMouseDown}
                        >
                          <img 
                            src={designData.designs[0]} 
                            alt="Design preview"
                            className="img-fluid"
                            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', pointerEvents: 'none' }}
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
              </Col>

              {/* Right: Order Details */}
              <Col md={6}>
                <div>
                  <h2 className="h3 fw-bold mb-4">Order Details</h2>
                  
                  <div className="mb-3">
                    <div className="d-flex justify-content-between py-2 border-bottom">
                      <span className="text-muted">Color:</span>
                      <span className="fw-semibold" style={{ color: shirtColor }}>{designData.color}</span>
                    </div>
                    
                    <div className="d-flex justify-content-between py-2 border-bottom">
                      <span className="text-muted">Size:</span>
                      <span className="fw-semibold">{designData.size}</span>
                    </div>
                    
                    <div className="d-flex justify-content-between py-2 border-bottom">
                      <span className="text-muted">Quantity:</span>
                      <span className="fw-semibold">{designData.quantity}</span>
                    </div>
                    
                    <div className="d-flex justify-content-between py-2 border-bottom">
                      <span className="text-muted">Placement:</span>
                      <span className="fw-semibold text-capitalize">{placement}</span>
                    </div>
                      
                    <div className="d-flex justify-content-between py-2 border-bottom">
                      <span className="text-muted">Price:</span>
                      <span className="fw-semibold text-primary">$20.00 each</span>
                    </div>
                      
                    <div className="d-flex justify-content-between py-2 border-bottom">
                      <span className="text-muted">Subtotal:</span>
                      <span className="fw-bold h5 text-primary">
                        ${(20 * designData.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Design Files */}
                {designData.designs.length > 0 && (
                  <div className="mt-4">
                    <h3 className="h5 fw-semibold mb-3">Uploaded Designs</h3>
                    <div className="d-flex flex-column gap-2">
                      {designData.designs.map((design, index) => (
                        <div key={index} className="d-flex align-items-center gap-3 p-3 bg-light rounded">
                          <img src={design} alt={`Design ${index + 1}`} className="rounded" style={{ width: '64px', height: '64px', objectFit: 'cover' }} />
                          <span className="small text-muted">Design {index + 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Col>
            </Row>

            {/* Action Buttons */}
            <div className="mt-4 d-grid gap-2" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <Button
                variant="outline-secondary"
                size="lg"
                onClick={() => router.push('/custom-orders')}
              >
                Edit Design
              </Button>
              <Button
                variant="primary"
                size="lg"
                onClick={handleContinueToCart}
              >
                Add to Cart
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
