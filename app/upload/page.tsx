'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FileUploader from '@/components/FileUploader';
import TextAreaInput from '@/components/TextAreaInput';
import Loader from '@/components/Loader';
import { Sparkles, Upload, FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function UploadPage() {
  const [question, setQuestion] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [mode, setMode] = useState<'upload' | 'paste'>('paste');
  const router = useRouter();

  const handleTextExtracted = (text: string) => {
    setQuestion(text);
    setMode('paste');
  };

  const handleGenerate = async () => {
    if (!question.trim()) {
      toast.error('Please provide a question');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate answer');
      }

      // Navigate to result page with answer
      router.push(`/result?question=${encodeURIComponent(question)}&answer=${encodeURIComponent(data.answer)}`);
    } catch (error) {
      console.error('Generate answer error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to generate answer');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <Link
            href="/"
            className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Upload Assignment
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Upload a PDF or paste your assignment question
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setMode('upload')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                mode === 'upload'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Upload className="w-5 h-5" />
              Upload PDF
            </button>
            <button
              onClick={() => setMode('paste')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                mode === 'paste'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <FileText className="w-5 h-5" />
              Paste Question
            </button>
          </div>

          {mode === 'upload' ? (
            <FileUploader
              onFileSelect={() => {}}
              onTextExtracted={handleTextExtracted}
            />
          ) : (
            <TextAreaInput
              value={question}
              onChange={setQuestion}
              placeholder="Paste your assignment question here..."
            />
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <button
            onClick={handleGenerate}
            disabled={!question.trim() || isGenerating}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-lg transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <Loader size="sm" message="" />
                <span>Generating Answer...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Generate Answer</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

