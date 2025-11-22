'use client';

import { useState, useRef } from 'react';
import { Upload, File, X } from 'lucide-react';
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
    // Validate file type
    if (selectedFile.type !== 'application/pdf') {
      toast.error('Please upload a PDF file');
      return;
    }

    // Validate file size
    if (selectedFile.size > maxSize) {
      toast.error(`File size exceeds ${maxSize / 1024 / 1024}MB limit`);
      return;
    }

    setFile(selectedFile);
    onFileSelect(selectedFile);

    // Extract text from PDF
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
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
            transition-colors
            ${isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600'}
            hover:border-blue-400 dark:hover:border-blue-500
          `}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
          <p className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Drag and drop your PDF here
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            or click to browse
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
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
        <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 flex items-center justify-between bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <File className="w-8 h-8 text-blue-500" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {file.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>
          {isUploading ? (
            <div className="text-sm text-blue-600 dark:text-blue-400">
              Parsing...
            </div>
          ) : (
            <button
              onClick={handleRemove}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

