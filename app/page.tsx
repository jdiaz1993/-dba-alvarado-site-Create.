const productCategories = [
  {
    id: "t-shirts",
    title: "T-Shirts",
    products: [
      { 
        color: "bg-black", 
        design: "YOUR DESIGN HERE", 
        accent: "text-green-400",
        shape: "rounded-t-lg",
        size: "aspect-[3/4]"
      },
      { 
        color: "bg-green-500", 
        design: "YOUR LOGO HERE", 
        accent: "text-white",
        shape: "rounded-t-lg",
        size: "aspect-[3/4]"
      },
    ],
  },
  {
    id: "hoodies",
    title: "Hoodies",
    products: [
      { 
        color: "bg-black", 
        design: "YOUR DESIGN HERE", 
        accent: "text-white",
        shape: "rounded-t-lg",
        size: "aspect-[3/4]"
      },
      { 
        color: "bg-sky-200", 
        design: "YOUR DESIGN HERE", 
        accent: "text-gray-800",
        shape: "rounded-t-lg",
        size: "aspect-[3/4]"
      },
    ],
  },
  {
    id: "long-sleeve",
    title: "Long Sleeve T-Shirts",
    products: [
      { 
        color: "bg-gray-400", 
        design: "YOUR TEAM DESIGN HERE", 
        accent: "text-white",
        shape: "rounded-t-lg",
        size: "aspect-[3/4]"
      },
      { 
        color: "bg-blue-500", 
        design: "YOUR DESIGN HERE", 
        accent: "text-white",
        shape: "rounded-t-lg",
        size: "aspect-[3/4]"
      },
    ],
  },
  {
    id: "jackets",
    title: "Jackets",
    products: [
      { 
        color: "bg-orange-500", 
        design: "YOUR DESIGN HERE", 
        accent: "text-black",
        shape: "rounded-lg",
        size: "aspect-square"
      },
      { 
        color: "bg-blue-600", 
        design: "YOUR DESIGN HERE", 
        accent: "text-white",
        shape: "rounded-lg",
        size: "aspect-square"
      },
    ],
  },
  {
    id: "hats",
    title: "Hats",
    products: [
      { 
        color: "bg-sky-200", 
        design: "DESIGN HERE", 
        accent: "text-gray-800",
        shape: "rounded-full",
        size: "aspect-square"
      },
      { 
        color: "bg-red-600", 
        design: "YOUR UNIVERSITY", 
        accent: "text-white",
        shape: "rounded-full",
        size: "aspect-square"
      },
      { 
        color: "bg-green-600", 
        design: "DESIGN HERE", 
        accent: "text-white",
        shape: "rounded-full",
        size: "aspect-square"
      },
    ],
  },
  {
    id: "bags",
    title: "Bags",
    products: [
      { 
        color: "bg-blue-900", 
        design: "U", 
        accent: "text-white",
        shape: "rounded-lg",
        size: "aspect-[4/5]"
      },
      { 
        color: "bg-white border-2 border-gray-300", 
        design: "FAMILY VIBES", 
        accent: "text-purple-600",
        shape: "rounded-lg",
        size: "aspect-[4/5]"
      },
      { 
        color: "bg-red-500", 
        design: "YOUR DESIGN HERE", 
        accent: "text-white",
        shape: "rounded-lg",
        size: "aspect-square"
      },
    ],
  },
  {
    id: "polo-shirts",
    title: "Polo Shirts",
    products: [
      { 
        color: "bg-red-600", 
        design: "YOUR DESIGN HERE", 
        accent: "text-white",
        shape: "rounded-t-lg",
        size: "aspect-[3/4]"
      },
      { 
        color: "bg-gray-700", 
        design: "YOUR DESIGN HERE", 
        accent: "text-white",
        shape: "rounded-t-lg",
        size: "aspect-[3/4]"
      },
    ],
  },
  {
    id: "holiday-gifts",
    title: "Holiday Gifts",
    products: [
      { 
        color: "bg-green-600", 
        design: "YOUR DESIGN HERE", 
        accent: "text-white",
        shape: "rounded-lg",
        size: "aspect-[3/4]"
      },
      { 
        color: "bg-white border-2 border-gray-300", 
        design: "LOGO HERE", 
        accent: "text-gray-800",
        shape: "rounded-lg",
        size: "aspect-square"
      },
      { 
        color: "bg-blue-500", 
        design: "", 
        accent: "text-white",
        shape: "rounded-full",
        size: "aspect-square"
      },
      { 
        color: "bg-red-600", 
        design: "YOUR DESIGN HERE", 
        accent: "text-white",
        shape: "rounded-lg",
        size: "aspect-[4/3]"
      },
    ],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Custom Products
          </h1>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
            Design your own custom merchandise
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {productCategories.map((category) => (
            <div
              key={category.id}
              className="group cursor-pointer space-y-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-gray-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {category.title}
              </h2>
              <div className="grid grid-cols-2 gap-2.5">
                {category.products.map((product, idx) => (
                  <div
                    key={idx}
                    className={`relative overflow-hidden ${product.shape} ${product.size} ${product.color} flex items-center justify-center p-1.5 transition-transform group-hover:scale-105`}
                  >
                    <span
                      className={`text-center text-[9px] sm:text-[10px] font-bold ${product.accent} break-words leading-tight px-1`}
                    >
                      {product.design}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
