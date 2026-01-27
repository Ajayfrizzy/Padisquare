'use client';

import { useCallback, useTransition } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface SortOption {
  value: string;
  label: string;
}

interface SortSelectProps {
  options: SortOption[];
  value: string;
  onChange: (value: string) => void;
}

/**
 * SortSelect component for product sorting options.
 * Client component for interactivity.
 */
export default function SortSelect({ options, value, onChange }: SortSelectProps) {
  const [isPending, startTransition] = useTransition();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    startTransition(() => {
      onChange(e.target.value);
    });
  }, [onChange]);

  return (
    <div className="relative">
      <label htmlFor="sort-select" className="sr-only">
        Sort products
      </label>
      
      <select
        id="sort-select"
        value={value}
        onChange={handleChange}
        className={`appearance-none w-full sm:w-auto pl-4 pr-10 py-2.5 sm:py-3 
                   text-sm sm:text-base font-medium
                   border border-gray-200 dark:border-gray-600 rounded-xl
                   bg-white dark:bg-gray-800
                   text-gray-900 dark:text-white
                   focus:outline-none focus:ring-2 focus:ring-[#159C47] focus:border-transparent
                   cursor-pointer transition-all duration-200
                   ${isPending ? 'opacity-70' : ''}`}
        disabled={isPending}
        aria-busy={isPending}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {/* Custom dropdown arrow */}
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        {isPending ? (
          <div className="h-4 w-4 border-2 border-[#159C47] border-t-transparent rounded-full animate-spin" />
        ) : (
          <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        )}
      </div>
    </div>
  );
}
