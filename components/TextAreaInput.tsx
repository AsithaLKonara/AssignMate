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
        className="glass-input w-full min-h-[250px] p-4 rounded-lg resize-none focus:outline-none focus:ring-2 transition-all duration-300"
        style={{
          color: 'var(--text-primary)',
          '--tw-ring-color': 'var(--accent-cyan)',
        } as React.CSSProperties}
        rows={8}
      />
      <div className="flex items-center justify-between mt-2">
        <div className="text-sm flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
          <span>
            {characterCount.toLocaleString()} / {maxLength.toLocaleString()} characters
          </span>
          {remaining < 100 && (
            <span className="text-orange-500 font-medium animate-pulse">
              ({remaining} remaining)
            </span>
          )}
        </div>
        {value && (
          <button
            onClick={handleClear}
            className="p-1 hover:bg-[rgba(239,68,68,0.1)] rounded-lg transition-colors duration-300"
            title="Clear"
          >
            <X className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
          </button>
        )}
      </div>
    </div>
  );
}
