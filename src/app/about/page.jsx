import { Container, Button } from 'react-bootstrap';
import Link from 'next/link';

export default function AboutPage() {
	return (
		<div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }} className="py-5">
			<Container>
				<div className="max-w-4xl mx-auto">
					<h1 className="display-4 fw-bold mb-4">About DBA Alvarado</h1>
					<p className="lead mb-4">
						We're a family-run business specializing in custom shirt printing and precision engravings. We combine quality materials with attention to detail to bring your ideas to life.
					</p>
					<p className="mb-4">
						From team apparel and event merch to personalized water bottles and wood signs, we deliver standout results with quick turnaround times.
					</p>
					<div className="d-flex gap-3">
						<Link href="/products">
							<Button variant="primary">Browse Products</Button>
						</Link>
						<Link href="/contact">
							<Button variant="outline-secondary">Contact Us</Button>
						</Link>
					</div>
				</div>
			</Container>
		</div>
	);
}
