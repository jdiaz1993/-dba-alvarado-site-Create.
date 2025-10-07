export default function ShirtPrintsPage() {
	return (
		<div className="min-h-screen bg-gray-50 py-12">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<h1 className="text-4xl font-bold text-gray-900 mb-4">Shirt Prints</h1>
				<p className="text-lg text-gray-600 mb-8 max-w-2xl">
					High-quality custom shirt printing: screen print, DTF, vinyl heat transfer, and embroidery.
				</p>

				<div className="grid md:grid-cols-3 gap-6">
					{[1,2,3].map((i) => (
						<div key={i} className="bg-white rounded-lg shadow p-6">
							<div className="h-40 bg-gray-200 rounded mb-4" />
							<h3 className="text-xl font-semibold text-gray-900 mb-2">Custom Tee #{i}</h3>
							<p className="text-gray-600">Soft cotton tees with vibrant, durable prints.</p>
						</div>
					))}
				</div>

				<div className="mt-10">
					<a href="/custom-orders" className="inline-block bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 font-semibold">Start a Custom Order</a>
				</div>
			</div>
		</div>
	);
}
