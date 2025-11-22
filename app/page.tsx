import Link from "next/link";
import { FileText, Upload, History, Download } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Assignment Assistant Tool
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            AI-powered assistance for your academic assignments
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <Upload className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Upload PDF</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Upload your assignment PDF and extract questions automatically
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <FileText className="w-12 h-12 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI Answers</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Get comprehensive answers powered by GPT-4
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <Download className="w-12 h-12 text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Export</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Download your answers as PDF or DOCX
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <History className="w-12 h-12 text-orange-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">History</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Save and access your assignment history
            </p>
          </div>
        </div>

        <div className="text-center space-y-4">
          <Link
            href="/upload"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors"
          >
            Get Started
          </Link>
          <div>
            <Link
              href="/history"
              className="text-blue-600 dark:text-blue-400 hover:underline mr-4"
            >
              View History
            </Link>
            <Link
              href="/login"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

