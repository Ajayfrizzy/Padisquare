import Link from 'next/link';
import Image from 'next/image';
import { fetchAllVendors } from '@/lib/api';

/**
 * Homepage - Lists all available vendors
 * Server component for optimal performance
 */
export default async function Home() {
  const vendors = await fetchAllVendors();

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-[#159C47] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            {/* Logo Image */}
            <div className="flex justify-center mb-8">
              <Image
                src="/light-logo.svg"
                alt="Marketplace Logo"
                width={180}
                height={60}
                priority
                className="h-16 w-auto"
              />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Multi-Vendor Marketplace
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Discover unique products from verified vendors. 
              Shop with confidence from our curated selection of stores.
            </p>
            <a
              href="#vendors"
              className="inline-flex items-center px-8 py-4 bg-white text-[#159C47] 
                         font-semibold rounded-xl hover:bg-gray-100 transition-colors
                         focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 
                         focus:ring-offset-[#159C47]"
            >
              Browse Vendors
              <svg 
                className="w-5 h-5 ml-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 9l-7 7-7-7" 
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Vendors Grid Section */}
      <section id="vendors" className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Vendors
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Explore storefronts from our trusted vendors offering quality products.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {vendors.map((vendor) => (
              <Link
                key={vendor.slug}
                href={`/site/${vendor.slug}`}
                className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden 
                           shadow-sm hover:shadow-xl transition-all duration-300
                           border border-gray-100 dark:border-gray-700
                           focus:outline-none focus:ring-2 focus:ring-[#159C47] focus:ring-offset-2
                           dark:focus:ring-offset-gray-900"
              >
                {/* Vendor Hero Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={vendor.heroImage}
                    alt={`${vendor.name} storefront`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* Vendor Info */}
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    {/* Vendor Logo */}
                    <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-[#159C47]/20 flex-shrink-0">
                      <Image
                        src={vendor.logo}
                        alt={`${vendor.name} logo`}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white 
                                     group-hover:text-[#159C47] transition-colors">
                        {vendor.name}
                      </h3>
                      <span className="inline-flex items-center text-xs text-[#159C47]">
                        <svg 
                          className="w-3 h-3 mr-1" 
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
                        Verified
                      </span>
                    </div>
                  </div>
                  
                  {vendor.description && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                      {vendor.description}
                    </p>
                  )}
                  
                  <div className="mt-4 flex items-center text-[#159C47] font-medium text-sm 
                                  group-hover:translate-x-1 transition-transform">
                    Visit Store
                    <svg 
                      className="w-4 h-4 ml-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5l7 7-7 7" 
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} Padisquare Multi-Vendor Storefront. All rights reserved.</p>
            <p className="mt-2">Built with Next.js 14+ and TailwindCSS</p>
            <p className="mt-2">By</p>
            <p className="mt-2">Oluwaseun Ajao</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
