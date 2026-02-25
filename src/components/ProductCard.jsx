import Image from 'next/image';

/**
 * ProductCard component displays a single product with image, name, and price.
 * Fully responsive with hover effects.
 */
export default function ProductCard({ product }) {
  return (
    <article
      className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg 
                 transition-all duration-300 overflow-hidden border border-gray-100 
                 dark:border-gray-700 focus-within:ring-2 focus-within:ring-[#159C47]"
    >
      {/* Product Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-gray-900">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      
      {/* Product Details */}
      <div className="p-4">
        <h3 
          className="font-medium text-gray-900 dark:text-white text-sm sm:text-base 
                     line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]"
          title={product.name}
        >
          {product.name}
        </h3>
        
        <div className="mt-2 flex items-center justify-between">
          <span 
            className="text-lg sm:text-xl font-bold text-[#159C47]"
            aria-label={`Price: ${product.price} dollars`}
          >
            ${product.price.toFixed(2)}
          </span>
          
          {/* Optional: Add to cart button could go here */}
          <button
            className="px-3 py-1.5 text-xs sm:text-sm font-medium text-white 
                       bg-[#159C47] hover:bg-[#128A3E] rounded-lg transition-colors
                       focus:outline-none focus:ring-2 focus:ring-[#159C47] focus:ring-offset-2
                       dark:focus:ring-offset-gray-800"
            aria-label={`Add ${product.name} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
