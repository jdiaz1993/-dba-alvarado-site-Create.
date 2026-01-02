'use client';

import Link from 'next/link';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useCart } from '@/context/CartContext';
import ProductCarousel from '@/components/ProductCarousel';

export default function Home() {
  const { addItem } = useCart();

  // Featured shirt products
  const featuredProducts = [
    {
      id: "shirt-1",
      name: "Custom T-Shirt",
      price: 2000, // $20.00 in cents
      image: "/assets/images/products/plain-tshirt.png",
      description: "High-quality cotton t-shirt with custom printing",
    },
    {
      id: "shirt-2",
      name: "Custom Hoodie",
      price: 4500, // $45.00 in cents
      image: "/assets/images/products/plain-hoodie.jpg",
      description: "Warm and comfortable hoodie with your design",
    },
    {
      id: "shirt-3",
      name: "Custom Polo Shirt",
      price: 3500, // $35.00 in cents
      image: "/assets/images/products/polo-shirt.png",
      description: "Professional polo shirt with custom DTF printing",
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
      href: "/shirt-prints",
      image: "/assets/Stockphotodba/IMG_3186.WEBP",
      alt: "Plain T-Shirt"
    },
    {
      name: "Long Sleeve",
      href: "/shirt-prints",
      image: "/assets/Stockphotodba/IMG_3187.WEBP",
      alt: "Long Sleeve"
    },
    {
      name: "Crew Neck",
      href: "/shirt-prints",
      image: "/assets/Stockphotodba/IMG_3188.JPG",
      alt: "Crew Neck"
    },
    {
      name: "Polo Shirts",
      href: "/shirt-prints",
      image: "/assets/Stockphotodba/IMG_3189.WEBP",
      alt: "Plain Polo Shirt"
    },
    {
      name: "Hoodie",
      href: "/shirt-prints",
      image: "/assets/Stockphotodba/IMG_3192.WEBP",
      alt: "Hoodie"
    },
    {
      name: "Tote Bag",
      href: "/shirt-prints",
      image: "/assets/Stockphotodba/IMG_3190.JPG",
      alt: "Tote Bag"
    },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {/* Clean Hero Section - CustomInk Style */}
      <section style={{ 
        background: '#ffffff',
        padding: '100px 0 80px',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={10} xl={8}>
              <div style={{ textAlign: 'center' }}>
                <h1 style={{ 
                  fontSize: 'clamp(2.5rem, 6vw, 4rem)', 
                  fontWeight: 700, 
                  marginBottom: '1rem',
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                  color: '#0f172a'
                }}>
                  Custom T-Shirts & Apparel<br />for Your Group
                </h1>
                <p style={{ 
                  fontSize: '1.25rem', 
                  marginBottom: '2.5rem',
                  color: '#64748b',
                  lineHeight: 1.6,
                  fontWeight: 400,
                  maxWidth: '600px',
                  margin: '0 auto 2.5rem'
                }}>
                  High-quality DTF printing on t-shirts, hoodies, and more. Create custom designs that stand out.
                </p>
                <Link href="/shirt-prints">
                    <Button 
                    variant="primary" 
                      size="lg" 
                      className="px-5 py-3 fw-bold"
                      style={{ 
                      fontSize: '1.125rem',
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        border: 'none',
                      boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                      fontWeight: 600,
                      padding: '0.875rem 2rem'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 6px 16px rgba(99, 102, 241, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.3)';
                      }}
                    >
                    Get Started
                    </Button>
                  </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Trust Signals - CustomInk Style */}
      <section style={{ 
        background: '#f8fafc',
        padding: '40px 0',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <Container>
          <Row className="g-4 text-center">
            <Col md={4}>
              <div>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 600, color: '#0f172a' }}>
                  Free Shipping
                </div>
                <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                  On all orders
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 600, color: '#0f172a' }}>
                  Fast Turnaround
                </div>
                <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                  Quick processing times
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 600, color: '#0f172a' }}>
                  100% Satisfaction
                  </div>
                <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                  Quality guaranteed
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Product Categories - CustomInk Style Grid */}
      <section style={{ padding: '80px 0', backgroundColor: '#ffffff' }}>
        <Container>
          <div className="text-center mb-5" style={{ marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: 'clamp(2rem, 5vw, 2.5rem)', 
              fontWeight: 700, 
              marginBottom: '0.75rem',
              color: '#0f172a',
              letterSpacing: '-0.02em'
            }}>
              Custom T-Shirts & Apparel
            </h2>
            <p style={{ 
              fontSize: '1rem', 
              color: '#64748b',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Choose from our range of high-quality apparel for your custom design
            </p>
          </div>
          
          <Row className="g-4">
            {categories.map((category) => (
              <Col key={category.name} xs={6} md={4} lg={4}>
                <Link href={category.href} className="text-decoration-none">
                  <Card 
                    className="h-100 border-0"
                    style={{ 
                      transition: 'all 0.3s ease',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      backgroundColor: '#eff6ff',
                      border: '1px solid #bfdbfe',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 8px 16px rgba(59, 130, 246, 0.2)';
                      e.currentTarget.style.borderColor = '#93c5fd';
                      e.currentTarget.style.backgroundColor = '#dbeafe';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                      e.currentTarget.style.borderColor = '#bfdbfe';
                      e.currentTarget.style.backgroundColor = '#eff6ff';
                    }}
                  >
                    <div style={{ 
                      aspectRatio: '1/1', 
                      backgroundColor: '#f1f5f9', 
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      <img 
                        src={category.image}
                        alt={category.alt}
                        className="w-100 h-100"
                        style={{ 
                          objectFit: 'contain',
                          objectPosition: 'center',
                          transition: 'transform 0.4s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'scale(1)';
                        }}
                      />
                    </div>
                    <Card.Body className="p-3" style={{ textAlign: 'center' }}>
                      <h5 className="mb-0 fw-semibold" style={{ fontSize: '1rem', color: '#0f172a' }}>
                        {category.name}
                      </h5>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Value Propositions - CustomInk Style */}
      <section style={{ padding: '80px 0', background: '#f8fafc' }}>
        <Container>
          <div className="text-center mb-5" style={{ marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: 'clamp(2rem, 5vw, 2.5rem)', 
              fontWeight: 700, 
              marginBottom: '0.75rem',
              color: '#0f172a',
              letterSpacing: '-0.02em'
            }}>
              All-in Pricing
            </h2>
            <p style={{ 
              fontSize: '1rem', 
              color: '#64748b',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Your price includes everything you need
            </p>
          </div>
          
          <Row className="g-4">
            <Col md={6} lg={3}>
              <div className="text-center p-4">
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✓</div>
                <h5 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#0f172a' }}>
                  No Setup Fees
                </h5>
                <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
                  Transparent pricing with no hidden costs
                </p>
              </div>
            </Col>
            <Col md={6} lg={3}>
              <div className="text-center p-4">
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✓</div>
                <h5 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#0f172a' }}>
                  Free Design Review
                </h5>
                <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
                  Expert feedback on your designs
                </p>
              </div>
            </Col>
            <Col md={6} lg={3}>
              <div className="text-center p-4">
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✓</div>
                <h5 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#0f172a' }}>
                  Free Standard Shipping
                </h5>
                <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
                  Fast delivery included in price
                </p>
              </div>
            </Col>
            <Col md={6} lg={3}>
              <div className="text-center p-4">
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✓</div>
                <h5 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#0f172a' }}>
                  Satisfaction Guarantee
                </h5>
                <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
                  100% quality guarantee
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section - CustomInk Style */}
      <section style={{ padding: '80px 0', backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0' }}>
        <Container>
          <div className="text-center">
            <h2 style={{ 
              fontSize: 'clamp(2rem, 5vw, 2.5rem)', 
              fontWeight: 700, 
              marginBottom: '1rem',
              color: '#0f172a',
              letterSpacing: '-0.02em'
            }}>
              Ready to Get Started?
            </h2>
            <p style={{ 
              fontSize: '1.125rem', 
              color: '#64748b',
              maxWidth: '600px',
              margin: '0 auto 2rem'
            }}>
              Create your custom design today and see it come to life
            </p>
            <Link href="/shirt-prints">
                <Button 
                variant="primary" 
                  size="lg" 
                  className="px-5 py-3 fw-bold"
                  style={{ 
                  fontSize: '1.125rem',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                  fontWeight: 600,
                  padding: '0.875rem 2rem'
                  }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 16px rgba(99, 102, 241, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.3)';
                  }}
                >
                Start Designing
                </Button>
              </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}