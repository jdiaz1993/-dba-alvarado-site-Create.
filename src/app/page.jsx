'use client';

import Link from 'next/link';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
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
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Hero Section */}
      <section className="bg-primary text-white py-5" style={{ background: 'linear-gradient(to right, #9333ea, #7e22ce)' }}>
        <Container>
          <div className="text-center py-5">
            <h1 className="display-4 fw-bold mb-4">
              Welcome to DBA Customization
            </h1>
            <p className="lead mb-4">
              Professional custom shirt printing and engraving services. 
              From water bottles to wood, we bring your designs to life with quality and precision.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <Button as={Link} href="/products" variant="light" size="lg" className="px-4">
                View Products
              </Button>
              <Button as={Link} href="/custom-orders" variant="outline-light" size="lg" className="px-4">
                Get Custom Quote
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Products Section */}
      <section className="py-5 bg-white">
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">
              Featured Products
            </h2>
            <p className="lead text-muted">
              Ready-to-ship items available now. Add to cart and checkout instantly!
            </p>
          </div>
          
          <ProductCarousel products={featuredProducts} onAddToCart={handleAddToCart} />
          
          <div className="text-center mt-4">
            <Button as={Link} href="/products" variant="primary" size="lg">
              View All Products
            </Button>
          </div>
        </Container>
      </section>

      {/* Product Categories Section */}
      <section className="py-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">
              Start Your Custom Project
            </h2>
            <p className="lead text-muted">
              Select a product category to begin designing your personalized item.
            </p>
          </div>
          <Row className="g-4">
            {categories.map((category) => (
              <Col key={category.name} xs={6} md={4}>
                <Card as={Link} href={category.href} className="h-100 text-decoration-none text-dark shadow-sm" style={{ transition: 'transform 0.2s, box-shadow 0.2s' }} 
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 0.5rem 1rem rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 0.125rem 0.25rem rgba(0,0,0,0.075)';
                  }}
                >
                  <div style={{ aspectRatio: '1/1', backgroundColor: '#f8f9fa', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img 
                      src={category.image}
                      alt={category.alt}
                      className="w-100 h-100"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <Card.Body className="text-center">
                    <Card.Title className="h5">{category.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-4">
              Why Choose DBA Alvarado?
            </h2>
          </div>
          
          <Row className="g-4">
            <Col md={4}>
              <div className="text-center">
                <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '64px', height: '64px' }}>
                  <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="h4 fw-bold mb-2">Quality Guaranteed</h3>
                <p className="text-muted">We use only the finest materials and state-of-the-art equipment</p>
              </div>
            </Col>
            
            <Col md={4}>
              <div className="text-center">
                <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '64px', height: '64px' }}>
                  <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-success">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="h4 fw-bold mb-2">Fast Turnaround</h3>
                <p className="text-muted">Quick processing and delivery to meet your deadlines</p>
              </div>
            </Col>
            
            <Col md={4}>
              <div className="text-center">
                <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '64px', height: '64px' }}>
                  <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="h4 fw-bold mb-2">Custom Designs</h3>
                <p className="text-muted">Personalized designs tailored to your specific needs</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5 text-white" style={{ background: '#9333ea' }}>
        <Container>
          <div className="text-center">
            <h2 className="display-5 fw-bold mb-3">
              Ready to Get Started?
            </h2>
            <p className="lead mb-4">
              Contact us today for a custom quote or browse our products to see what we can create for you.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <Button as={Link} href="/products" variant="light" size="lg" className="px-4">
                View Products
              </Button>
              <Button as={Link} href="/contact" variant="outline-light" size="lg" className="px-4">
                Contact Us
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-5">
        <Container>
          <Row className="g-4">
            <Col md={3}>
              <h3 className="h4 fw-bold mb-3">DBA Alvarado</h3>
              <p className="text-muted">
                Professional custom printing and engraving services for all your personalization needs.
              </p>
            </Col>
            
            <Col md={3}>
              <h4 className="h6 fw-bold mb-3">Services</h4>
              <ul className="list-unstyled text-muted">
                <li>Shirt Printing</li>
                <li>Engravings</li>
                <li>Custom Orders</li>
                <li>Bulk Orders</li>
              </ul>
            </Col>
            
            <Col md={3}>
              <h4 className="h6 fw-bold mb-3">Quick Links</h4>
              <ul className="list-unstyled text-muted">
                <li><Link href="/about" className="text-muted text-decoration-none">About Us</Link></li>
                <li><Link href="/contact" className="text-muted text-decoration-none">Contact</Link></li>
                <li><Link href="/products" className="text-muted text-decoration-none">Products</Link></li>
                <li><Link href="/custom-orders" className="text-muted text-decoration-none">Custom Orders</Link></li>
              </ul>
            </Col>
            
            <Col md={3}>
              <h4 className="h6 fw-bold mb-3">Contact Info</h4>
              <ul className="list-unstyled text-muted">
                <li>Phone: (555) 123-4567</li>
                <li>Email: info@dbaalvarado.com</li>
                <li>Address: Your Business Address</li>
              </ul>
            </Col>
          </Row>
          
          <hr className="my-4 bg-secondary" />
          <div className="text-center text-muted">
            <p className="mb-0">&copy; 2024 DBA Alvarado. All rights reserved.</p>
          </div>
        </Container>
      </footer>
    </div>
  );
}
