'use client';

import { Container, Row, Col, Card } from 'react-bootstrap';
import Link from 'next/link';
import { Button } from 'react-bootstrap';

export default function About() {
  const features = [
    {
      icon: '🎨',
      title: 'Custom Designs',
      description: 'Bring your unique vision to life with our professional design services'
    },
    {
      icon: '✨',
      title: 'Quality Materials',
      description: 'We use only the finest fabrics and printing techniques for lasting results'
    },
    {
      icon: '⚡',
      title: 'Fast Turnaround',
      description: 'Quick processing times without compromising on quality'
    },
    {
      icon: '💎',
      title: 'Expert Service',
      description: 'Years of experience in custom apparel printing and design'
    }
  ];

	return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }} className="py-5">
			<Container>
        {/* Hero Section */}
        <div className="text-center mb-5" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
          <h1 
            className="fw-bold mb-3"
            style={{
              fontSize: 'clamp(3rem, 7vw, 4.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '1.5rem'
            }}
          >
            About DBA Customization
          </h1>
          <p 
            className="lead"
            style={{ 
              maxWidth: '700px', 
              margin: '0 auto',
              fontSize: '1.25rem',
              color: '#64748b',
              lineHeight: 1.7
            }}
          >
            Your trusted partner for high-quality custom shirt printing and personalized apparel
          </p>
        </div>

        {/* Main Content */}
        <Row className="mb-5" style={{ marginBottom: '5rem' }}>
          <Col lg={8} className="mx-auto">
            <Card className="border-0 mb-4" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderRadius: '24px' }}>
              <Card.Body className="p-5">
                <h2 className="h3 fw-bold mb-4">Our Story</h2>
                <p className="mb-4" style={{ lineHeight: 1.8 }}>
                  At DBA Customization, we specialize in DTF (Direct to Film) printing to bring your 
                  custom shirt designs to life. Using state-of-the-art DTF technology, we deliver 
                  vibrant, durable prints with exceptional detail and color accuracy.
                </p>
                <p className="mb-0" style={{ lineHeight: 1.8 }}>
                  We&apos;re passionate about helping individuals, businesses, and organizations create 
                  unique apparel that represents their brand, event, or personal style. Every order is 
                  handled with care and attention to detail, ensuring you receive products you&apos;ll love.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Features */}
        <Row className="g-4 mb-5">
          {features.map((feature, index) => (
            <Col key={index} md={6} lg={3}>
              <Card 
                className="h-100 border-0 text-center"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)',
                  borderRadius: '24px',
                  padding: '2.5rem 1.5rem',
                  border: '1px solid rgba(99, 102, 241, 0.15)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(139, 92, 246, 0.12) 100%)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                  {feature.icon}
                </div>
                <h4 className="h5 fw-bold mb-3">{feature.title}</h4>
                <p className="text-muted small mb-0">{feature.description}</p>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Services */}
        <Row className="mb-5" style={{ marginBottom: '5rem' }}>
          <Col lg={10} className="mx-auto">
            <Card className="border-0" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderRadius: '24px' }}>
              <Card.Body className="p-5">
                <h2 className="h3 fw-bold mb-4 text-center">DTF Printing Service</h2>
                <Row className="g-4">
                  <Col md={12}>
                    <div className="text-center mb-4">
                      <h5 className="fw-semibold mb-3">DTF (Direct to Film) Printing</h5>
                      <p className="text-muted mb-4" style={{ lineHeight: 1.8 }}>
                        Our DTF printing process delivers exceptional results for all your custom apparel needs. 
                        This advanced technology ensures vibrant colors, sharp details, and long-lasting durability 
                        on a wide variety of fabrics including cotton, polyester, and blends.
                      </p>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="text-center">
                      <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎨</div>
                      <h6 className="fw-semibold mb-2">Vibrant Colors</h6>
                      <p className="text-muted small mb-0">
                        Rich, vivid colors that stand out
                      </p>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="text-center">
                      <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✨</div>
                      <h6 className="fw-semibold mb-2">Sharp Details</h6>
                      <p className="text-muted small mb-0">
                        Crisp, clear details in every design
                      </p>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="text-center">
                      <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>💪</div>
                      <h6 className="fw-semibold mb-2">Durable & Flexible</h6>
                      <p className="text-muted small mb-0">
                        Long-lasting prints that move with you
                      </p>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* CTA */}
        <div className="text-center" style={{ marginTop: '4rem' }}>
          <h3 
            className="fw-bold mb-3"
            style={{
              fontSize: '2rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: '#0f172a'
            }}
          >
            Ready to Start Your Custom Order?
          </h3>
          <p style={{ fontSize: '1.125rem', color: '#64748b', marginBottom: '2rem' }}>
            Let&apos;s bring your design ideas to life
          </p>
          <Link href="/shirt-prints">
            <Button 
              variant="primary" 
              size="lg" 
              className="px-6 py-3 fw-bold"
              style={{
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                border: 'none',
                boxShadow: '0 8px 25px rgba(99, 102, 241, 0.35)',
                fontSize: '1.125rem',
                fontWeight: 700
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 12px 35px rgba(99, 102, 241, 0.45)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 25px rgba(99, 102, 241, 0.35)';
              }}
            >
              View Our Services
            </Button>
						</Link>
				</div>
			</Container>
		</div>
	);
}
