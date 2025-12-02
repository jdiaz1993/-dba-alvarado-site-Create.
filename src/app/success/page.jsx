import Link from "next/link";
import { Container, Card, Button } from "react-bootstrap";

export default function SuccessPage() {
	return (
		<div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }} className="py-5">
			<Container>
				<Card className="shadow text-center">
					<div className="p-5">
						<div className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{ width: '64px', height: '64px' }}>
							<svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-success">
								<path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</div>
						<h1 className="h2 fw-bold mb-2">Thank you for your order!</h1>
						<p className="text-muted mb-4">Your payment was successful. We're preparing your items.</p>
						<div className="d-flex gap-3 justify-content-center">
							<Link href="/products">
								<Button variant="primary">Continue Shopping</Button>
							</Link>
							<Link href="/">
								<Button variant="outline-secondary">Go Home</Button>
							</Link>
						</div>
					</div>
				</Card>
			</Container>
		</div>
	);
}
