import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Link from "next/link";

export default function EngravingsPage() {
	const engravingTypes = [
		{
			name: "Water Bottles",
			image: "/assets/images/gallery/20251005_144719.jpg",
			alt: "Engraved Water Bottle Example",
			description: "Precision laser engraving on stainless steel and aluminum bottles.",
		},
		{
			name: "Wood Signs",
			image: "/assets/images/gallery/wood-engraving-example.jpg",
			alt: "Wood Engraving Example",
			description: "Custom wood signs and plaques with detailed engraving.",
		},
		{
			name: "Metal Tags",
			image: null,
			alt: "Metal Tag Example",
			description: "Durable metal tags and nameplates for identification.",
		},
	];

	return (
		<div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }} className="py-5">
			<Container>
				<h1 className="display-4 fw-bold mb-3">Engravings</h1>
				<p className="lead text-muted mb-4">
					Laser engraving on water bottles, wood, metal, leather, and more.
				</p>

				<Row className="g-4 mb-4">
					{engravingTypes.map((item) => (
						<Col key={item.name} md={4}>
							<Card className="shadow-sm h-100">
								<div className="bg-light rounded-top d-flex align-items-center justify-content-center" style={{ height: '160px', overflow: 'hidden' }}>
									{item.image ? (
										<img 
											src={item.image} 
											alt={item.alt}
											className="img-fluid"
											style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
										/>
									) : (
										<span className="text-muted">Metal Tag Example</span>
									)}
								</div>
								<Card.Body>
									<Card.Title className="h5">{item.name}</Card.Title>
									<Card.Text className="text-muted">{item.description}</Card.Text>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>

				<div className="text-center">
					<Button as={Link} href="/custom-orders" variant="primary" size="lg">Start a Custom Order</Button>
				</div>
			</Container>
		</div>
	);
}
