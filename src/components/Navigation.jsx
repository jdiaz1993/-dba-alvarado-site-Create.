'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navbar, Nav, Container, Button, Offcanvas } from 'react-bootstrap';
import { useCart } from "../context/CartContext";

export default function Navigation() {
  const [show, setShow] = useState(false);
  const { totalQuantity, isSaving } = useCart();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Shirt Prints', href: '/shirt-prints' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <Navbar 
      expand="lg" 
      className="sticky-top" 
      style={{ 
        zIndex: 1000,
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
      }}
    >
      <Container>
        <Navbar.Brand 
          as={Link} 
          href="/" 
          className="fw-bold"
          style={{ 
            fontSize: '1.5rem',
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.02em'
          }}
        >
          DBA Customization
        </Navbar.Brand>
        
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav" 
          onClick={handleShow}
          style={{ border: 'none' }}
        />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" style={{ gap: '0.5rem' }}>
            {navItems.map((item) => (
              <Nav.Link 
                key={item.name} 
                as={Link} 
                href={item.href}
                style={{
                  fontWeight: 500,
                  color: '#1e293b',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(99, 102, 241, 0.1)';
                  e.target.style.color = '#6366f1';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#1e293b';
                }}
              >
                {item.name}
              </Nav.Link>
            ))}
          </Nav>
          <Nav>
            <Button 
              as={Link} 
              href="/cart" 
              variant={isSaving ? "secondary" : "primary"}
              className="ms-2"
              style={{
                borderRadius: '10px',
                fontWeight: 600,
                boxShadow: isSaving ? 'none' : '0 4px 6px -1px rgba(99, 102, 241, 0.3)'
              }}
            >
              {isSaving ? '💾 Saving...' : `Cart (${totalQuantity})`}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>

      {/* Mobile Offcanvas */}
      <Offcanvas 
        show={show} 
        onHide={handleClose}
        style={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(20px)' }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{ fontWeight: 700 }}>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column" style={{ gap: '0.5rem' }}>
            {navItems.map((item) => (
              <Nav.Link 
                key={item.name} 
                as={Link} 
                href={item.href}
                onClick={handleClose}
                style={{
                  fontWeight: 500,
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(99, 102, 241, 0.1)';
                  e.target.style.color = '#6366f1';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = 'inherit';
                }}
              >
                {item.name}
              </Nav.Link>
            ))}
            <Button 
              as={Link} 
              href="/cart" 
              variant={isSaving ? "secondary" : "primary"}
              className="w-100 mt-3"
              onClick={handleClose}
              style={{ borderRadius: '10px', fontWeight: 600 }}
            >
              {isSaving ? '💾 Saving...' : `Cart (${totalQuantity})`}
            </Button>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </Navbar>
  );
}
