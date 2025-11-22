import Link from 'next/link';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <FileQuestion className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          404
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Page not found
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}

