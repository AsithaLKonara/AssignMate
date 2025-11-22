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
    <div className="min-h-screen relative pt-[100px] pb-16">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 animate-fade-in" style={{ marginBottom: 'var(--element-gap)' }}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-8 transition-colors duration-300"
            style={{ color: 'var(--text-secondary)', marginBottom: 'var(--element-gap-sm)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-cyan)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
          <h1 className="text-[32px] font-bold mb-4" style={{ color: 'var(--text-primary)', marginBottom: 'var(--element-gap-sm)' }}>
            Assignment History
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            View and manage your saved assignments
          </p>
        </div>

        {/* Search & List */}
        <div className="glass-card animate-fade-in">
          {/* Search Bar */}
          <div className="relative mb-8" style={{ marginBottom: 'var(--element-gap)' }}>
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
            <input
              type="text"
              placeholder="Search assignments..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              className="glass-input w-full pl-12 pr-4 py-4 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
              style={{
                color: 'var(--text-primary)',
                '--tw-ring-color': 'var(--accent-cyan)',
              } as React.CSSProperties}
            />
          </div>

          {/* Content */}
          {isLoading ? (
            <Loader message="Loading assignments..." />
          ) : assignments.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex p-6 glass-card-strong rounded-lg mb-6">
                <FileText className="w-16 h-16" style={{ color: 'var(--text-secondary)' }} />
              </div>
              <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                {searchQuery ? 'No assignments found matching your search' : 'No assignments saved yet'}
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-col" style={{ gap: 'var(--element-gap-sm)' }}>
                {assignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="glass-card-sm hover-scale group transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold mb-3 line-clamp-2 text-lg" style={{ color: 'var(--text-primary)' }}>
                          {assignment.question.substring(0, 150)}
                          {assignment.question.length > 150 ? '...' : ''}
                        </h3>
                        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--accent-cyan)' }} />
                          <span>
                            {new Date(assignment.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center" style={{ gap: '8px' }}>
                        <button
                          onClick={() => handleView(assignment)}
                          className="p-3 glass-card-strong rounded-lg hover:glow-cyan transition-all duration-300 group/btn"
                          title="View"
                        >
                          <Eye className="w-5 h-5 transition-transform duration-300 group-hover/btn:scale-110" style={{ color: 'var(--accent-cyan)' }} />
                        </button>
                        <button
                          onClick={() => handleDelete(assignment.id)}
                          className="p-3 glass-card-strong rounded-lg hover:bg-[rgba(239,68,68,0.1)] transition-all duration-300 group/btn"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5 transition-transform duration-300 group-hover/btn:rotate-12" style={{ color: '#ef4444' }} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center mt-12" style={{ gap: 'var(--button-gap)', marginTop: 'var(--element-gap)' }}>
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="btn-glass disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
                  >
                    Previous
                  </button>
                  <div className="glass-input px-6 py-3 rounded-lg">
                    <span className="font-semibold" style={{ color: 'var(--text-secondary)' }}>
                      Page {page} of {totalPages}
                    </span>
                  </div>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="btn-glass disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
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
