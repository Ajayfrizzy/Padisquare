'use client';

import { useEffect } from 'react';
import { ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

/**
 * Error boundary component for the vendor page.
 * Displayed automatically by Next.js when an error occurs.
 * Provides user-friendly error message and retry option.
 */
export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Vendor page error:', error);
  }, [error]);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full 
                        bg-red-100 dark:bg-red-900/30 mb-6">
          <ExclamationTriangleIcon 
            className="h-8 w-8 text-red-600 dark:text-red-400" 
            aria-hidden="true" 
          />
        </div>
        
        {/* Error Message */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Something went wrong
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          We encountered an error while loading this page. 
          Please try again or come back later.
        </p>
        
        {/* Error Details (development only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-left">
            <p className="text-xs font-mono text-red-600 dark:text-red-400 break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs font-mono text-gray-500 mt-2">
                Digest: {error.digest}
              </p>
            )}
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center px-6 py-3 
                       bg-[#159C47] hover:bg-[#128A3E] text-white font-medium 
                       rounded-xl transition-colors
                       focus:outline-none focus:ring-2 focus:ring-[#159C47] focus:ring-offset-2
                       dark:focus:ring-offset-gray-900"
          >
            <ArrowPathIcon className="h-5 w-5 mr-2" aria-hidden="true" />
            Try Again
          </button>
          
          <a
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 
                       border border-gray-200 dark:border-gray-600
                       text-gray-700 dark:text-gray-300 font-medium 
                       rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800
                       transition-colors
                       focus:outline-none focus:ring-2 focus:ring-[#159C47] focus:ring-offset-2
                       dark:focus:ring-offset-gray-900"
          >
            Go Home
          </a>
        </div>
      </div>
    </main>
  );
}
