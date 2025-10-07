export default function SuccessPage() {
	return (
		<div className="min-h-screen bg-gray-50 py-16">
			<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="bg-white rounded-lg shadow p-8 text-center">
					<div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
						<svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</div>
					<h1 className="text-3xl font-bold text-gray-900 mb-2">Thank you for your order!</h1>
					<p className="text-gray-600 mb-6">Your payment was successful. We’re preparing your items.</p>
					<div className="space-x-3">
						<a href="/products" className="inline-block bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700">Continue Shopping</a>
						<a href="/" className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50">Go Home</a>
					</div>
				</div>
			</div>
		</div>
	);
}
