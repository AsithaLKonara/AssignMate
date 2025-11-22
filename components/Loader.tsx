'use client';

interface LoaderProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Loader({ message = 'Loading...', size = 'md' }: LoaderProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8">
      <div
        className={`${sizeClasses[size]} border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin`}
      />
      {message && (
        <p className="text-gray-600 dark:text-gray-400 text-sm">{message}</p>
      )}
    </div>
  );
}

