export default function AboutPage() {
	return (
		<div className="min-h-screen bg-gray-50 py-12">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				<h1 className="text-4xl font-bold text-gray-900 mb-4">About DBA Alvarado</h1>
				<p className="text-lg text-gray-700 mb-6">
					We’re a family-run business specializing in custom shirt printing and precision engravings. We combine quality materials with attention to detail to bring your ideas to life.
				</p>
				<p className="text-gray-700 mb-6">
					From team apparel and event merch to personalized water bottles and wood signs, we deliver standout results with quick turnaround times.
				</p>
				<div className="space-x-3">
					<a href="/products" className="inline-block bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700">Browse Products</a>
					<a href="/contact" className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50">Contact Us</a>
				</div>
			</div>
		</div>
	);
}
