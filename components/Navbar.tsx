'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogIn, LogOut, User, History, Upload } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import toast from 'react-hot-toast';

export default function Navbar() {
  const [user, setUser] = useState<{ id: string; email: string; name: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    } catch (error) {
      // User not authenticated
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        setUser(null);
        toast.success('Logged out successfully');
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Assignment Assistant
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/upload"
              className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Upload className="w-5 h-5" />
              <span className="hidden sm:inline">Upload</span>
            </Link>

            {!isLoading && (
              <>
                {user ? (
                  <>
                    <Link
                      href="/history"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <History className="w-5 h-5" />
                      <span className="hidden sm:inline">History</span>
                    </Link>
                    <div className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300">
                      <User className="w-5 h-5" />
                      <span className="hidden sm:inline">{user.name}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="hidden sm:inline">Logout</span>
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <LogIn className="w-5 h-5" />
                    <span className="hidden sm:inline">Login</span>
                  </Link>
                )}
              </>
            )}

            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}

