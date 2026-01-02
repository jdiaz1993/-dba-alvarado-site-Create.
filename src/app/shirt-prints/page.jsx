'use client';

import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Link from "next/link";

export default function ShirtPrintsPage() {
	const shirtTypes = [
		{
			name: "T-Shirts",
			image: "/assets/Stockphotodba/IMG_3186.WEBP",
			description: "Classic cotton t-shirts perfect for any design",
			startingPrice: "$20.00"
		},
		{
			name: "Long Sleeve",
			image: "/assets/Stockphotodba/IMG_3187.WEBP",
			description: "Long sleeve options for cooler weather",
			startingPrice: "$25.00"
		},
		{
			name: "Crew Neck",
			image: "/assets/Stockphotodba/IMG_3188.JPG",
			description: "Comfortable crew neck shirts for your custom design",
			startingPrice: "$25.00"
		},
		{
			name: "Polo Shirts",
			image: "/assets/Stockphotodba/IMG_3189.WEBP",
			description: "Professional polo shirts with custom DTF printing",
			startingPrice: "$35.00"
		},
		{
			name: "Hoodie",
			image: "/assets/Stockphotodba/IMG_3192.WEBP",
			description: "Warm and comfortable hoodies for your custom design",
			startingPrice: "$45.00"
		},
		{
			name: "Tote Bag",
			image: "/assets/Stockphotodba/IMG_3190.JPG",
			description: "Custom printed tote bags for any occasion",
			startingPrice: "$15.00"
		},
	];

	const dtfBenefits = [
		{
			name: "Vibrant Colors",
			description: "Rich, vivid colors that pop on any fabric",
			icon: "🎨"
		},
		{
			name: "Excellent Detail",
			description: "Crisp, sharp details even in complex designs",
			icon: "✨"
		},
		{
			name: "Durable & Flexible",
			description: "Long-lasting prints that stretch with the fabric",
			icon: "💪"
		},
		{
			name: "All Fabric Types",
			description: "Works on cotton, polyester, blends, and more",
			icon: "👕"
		},
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
						Custom Shirt Printing
					</h1>
					<p 
						className="mb-4"
						style={{
							fontSize: '1.25rem',
							color: '#64748b',
							maxWidth: '700px',
							margin: '0 auto 2rem',
							lineHeight: 1.7
						}}
					>
						High-quality DTF (Direct to Film) printing for vibrant, durable designs on all apparel types.
					</p>
					<Link href="/custom-orders?type=shirt-printing">
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
							Start Your Custom Order →
						</Button>
					</Link>
				</div>

				{/* Shirt Types */}
				<section className="mb-5" style={{ marginBottom: '5rem' }}>
					<h2 
						className="fw-bold mb-4 text-center"
						style={{
							fontSize: 'clamp(2rem, 5vw, 2.75rem)',
							fontWeight: 800,
							letterSpacing: '-0.03em',
							background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
							backgroundClip: 'text',
							marginBottom: '3rem'
						}}
					>
						Choose Your Apparel
					</h2>
					<Row className="g-4">
						{shirtTypes.map((shirt) => (
							<Col key={shirt.name} md={6} lg={3}>
								<Card 
									className="h-100 border-0"
									style={{ 
										transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
										borderRadius: '24px',
										overflow: 'hidden',
										boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
										border: '1px solid rgba(0,0,0,0.05)'
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.transform = 'translateY(-8px) scale(1.01)';
										e.currentTarget.style.boxShadow = '0 20px 50px rgba(99, 102, 241, 0.15)';
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.transform = 'translateY(0) scale(1)';
										e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
									}}
								>
									<div style={{ 
										height: '200px', 
										backgroundColor: '#e9ecef', 
										overflow: 'hidden',
										position: 'relative',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center'
									}}>
										<img 
											src={shirt.image}
											alt={shirt.name}
											className="w-100 h-100"
											style={{ 
												objectFit: 'contain',
												objectPosition: 'center'
											}}
										/>
									</div>
									<Card.Body className="p-4">
										<h5 className="fw-bold mb-2">{shirt.name}</h5>
										<p className="text-muted small mb-3">{shirt.description}</p>
										<div className="d-flex justify-content-between align-items-center">
											<span className="text-primary fw-semibold">Starting at {shirt.startingPrice}</span>
										</div>
									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>
				</section>

				{/* DTF Benefits */}
				<section className="mb-5" style={{ marginBottom: '5rem' }}>
					<div className="text-center mb-4" style={{ marginBottom: '3rem' }}>
						<h2 
							className="fw-bold mb-2"
							style={{
								fontSize: 'clamp(2rem, 5vw, 2.75rem)',
								fontWeight: 800,
								letterSpacing: '-0.03em',
								background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
								WebkitBackgroundClip: 'text',
								WebkitTextFillColor: 'transparent',
								backgroundClip: 'text',
								marginBottom: '1rem'
							}}
						>
							Why DTF Printing?
						</h2>
						<p style={{ fontSize: '1.125rem', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
							DTF (Direct to Film) technology delivers superior results for custom apparel
						</p>
					</div>
					<Row className="g-4">
						{dtfBenefits.map((benefit) => (
							<Col key={benefit.name} md={6} lg={3}>
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
										e.currentTarget.style.transform = 'translateY(-6px)';
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
										{benefit.icon}
									</div>
									<h5 className="fw-bold mb-2">{benefit.name}</h5>
									<p className="text-muted small mb-0">{benefit.description}</p>
								</Card>
							</Col>
						))}
					</Row>
				</section>

				{/* CTA */}
				<div className="text-center mt-5" style={{ marginTop: '4rem' }}>
					<Link href="/custom-orders?type=shirt-printing">
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
							Start Your Custom Order
						</Button>
					</Link>
				</div>
			</Container>
		</div>
	);
}
