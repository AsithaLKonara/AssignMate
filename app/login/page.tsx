'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogIn, Mail, Lock, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      toast.success('Login successful');
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative pt-[100px] pb-16 flex items-center justify-center">
      <div className="container mx-auto max-w-md w-full">
        <div className="glass-card-strong animate-fade-in">
          {/* Header */}
          <div className="text-center mb-10" style={{ marginBottom: 'var(--element-gap)' }}>
            <div className="inline-flex p-4 glass-card rounded-lg mb-6">
              <LogIn className="w-8 h-8" style={{ color: 'var(--accent-cyan)' }} />
            </div>
            <h1 className="text-[32px] font-bold mb-3 gradient-text">Welcome Back</h1>
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              Sign in to your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col" style={{ gap: 'var(--element-gap)' }}>
            <div>
              <label className="block text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                Email
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 group-focus-within:text-[#00E8FF]" style={{ color: 'var(--text-secondary)' }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="glass-input w-full pl-12 pr-4 py-4 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                  style={{
                    color: 'var(--text-primary)',
                    '--tw-ring-color': 'var(--accent-cyan)',
                  } as React.CSSProperties}
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 group-focus-within:text-[#00E8FF]" style={{ color: 'var(--text-secondary)' }} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="glass-input w-full pl-12 pr-4 py-4 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                  style={{
                    color: 'var(--text-primary)',
                    '--tw-ring-color': 'var(--accent-cyan)',
                  } as React.CSSProperties}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-neon glow-hover disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none flex items-center justify-center gap-2 mt-4"
              style={{ marginTop: 'var(--element-gap)' }}
            >
              <LogIn className="w-5 h-5" />
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-10 text-center" style={{ marginTop: 'var(--element-gap)' }}>
            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
              Don't have an account?{' '}
              <Link href="/register" className="font-semibold gradient-text hover:underline">
                Register
              </Link>
            </p>
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-sm transition-colors duration-300"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-cyan)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
