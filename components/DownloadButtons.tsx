'use client';

import { useState } from 'react';
import { Download, FileText, File } from 'lucide-react';
import toast from 'react-hot-toast';

interface DownloadButtonsProps {
  text: string;
  title?: string;
}

export default function DownloadButtons({ text, title = 'Assignment Answer' }: DownloadButtonsProps) {
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [isExportingDOCX, setIsExportingDOCX] = useState(false);

  const handleExportPDF = async () => {
    setIsExportingPDF(true);
    try {
      const response = await fetch('/api/export-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, title }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to export PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `assignment-${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success('PDF downloaded successfully');
    } catch (error) {
      console.error('PDF export error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to export PDF');
    } finally {
      setIsExportingPDF(false);
    }
  };

  const handleExportDOCX = async () => {
    setIsExportingDOCX(true);
    try {
      const response = await fetch('/api/export-docx', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, title }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to export DOCX');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `assignment-${Date.now()}.docx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success('DOCX downloaded successfully');
    } catch (error) {
      console.error('DOCX export error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to export DOCX');
    } finally {
      setIsExportingDOCX(false);
    }
  };

  return (
    <div className="flex gap-4">
      <button
        onClick={handleExportPDF}
        disabled={isExportingPDF || isExportingDOCX}
        className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors"
      >
        <FileText className="w-5 h-5" />
        {isExportingPDF ? 'Exporting...' : 'Download PDF'}
      </button>

      <button
        onClick={handleExportDOCX}
        disabled={isExportingPDF || isExportingDOCX}
        className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors"
      >
        <File className="w-5 h-5" />
        {isExportingDOCX ? 'Exporting...' : 'Download DOCX'}
      </button>
    </div>
  );
}

