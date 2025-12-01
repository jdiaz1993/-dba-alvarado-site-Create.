import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Link from "next/link";

export default function ShirtPrintsPage() {
	return (
		<div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }} className="py-5">
			<Container>
				<h1 className="display-4 fw-bold mb-3">Shirt Prints</h1>
				<p className="lead text-muted mb-4">
					High-quality custom shirt printing: screen print, DTF, vinyl heat transfer, and embroidery.
				</p>

				<Row className="g-4 mb-4">
					{[1,2,3].map((i) => (
						<Col key={i} md={4}>
							<Card className="shadow-sm h-100">
								<div className="bg-light rounded-top" style={{ height: '160px' }} />
								<Card.Body>
									<Card.Title className="h5">Custom Tee #{i}</Card.Title>
									<Card.Text className="text-muted">Soft cotton tees with vibrant, durable prints.</Card.Text>
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
