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
      {/* Modern Hero Section with Animated Background */}
      <section style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        padding: '120px 0 100px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, rgba(255,255,255,0.05) 0%, transparent 50%)
          `,
          pointerEvents: 'none'
        }}></div>
        <Container style={{ position: 'relative', zIndex: 1 }}>
          <Row className="align-items-center">
            <Col lg={7} className="mb-5 mb-lg-0">
              <div style={{ color: '#ffffff' }}>
                <div style={{
                  display: 'inline-block',
                  padding: '8px 20px',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '50px',
                  marginBottom: '2rem',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  backdropFilter: 'blur(10px)'
                }}>
                  ✨ Premium Custom Printing & Engraving
                </div>
                <h1 style={{ 
                  fontSize: 'clamp(3rem, 7vw, 5.5rem)', 
                  fontWeight: 900, 
                  marginBottom: '1.5rem',
                  lineHeight: 1.1,
                  letterSpacing: '-0.04em',
                  color: '#ffffff',
                  textShadow: '0 2px 20px rgba(0,0,0,0.2)'
                }}>
                  Create Something<br />Extraordinary
                </h1>
                <p style={{ 
                  fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', 
                  marginBottom: '3rem',
                  color: 'rgba(255,255,255,0.95)',
                  lineHeight: 1.7,
                  fontWeight: 300,
                  maxWidth: '600px'
                }}>
                  Transform your ideas into reality with professional printing and precision engraving. From custom apparel to personalized keepsakes, we bring your vision to life.
                </p>
                <div className="d-flex flex-column flex-sm-row gap-3">
                  <Link href="/custom-orders">
                    <Button 
                      variant="light" 
                      size="lg" 
                      className="px-5 py-3 fw-bold"
                      style={{ 
                        fontSize: '1.1rem',
                        borderRadius: '12px',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                        border: 'none',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 12px 35px rgba(0,0,0,0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)';
                      }}
                    >
                      Start Creating →
                    </Button>
                  </Link>
                  <Link href="/products">
                    <Button 
                      variant="outline-light" 
                      size="lg" 
                      className="px-5 py-3 fw-semibold"
                      style={{ 
                        fontSize: '1.1rem',
                        borderRadius: '12px',
                        borderWidth: '2px',
                        background: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      Browse Products
                    </Button>
                  </Link>
                </div>
              </div>
            </Col>
            <Col lg={5}>
              <div style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 25px 80px rgba(0,0,0,0.3)',
                transform: 'perspective(1000px) rotateY(-5deg) rotateX(5deg)'
              }}>
                <div style={{
                  aspectRatio: '4/5',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)',
                  backdropFilter: 'blur(20px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(255,255,255,0.3)'
                }}>
                  <div className="text-center text-white p-5">
                    <div style={{ fontSize: '5rem', marginBottom: '1rem', opacity: 0.9 }}>🎨</div>
                    <p style={{ fontSize: '1.3rem', fontWeight: 600, opacity: 0.95 }}>
                      Your Design Studio
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Product Categories - Modern Grid */}
      <section style={{ padding: '100px 0', backgroundColor: '#ffffff' }}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
              fontWeight: 800, 
              marginBottom: '1rem',
              color: '#1a1a1a',
              letterSpacing: '-0.02em'
            }}>
              Explore Our Products
            </h2>
            <p style={{ 
              fontSize: '1.2rem', 
              color: '#6c757d',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Choose from our range of customizable products and bring your unique designs to life
            </p>
          </div>
          
          <Row className="g-4">
            {categories.map((category) => (
              <Col key={category.name} xs={6} md={4} lg={4}>
                <Link href={category.href} className="text-decoration-none">
                  <Card 
                    className="h-100 border-0"
                    style={{ 
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                      backgroundColor: '#ffffff'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
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
                          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'scale(1.15)';
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
                        background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.4), transparent)',
                        padding: '24px',
                        color: 'white'
                      }}>
                        <h5 className="mb-0 fw-bold" style={{ fontSize: '1.3rem' }}>
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

      {/* Featured Products Section */}
      <section style={{ padding: '100px 0', background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)' }}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
              fontWeight: 800, 
              marginBottom: '1rem',
              color: '#1a1a1a',
              letterSpacing: '-0.02em'
            }}>
              Featured Products
            </h2>
            <p style={{ 
              fontSize: '1.2rem', 
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
              <Button 
                variant="primary" 
                size="lg" 
                className="px-5 py-3 fw-semibold"
                style={{ 
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                }}
              >
                View All Products
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Services - Modern Cards */}
      <section style={{ padding: '100px 0', backgroundColor: '#ffffff' }}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
              fontWeight: 800, 
              marginBottom: '1rem',
              color: '#1a1a1a',
              letterSpacing: '-0.02em'
            }}>
              Why Choose Us
            </h2>
          </div>
          
          <Row className="g-4">
            <Col md={6} lg={3}>
              <div 
                className="text-center p-5 h-100"
                style={{
                  background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
                  borderRadius: '20px',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(102, 126, 234, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  margin: '0 auto 1.5rem',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem',
                  boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)'
                }}>
                  ✨
                </div>
                <h4 className="fw-bold mb-3" style={{ color: '#1a1a1a', fontSize: '1.3rem' }}>Premium Quality</h4>
                <p style={{ color: '#6c757d', marginBottom: 0, lineHeight: 1.7 }}>
                  Top-tier materials and state-of-the-art equipment for lasting results
                </p>
              </div>
            </Col>
            
            <Col md={6} lg={3}>
              <div 
                className="text-center p-5 h-100"
                style={{
                  background: 'linear-gradient(135deg, #f093fb15 0%, #f5576c15 100%)',
                  borderRadius: '20px',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(245, 87, 108, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(245, 87, 108, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  margin: '0 auto 1.5rem',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem',
                  boxShadow: '0 8px 20px rgba(245, 87, 108, 0.3)'
                }}>
                  ⚡
                </div>
                <h4 className="fw-bold mb-3" style={{ color: '#1a1a1a', fontSize: '1.3rem' }}>Fast Turnaround</h4>
                <p style={{ color: '#6c757d', marginBottom: 0, lineHeight: 1.7 }}>
                  Quick processing to meet your deadlines without compromising quality
                </p>
              </div>
            </Col>
            
            <Col md={6} lg={3}>
              <div 
                className="text-center p-5 h-100"
                style={{
                  background: 'linear-gradient(135deg, #4facfe15 0%, #00f2fe15 100%)',
                  borderRadius: '20px',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(79, 172, 254, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(79, 172, 254, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  margin: '0 auto 1.5rem',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem',
                  boxShadow: '0 8px 20px rgba(79, 172, 254, 0.3)'
                }}>
                  🎨
                </div>
                <h4 className="fw-bold mb-3" style={{ color: '#1a1a1a', fontSize: '1.3rem' }}>Custom Designs</h4>
                <p style={{ color: '#6c757d', marginBottom: 0, lineHeight: 1.7 }}>
                  Personalized designs tailored exactly to your unique vision
                </p>
              </div>
            </Col>
            
            <Col md={6} lg={3}>
              <div 
                className="text-center p-5 h-100"
                style={{
                  background: 'linear-gradient(135deg, #43e97b15 0%, #38f9d715 100%)',
                  borderRadius: '20px',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(67, 233, 123, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(67, 233, 123, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  margin: '0 auto 1.5rem',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem',
                  boxShadow: '0 8px 20px rgba(67, 233, 123, 0.3)'
                }}>
                  💎
                </div>
                <h4 className="fw-bold mb-3" style={{ color: '#1a1a1a', fontSize: '1.3rem' }}>Expert Service</h4>
                <p style={{ color: '#6c757d', marginBottom: 0, lineHeight: 1.7 }}>
                  Professional guidance every step of the way
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Modern CTA Section */}
      <section style={{ 
        padding: '120px 0',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}></div>
        <Container style={{ position: 'relative', zIndex: 1 }}>
          <div className="text-center text-white" style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h2 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
              fontWeight: 800, 
              marginBottom: '1.5rem',
              color: '#ffffff',
              letterSpacing: '-0.02em'
            }}>
              Ready to Create Something Amazing?
            </h2>
            <p style={{ 
              fontSize: '1.3rem', 
              marginBottom: '3rem',
              color: 'rgba(255,255,255,0.95)',
              lineHeight: 1.7,
              fontWeight: 300
            }}>
              Let's bring your ideas to life. Start your custom order today and experience premium quality personalized products.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <Link href="/custom-orders">
                <Button 
                  variant="light" 
                  size="lg" 
                  className="px-5 py-3 fw-bold"
                  style={{ 
                    fontSize: '1.1rem',
                    borderRadius: '12px',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
                    border: 'none'
                  }}
                >
                  Start Your Project →
                </Button>
              </Link>
              <Link href="/contact">
                <Button 
                  variant="outline-light" 
                  size="lg" 
                  className="px-5 py-3 fw-semibold"
                  style={{ 
                    fontSize: '1.1rem',
                    borderRadius: '12px',
                    borderWidth: '2px',
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}