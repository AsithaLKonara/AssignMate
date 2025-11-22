'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import AnswerBox from '@/components/AnswerBox';
import DownloadButtons from '@/components/DownloadButtons';
import Loader from '@/components/Loader';
import { RefreshCw, Save, ArrowLeft, FileText } from 'lucide-react';
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
    <div className="min-h-screen relative pt-[100px] pb-16">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-12 animate-fade-in" style={{ marginBottom: 'var(--element-gap)' }}>
          <Link
            href="/upload"
            className="inline-flex items-center gap-2 mb-8 transition-colors duration-300"
            style={{ color: 'var(--text-secondary)', marginBottom: 'var(--element-gap-sm)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-cyan)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Upload</span>
          </Link>
          <h1 className="text-[32px] font-bold mb-4" style={{ color: 'var(--text-primary)', marginBottom: 'var(--element-gap-sm)' }}>
            Generated Answer
          </h1>
        </div>

        {/* Question Display */}
        {question && (
          <div className="glass-card mb-8 animate-fade-in" style={{ marginBottom: 'var(--element-gap)' }}>
            <div className="flex items-center gap-4 mb-6" style={{ gap: 'var(--element-gap-sm)', marginBottom: 'var(--element-gap-sm)' }}>
              <div className="p-3 glass-card-strong rounded-lg">
                <FileText className="w-6 h-6" style={{ color: 'var(--accent-cyan)' }} />
              </div>
              <h2 className="text-[24px] font-semibold" style={{ color: 'var(--text-primary)' }}>
                Question
              </h2>
            </div>
            <div className="glass-input p-6 rounded-lg">
              <p className="whitespace-pre-wrap leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                {question}
              </p>
            </div>
          </div>
        )}

        {/* Answer Display */}
        {answer ? (
          <>
            <div className="glass-card-strong mb-8 animate-fade-in" style={{ marginBottom: 'var(--element-gap)' }}>
              <AnswerBox answer={answer} />
            </div>

            {/* Action Buttons */}
            <div className="glass-card animate-fade-in">
              <div className="flex flex-wrap items-center" style={{ gap: 'var(--button-gap)' }}>
                <button
                  onClick={handleRewrite}
                  disabled={isRewriting}
                  className="btn-neon glow-hover disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none flex items-center gap-2"
                >
                  <RefreshCw className={`w-5 h-5 ${isRewriting ? 'animate-spin' : ''}`} />
                  {isRewriting ? 'Rewriting...' : 'Rewrite Answer'}
                </button>

                {isAuthenticated && (
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="btn-glass glow-hover disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Save className={`w-5 h-5 ${isSaving ? 'animate-pulse' : ''}`} />
                    {isSaving ? 'Saving...' : 'Save to History'}
                  </button>
                )}

                <DownloadButtons text={answer} title="Assignment Answer" />
              </div>
            </div>
          </>
        ) : (
          <div className="glass-card-strong animate-fade-in">
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
      <div className="min-h-screen relative pt-[100px] pb-16">
        <div className="container mx-auto max-w-5xl">
          <div className="glass-card-strong">
            <Loader message="Loading..." />
          </div>
        </div>
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}
