'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import AnswerBox from '@/components/AnswerBox';
import DownloadButtons from '@/components/DownloadButtons';
import Loader from '@/components/Loader';
import { RefreshCw, Save, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [answer, setAnswer] = useState('');
  const [originalAnswer, setOriginalAnswer] = useState('');
  const [question, setQuestion] = useState('');
  const [isRewriting, setIsRewriting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const questionParam = searchParams.get('question');
    const answerParam = searchParams.get('answer');

    if (questionParam && answerParam) {
      setQuestion(decodeURIComponent(questionParam));
      setAnswer(decodeURIComponent(answerParam));
      setOriginalAnswer(decodeURIComponent(answerParam));
    } else {
      router.push('/upload');
    }

    // Check authentication
    checkAuth();
  }, [searchParams, router]);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      // User not authenticated
    }
  };

  const handleRewrite = async () => {
    setIsRewriting(true);
    try {
      const response = await fetch('/api/rewrite-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answer }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to rewrite answer');
      }

      setAnswer(data.answer);
      toast.success('Answer rewritten successfully');
    } catch (error) {
      console.error('Rewrite error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to rewrite answer');
    } finally {
      setIsRewriting(false);
    }
  };

  const handleSave = async () => {
    if (!isAuthenticated) {
      toast.error('Please log in to save assignments');
      router.push('/login');
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch('/api/save-assignment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          answer,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save assignment');
      }

      toast.success('Assignment saved successfully');
    } catch (error) {
      console.error('Save error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save assignment');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <Link
            href="/upload"
            className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Upload
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Generated Answer
          </h1>
        </div>

        {question && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Question
            </h2>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {question}
            </p>
          </div>
        )}

        {answer ? (
          <>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
              <AnswerBox answer={answer} />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleRewrite}
                  disabled={isRewriting}
                  className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors"
                >
                  <RefreshCw className={`w-5 h-5 ${isRewriting ? 'animate-spin' : ''}`} />
                  {isRewriting ? 'Rewriting...' : 'Rewrite Answer'}
                </button>

                {isAuthenticated && (
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors"
                  >
                    <Save className="w-5 h-5" />
                    {isSaving ? 'Saving...' : 'Save to History'}
                  </button>
                )}

                <DownloadButtons text={answer} title="Assignment Answer" />
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <Loader message="Loading answer..." />
          </div>
        )}
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <Loader message="Loading..." />
          </div>
        </div>
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}

