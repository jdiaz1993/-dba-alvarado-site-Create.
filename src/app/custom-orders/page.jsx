'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Container, Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import ImageUpload from '../../components/ImageUpload';
import DesignPreview from '../../components/DesignPreview';
import { useCart } from '../../context/CartContext';

// Product pricing
const productPrices = {
  'shirt-printing': { name: 'Custom T-Shirt Printing', basePrice: 2000 }, // $20.00
  'water-bottle-engraving': { name: 'Engraved Water Bottle', basePrice: 3599 }, // $35.99
  'wood-engraving': { name: 'Custom Wood Engraving', basePrice: 2599 }, // $25.99
  'metal-engraving': { name: 'Metal Engraving', basePrice: 2999 }, // $29.99
  'other': { name: 'Custom Order', basePrice: 0 }, // Price TBD
};

function CustomOrdersContent() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
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

  const handleImageUpload = (file) => {
    setUploadedFiles(prev => [...prev, file]);
    console.log('Uploaded file for custom order:', file);
  };

  const handleSubmit = (e) => {
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

    // If it's shirt printing, redirect to preview page
    if (selectedProjectType === 'shirt-printing') {
      // Validate shipping address for shirts too
      if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.state || !shippingAddress.zipCode) {
        alert('Please fill out all shipping address fields');
        return;
      }
      
      // Save data to localStorage for preview
      const designUrls = uploadedFiles.map(file => URL.createObjectURL(file));
      const previewData = {
        color: shirtColor,
        size: shirtSize,
        quantity: quantity,
        designs: designUrls,
        shippingAddress: shippingAddress,
        productInfo: productPrices[selectedProjectType]
      };
      localStorage.setItem('previewDesignData', JSON.stringify(previewData));
      router.push('/preview-design');
      return;
    }

    // Validate shipping address for non-shirt orders
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
      
      addItem({
        id: `custom-${selectedProjectType}-${Date.now()}`,
        name: `${productInfo.name} - Ship to: ${shippingInfo}`,
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

  const formatUSD = (cents) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
  };

  const currentPrice = selectedProjectType ? productPrices[selectedProjectType] : null;
  
  const shirtColors = ['White', 'Black', 'Navy', 'Gray', 'Red', 'Blue', 'Green', 'Pink'];
  const youthSizes = ['YS', 'YM', 'YL', 'YXL'];
  const adultSizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }} className="py-5">
      <Container>
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold mb-3">Custom Orders</h1>
          <p className="lead text-muted">
            Tell us about your custom project and we&apos;ll provide you with a personalized quote
          </p>
        </div>

        <Card className="shadow">
          <Card.Body className="p-4">
            <Form onSubmit={handleSubmit}>
              {/* Personal Information */}
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name *</Form.Label>
                    <Form.Control type="text" required />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name *</Form.Label>
                    <Form.Control type="text" required />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email *</Form.Label>
                    <Form.Control type="email" required />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number *</Form.Label>
                    <Form.Control type="tel" required />
                  </Form.Group>
                </Col>
              </Row>

              {/* Shipping Address */}
              <hr className="my-4" />
              <h3 className="h5 fw-semibold mb-3">Shipping Address</h3>
              
              <Form.Group className="mb-3">
                <Form.Label>Street Address *</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={shippingAddress.street}
                  onChange={(e) => setShippingAddress({...shippingAddress, street: e.target.value})}
                  placeholder="123 Main Street, Apt 4"
                />
              </Form.Group>

              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>City *</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>State *</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={shippingAddress.state}
                      onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                      placeholder="CA"
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>ZIP Code *</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={shippingAddress.zipCode}
                      onChange={(e) => setShippingAddress({...shippingAddress, zipCode: e.target.value})}
                      placeholder="90001"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-4">
                <Form.Label>Country *</Form.Label>
                <Form.Select
                  value={shippingAddress.country}
                  onChange={(e) => setShippingAddress({...shippingAddress, country: e.target.value})}
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="Mexico">Mexico</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                  <option value="Other">Other (International)</option>
                </Form.Select>
              </Form.Group>

              {/* Project Details */}
              <hr className="my-4" />
              <Form.Group className="mb-3">
                <Form.Label>Project Type *</Form.Label>
                <Form.Select 
                  value={selectedProjectType}
                  onChange={(e) => setSelectedProjectType(e.target.value)}
                >
                  <option value="">Select a project type</option>
                  <option value="shirt-printing">Shirt Printing</option>
                  <option value="water-bottle-engraving">Water Bottle Engraving</option>
                  <option value="wood-engraving">Wood Engraving</option>
                  <option value="metal-engraving">Metal Engraving</option>
                  <option value="other">Other</option>
                </Form.Select>
              </Form.Group>
              
              {currentPrice && currentPrice.basePrice > 0 && (
                <Alert variant="info" className="mb-3">
                  <Row className="align-items-center">
                    <Col>
                      <div className="fw-medium">Base Price per Item</div>
                      <div className="small">Final price may vary based on customization</div>
                    </Col>
                    <Col xs="auto">
                      <div className="h4 fw-bold mb-0">{formatUSD(currentPrice.basePrice)}</div>
                    </Col>
                  </Row>
                </Alert>
              )}
              
              {currentPrice && currentPrice.basePrice === 0 && (
                <Alert variant="warning" className="mb-3">
                  💡 Price will be determined based on your specifications. We&apos;ll contact you with a quote.
                </Alert>
              )}

              {/* Shirt Color Selection - Only show when shirt printing is selected */}
              {selectedProjectType === 'shirt-printing' && (
                <div className="mb-4">
                  <Form.Label>Shirt Color *</Form.Label>
                  <Row className="g-2">
                    {shirtColors.map((color) => (
                      <Col key={color} xs={6} sm={4} md={3}>
                        <Button
                          type="button"
                          variant={shirtColor === color ? 'primary' : 'outline-secondary'}
                          className="w-100"
                          onClick={() => setShirtColor(color)}
                        >
                          {color}
                        </Button>
                      </Col>
                    ))}
                  </Row>
                  {shirtColor && (
                    <p className="small text-muted mt-2">
                      Selected: <span className="fw-semibold">{shirtColor}</span>
                    </p>
                  )}
                </div>
              )}

              {/* Shirt Size Selection - Only show when shirt printing is selected */}
              {selectedProjectType === 'shirt-printing' && (
                <div className="mb-4">
                  <Form.Label>Shirt Size *</Form.Label>
                  
                  {/* Youth Sizes */}
                  <div className="mb-3">
                    <p className="small fw-medium mb-2">Youth Sizes</p>
                    <Row className="g-2">
                      {youthSizes.map((size) => (
                        <Col key={size} xs={3}>
                          <Button
                            type="button"
                            variant={shirtSize === size ? 'primary' : 'outline-secondary'}
                            className="w-100"
                            onClick={() => setShirtSize(size)}
                          >
                            {size}
                          </Button>
                        </Col>
                      ))}
                    </Row>
                  </div>

                  {/* Adult Sizes */}
                  <div>
                    <p className="small fw-medium mb-2">Adult Sizes</p>
                    <Row className="g-2">
                      {adultSizes.map((size) => (
                        <Col key={size} xs={3}>
                          <Button
                            type="button"
                            variant={shirtSize === size ? 'primary' : 'outline-secondary'}
                            className="w-100"
                            onClick={() => setShirtSize(size)}
                          >
                            {size}
                          </Button>
                        </Col>
                      ))}
                    </Row>
                  </div>
                  
                  {shirtSize && (
                    <p className="small text-muted mt-2">
                      Selected: <span className="fw-semibold">{shirtSize}</span>
                    </p>
                  )}
                </div>
              )}

              {/* Live Design Preview */}
              {selectedProjectType === 'shirt-printing' && (
                <DesignPreview 
                  productType={selectedProjectType} 
                  color={shirtColor}
                  uploadedFiles={uploadedFiles}
                />
              )}

              <Form.Group className="mb-3">
                <Form.Label>Quantity *</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Design Description *</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  required
                  placeholder="Describe your design, colors, text, or any specific requirements..."
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Upload Design Files (Optional)</Form.Label>
                <ImageUpload 
                  onImageUpload={handleImageUpload}
                  maxSize={10}
                  acceptedTypes={['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']}
                />
                
                {uploadedFiles.length > 0 && (
                  <div className="mt-3">
                    <h5 className="small fw-medium mb-2">
                      Uploaded Files ({uploadedFiles.length})
                    </h5>
                    <div className="d-flex flex-column gap-2">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="d-flex align-items-center justify-content-between bg-light p-3 rounded">
                          <div className="d-flex align-items-center">
                            <div className="bg-primary bg-opacity-10 rounded d-flex align-items-center justify-content-center me-3" style={{ width: '32px', height: '32px' }}>
                              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-primary">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div>
                              <p className="small fw-medium mb-0">{file.name}</p>
                              <p className="small text-muted mb-0">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="link"
                            className="text-danger text-decoration-none p-0"
                            onClick={() => setUploadedFiles(prev => prev.filter((_, i) => i !== index))}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <p className="small text-muted mt-2">
                  💡 <strong>Pro tip:</strong> High-resolution images (300+ DPI) work best for printing. 
                  For logos, vector files (SVG, AI, EPS) are preferred.
                </p>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Timeline</Form.Label>
                <Form.Select>
                  <option value="">Select timeline</option>
                  <option value="rush">Rush (1-2 days)</option>
                  <option value="standard">Standard (3-5 days)</option>
                  <option value="flexible">Flexible (1-2 weeks)</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Additional Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Any additional information or special requirements..."
                />
              </Form.Group>

              <Form.Check
                type="checkbox"
                id="newsletter"
                label="Subscribe to our newsletter for updates and special offers"
                className="mb-3"
              />

              {currentPrice && currentPrice.basePrice > 0 && (
                <div className="bg-light p-3 rounded mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="h6 fw-medium mb-0">Estimated Total:</span>
                    <span className="h4 fw-bold text-primary">
                      {formatUSD(currentPrice.basePrice * quantity)}
                    </span>
                  </div>
                  <p className="small text-muted mb-0">
                    This is a base estimate. Final price will be confirmed before production.
                  </p>
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-100"
                disabled={!selectedProjectType || (selectedProjectType === 'shirt-printing' && (!shirtColor || !shirtSize))}
                onClick={(e) => {
                  console.log('Button clicked');
                  if (!selectedProjectType) {
                    e.preventDefault();
                    alert('Please select a project type first');
                  }
                }}
              >
                {currentPrice && currentPrice.basePrice > 0 
                  ? 'Add to Cart & Continue'
                  : 'Submit Custom Order Request'
                }
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default function CustomOrders() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }} className="py-5 d-flex align-items-center justify-content-center">Loading...</div>}>
      <CustomOrdersContent />
    </Suspense>
  );
}
