'use client';

import { useState, useRef } from 'react';
import { Upload, File, X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  onTextExtracted: (text: string) => void;
  maxSize?: number; // in bytes
}

export default function FileUploader({
  onFileSelect,
  onTextExtracted,
  maxSize = 10 * 1024 * 1024, // 10MB default
}: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (selectedFile: File) => {
    if (selectedFile.type !== 'application/pdf') {
      toast.error('Please upload a PDF file');
      return;
    }

    if (selectedFile.size > maxSize) {
      toast.error(`File size exceeds ${maxSize / 1024 / 1024}MB limit`);
      return;
    }

    setFile(selectedFile);
    onFileSelect(selectedFile);

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('/api/parse-pdf', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to parse PDF');
      }

      onTextExtracted(data.text);
      toast.success('PDF parsed successfully');
    } catch (error) {
      console.error('PDF parsing error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to parse PDF');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const handleRemove = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      {!file ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            glass-input border-2 border-dashed rounded-lg p-12 text-center cursor-pointer
            transition-all duration-300 hover-scale
            ${isDragging 
              ? 'border-[#00E8FF] glow-cyan' 
              : 'border-[rgba(255,255,255,0.12)] hover:border-[rgba(255,255,255,0.2)]'
            }
          `}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload 
            className={`w-12 h-12 mx-auto mb-4 transition-colors duration-300 ${
              isDragging ? 'text-[#00E8FF]' : 'text-[#A1A1AA]'
            }`}
          />
          <p className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            Drag and drop your PDF here
          </p>
          <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
            or click to browse
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Maximum file size: {maxSize / 1024 / 1024}MB
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleInputChange}
            className="hidden"
          />
        </div>
      ) : (
        <div className="glass-card p-4 flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="p-3 glass-card-strong rounded-lg">
              <File className="w-8 h-8" style={{ color: 'var(--accent-cyan)' }} />
            </div>
            <div>
              <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                {file.name}
              </p>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>
          {isUploading ? (
            <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--accent-cyan)' }}>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Parsing PDF...</span>
            </div>
          ) : (
            <button
              onClick={handleRemove}
              className="p-2 hover:bg-[rgba(239,68,68,0.1)] rounded-lg transition-colors duration-300"
            >
              <X className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
