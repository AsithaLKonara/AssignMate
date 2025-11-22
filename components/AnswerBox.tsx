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
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <FileText className="w-6 h-6" />
          {title}
        </h2>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-600">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Copy</span>
            </>
          )}
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-6 min-h-[300px]">
        <div className="prose dark:prose-invert max-w-none">
          <pre className="whitespace-pre-wrap font-sans text-gray-900 dark:text-white">
            {answer}
          </pre>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        <span>{wordCount.toLocaleString()} words</span>
        <span>{characterCount.toLocaleString()} characters</span>
      </div>
    </div>
  );
}

