'use client';

import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add email sending functionality
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 5000);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }} className="py-5">
      <Container>
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
            Contact Us
          </h1>
          <p 
            className="lead"
            style={{
              fontSize: '1.25rem',
              color: '#64748b',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: 1.7
            }}
          >
            Have questions about custom shirt printing? We&apos;re here to help!
          </p>
        </div>

        <Row className="g-4">
          <Col lg={8}>
            <Card className="border-0" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderRadius: '24px' }}>
              <Card.Body className="p-5">
                {submitted && (
                  <Alert variant="success" className="mb-4">
                    Thank you for your message! We&apos;ll get back to you soon.
                  </Alert>
                )}
                
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Name *</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Your name"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email *</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="your@email.com"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 123-4567"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Subject *</Form.Label>
                    <Form.Select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="quote">Request a Quote</option>
                      <option value="question">General Question</option>
                      <option value="order-status">Order Status</option>
                      <option value="custom-design">Custom Design Help</option>
                      <option value="other">Other</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Message *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={6}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us about your custom shirt printing needs..."
                    />
                  </Form.Group>

                  <Button 
                    variant="primary" 
                    size="lg" 
                    type="submit" 
                    className="w-100 fw-bold"
                    style={{
                      borderRadius: '14px',
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                      border: 'none',
                      boxShadow: '0 8px 25px rgba(99, 102, 241, 0.35)',
                      fontSize: '1.125rem',
                      fontWeight: 700,
                      padding: '0.875rem'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 12px 35px rgba(99, 102, 241, 0.45)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 8px 25px rgba(99, 102, 241, 0.35)';
                    }}
                  >
                    Send Message
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="border-0 h-100" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderRadius: '24px' }}>
              <Card.Body className="p-5">
                <h3 className="h5 fw-bold mb-4">Get in Touch</h3>
                
                <div className="mb-4">
                  <h5 className="small fw-semibold text-muted mb-2">Email</h5>
                  <p className="mb-0">
                    <a href="mailto:DBA.alvarado@gmail.com" className="text-decoration-none">
                      DBA.alvarado@gmail.com
                    </a>
                  </p>
                </div>

                <div className="mb-4">
                  <h5 className="small fw-semibold text-muted mb-2">Business Hours</h5>
                  <p className="mb-0">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="mb-0">Saturday: 10:00 AM - 4:00 PM</p>
                  <p className="mb-0">Sunday: Closed</p>
                </div>

                <div>
                  <h5 className="small fw-semibold text-muted mb-2">Response Time</h5>
                  <p className="mb-0">We typically respond within 24-48 hours during business days.</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
