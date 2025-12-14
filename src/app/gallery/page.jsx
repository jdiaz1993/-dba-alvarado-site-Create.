'use client';

import { useState } from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Gallery images - using the actual images from the gallery folder
  const galleryImages = [
    {
      id: 1,
      src: '/assets/images/gallery/20251005_144719.jpg',
      title: 'Custom Design 1',
      description: 'High-quality DTF printing on premium fabric'
    },
    {
      id: 2,
      src: '/assets/images/gallery/20251019_171633.jpg',
      title: 'Custom Design 2',
      description: 'Vibrant colors and sharp details'
    },
    {
      id: 3,
      src: '/assets/images/gallery/20251019_171825.jpg',
      title: 'Custom Design 3',
      description: 'Professional finish on custom apparel'
    },
    {
      id: 4,
      src: '/assets/images/gallery/20251019_171927.jpg',
      title: 'Custom Design 4',
      description: 'Durable prints that last'
    },
    {
      id: 5,
      src: '/assets/images/gallery/20251019_183918.jpg',
      title: 'Custom Design 5',
      description: 'Perfect for any occasion'
    },
    {
      id: 6,
      src: '/assets/images/gallery/20251019_204620.jpg',
      title: 'Custom Design 6',
      description: 'Custom designs that stand out'
    },
    // Customer Orders
    {
      id: 7,
      src: '/assets/images/gallery/customer_orders/20251116_173156 (1).jpg',
      title: 'Customer Order - November 2024',
      description: 'Custom DTF printing with vibrant colors'
    },
    {
      id: 8,
      src: '/assets/images/gallery/customer_orders/20251212_060630 (1).jpg',
      title: 'Customer Order - December 2024',
      description: 'Professional quality custom design'
    },
    {
      id: 9,
      src: '/assets/images/gallery/customer_orders/20251213_113145 (1).jpg',
      title: 'Customer Order - December 2024',
      description: 'Sharp details and excellent print quality'
    },
    {
      id: 10,
      src: '/assets/images/gallery/customer_orders/20251213_144757.jpg',
      title: 'Customer Order - December 2024',
      description: 'High-quality DTF printing'
    },
    {
      id: 11,
      src: '/assets/images/gallery/customer_orders/20251213_145300.jpg',
      title: 'Customer Order - December 2024',
      description: 'Custom design with professional finish'
    },
    {
      id: 12,
      src: '/assets/images/gallery/customer_orders/20251213_214250.jpg',
      title: 'Customer Order - December 2024',
      description: 'Vibrant and durable prints'
    },
    {
      id: 13,
      src: '/assets/images/gallery/customer_orders/IMG_20251213_120933_321.webp',
      title: 'Customer Order - December 2024',
      description: 'Custom apparel with excellent detail'
    },
    {
      id: 14,
      src: '/assets/images/gallery/customer_orders/Resized_20251116_173156_79851504650475.jpeg',
      title: 'Customer Order - November 2024',
      description: 'Professional custom printing'
    },
    {
      id: 15,
      src: '/assets/images/gallery/customer_orders/Resized_Photoroom-20251213_124128_140589014473188.png',
      title: 'Customer Order - December 2024',
      description: 'Custom design showcase'
    },
  ];

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  const handleNext = () => {
    const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % galleryImages.length;
    setSelectedImage(galleryImages[nextIndex]);
  };

  const handlePrevious = () => {
    const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    setSelectedImage(galleryImages[prevIndex]);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }} className="py-5">
      <Container>
        {/* Header */}
        <div className="text-center mb-5" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
          <h1 
            className="fw-bold mb-3"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '1rem'
            }}
          >
            Our Gallery
          </h1>
          <p 
            style={{
              fontSize: '1.125rem',
              color: '#64748b',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.6
            }}
          >
            Browse through our completed custom designs and see the quality of our DTF printing
          </p>
        </div>

        {/* Gallery Grid */}
        <Row className="g-4">
          {galleryImages.map((image) => (
            <Col key={image.id} xs={12} sm={6} md={4} lg={4}>
              <div
                style={{
                  position: 'relative',
                  aspectRatio: '1/1',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                  backgroundColor: '#f1f5f9'
                }}
                onClick={() => handleImageClick(image)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(99, 102, 241, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }}
              >
                <img
                  src={image.src}
                  alt={image.title}
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
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.4), transparent)',
                    padding: '1.5rem',
                    color: 'white'
                  }}
                >
                  <h5 className="mb-1 fw-semibold" style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>
                    {image.title}
                  </h5>
                  <p className="mb-0" style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                    {image.description}
                  </p>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        {/* Call to Action */}
        <div className="text-center mt-5" style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid #e2e8f0' }}>
          <h3 
            className="fw-bold mb-3"
            style={{
              fontSize: '1.75rem',
              fontWeight: 700,
              color: '#0f172a',
              marginBottom: '1rem'
            }}
          >
            Ready to Create Your Own?
          </h3>
          <p style={{ fontSize: '1rem', color: '#64748b', marginBottom: '2rem' }}>
            Start your custom design today and join our gallery
          </p>
          <a
            href="/shirt-prints"
            className="btn btn-primary px-5 py-3 fw-bold"
            style={{
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              border: 'none',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
              fontSize: '1.125rem',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'all 0.3s ease'
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
          </a>
        </div>
      </Container>

      {/* Image Modal */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        size="lg"
        centered
        style={{ zIndex: 9999 }}
      >
        <Modal.Header closeButton style={{ border: 'none', paddingBottom: '0.5rem' }}>
          <Modal.Title style={{ fontWeight: 600 }}>
            {selectedImage?.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: '0', position: 'relative' }}>
          {selectedImage && (
            <>
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-100"
                style={{
                  display: 'block',
                  maxHeight: '70vh',
                  objectFit: 'contain',
                  backgroundColor: '#f8fafc'
                }}
              />
              <div style={{ padding: '1.5rem' }}>
                <p style={{ color: '#64748b', marginBottom: 0 }}>
                  {selectedImage.description}
                </p>
              </div>
              
              {/* Navigation Arrows */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrevious}
                    style={{
                      position: 'absolute',
                      left: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(255, 255, 255, 0.9)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '48px',
                      height: '48px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      fontSize: '1.5rem',
                      color: '#6366f1',
                      fontWeight: 'bold',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'white';
                      e.target.style.transform = 'translateY(-50%) scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                      e.target.style.transform = 'translateY(-50%) scale(1)';
                    }}
                  >
                    ‹
                  </button>
                  <button
                    onClick={handleNext}
                    style={{
                      position: 'absolute',
                      right: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(255, 255, 255, 0.9)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '48px',
                      height: '48px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      fontSize: '1.5rem',
                      color: '#6366f1',
                      fontWeight: 'bold',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'white';
                      e.target.style.transform = 'translateY(-50%) scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                      e.target.style.transform = 'translateY(-50%) scale(1)';
                    }}
                  >
                    ›
                  </button>
                </>
              )}
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

