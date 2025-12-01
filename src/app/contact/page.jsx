'use client';

import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Create mailto link with form data
    const mailtoLink = `mailto:DBA.alvarado@gmail.com?subject=${encodeURIComponent(
      `Contact Form: ${formData.subject || 'General Inquiry'}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.firstName} ${formData.lastName}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone || 'Not provided'}\n` +
      `Subject: ${formData.subject}\n\n` +
      `Message:\n${formData.message}`
    )}`;

    // Open email client
    window.location.href = mailtoLink;

    // Reset form after a delay
    setTimeout(() => {
      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }} className="py-5">
      <Container>
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold mb-3">Contact Us</h1>
          <p className="lead text-muted">
            Get in touch with us for quotes, questions, or to discuss your custom project
          </p>
        </div>

        <Row className="g-4">
          {/* Contact Form */}
          <Col lg={6}>
            <Card className="shadow">
              <Card.Body className="p-4">
                <Card.Title className="h3 mb-4">Send us a Message</Card.Title>
                
                {submitStatus === 'success' && (
                  <Alert variant="success" className="mb-4">
                    ✅ Your email client should open. Message ready to send!
                  </Alert>
                )}
                
                <Form onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>First Name *</Form.Label>
                        <Form.Control
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Last Name *</Form.Label>
                        <Form.Control
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Email *</Form.Label>
                    <Form.Control
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Subject *</Form.Label>
                    <Form.Select
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    >
                      <option value="">Select a subject</option>
                      <option value="quote">Request Quote</option>
                      <option value="custom-order">Custom Order Inquiry</option>
                      <option value="question">General Question</option>
                      <option value="support">Customer Support</option>
                      <option value="other">Other</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Message *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Tell us about your project or question..."
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-100"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Opening Email Client...' : 'Send Message'}
                  </Button>
                  
                  <p className="text-muted small text-center mt-2">
                    This will open your email client with the message pre-filled
                  </p>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Contact Information */}
          <Col lg={6}>
            <Card className="shadow mb-4">
              <Card.Body className="p-4">
                <Card.Title className="h3 mb-4">Get in Touch</Card.Title>
                
                <div className="mb-4 d-flex">
                  <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '48px', height: '48px', flexShrink: 0 }}>
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="h5 fw-bold">Phone</h3>
                    <p className="text-muted mb-1">(555) 555-5555</p>
                    <p className="text-muted mb-0">Mon-Sat: 10AM-5PM</p>
                  </div>
                </div>

                <div className="mb-4 d-flex">
                  <div className="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '48px', height: '48px', flexShrink: 0 }}>
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-success">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="h5 fw-bold">Email</h3>
                    <p className="text-muted mb-0">DBA.alvarado@gmail.com</p>
                  </div>
                </div>

                <div className="d-flex">
                  <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '48px', height: '48px', flexShrink: 0 }}>
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="h5 fw-bold">Shipping From</h3>
                    <p className="text-muted mb-0">Los Angeles, CA</p>
                  </div>
                </div>
              </Card.Body>
            </Card>

            <Card className="shadow">
              <Card.Body className="p-4">
                <Card.Title className="h3 mb-4">Production Hours</Card.Title>
                <div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Monday - Friday</span>
                    <span className="fw-bold">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Saturday</span>
                    <span className="fw-bold">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Sunday</span>
                    <span className="fw-bold">Closed</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
