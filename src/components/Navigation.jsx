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
    { name: 'Products', href: '/products' },
    { name: 'Shirt Prints', href: '/shirt-prints' },
    { name: 'Engravings', href: '/engravings' },
    { name: 'Custom Orders', href: '/custom-orders' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <Navbar bg="white" expand="lg" className="shadow-lg sticky-top" style={{ zIndex: 1000 }}>
      <Container>
        <Navbar.Brand as={Link} href="/" className="text-primary fw-bold fs-3">
          DBA Customization
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleShow} />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {navItems.map((item) => (
              <Nav.Link key={item.name} as={Link} href={item.href}>
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
            >
              {isSaving ? '💾 Saving...' : `Cart (${totalQuantity})`}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>

      {/* Mobile Offcanvas */}
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            {navItems.map((item) => (
              <Nav.Link 
                key={item.name} 
                as={Link} 
                href={item.href}
                onClick={handleClose}
                className="mb-2"
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
            >
              {isSaving ? '💾 Saving...' : `Cart (${totalQuantity})`}
            </Button>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </Navbar>
  );
}
