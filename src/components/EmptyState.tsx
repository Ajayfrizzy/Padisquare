import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface EmptyStateProps {
  title?: string;
  message?: string;
  showIcon?: boolean;
}

/**
 * EmptyState component displayed when no products match the search/filter criteria.
 * Server component - no interactivity needed.
 */
export default function EmptyState({ 
  title = 'No products found',
  message = 'Try adjusting your search or filter to find what you\'re looking for.',
  showIcon = true
}: EmptyStateProps) {
  return (
    <div 
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
      role="status"
      aria-live="polite"
    >
      {showIcon && (
        <div className="w-16 h-16 mb-6 rounded-full bg-gray-100 dark:bg-gray-800 
                        flex items-center justify-center">
          <MagnifyingGlassIcon 
            className="h-8 w-8 text-gray-400 dark:text-gray-500" 
            aria-hidden="true" 
          />
        </div>
      )}
      
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      
      <p className="text-gray-500 dark:text-gray-400 max-w-md">
        {message}
      </p>
    </div>
  );
}
