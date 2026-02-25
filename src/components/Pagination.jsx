'use client';

import { useCallback } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

/**
 * Pagination component with previous/next buttons and page numbers.
 * Shows ellipsis for large page counts.
 */
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  // Don't render if there's only one page or no pages
  if (totalPages <= 1) return null;

  const handlePrevious = useCallback(() => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }, [currentPage, onPageChange]);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  }, [currentPage, totalPages, onPageChange]);

  // Page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav 
      className="flex items-center justify-center gap-1 sm:gap-2" 
      aria-label="Pagination"
      role="navigation"
    >
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 
                   rounded-lg border border-gray-200 dark:border-gray-600
                   bg-white dark:bg-gray-800
                   text-gray-700 dark:text-gray-300
                   hover:bg-gray-50 dark:hover:bg-gray-700
                   disabled:opacity-50 disabled:cursor-not-allowed
                   disabled:hover:bg-white dark:disabled:hover:bg-gray-800
                   transition-colors focus:outline-none focus:ring-2 
                   focus:ring-[#159C47] focus:ring-offset-2
                   dark:focus:ring-offset-gray-900"
        aria-label="Go to previous page"
      >
        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pageNumbers.map((page, index) => (
          typeof page === 'number' ? (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10
                         text-sm sm:text-base font-medium rounded-lg
                         transition-colors focus:outline-none focus:ring-2 
                         focus:ring-[#159C47] focus:ring-offset-2
                         dark:focus:ring-offset-gray-900
                         ${currentPage === page
                           ? 'bg-[#159C47] text-white'
                           : 'border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                         }`}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          ) : (
            <span 
              key={index} 
              className="flex items-center justify-center w-9 h-9 text-gray-400"
              aria-hidden="true"
            >
              {page}
            </span>
          )
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 
                   rounded-lg border border-gray-200 dark:border-gray-600
                   bg-white dark:bg-gray-800
                   text-gray-700 dark:text-gray-300
                   hover:bg-gray-50 dark:hover:bg-gray-700
                   disabled:opacity-50 disabled:cursor-not-allowed
                   disabled:hover:bg-white dark:disabled:hover:bg-gray-800
                   transition-colors focus:outline-none focus:ring-2 
                   focus:ring-[#159C47] focus:ring-offset-2
                   dark:focus:ring-offset-gray-900"
        aria-label="Go to next page"
      >
        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </nav>
  );
}
