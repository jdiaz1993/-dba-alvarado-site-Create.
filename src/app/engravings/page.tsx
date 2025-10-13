export default function EngravingsPage() {
	return (
		<div className="min-h-screen bg-gray-50 py-12">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<h1 className="text-4xl font-bold text-gray-900 mb-4">Engravings</h1>
				<p className="text-lg text-gray-600 mb-8 max-w-2xl">
					Laser engraving on water bottles, wood, metal, leather, and more.
				</p>

				<div className="grid md:grid-cols-3 gap-6">
					<div className="bg-white rounded-lg shadow p-6">
						<div className="h-40 bg-gray-200 rounded mb-4 overflow-hidden flex items-center justify-center">
							<img 
								src="/assets/images/gallery/20251005_144719.jpg" 
								alt="Engraved Water Bottle Example"
								className="max-h-full max-w-full object-contain"
							/>
						</div>
						<h3 className="text-xl font-semibold text-gray-900 mb-2">Water Bottles</h3>
						<p className="text-gray-600">Precision laser engraving on stainless steel and aluminum bottles.</p>
					</div>
					
					<div className="bg-white rounded-lg shadow p-6">
						<div className="h-40 bg-gray-200 rounded mb-4 overflow-hidden flex items-center justify-center">
							<img 
								src="/assets/images/gallery/wood-engraving-example.jpg" 
								alt="Wood Engraving Example"
								className="max-h-full max-w-full object-contain"
							/>
						</div>
						<h3 className="text-xl font-semibold text-gray-900 mb-2">Wood Signs</h3>
						<p className="text-gray-600">Custom wood signs and plaques with detailed engraving.</p>
					</div>
					
					<div className="bg-white rounded-lg shadow p-6">
						<div className="h-40 bg-gray-200 rounded mb-4 flex items-center justify-center">
							<span className="text-gray-500">Metal Tag Example</span>
						</div>
						<h3 className="text-xl font-semibold text-gray-900 mb-2">Metal Tags</h3>
						<p className="text-gray-600">Durable metal tags and nameplates for identification.</p>
					</div>
				</div>

				<div className="mt-10">
					<a href="/custom-orders" className="inline-block bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 font-semibold">Start a Custom Order</a>
				</div>
			</div>
		</div>
	);
}
