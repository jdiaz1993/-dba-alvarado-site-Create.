'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Container, Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import ImageUpload from '../../components/ImageUpload';
import DesignPreview from '../../components/DesignPreview';
import { useCart } from '../../context/CartContext';

// Product pricing for all product types
const productPrices = {
  't-shirt': { name: 'T-Shirt', basePrice: 2000 }, // $20.00
  'long-sleeve': { name: 'Long Sleeve', basePrice: 2500 }, // $25.00
  'crew-neck': { name: 'Crew Neck', basePrice: 2500 }, // $25.00
  'polo': { name: 'Polo Shirt', basePrice: 3500 }, // $35.00
  'hoodie': { name: 'Hoodie', basePrice: 4500 }, // $45.00
  'tote-bag': { name: 'Tote Bag', basePrice: 1500 }, // $15.00
};

// Custom text pricing (per text element)
const CUSTOM_TEXT_PRICE = 200; // $2.00 per text element
// Rush order fee
const RUSH_ORDER_FEE = 500; // $5.00 for rush orders

function CustomOrdersContent() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedProjectType, setSelectedProjectType] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [shirtColor, setShirtColor] = useState('');
  const [shirtSize, setShirtSize] = useState('');
  const [designPlacement, setDesignPlacement] = useState('');
  const [customTexts, setCustomTexts] = useState([]); // Array of text objects
  const [showTextEditor, setShowTextEditor] = useState(false);
  const [isRushOrder, setIsRushOrder] = useState(false); // Rush order flag
  const [timeline, setTimeline] = useState(''); // Timeline selection
  const [previewImageUrl, setPreviewImageUrl] = useState(null); // Preview image URL for cart
  const capturePreviewRef = useRef(null); // Ref to capture preview on demand
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
    // Get project type from URL parameter, default to t-shirt
    const type = searchParams.get('type');
    if (type && productPrices[type]) {
      setSelectedProjectType(type);
    } else {
      // Default to t-shirt if no type specified
      setSelectedProjectType('t-shirt');
    }
  }, [searchParams]);

  const handleImageUpload = (file) => {
    setUploadedFiles(prev => [...prev, file]);
    console.log('Uploaded file for custom order:', file);
  };

  const handleTextPositionChange = (textIndex, newPosition) => {
    setCustomTexts(prev => {
      const updated = [...prev];
      if (updated[textIndex]) {
        updated[textIndex] = {
          ...updated[textIndex],
          position: newPosition
        };
      }
      return updated;
    });
  };

  const handleTextRotationChange = (textIndex, newRotation) => {
    setCustomTexts(prev => {
      const updated = [...prev];
      if (updated[textIndex]) {
        updated[textIndex] = {
          ...updated[textIndex],
          rotation: newRotation
        };
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Form submitted');
    console.log('Selected project type:', selectedProjectType);
    console.log('Quantity:', quantity);
    console.log('Shipping address:', shippingAddress);
    
    // Validate product type
    if (!selectedProjectType) {
      alert('Please select a product type');
      return;
    }

    // Get current price
    const currentPrice = productPrices[selectedProjectType];
    if (!currentPrice) {
      alert('Invalid product type selected');
      return;
    }

    // Validate product color
    if (!shirtColor) {
      const productName = selectedProjectType === 'tote-bag' ? 'bag color' : 'product color';
      alert(`Please select a ${productName}`);
      return;
    }

    // Validate product size
    if (!shirtSize) {
      const productName = selectedProjectType === 'tote-bag' ? 'bag size' : 'product size';
      alert(`Please select a ${productName}`);
      return;
    }

    // Validate design placement
    if (!designPlacement) {
      alert('Please select a design placement location');
      return;
    }

    // Validate shipping address
    if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.state || !shippingAddress.zipCode) {
      alert('Please fill out all shipping address fields');
      return;
    }

    // Capture preview image immediately before adding to cart
    let finalPreviewUrl = previewImageUrl;
    if (capturePreviewRef.current) {
      try {
        console.log('Capturing preview image...');
        finalPreviewUrl = await capturePreviewRef.current();
        if (finalPreviewUrl) {
          setPreviewImageUrl(finalPreviewUrl);
          console.log('Preview image captured:', finalPreviewUrl.substring(0, 50) + '...');
        } else {
          console.warn('Preview image capture returned null, using existing preview');
        }
      } catch (error) {
        console.error('Error capturing preview:', error);
      }
    }
      
    // Calculate total price
    const basePrice = currentPrice.basePrice;
    const customTextFee = CUSTOM_TEXT_PRICE * customTexts.length * quantity;
    const rushFee = isRushOrder ? RUSH_ORDER_FEE : 0;
    const totalPrice = (basePrice * quantity) + customTextFee + rushFee;

      // Create cart item
      const cartItem = {
        id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: `Custom ${currentPrice.name}`,
        price: totalPrice,
        quantity: 1, // Total quantity is already in the price calculation
        imageUrl: finalPreviewUrl || previewImageUrl || null, // Preview image from design editor
        productType: selectedProjectType,
        color: shirtColor,
        size: shirtSize,
        placement: designPlacement,
        customTexts: customTexts,
        isRushOrder: isRushOrder,
        rushOrderFee: rushFee,
        shippingAddress: shippingAddress,
        timeline: timeline,
        // Store design files as data URLs for preview
        designData: uploadedFiles.length > 0 ? {
          files: uploadedFiles.map(file => ({
            name: file.name,
            type: file.type,
            size: file.size
          }))
        } : null
      };

      // Add to cart
      try {
        addItem(cartItem, 1);
        
        // Save data to localStorage for preview (if needed)
        const designUrls = uploadedFiles.map(file => URL.createObjectURL(file));
        const previewData = {
          color: shirtColor,
          size: shirtSize,
          quantity: quantity,
          placement: designPlacement,
          designs: designUrls,
          shippingAddress: shippingAddress,
          productInfo: productPrices[selectedProjectType],
          customTexts: customTexts,
          isRushOrder: isRushOrder,
          rushOrderFee: rushFee,
          timeline: timeline
        };
        localStorage.setItem('previewDesignData', JSON.stringify(previewData));
        
        // Show success message
        alert('Item added to cart successfully!');
        
        // Redirect to cart page
        router.push('/cart');
      } catch (error) {
        console.error('Error adding to cart:', error);
        alert('There was an error adding the item to your cart. Please try again.');
      }
  };

  const formatUSD = (cents) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
  };

  const currentPrice = selectedProjectType ? productPrices[selectedProjectType] : null;
  
  const shirtColors = ['White', 'Black', 'Navy', 'Gray', 'Red', 'Blue', 'Green', 'Pink'];
  const youthSizes = ['YS', 'YM', 'YL', 'YXL'];
  const adultSizes = ['XS', 'S', 'M', 'L', 'XL'];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }} className="py-5">
      <Container>
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold mb-3">Custom Order</h1>
          <p className="lead text-muted">
            Create your custom design. Upload your artwork, choose your product type, and we&apos;ll bring it to life.
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
                  disabled
                >
                  <option value="United States">United States</option>
                </Form.Select>
                <Form.Text className="text-muted">
                  Currently shipping to United States only
                </Form.Text>
              </Form.Group>

              {/* Project Details */}
              <hr className="my-4" />
              <Form.Group className="mb-3">
                <Form.Label>Product Type *</Form.Label>
                <Form.Select 
                  value={selectedProjectType}
                  onChange={(e) => setSelectedProjectType(e.target.value)}
                  required
                >
                  <option value="">Select a product type</option>
                  <option value="t-shirt">T-Shirt</option>
                  <option value="long-sleeve">Long Sleeve</option>
                  <option value="crew-neck">Crew Neck</option>
                  <option value="polo">Polo Shirt</option>
                  <option value="hoodie">Hoodie</option>
                  <option value="tote-bag">Tote Bag</option>
                </Form.Select>
                <Form.Text className="text-muted">
                  Choose the product type for your custom design
                </Form.Text>
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

              {/* Product Color Selection */}
              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold mb-2" style={{ fontSize: '1.1rem' }}>
                  {selectedProjectType === 'tote-bag' ? 'Bag Color *' : 'Product Color *'}
                </Form.Label>
                <div style={{ position: 'relative' }}>
                  <Form.Select
                    value={shirtColor}
                    onChange={(e) => setShirtColor(e.target.value)}
                    required
                    style={{
                      fontSize: '1rem',
                      padding: '0.75rem',
                      paddingLeft: shirtColor ? '3.5rem' : '0.75rem',
                      border: '2px solid #e9ecef',
                      borderRadius: '12px',
                      transition: 'all 0.2s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#6366f1';
                      e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e9ecef';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <option value="">Select a color</option>
                    {shirtColors.map((color) => (
                      <option key={color} value={color}>
                          {color}
                      </option>
                    ))}
                  </Form.Select>
                  {shirtColor && (
                    <div
                      style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: (() => {
                          const colorMap = {
                            'White': '#ffffff',
                            'Black': '#000000',
                            'Navy': '#1e3a5f',
                            'Gray': '#6c757d',
                            'Red': '#dc3545',
                            'Blue': '#0d6efd',
                            'Green': '#198754',
                            'Pink': '#d63384'
                          };
                          return colorMap[shirtColor] || '#6c757d';
                        })(),
                        border: shirtColor === 'White' ? '2px solid #dee2e6' : 'none',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        pointerEvents: 'none'
                      }}
                    />
                  )}
                </div>
              </Form.Group>

              {/* Product Size Selection */}
              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold mb-2" style={{ fontSize: '1.1rem' }}>
                  {selectedProjectType === 'tote-bag' ? 'Bag Size *' : 'Product Size *'}
                </Form.Label>
                <Form.Select
                  value={shirtSize}
                  onChange={(e) => setShirtSize(e.target.value)}
                  required
                  style={{
                    fontSize: '1rem',
                    padding: '0.75rem',
                    border: '2px solid #e9ecef',
                    borderRadius: '12px',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#6366f1';
                    e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e9ecef';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="">Select a size</option>
                  <optgroup label="Youth Sizes">
                      {youthSizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Adult Sizes">
                    {adultSizes.map((size) => (
                      <option key={size} value={size}>
                            {size}
                      </option>
                    ))}
                  </optgroup>
                </Form.Select>
              </Form.Group>

              {/* Design Placement Selection */}
              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold mb-2" style={{ fontSize: '1.1rem' }}>
                  Design Placement *
                </Form.Label>
                <Form.Select
                  value={designPlacement}
                  onChange={(e) => setDesignPlacement(e.target.value)}
                  required
                  style={{
                    fontSize: '1rem',
                    padding: '0.75rem',
                    border: '2px solid #e9ecef',
                    borderRadius: '12px',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#6366f1';
                    e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e9ecef';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="">Select placement location</option>
                  {selectedProjectType === 'tote-bag' ? (
                    <>
                      <option value="front-center">Front Center</option>
                      <option value="front-left">Front Left</option>
                      <option value="front-right">Front Right</option>
                      <option value="back-center">Back Center</option>
                      <option value="side-left">Left Side</option>
                      <option value="side-right">Right Side</option>
                    </>
                  ) : selectedProjectType === 'hoodie' ? (
                    <>
                      <option value="front-center">Front Center</option>
                      <option value="front-left-chest">Front Left Chest</option>
                      <option value="front-right-chest">Front Right Chest</option>
                      <option value="back-center">Back Center</option>
                      <option value="back-full">Full Back</option>
                      <option value="sleeve-left">Left Sleeve</option>
                      <option value="sleeve-right">Right Sleeve</option>
                      <option value="hood">Hood</option>
                    </>
                  ) : selectedProjectType === 'polo' ? (
                    <>
                      <option value="front-center">Front Center</option>
                      <option value="front-left-chest">Front Left Chest (Logo)</option>
                      <option value="front-right-chest">Front Right Chest</option>
                      <option value="back-center">Back Center</option>
                      <option value="back-full">Full Back</option>
                      <option value="sleeve-left">Left Sleeve</option>
                      <option value="sleeve-right">Right Sleeve</option>
                    </>
                  ) : (
                    <>
                      <option value="front-center">Front Center</option>
                      <option value="front-left-chest">Front Left Chest</option>
                      <option value="front-right-chest">Front Right Chest</option>
                      <option value="back-center">Back Center</option>
                      <option value="back-full">Full Back</option>
                      <option value="sleeve-left">Left Sleeve</option>
                      <option value="sleeve-right">Right Sleeve</option>
                    </>
                  )}
                </Form.Select>
                <Form.Text className="text-muted">
                  Choose where you want your design to be placed on the product
                </Form.Text>
              </Form.Group>

              {/* Custom Text Editor */}
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <Form.Label className="fw-semibold mb-0" style={{ fontSize: '1.1rem' }}>
                      Add Custom Text
                    </Form.Label>
                    <Form.Text className="text-muted d-block">
                      Add personalized text to your design (+{formatUSD(CUSTOM_TEXT_PRICE)} per text element)
                    </Form.Text>
                  </div>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => {
                      setCustomTexts([...customTexts, {
                        id: Date.now(),
                        text: '',
                        fontSize: 24,
                        fontFamily: 'Arial',
                        color: '#000000',
                        position: { x: 50, y: 40 },
                        rotation: 0
                      }]);
                      setShowTextEditor(true);
                    }}
                  >
                    + Add Text
                  </Button>
                  </div>

                {customTexts.length > 0 && (
                  <div className="p-3 rounded mb-3" style={{ backgroundColor: '#f8f9fa', border: '1px solid #e9ecef' }}>
                    {customTexts.map((textItem, index) => (
                      <div key={textItem.id} className="mb-3 pb-3 border-bottom">
                        <div className="row g-3">
                          <div className="col-md-4">
                            <Form.Label className="small">Text Content</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter your text"
                              value={textItem.text}
                              onChange={(e) => {
                                const updated = [...customTexts];
                                updated[index].text = e.target.value;
                                setCustomTexts(updated);
                              }}
                            />
                          </div>
                          <div className="col-md-2">
                            <Form.Label className="small">Font</Form.Label>
                            <Form.Select
                              value={textItem.fontFamily}
                              onChange={(e) => {
                                const updated = [...customTexts];
                                updated[index].fontFamily = e.target.value;
                                setCustomTexts(updated);
                              }}
                            >
                              <optgroup label="Sans-Serif">
                                <option value="Arial, sans-serif">Arial</option>
                                <option value="'Helvetica Neue', Helvetica, sans-serif">Helvetica</option>
                                <option value="'Verdana', sans-serif">Verdana</option>
                                <option value="'Trebuchet MS', sans-serif">Trebuchet MS</option>
                                <option value="'Tahoma', sans-serif">Tahoma</option>
                                <option value="'Lucida Grande', sans-serif">Lucida Grande</option>
                                <option value="'Century Gothic', sans-serif">Century Gothic</option>
                                <option value="'Futura', sans-serif">Futura</option>
                                <option value="'Gill Sans', sans-serif">Gill Sans</option>
                                <option value="'Roboto', sans-serif">Roboto</option>
                                <option value="'Open Sans', sans-serif">Open Sans</option>
                                <option value="'Montserrat', sans-serif">Montserrat</option>
                                <option value="'Lato', sans-serif">Lato</option>
                                <option value="'Raleway', sans-serif">Raleway</option>
                                <option value="'Poppins', sans-serif">Poppins</option>
                                <option value="'Oswald', sans-serif">Oswald</option>
                                <option value="'Ubuntu', sans-serif">Ubuntu</option>
                              </optgroup>
                              <optgroup label="Serif">
                                <option value="'Times New Roman', serif">Times New Roman</option>
                                <option value="'Georgia', serif">Georgia</option>
                                <option value="'Palatino', serif">Palatino</option>
                                <option value="'Garamond', serif">Garamond</option>
                                <option value="'Book Antiqua', serif">Book Antiqua</option>
                                <option value="'Baskerville', serif">Baskerville</option>
                                <option value="'Bodoni MT', serif">Bodoni MT</option>
                                <option value="'Didot', serif">Didot</option>
                                <option value="'Playfair Display', serif">Playfair Display</option>
                                <option value="'Merriweather', serif">Merriweather</option>
                                <option value="'Lora', serif">Lora</option>
                                <option value="'Crimson Text', serif">Crimson Text</option>
                              </optgroup>
                              <optgroup label="Display/Bold">
                                <option value="'Impact', fantasy">Impact</option>
                                <option value="'Arial Black', sans-serif">Arial Black</option>
                                <option value="'Franklin Gothic Medium', sans-serif">Franklin Gothic</option>
                                <option value="'Copperplate', fantasy">Copperplate</option>
                                <option value="'Bebas Neue', sans-serif">Bebas Neue</option>
                                <option value="'Anton', sans-serif">Anton</option>
                                <option value="'Righteous', cursive">Righteous</option>
                                <option value="'Bangers', cursive">Bangers</option>
                                <option value="'Lobster', cursive">Lobster</option>
                                <option value="'Fredoka One', cursive">Fredoka One</option>
                                <option value="'Russo One', sans-serif">Russo One</option>
                              </optgroup>
                              <optgroup label="Script/Handwriting">
                                <option value="'Brush Script MT', cursive">Brush Script</option>
                                <option value="'Lucida Handwriting', cursive">Lucida Handwriting</option>
                                <option value="'Comic Sans MS', cursive">Comic Sans MS</option>
                                <option value="'Pacifico', cursive">Pacifico</option>
                                <option value="'Dancing Script', cursive">Dancing Script</option>
                                <option value="'Great Vibes', cursive">Great Vibes</option>
                                <option value="'Satisfy', cursive">Satisfy</option>
                                <option value="'Kalam', cursive">Kalam</option>
                                <option value="'Caveat', cursive">Caveat</option>
                                <option value="'Permanent Marker', cursive">Permanent Marker</option>
                                <option value="'Shadows Into Light', cursive">Shadows Into Light</option>
                                <option value="'Amatic SC', cursive">Amatic SC</option>
                              </optgroup>
                              <optgroup label="Monospace">
                                <option value="'Courier New', monospace">Courier New</option>
                                <option value="'Lucida Console', monospace">Lucida Console</option>
                                <option value="'Monaco', monospace">Monaco</option>
                                <option value="'Consolas', monospace">Consolas</option>
                                <option value="'Source Code Pro', monospace">Source Code Pro</option>
                                <option value="'Roboto Mono', monospace">Roboto Mono</option>
                              </optgroup>
                              <optgroup label="Decorative/Unique">
                                <option value="'Papyrus', fantasy">Papyrus</option>
                                <option value="'Chalkduster', fantasy">Chalkduster</option>
                                <option value="'Marker Felt', fantasy">Marker Felt</option>
                                <option value="'Trattatello', fantasy">Trattatello</option>
                                <option value="'Creepster', cursive">Creepster</option>
                                <option value="'Freckle Face', cursive">Freckle Face</option>
                                <option value="'Finger Paint', cursive">Finger Paint</option>
                                <option value="'Nosifer', cursive">Nosifer</option>
                              </optgroup>
                            </Form.Select>
                          </div>
                          <div className="col-md-3">
                            <Form.Label className="small">Font Size</Form.Label>
                            <Form.Select
                              value={textItem.fontSize}
                              onChange={(e) => {
                                const updated = [...customTexts];
                                updated[index].fontSize = parseInt(e.target.value);
                                setCustomTexts(updated);
                              }}
                            >
                              <option value="16">Small (16px)</option>
                              <option value="24">Medium (24px)</option>
                              <option value="32">Large (32px)</option>
                              <option value="48">Extra Large (48px)</option>
                            </Form.Select>
                          </div>
                          <div className="col-md-3">
                            <Form.Label className="small">Text Color</Form.Label>
                            <Form.Control
                              type="color"
                              value={textItem.color}
                              onChange={(e) => {
                                const updated = [...customTexts];
                                updated[index].color = e.target.value;
                                setCustomTexts(updated);
                              }}
                            />
                          </div>
                        </div>
                        <div className="row g-3 mt-2">
                          <div className="col-md-6">
                            <Form.Label className="small">Rotation</Form.Label>
                            <div className="d-flex align-items-center gap-2">
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => {
                                  const updated = [...customTexts];
                                  updated[index].rotation = ((updated[index].rotation || 0) - 15 + 360) % 360;
                                  setCustomTexts(updated);
                                }}
                              >
                                ↺
                              </Button>
                              <Form.Control
                                type="number"
                                min="0"
                                max="360"
                                value={textItem.rotation || 0}
                                onChange={(e) => {
                                  const updated = [...customTexts];
                                  updated[index].rotation = parseInt(e.target.value) || 0;
                                  setCustomTexts(updated);
                                }}
                                style={{ textAlign: 'center' }}
                              />
                              <span className="small text-muted">°</span>
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => {
                                  const updated = [...customTexts];
                                  updated[index].rotation = ((updated[index].rotation || 0) + 15) % 360;
                                  setCustomTexts(updated);
                                }}
                              >
                                ↻
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2">
                          <small className="text-muted">
                            💡 Tip: Drag the text in the preview to position it, use rotation controls to rotate it
                          </small>
                        </div>
                        <div className="mt-2 d-flex justify-content-end">
                          <Button
                            variant="link"
                            className="text-danger text-decoration-none p-0"
                            onClick={() => {
                              setCustomTexts(customTexts.filter((_, i) => i !== index));
                            }}
                          >
                            Remove Text
                          </Button>
                        </div>
                      </div>
                    ))}
                    <div className="text-end">
                      <small className="text-muted">
                        Custom Text Fee: {formatUSD(CUSTOM_TEXT_PRICE * customTexts.length)}
                      </small>
                    </div>
                  </div>
                  )}
                </div>

              {/* Live Design Preview */}
                <DesignPreview 
                  productType={selectedProjectType} 
                  color={shirtColor}
                  uploadedFiles={uploadedFiles}
                  placement={designPlacement}
                  customTexts={customTexts}
                  onTextPositionChange={handleTextPositionChange}
                  onTextRotationChange={handleTextRotationChange}
                  onPreviewImageReady={setPreviewImageUrl}
                  capturePreviewRef={capturePreviewRef}
                />

              {/* Rush Order Option */}
              <Form.Group className="mb-4">
                <Form.Check
                  type="checkbox"
                  id="rush-order"
                  label={
                    <span>
                      <strong>Rush Order</strong>
                      <span className="text-muted ms-2">(+{formatUSD(RUSH_ORDER_FEE)} for expedited processing)</span>
                    </span>
                  }
                  checked={isRushOrder}
                  onChange={(e) => setIsRushOrder(e.target.checked)}
                  style={{
                    padding: '12px',
                    backgroundColor: isRushOrder ? '#e7f3ff' : '#f8f9fa',
                    borderRadius: '8px',
                    border: `2px solid ${isRushOrder ? '#6366f1' : '#e9ecef'}`,
                    transition: 'all 0.2s ease'
                  }}
                />
              </Form.Group>

              {/* Quantity Selection */}
              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold mb-2" style={{ fontSize: '1.1rem' }}>
                  Quantity *
                </Form.Label>
                <Form.Select
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  required
                  style={{
                    fontSize: '1rem',
                    padding: '0.75rem',
                    border: '2px solid #e9ecef',
                    borderRadius: '12px',
                    transition: 'all 0.2s ease',
                    maxWidth: '200px'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#6366f1';
                    e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e9ecef';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  {Array.from({ length: 50 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'item' : 'items'}
                    </option>
                  ))}
                </Form.Select>
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
                <Form.Select
                  value={timeline}
                  onChange={(e) => {
                    const selectedTimeline = e.target.value;
                    setTimeline(selectedTimeline);
                    setIsRushOrder(selectedTimeline === 'rush');
                  }}
                >
                  <option value="">Select timeline</option>
                  <option value="rush">Rush (1-2 days) - +{formatUSD(RUSH_ORDER_FEE)}</option>
                  <option value="standard">Standard (3-5 days)</option>
                  <option value="flexible">Flexible (1-2 weeks)</option>
                </Form.Select>
                <Form.Text className="text-muted">
                  Rush orders are processed faster and include a {formatUSD(RUSH_ORDER_FEE)} expedited processing fee.
                </Form.Text>
                {timeline === 'rush' && currentPrice && (
                  <div className="mt-2 p-2 bg-warning bg-opacity-10 rounded border border-warning">
                    <small className="text-warning-emphasis">
                      <strong>Rush Order Selected:</strong> Your estimated total includes a {formatUSD(RUSH_ORDER_FEE)} rush processing fee.
                    </small>
                  </div>
                )}
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
                    {customTexts.length > 0 && (
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="small">Custom Text ({customTexts.length}):</span>
                        <span className="fw-bold text-primary">
                          {formatUSD(CUSTOM_TEXT_PRICE * customTexts.length * quantity)}
                        </span>
                      </div>
                    )}
                    {isRushOrder && (
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="small">Rush Order Fee:</span>
                        <span className="fw-bold text-warning">
                          {formatUSD(RUSH_ORDER_FEE)}
                        </span>
                      </div>
                    )}
                    <div className="d-flex justify-content-between align-items-center mb-2 pt-2 border-top">
                    <span className="h6 fw-medium mb-0">Estimated Total:</span>
                    <span className="h4 fw-bold text-primary">
                        {formatUSD((currentPrice.basePrice * quantity) + (CUSTOM_TEXT_PRICE * customTexts.length * quantity) + (isRushOrder ? RUSH_ORDER_FEE : 0))}
                    </span>
                    </div>
                  </div>
                  <p className="small text-muted mb-0">
                    This is a base estimate. Final price will be confirmed before production.
                  </p>
                </div>
              )}

              <Button
                type="button"
                variant="primary"
                size="lg"
                className="w-100"
                disabled={!selectedProjectType || !shirtColor || !shirtSize || !designPlacement}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Call handleSubmit directly to avoid form validation scrolling
                  handleSubmit(e);
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
