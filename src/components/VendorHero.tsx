import Image from 'next/image';
import { Vendor } from '@/lib/types';

interface VendorHeroProps {
  vendor: Vendor;
}

/**
 * VendorHero component displays the vendor's hero image, logo, and name.
 * Server component - no interactivity needed.
 */
export default function VendorHero({ vendor }: VendorHeroProps) {
  return (
    <header className="mb-8">
      {/* Hero Image with overlay */}
      <div className="relative h-48 sm:h-64 md:h-80 rounded-2xl overflow-hidden mb-6">
        <Image
          src={vendor.heroImage}
          alt={`${vendor.name} hero banner`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Vendor name on hero (visible on larger screens) */}
        <div className="absolute bottom-0 left-0 right-0 p-6 hidden sm:block">
          <h1 className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg">
            {vendor.name}
          </h1>
          {vendor.description && (
            <p className="text-white/90 mt-2 max-w-2xl text-sm md:text-base drop-shadow">
              {vendor.description}
            </p>
          )}
        </div>
      </div>
      
      {/* Vendor info section (always visible, primary on mobile) */}
      <div className="flex items-center gap-4 sm:mt-0 mt-2">
        {/* Vendor Logo */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden 
                        ring-4 ring-white dark:ring-gray-800 shadow-lg flex-shrink-0
                        bg-white dark:bg-gray-800">
          <Image
            src={vendor.logo}
            alt={`${vendor.name} logo`}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>
        
        {/* Vendor Name and Description (mobile view) */}
        <div className="sm:hidden">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            {vendor.name}
          </h1>
          {vendor.description && (
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 line-clamp-2">
              {vendor.description}
            </p>
          )}
        </div>
        
        {/* Badge/Verified indicator (optional enhancement) */}
        <div className="hidden sm:flex items-center gap-2 ml-auto">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs 
                           font-medium bg-[#159C47]/10 text-[#159C47]">
            <svg 
              className="w-4 h-4 mr-1" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path 
                fillRule="evenodd" 
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                clipRule="evenodd" 
              />
            </svg>
            Verified Vendor
          </span>
        </div>
      </div>
    </header>
  );
}
