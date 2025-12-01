'use client';

import { useState } from 'react';
import { Carousel, Card, Button, Badge, ButtonGroup } from 'react-bootstrap';

export default function ProductCarousel({ products, onAddToCart }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const formatUSD = (cents) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-5 bg-light rounded">
        <p className="text-muted">No products available</p>
      </div>
    );
  }

  return (
    <Carousel 
      activeIndex={currentIndex} 
      onSelect={setCurrentIndex}
      indicators={products.length <= 5}
      controls={products.length > 1}
      className="mb-4"
    >
      {products.map((product, index) => (
        <Carousel.Item key={product.id}>
          <Card className="shadow">
            <div className="position-relative" style={{ height: '400px', backgroundColor: '#f8f9fa' }}>
              <img
                src={product.image}
                alt={product.name}
                className="w-100 h-100"
                style={{ objectFit: 'contain', padding: '20px' }}
              />
              {products.length > 1 && (
                <Badge bg="primary" className="position-absolute top-0 end-0 m-3">
                  {index + 1} / {products.length}
                </Badge>
              )}
            </div>
            <Card.Body>
              <Card.Title className="h3">{product.name}</Card.Title>
              <Card.Text className="text-muted mb-3">{product.description}</Card.Text>
              <div className="d-flex justify-content-between align-items-center">
                <div className="h4 text-primary mb-0">
                  {formatUSD(product.price)}
                </div>
                {onAddToCart && (
                  <Button variant="primary" size="lg" onClick={() => onAddToCart(product)}>
                    Add to Cart
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
