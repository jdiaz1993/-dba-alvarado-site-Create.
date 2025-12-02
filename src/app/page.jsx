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
      {/* Full-Width Hero with Split Design */}
      <section style={{ 
        backgroundColor: '#1a1a1a',
        color: '#ffffff',
        padding: '100px 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <div style={{ paddingRight: '2rem' }}>
                <h1 style={{ 
                  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
                  fontWeight: 800, 
                  marginBottom: '1.5rem',
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                  color: '#ffffff'
                }}>
                  Bring Your Vision to Life
                </h1>
                <p style={{ 
                  fontSize: '1.3rem', 
                  marginBottom: '2.5rem',
                  color: '#e0e0e0',
                  lineHeight: 1.7,
                  fontWeight: 300
                }}>
                  Premium custom printing and engraving services. From personalized apparel to unique keepsakes, we craft quality products that tell your story.
                </p>
                <div className="d-flex flex-column flex-sm-row gap-3">
                  <Link href="/custom-orders">
                    <Button 
                      variant="primary" 
                      size="lg" 
                      className="px-5 py-3 fw-bold"
                      style={{ 
                        fontSize: '1.1rem',
                        borderRadius: '8px',
                        background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
                        border: 'none',
                        boxShadow: '0 4px 15px rgba(255, 107, 107, 0.4)'
                      }}
                    >
                      Start Customizing →
                    </Button>
                  </Link>
                  <Link href="/products">
                    <Button 
                      variant="outline-light" 
                      size="lg" 
                      className="px-5 py-3 fw-semibold"
                      style={{ 
                        fontSize: '1.1rem',
                        borderRadius: '8px',
                        borderWidth: '2px'
                      }}
                    >
                      Shop Ready Items
                    </Button>
                  </Link>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div style={{
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
              }}>
                <div style={{
                  aspectRatio: '4/3',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div className="text-center text-white p-5">
                    <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎨</h2>
                    <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
                      Custom Design Studio
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Product Categories - Horizontal Scroll Style */}
      <section style={{ padding: '80px 0', backgroundColor: '#ffffff' }}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ 
              fontSize: 'clamp(2rem, 4vw, 3rem)', 
              fontWeight: 700, 
              marginBottom: '1rem',
              color: '#1a1a1a'
            }}>
              Choose Your Product
            </h2>
            <p style={{ 
              fontSize: '1.1rem', 
              color: '#6c757d',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Select from our range of customizable products
            </p>
          </div>
          
          <Row className="g-4">
            {categories.map((category, index) => (
              <Col key={category.name} xs={6} md={4} lg={4}>
                <Link href={category.href} className="text-decoration-none text-dark">
                  <Card 
                    className="h-100 border-0"
                    style={{ 
                      transition: 'all 0.3s ease',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)';
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
                          transition: 'transform 0.4s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'scale(1)';
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                        padding: '20px',
                        color: 'white'
                      }}>
                        <h5 className="mb-0 fw-bold" style={{ fontSize: '1.1rem' }}>
                          {category.name}
                        </h5>
                      </div>
                    </div>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Featured Products - Dark Background */}
      <section style={{ padding: '80px 0', backgroundColor: '#f8f9fa' }}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ 
              fontSize: 'clamp(2rem, 4vw, 3rem)', 
              fontWeight: 700, 
              marginBottom: '1rem',
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
              Ready-to-ship items available now
            </p>
          </div>
          
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <ProductCarousel products={featuredProducts} onAddToCart={handleAddToCart} />
          </div>
          
          <div className="text-center mt-5">
            <Link href="/products">
              <Button 
                variant="primary" 
                size="lg" 
                className="px-5 py-3 fw-semibold"
                style={{ borderRadius: '8px' }}
              >
                View All Products
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <section style={{ padding: '80px 0', backgroundColor: '#ffffff' }}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ 
              fontSize: 'clamp(2rem, 4vw, 3rem)', 
              fontWeight: 700, 
              marginBottom: '1rem',
              color: '#1a1a1a'
            }}>
              What We Offer
            </h2>
          </div>
          
          <Row className="g-4">
            <Col md={6} lg={3}>
              <div className="text-center p-4 h-100" style={{
                backgroundColor: '#f8f9fa',
                borderRadius: '12px',
                transition: 'all 0.3s ease'
              }}>
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem'
                }}>👕</div>
                <h4 className="fw-bold mb-3" style={{ color: '#1a1a1a' }}>Shirt Printing</h4>
                <p style={{ color: '#6c757d', marginBottom: 0 }}>
                  Screen print, DTF, vinyl, and embroidery
                </p>
              </div>
            </Col>
            
            <Col md={6} lg={3}>
              <div className="text-center p-4 h-100" style={{
                backgroundColor: '#f8f9fa',
                borderRadius: '12px',
                transition: 'all 0.3s ease'
              }}>
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem'
                }}>🔨</div>
                <h4 className="fw-bold mb-3" style={{ color: '#1a1a1a' }}>Engravings</h4>
                <p style={{ color: '#6c757d', marginBottom: 0 }}>
                  Laser engraving on wood, metal, and more
                </p>
              </div>
            </Col>
            
            <Col md={6} lg={3}>
              <div className="text-center p-4 h-100" style={{
                backgroundColor: '#f8f9fa',
                borderRadius: '12px',
                transition: 'all 0.3s ease'
              }}>
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem'
                }}>🎨</div>
                <h4 className="fw-bold mb-3" style={{ color: '#1a1a1a' }}>Custom Designs</h4>
                <p style={{ color: '#6c757d', marginBottom: 0 }}>
                  Personalized designs tailored to you
                </p>
              </div>
            </Col>
            
            <Col md={6} lg={3}>
              <div className="text-center p-4 h-100" style={{
                backgroundColor: '#f8f9fa',
                borderRadius: '12px',
                transition: 'all 0.3s ease'
              }}>
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem'
                }}>⚡</div>
                <h4 className="fw-bold mb-3" style={{ color: '#1a1a1a' }}>Fast Service</h4>
                <p style={{ color: '#6c757d', marginBottom: 0 }}>
                  Quick turnaround on all orders
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section - Minimalist */}
      <section style={{ 
        padding: '100px 0',
        backgroundColor: '#1a1a1a',
        color: '#ffffff'
      }}>
        <Container>
          <div className="text-center" style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h2 style={{ 
              fontSize: 'clamp(2rem, 4vw, 3rem)', 
              fontWeight: 700, 
              marginBottom: '1.5rem',
              color: '#ffffff'
            }}>
              Ready to Get Started?
            </h2>
            <p style={{ 
              fontSize: '1.2rem', 
              marginBottom: '2.5rem',
              color: '#e0e0e0',
              lineHeight: 1.7
            }}>
              Let's create something amazing together. Start your custom order today.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <Link href="/custom-orders">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="px-5 py-3 fw-bold"
                  style={{ 
                    fontSize: '1.1rem',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
                    border: 'none'
                  }}
                >
                  Start Your Order
                </Button>
              </Link>
              <Link href="/contact">
                <Button 
                  variant="outline-light" 
                  size="lg" 
                  className="px-5 py-3 fw-semibold"
                  style={{ 
                    fontSize: '1.1rem',
                    borderRadius: '8px',
                    borderWidth: '2px'
                  }}
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}