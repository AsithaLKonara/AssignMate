'use client';

import { useState } from 'react';
import { Copy, Check, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

interface AnswerBoxProps {
  answer: string;
  title?: string;
}

export default function AnswerBox({ answer, title = 'Answer' }: AnswerBoxProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(answer);
      setCopied(true);
      toast.success('Copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy');
    }
  };

  const wordCount = answer.split(/\s+/).filter((word) => word.length > 0).length;
  const characterCount = answer.length;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8" style={{ marginBottom: 'var(--element-gap)' }}>
        <h2 className="text-[24px] font-bold flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
          <div className="p-2 glass-card rounded-lg">
            <FileText className="w-6 h-6" style={{ color: 'var(--accent-cyan)' }} />
          </div>
          {title}
        </h2>
        <button
          onClick={handleCopy}
          className="btn-glass glow-hover flex items-center gap-2"
        >
          {copied ? (
            <>
              <Check className="w-5 h-5" style={{ color: '#10b981' }} />
              <span className="text-sm font-semibold" style={{ color: '#10b981' }}>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-5 h-5" />
              <span className="text-sm font-semibold">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Answer Content */}
      <div className="glass-input p-8 min-h-[400px] rounded-lg">
        <div className="prose prose-invert max-w-none">
          <pre className="whitespace-pre-wrap font-sans leading-relaxed text-base" style={{ color: 'var(--text-primary)' }}>
            {answer}
          </pre>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 flex items-center" style={{ gap: 'var(--element-gap)', marginTop: 'var(--element-gap-sm)' }}>
        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--accent-cyan)' }} />
          <span className="font-medium">{wordCount.toLocaleString()} words</span>
        </div>
        <div className="w-px h-6" style={{ background: 'var(--border-subtle)' }} />
        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--accent-purple)', animationDelay: '0.5s' }} />
          <span className="font-medium">{characterCount.toLocaleString()} characters</span>
        </div>
      </div>
    </div>
  );
}
