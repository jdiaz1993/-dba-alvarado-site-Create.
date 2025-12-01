"use client";

import { useEffect, useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";

export default function OrdersPage() {
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		async function load() {
			try {
				const res = await fetch("/api/orders");
				const data = await res.json();
				if (Array.isArray(data)) setOrders(data);
			} catch {
				// ignore
			}
		}
		load();
	}, []);

	return (
		<div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }} className="py-5">
			<Container>
				<h1 className="display-4 fw-bold mb-4">Recent Orders (in-memory)</h1>
				{orders.length === 0 ? (
					<Card className="shadow">
						<Card.Body className="text-center text-muted py-5">No orders yet.</Card.Body>
					</Card>
				) : (
					<div className="d-flex flex-column gap-3">
						{orders.map((o) => (
							<Card key={o.id} className="shadow">
								<Card.Body>
									<Row className="align-items-center">
										<Col>
											<div className="fw-semibold">{o.customerEmail || "Unknown customer"}</div>
											<div className="text-muted small">{new Date(o.createdAt).toLocaleString()}</div>
										</Col>
										<Col xs="auto">
											<div className="fw-semibold">{o.totalCents ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(o.totalCents / 100) : "-"}</div>
										</Col>
									</Row>
									<div className="text-muted small mt-2">Session: {o.stripeSessionId}</div>
								</Card.Body>
							</Card>
						))}
					</div>
				)}
			</Container>
		</div>
	);
}
