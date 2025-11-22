'use client';

import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface TextAreaInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
}

export default function TextAreaInput({
  value,
  onChange,
  placeholder = 'Paste your assignment question here...',
  maxLength = 10000,
}: TextAreaInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const handleClear = () => {
    onChange('');
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const characterCount = value.length;
  const remaining = maxLength - characterCount;

  return (
    <div className="w-full relative">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className="w-full min-h-[200px] p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
        rows={8}
      />
      <div className="flex items-center justify-between mt-2">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {characterCount.toLocaleString()} / {maxLength.toLocaleString()} characters
          {remaining < 100 && (
            <span className="text-orange-500 ml-2">
              ({remaining} remaining)
            </span>
          )}
        </div>
        {value && (
          <button
            onClick={handleClear}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
            title="Clear"
          >
            <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </button>
        )}
      </div>
    </div>
  );
}

