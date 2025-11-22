'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FileUploader from '@/components/FileUploader';
import TextAreaInput from '@/components/TextAreaInput';
import Loader from '@/components/Loader';
import { Sparkles, Upload, FileText, ArrowLeft, Zap } from 'lucide-react';
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

      router.push(`/result?question=${encodeURIComponent(question)}&answer=${encodeURIComponent(data.answer)}`);
    } catch (error) {
      console.error('Generate answer error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to generate answer');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen relative pt-[100px] pb-16">
      <div className="container mx-auto max-w-7xl">
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
            Upload Assignment
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Upload a PDF or paste your assignment question
          </p>
        </div>

        {/* Tool Workspace - Split Layout */}
        <div className="grid lg:grid-cols-2" style={{ gap: 'var(--card-gap)' }}>
          {/* Left Panel - Input */}
          <div className="flex flex-col" style={{ gap: 'var(--element-gap)' }}>
            {/* Mode Selection */}
            <div className="glass-card animate-fade-in">
              <div className="flex" style={{ gap: 'var(--button-gap)', marginBottom: 'var(--element-gap)' }}>
                <button
                  onClick={() => setMode('upload')}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                    mode === 'upload'
                      ? 'btn-neon glow-button'
                      : 'btn-glass'
                  }`}
                >
                  <Upload className="w-5 h-5" />
                  <span>Upload PDF</span>
                </button>
                <button
                  onClick={() => setMode('paste')}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                    mode === 'paste'
                      ? 'btn-neon glow-button'
                      : 'btn-glass'
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  <span>Paste Question</span>
                </button>
              </div>

              {/* Input Area */}
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

            {/* Generate Button */}
            <div className="glass-card animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <button
                onClick={handleGenerate}
                disabled={!question.trim() || isGenerating}
                className="w-full btn-neon glow-hover disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader size="sm" message="" />
                    <span>Generating Answer...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    <span>Generate Answer with AI</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="flex flex-col" style={{ gap: 'var(--element-gap)' }}>
            <div className="glass-card-strong animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-4 mb-8" style={{ gap: 'var(--element-gap-sm)', marginBottom: 'var(--element-gap)' }}>
                <div className="p-3 glass-card rounded-lg">
                  <FileText className="w-6 h-6" style={{ color: 'var(--accent-cyan)' }} />
                </div>
                <h2 className="text-[24px] font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Answer Preview
                </h2>
              </div>

              {question ? (
                <div className="space-y-4">
                  <div className="glass-input p-4 rounded-lg">
                    <p className="text-sm mb-2 font-medium" style={{ color: 'var(--text-secondary)' }}>
                      Question:
                    </p>
                    <p className="text-sm whitespace-pre-wrap leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                      {question.substring(0, 200)}{question.length > 200 ? '...' : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <Zap className="w-4 h-4 animate-pulse-glow" style={{ color: 'var(--accent-purple)' }} />
                    <span>AI will generate your answer here after you click "Generate Answer"</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex p-4 glass-card rounded-lg mb-4">
                    <Sparkles className="w-8 h-8" style={{ color: 'var(--text-secondary)' }} />
                  </div>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Enter your question to see a preview of the generated answer
                  </p>
                </div>
              )}
            </div>

            {/* Info Card */}
            <div className="glass-card animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <h3 className="text-lg font-semibold mb-6" style={{ color: 'var(--text-primary)', marginBottom: 'var(--element-gap-sm)' }}>
                How it works
              </h3>
              <ul className="flex flex-col" style={{ gap: 'var(--element-gap-sm)' }}>
                <li className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--accent-cyan)' }}>•</span>
                  <span>Upload a PDF or paste your question</span>
                </li>
                <li className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--accent-purple)' }}>•</span>
                  <span>AI analyzes and generates comprehensive answers</span>
                </li>
                <li className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--accent-cyan)' }}>•</span>
                  <span>Export as PDF or DOCX when ready</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
