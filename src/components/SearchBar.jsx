'use client';

import { useCallback, useState, useTransition } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

/**
 * SearchBar component with debounced input and clear functionality.
 * Client component for interactivity.
 */
export default function SearchBar({ 
  defaultValue = '', 
  onSearch, 
  placeholder = 'Search products...' 
}) {
  const [value, setValue] = useState(defaultValue);
  const [isPending, startTransition] = useTransition();

  const handleChange = useCallback((e) => {
    const newValue = e.target.value;
    setValue(newValue);
    
    // Use transition for non-urgent updates
    startTransition(() => {
      onSearch(newValue);
    });
  }, [onSearch]);

  const handleClear = useCallback(() => {
    setValue('');
    startTransition(() => {
      onSearch('');
    });
  }, [onSearch]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onSearch(value);
  }, [onSearch, value]);

  return (
    <form onSubmit={handleSubmit} role="search" className="w-full">
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon 
            className={`h-5 w-5 transition-colors ${
              isPending ? 'text-[#159C47]' : 'text-gray-400 dark:text-gray-500'
            }`} 
            aria-hidden="true" 
          />
        </div>
        
        {/* Input Field */}
        <input
          type="search"
          name="search"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="block w-full pl-10 pr-10 py-2.5 sm:py-3 text-sm sm:text-base
                     border border-gray-200 dark:border-gray-600 rounded-xl
                     bg-white dark:bg-gray-800 
                     text-gray-900 dark:text-white
                     placeholder-gray-400 dark:placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-[#159C47] focus:border-transparent
                     transition-all duration-200"
          aria-label="Search products"
          autoComplete="off"
        />
        
        {/* Clear Button */}
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center
                       text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
                       transition-colors"
            aria-label="Clear search"
          >
            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
        
        {/* Loading indicator */}
        {isPending && (
          <div className="absolute inset-y-0 right-8 flex items-center pr-2">
            <div className="h-4 w-4 border-2 border-[#159C47] border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </form>
  );
}
