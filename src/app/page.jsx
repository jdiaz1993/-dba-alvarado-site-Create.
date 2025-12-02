'use client';

import Link from 'next/link';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useCart } from '@/context/CartContext';
import ProductCarousel from '@/components/ProductCarousel';

export default function Home() {
  const { addItem } = useCart();

  // Featured ready-to-sell products - Using your actual gallery images
  const featuredProducts = [
    {
      id: "ready-water-bottle-1",
      name: "Engraved Water Bottle",
      price: 3599, // $35.99 in cents
      image: "/assets/images/gallery/20251019_183918.jpg",
      description: "Stainless steel bottle with custom laser engraving",
    },
    {
      id: "ready-wood-1",
      name: "Custom Wood Engraving",
      price: 2599, // $25.99 in cents
      image: "/assets/images/gallery/wood-engraving-example.jpg",
      description: "Beautiful wood engraving - custom designs available",
    },
    {
      id: "ready-item-1",
      name: "Custom Engraved Item",
      price: 2999, // $29.99 in cents
      image: "/assets/images/gallery/20251005_144719.jpg",
      description: "Personalized engraved product",
    },
    {
      id: "ready-item-2",
      name: "Custom Design",
      price: 3499, // $34.99 in cents
      image: "/assets/images/gallery/20251019_171633.jpg",
      description: "Custom personalized design",
    },
  ];

  const handleAddToCart = (product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  };

  const categories = [
    {
      name: "T-Shirts",
      href: "/custom-orders?type=shirt-printing",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop&q=80",
      alt: "Plain T-Shirt"
    },
    {
      name: "Hoodies",
      href: "/custom-orders?type=shirt-printing",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop&q=80",
      alt: "Plain Hoodie"
    },
    {
      name: "Long Sleeve T-Shirts",
      href: "/custom-orders?type=shirt-printing",
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=800&fit=crop&q=80",
      alt: "Plain Long Sleeve T-Shirt"
    },
    {
      name: "Tote Bag",
      href: "/custom-orders",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop&q=80",
      alt: "Canvas Tote Bag"
    },
    {
      name: "Polo Shirts",
      href: "/custom-orders?type=shirt-printing",
      image: "https://images.unsplash.com/photo-1594938291221-94f18b0f3c12?w=800&h=800&fit=crop&q=80",
      alt: "Plain Polo Shirt"
    },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {/* Modern Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '80px 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          pointerEvents: 'none'
        }}></div>
        <Container style={{ position: 'relative', zIndex: 1 }}>
          <div className="text-center text-white" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
              fontWeight: 700, 
              marginBottom: '24px',
              lineHeight: 1.2,
              letterSpacing: '-0.02em'
            }}>
              Custom Designs That Speak Your Style
            </h1>
            <p style={{ 
              fontSize: '1.25rem', 
              marginBottom: '40px',
              opacity: 0.95,
              lineHeight: 1.6,
              fontWeight: 300
            }}>
              Transform your ideas into reality with professional printing and engraving services. 
              From custom tees to personalized keepsakes, we bring your vision to life.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <Link href="/products">
                <Button 
                  variant="light" 
                  size="lg" 
                  className="px-5 py-3 rounded-pill fw-semibold shadow-lg"
                  style={{ fontSize: '1.1rem' }}
                >
                  Shop Now
                </Button>
              </Link>
              <Link href="/custom-orders">
                <Button 
                  variant="outline-light" 
                  size="lg" 
                  className="px-5 py-3 rounded-pill fw-semibold"
                  style={{ fontSize: '1.1rem', borderWidth: '2px' }}
                >
                  Start Customizing
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Products Section */}
      <section style={{ padding: '80px 0', backgroundColor: '#f8f9fa' }}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ 
              fontSize: 'clamp(2rem, 4vw, 3rem)', 
              fontWeight: 700, 
              marginBottom: '16px',
              color: '#1a1a1a'
            }}>
              Featured Products
            </h2>
            <p style={{ 
              fontSize: '1.1rem', 
              color: '#6c757d',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Ready-to-ship items available now. Add to cart and checkout instantly!
            </p>
          </div>
          
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <ProductCarousel products={featuredProducts} onAddToCart={handleAddToCart} />
          </div>
          
          <div className="text-center mt-5">
            <Link href="/products">
              <Button variant="primary" size="lg" className="px-5 rounded-pill fw-semibold">
                View All Products
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Product Categories Section */}
      <section style={{ padding: '80px 0', backgroundColor: '#ffffff' }}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ 
              fontSize: 'clamp(2rem, 4vw, 3rem)', 
              fontWeight: 700, 
              marginBottom: '16px',
              color: '#1a1a1a'
            }}>
              Start Your Custom Project
            </h2>
            <p style={{ 
              fontSize: '1.1rem', 
              color: '#6c757d',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Choose a product category and bring your design to life
            </p>
          </div>
          <Row className="g-4 justify-content-center">
            {categories.map((category) => (
              <Col key={category.name} xs={6} sm={6} md={4} lg={4} style={{ maxWidth: '300px' }}>
                <Link href={category.href} className="text-decoration-none text-dark">
                  <Card 
                    className="h-100 border-0 shadow-sm"
                    style={{ 
                      transition: 'all 0.3s ease',
                      borderRadius: '16px',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                    }}
                  >
                    <div style={{ 
                      aspectRatio: '1/1', 
                      backgroundColor: '#f8f9fa', 
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      <img 
                        src={category.image}
                        alt={category.alt}
                        className="w-100 h-100"
                        style={{ 
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'scale(1)';
                        }}
                      />
                    </div>
                    <Card.Body className="text-center p-4">
                      <Card.Title className="h5 mb-0 fw-semibold" style={{ color: '#1a1a1a' }}>
                        {category.name}
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section style={{ padding: '80px 0', backgroundColor: '#f8f9fa' }}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ 
              fontSize: 'clamp(2rem, 4vw, 3rem)', 
              fontWeight: 700, 
              marginBottom: '16px',
              color: '#1a1a1a'
            }}>
              Why Choose DBA Alvarado?
            </h2>
          </div>
          
          <Row className="g-4 justify-content-center">
            <Col md={4} className="mb-4">
              <div className="text-center h-100 p-4">
                <div 
                  className="rounded-circle d-inline-flex align-items-center justify-content-center mb-4" 
                  style={{ 
                    width: '80px', 
                    height: '80px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  }}
                >
                  <svg width="40" height="40" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="h4 fw-bold mb-3" style={{ color: '#1a1a1a' }}>Quality Guaranteed</h3>
                <p style={{ color: '#6c757d', fontSize: '1rem', lineHeight: 1.6 }}>
                  Premium materials and state-of-the-art equipment for lasting results
                </p>
              </div>
            </Col>
            
            <Col md={4} className="mb-4">
              <div className="text-center h-100 p-4">
                <div 
                  className="rounded-circle d-inline-flex align-items-center justify-content-center mb-4" 
                  style={{ 
                    width: '80px', 
                    height: '80px',
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                  }}
                >
                  <svg width="40" height="40" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="h4 fw-bold mb-3" style={{ color: '#1a1a1a' }}>Fast Turnaround</h3>
                <p style={{ color: '#6c757d', fontSize: '1rem', lineHeight: 1.6 }}>
                  Quick processing and delivery to meet your deadlines without compromise
                </p>
              </div>
            </Col>
            
            <Col md={4} className="mb-4">
              <div className="text-center h-100 p-4">
                <div 
                  className="rounded-circle d-inline-flex align-items-center justify-content-center mb-4" 
                  style={{ 
                    width: '80px', 
                    height: '80px',
                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
                  }}
                >
                  <svg width="40" height="40" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="h4 fw-bold mb-3" style={{ color: '#1a1a1a' }}>Custom Designs</h3>
                <p style={{ color: '#6c757d', fontSize: '1rem', lineHeight: 1.6 }}>
                  Personalized designs tailored exactly to your vision and needs
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section style={{ 
        padding: '80px 0',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <Container>
          <div className="text-center text-white" style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h2 style={{ 
              fontSize: 'clamp(2rem, 4vw, 3rem)', 
              fontWeight: 700, 
              marginBottom: '24px'
            }}>
              Ready to Get Started?
            </h2>
            <p style={{ 
              fontSize: '1.2rem', 
              marginBottom: '40px',
              opacity: 0.95,
              lineHeight: 1.6
            }}>
              Let's create something amazing together. Browse our products or start your custom order today.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <Link href="/products">
                <Button 
                  variant="light" 
                  size="lg" 
                  className="px-5 py-3 rounded-pill fw-semibold shadow-lg"
                  style={{ fontSize: '1.1rem' }}
                >
                  Browse Products
                </Button>
              </Link>
              <Link href="/contact">
                <Button 
                  variant="outline-light" 
                  size="lg" 
                  className="px-5 py-3 rounded-pill fw-semibold"
                  style={{ fontSize: '1.1rem', borderWidth: '2px' }}
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Modern Footer */}
      <footer style={{ backgroundColor: '#1a1a1a', color: '#ffffff', padding: '60px 0 30px' }}>
        <Container>
          <Row className="g-4 mb-4">
            <Col md={4}>
              <h3 className="h4 fw-bold mb-3" style={{ color: '#ffffff' }}>DBA Alvarado</h3>
              <p style={{ color: '#b0b0b0', lineHeight: 1.6, marginBottom: 0 }}>
                Professional custom printing and engraving services for all your personalization needs.
              </p>
            </Col>
            
            <Col md={2}>
              <h4 className="h6 fw-semibold mb-3" style={{ color: '#ffffff' }}>Services</h4>
              <ul className="list-unstyled" style={{ color: '#b0b0b0' }}>
                <li className="mb-2">Shirt Printing</li>
                <li className="mb-2">Engravings</li>
                <li className="mb-2">Custom Orders</li>
                <li className="mb-2">Bulk Orders</li>
              </ul>
            </Col>
            
            <Col md={3}>
              <h4 className="h6 fw-semibold mb-3" style={{ color: '#ffffff' }}>Quick Links</h4>
              <ul className="list-unstyled" style={{ color: '#b0b0b0' }}>
                <li className="mb-2">
                  <Link href="/about" style={{ color: '#b0b0b0', textDecoration: 'none' }} className="hover-primary">
                    About Us
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/contact" style={{ color: '#b0b0b0', textDecoration: 'none' }}>
                    Contact
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/products" style={{ color: '#b0b0b0', textDecoration: 'none' }}>
                    Products
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/custom-orders" style={{ color: '#b0b0b0', textDecoration: 'none' }}>
                    Custom Orders
                  </Link>
                </li>
              </ul>
            </Col>
            
            <Col md={3}>
              <h4 className="h6 fw-semibold mb-3" style={{ color: '#ffffff' }}>Contact Info</h4>
              <ul className="list-unstyled" style={{ color: '#b0b0b0' }}>
                <li className="mb-2">Phone: (555) 123-4567</li>
                <li className="mb-2">Email: info@dbaalvarado.com</li>
                <li className="mb-2">Address: Your Business Address</li>
              </ul>
            </Col>
          </Row>
          
          <hr style={{ borderColor: '#333', margin: '30px 0' }} />
          <div className="text-center" style={{ color: '#808080' }}>
            <p className="mb-0">&copy; 2024 DBA Alvarado. All rights reserved.</p>
          </div>
        </Container>
      </footer>
    </div>
  );
}