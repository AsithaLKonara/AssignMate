'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FileText, Search, Trash2, ArrowLeft, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import Loader from '@/components/Loader';

interface Assignment {
  id: string;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
}

export default function HistoryPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  useEffect(() => {
    fetchAssignments();
  }, [page, searchQuery]);

  const fetchAssignments = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
      });

      if (searchQuery) {
        params.append('search', searchQuery);
      }

      const response = await fetch(`/api/assignments?${params.toString()}`);

      if (response.status === 401) {
        router.push('/login');
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch assignments');
      }

      setAssignments(data.assignments);
      setTotalPages(data.pagination.pages);
    } catch (error) {
      console.error('Fetch assignments error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to fetch assignments');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this assignment?')) {
      return;
    }

    try {
      const response = await fetch(`/api/assignments/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete assignment');
      }

      toast.success('Assignment deleted successfully');
      fetchAssignments();
    } catch (error) {
      console.error('Delete assignment error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to delete assignment');
    }
  };

  const handleView = (assignment: Assignment) => {
    router.push(
      `/result?question=${encodeURIComponent(assignment.question)}&answer=${encodeURIComponent(assignment.answer)}`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <Link
            href="/"
            className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Assignment History
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage your saved assignments
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search assignments..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {isLoading ? (
            <Loader message="Loading assignments..." />
          ) : assignments.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                {searchQuery ? 'No assignments found matching your search' : 'No assignments saved yet'}
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {assignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                          {assignment.question.substring(0, 150)}
                          {assignment.question.length > 150 ? '...' : ''}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(assignment.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleView(assignment)}
                          className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </button>
                        <button
                          onClick={() => handleDelete(assignment.id)}
                          className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                  >
                    Previous
                  </button>
                  <span className="text-gray-600 dark:text-gray-400">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

