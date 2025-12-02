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
								<div className="p-3">
									<h5 className="fw-semibold mb-2">Custom Tee #{i}</h5>
									<p className="text-muted mb-0">Soft cotton tees with vibrant, durable prints.</p>
								</div>
							</Card>
						</Col>
					))}
				</Row>

				<div className="text-center">
					<Link href="/custom-orders">
						<Button variant="primary" size="lg">Start a Custom Order</Button>
					</Link>
				</div>
			</Container>
		</div>
	);
}
