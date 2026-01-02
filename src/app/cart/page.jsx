"use client";

import { useCart } from "../../context/CartContext";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, Suspense } from "react";
import { Container, Row, Col, Card, Button, Alert, Form, InputGroup } from "react-bootstrap";

function formatUSD(cents) {
	return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}

function CartContent() {
	const { items, updateQuantity, removeItem, totalCents, clear, isLoading, isSaving, syncError } = useCart();
	const searchParams = useSearchParams();
	const [hasCleared, setHasCleared] = useState(false);
	const [rushShipping, setRushShipping] = useState(false);
	const [isCheckingOut, setIsCheckingOut] = useState(false);
	const [checkoutError, setCheckoutError] = useState(null);

	const status = useMemo(() => {
		if (searchParams.get("success")) return "success";
		if (searchParams.get("canceled")) return "canceled";
		return null;
	}, [searchParams]);

	useEffect(() => {
		if (status === "success" && !hasCleared && items.length > 0) {
			clear();
			setHasCleared(true);
		}
	}, [status, hasCleared, items.length, clear]);

	// Standard domestic shipping costs $3
	const standardShippingFee = 300; // $3.00 in cents
	// Rush shipping costs extra on top of standard
	const rushShippingFee = rushShipping ? 1500 : 0; // +$15 for rush shipping
	const shippingFee = standardShippingFee + rushShippingFee;
	const grandTotal = totalCents + shippingFee;

	async function onCheckout() {
		if (isCheckingOut) return; // Prevent double clicks
		
		setIsCheckingOut(true);
		setCheckoutError(null);
		
		try {
			// Save full order data to localStorage before checkout (as backup)
			// This includes all details: preview images, custom text, design data, etc.
			if (typeof window !== 'undefined') {
				const fullOrderData = {
					timestamp: new Date().toISOString(),
					items: items.map(item => ({
						id: item.id,
						name: item.name,
						price: item.price,
						quantity: item.quantity,
						// Include all custom order details
						imageUrl: item.imageUrl, // Preview image PNG
						productType: item.productType,
						color: item.color,
						size: item.size,
						placement: item.placement,
						customTexts: item.customTexts,
						isRushOrder: item.isRushOrder,
						rushOrderFee: item.rushOrderFee,
						shippingAddress: item.shippingAddress,
						timeline: item.timeline,
						designData: item.designData
					})),
					shipping: {
						standard: standardShippingFee,
						rush: rushShipping ? rushShippingFee : 0
					},
					total: grandTotal
				};
				localStorage.setItem('pendingOrder', JSON.stringify(fullOrderData));
			}

			// Add shipping as line items
			const checkoutItems = [
				...items.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
			];
			
			// Always add standard shipping
			checkoutItems.push({
				id: 'standard-shipping',
				name: 'Standard Shipping (5-7 days)',
				price: standardShippingFee,
				quantity: 1
			});
			
			// Add rush shipping fee if selected
			if (rushShipping && rushShippingFee > 0) {
				checkoutItems.push({
					id: 'rush-shipping',
					name: 'Rush Shipping (2-3 days)',
					price: rushShippingFee,
					quantity: 1
				});
			}

			// Send full order data to backend for storage
			const res = await fetch("/api/checkout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ 
					items: checkoutItems,
					fullOrderData: items.map(item => ({
						id: item.id,
						name: item.name,
						price: item.price,
						quantity: item.quantity,
						imageUrl: item.imageUrl, // Preview image PNG
						productType: item.productType,
						color: item.color,
						size: item.size,
						placement: item.placement,
						customTexts: item.customTexts,
						isRushOrder: item.isRushOrder,
						rushOrderFee: item.rushOrderFee,
						shippingAddress: item.shippingAddress,
						timeline: item.timeline,
						designData: item.designData
					}))
				}),
			});
			
			const data = await res.json();
			
			if (!res.ok) {
				throw new Error(data?.error || "Checkout failed");
			}
			
			if (data?.url) {
				window.location.href = data.url;
			} else {
				throw new Error("No checkout URL received");
			}
		} catch (e) {
			const errorMessage = e instanceof Error ? e.message : "Checkout failed. Please try again.";
			setCheckoutError(errorMessage);
			setIsCheckingOut(false);
		}
	}

	return (
		<div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }} className="py-5">
			<Container>
				<h1 className="display-4 fw-bold mb-4">Your Cart</h1>

				{status && (
					<Alert variant={status === "success" ? "success" : "warning"} className="mb-4">
						{status === "success" ? "Payment successful! Thank you for your order." : "Checkout canceled. Your items are still in the cart."}
					</Alert>
				)}

				{syncError && (
					<Alert variant="danger" className="mb-4">
						{syncError}. Your cart changes may not be saved.
					</Alert>
				)}

				{checkoutError && (
					<Alert variant="danger" className="mb-4" dismissible onClose={() => setCheckoutError(null)}>
						<strong>Checkout Error:</strong> {checkoutError}
					</Alert>
				)}

				{isSaving && (
					<Alert variant="info" className="mb-4">
						💾 Saving cart...
					</Alert>
				)}

				{isLoading ? (
					<Card className="shadow">
						<Card.Body className="text-center text-muted py-5">Loading your cart...</Card.Body>
					</Card>
				) : items.length === 0 ? (
					<Card className="shadow">
						<Card.Body className="text-center text-muted py-5">Your cart is empty.</Card.Body>
					</Card>
				) : (
					<Row className="g-4">
						<Col lg={8}>
							{items.map(item => (
								<Card key={item.id} className="mb-3 shadow-sm">
									<Card.Body>
										<Row className="align-items-center">
											<Col xs={3} sm={2}>
												<div className="bg-light rounded d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
													{item.imageUrl ? (
														<img src={item.imageUrl} alt={item.name} className="img-fluid rounded" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }} />
													) : (
														<span className="text-muted small">No image</span>
													)}
												</div>
											</Col>
											<Col xs={9} sm={4}>
												<h3 className="h6 fw-semibold mb-1">{item.name}</h3>
												<p className="text-muted mb-0">{formatUSD(item.price)}</p>
											</Col>
											<Col xs={12} sm={3}>
												<InputGroup size="sm">
													<Button variant="outline-secondary" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</Button>
													<Form.Control
														type="number"
														value={item.quantity}
														onChange={(e) => updateQuantity(item.id, Number(e.target.value) || 1)}
														min={1}
														className="text-center"
													/>
													<Button variant="outline-secondary" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
												</InputGroup>
											</Col>
											<Col xs={6} sm={2}>
												<div className="fw-semibold text-end">{formatUSD(item.price * item.quantity)}</div>
											</Col>
											<Col xs={6} sm={1}>
												<Button variant="link" className="text-danger text-decoration-none p-0" onClick={() => removeItem(item.id)}>Remove</Button>
											</Col>
										</Row>
									</Card.Body>
								</Card>
							))}
						</Col>

						<Col lg={4}>
							<Card className="shadow">
								<Card.Body>
									<Card.Title className="h4 mb-4">Order Summary</Card.Title>
									<div className="d-flex justify-content-between text-muted mb-2">
										<span>Subtotal</span>
										<span>{formatUSD(totalCents)}</span>
									</div>
									
									{/* Shipping Selection */}
									<div className="my-4 pt-3 border-top">
										<p className="small text-muted mb-3">
											📦 Standard shipping: $3.00 (5-7 business days)
										</p>
										<Form.Check
											type="checkbox"
											id="rush-shipping-check"
											label={
												<div className="d-flex justify-content-between w-100 ms-2">
													<div>
														<div className="fw-medium">Rush Shipping</div>
														<div className="small text-muted">2-3 business days</div>
													</div>
													<span className="fw-semibold">+$15.00</span>
												</div>
											}
											checked={rushShipping}
											onChange={() => setRushShipping(!rushShipping)}
											className="p-3 border rounded"
										/>
									</div>

									<div className="d-flex justify-content-between text-muted mb-2 pt-3 border-top">
										<span>Shipping</span>
										<span>{formatUSD(shippingFee)}</span>
									</div>
									<div className="d-flex justify-content-between text-muted mb-2">
										<span>Estimated Tax</span>
										<span>Calculated at checkout</span>
									</div>
									<div className="d-flex justify-content-between h5 fw-bold mb-4 pt-3 border-top">
										<span>Total</span>
										<span>{formatUSD(grandTotal)}</span>
									</div>
									<div className="d-grid gap-2">
										<Button 
											variant="primary" 
											size="lg" 
											onClick={onCheckout}
											disabled={isCheckingOut || items.length === 0}
										>
											{isCheckingOut ? (
												<>
													<span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
													Processing...
												</>
											) : (
												'Checkout'
											)}
										</Button>
										<Button 
											variant="outline-secondary" 
											onClick={clear}
											disabled={isCheckingOut || items.length === 0}
										>
											Clear Cart
										</Button>
									</div>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				)}
			</Container>
		</div>
	);
}

export default function CartPage() {
	return (
		<Suspense fallback={<div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }} className="py-5 d-flex align-items-center justify-content-center">Loading...</div>}>
			<CartContent />
		</Suspense>
	);
}
