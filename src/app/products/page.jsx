"use client";

import Link from "next/link";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useCart } from "@/context/CartContext";
import ProductCarousel from "@/components/ProductCarousel";

export default function Products() {
  const { addItem } = useCart();

  // Ready-to-sell products - Using your actual gallery images
  const readyProducts = [
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
    {
      id: "ready-item-3",
      name: "Engraved Special",
      price: 2799, // $27.99 in cents
      image: "/assets/images/gallery/20251019_171825.jpg",
      description: "Unique engraved creation",
    },
    {
      id: "ready-item-4",
      name: "Premium Engraving",
      price: 3999, // $39.99 in cents
      image: "/assets/images/gallery/20251019_171927.jpg",
      description: "High-quality premium engraving",
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

  const customProducts = [
    {
      name: "Custom T-Shirts",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop",
      alt: "Custom T-Shirts",
      description: "High-quality cotton t-shirts with your custom design",
      price: "Starting at $20.00",
      href: "/custom-orders?type=shirt-printing",
    },
    {
      name: "Engraved Water Bottles",
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop",
      alt: "Engraved Water Bottles",
      description: "Stainless steel bottles with laser engraving",
      price: "Starting at $35.99",
      href: "/custom-orders?type=water-bottle-engraving",
    },
    {
      name: "Wood Engravings",
      image: "https://images.unsplash.com/photo-1452457807411-4979b707c5be?w=800&auto=format&fit=crop",
      alt: "Wood Engravings",
      description: "Custom wood signs, plaques, and decorations",
      price: "Starting at $25.99",
      href: "/custom-orders?type=wood-engraving",
    },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }} className="py-5">
      <Container>
        {/* Page Header */}
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold mb-3">Our Products</h1>
          <p className="lead text-muted">
            Shop ready-made items or create your own custom design
          </p>
        </div>

        {/* SECTION 1: Ready-to-Sell Products */}
        <section className="mb-5">
          <div className="mb-4">
            <h2 className="h2 fw-bold mb-2">Ready to Ship</h2>
            <p className="text-muted">Pre-made products available for immediate purchase</p>
          </div>

          <ProductCarousel products={readyProducts} onAddToCart={handleAddToCart} />
        </section>

        {/* Divider */}
        <div className="position-relative my-5">
          <hr />
          <div className="position-absolute top-50 start-50 translate-middle px-3 bg-light">
            <span className="h5 fw-semibold text-muted">OR</span>
          </div>
        </div>

        {/* SECTION 2: Custom Orders */}
        <section>
          <div className="text-center mb-4">
            <h2 className="h2 fw-bold mb-2">Custom Orders</h2>
            <p className="text-muted">
              Create your own unique design - choose your product type and upload your artwork
            </p>
          </div>

          <Row className="g-4">
            {customProducts.map((product) => (
              <Col key={product.name} md={6} lg={4}>
                <Card className="h-100 shadow-sm" style={{ transition: 'transform 0.2s, box-shadow 0.2s' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 0.5rem 1rem rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 0.125rem 0.25rem rgba(0,0,0,0.075)';
                  }}
                >
                  <div style={{ height: '200px', backgroundColor: '#e9ecef', overflow: 'hidden' }}>
                    <img 
                      src={product.image}
                      alt={product.alt}
                      className="w-100 h-100"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title className="h5">{product.name}</Card.Title>
                    <Card.Text className="text-muted mb-3">{product.description}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="h5 text-primary mb-0">{product.price}</span>
                      <Button as={Link} href={product.href} variant="primary">
                        Design Now
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>
      </Container>
    </div>
  );
}
