import Link from 'next/link';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

/**
 * 404 Not Found page for vendor routes.
 * Displayed when a vendor slug doesn't match any existing vendor.
 */
export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Icon */}
        <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full 
                        bg-gray-100 dark:bg-gray-800 mb-6">
          <MagnifyingGlassIcon 
            className="h-8 w-8 text-gray-400 dark:text-gray-500" 
            aria-hidden="true" 
          />
        </div>
        
        {/* 404 Message */}
        <h1 className="text-6xl font-bold text-[#159C47] mb-4">
          404
        </h1>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Vendor Not Found
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          The vendor you&apos;re looking for doesn&apos;t exist or may have been removed.
        </p>
        
        {/* Action Button */}
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 
                     bg-[#159C47] hover:bg-[#128A3E] text-white font-medium 
                     rounded-xl transition-colors
                     focus:outline-none focus:ring-2 focus:ring-[#159C47] focus:ring-offset-2
                     dark:focus:ring-offset-gray-900"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
