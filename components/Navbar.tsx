'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogIn, LogOut, User, History, Upload, Sparkles } from 'lucide-react';
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
    <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: 'var(--card-glass)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="container mx-auto h-[80px] flex items-center justify-between" style={{ paddingLeft: 'var(--container-padding)', paddingRight: 'var(--container-padding)' }}>
        {/* Logo */}
        <Link 
          href="/" 
          className="text-2xl font-bold gradient-text hover:scale-105 transition-transform duration-300"
        >
          Assignment Assistant
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link
            href="/upload"
            className="hidden md:flex items-center gap-2 px-4 py-2 transition-colors duration-300"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-cyan)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
          >
            <Upload className="w-5 h-5" />
            <span>Upload</span>
          </Link>

          {!isLoading && (
            <>
              {user ? (
                <>
                  <Link
                    href="/history"
                    className="hidden md:flex items-center gap-2 px-4 py-2 transition-colors duration-300"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-cyan)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    <History className="w-5 h-5" />
                    <span>History</span>
                  </Link>
                  <div className="hidden md:flex items-center gap-2 px-4 py-2" style={{ color: 'var(--text-secondary)' }}>
                    <User className="w-5 h-5" />
                    <span>{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 transition-colors duration-300"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-cyan)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="btn-neon glow-hover"
                >
                  <LogIn className="w-5 h-5 inline mr-2" />
                  <span>Get Started</span>
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
