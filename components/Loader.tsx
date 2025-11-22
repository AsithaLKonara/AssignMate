'use client';

interface LoaderProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Loader({ message = 'Loading...', size = 'md' }: LoaderProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8">
      <div className="relative">
        <div
          className={`${sizeClasses[size]} border-4 border-[rgba(0,232,255,0.2)] border-t-[#00E8FF] rounded-full animate-spin glow-cyan`}
        />
        <div
          className={`absolute inset-0 ${sizeClasses[size]} border-4 border-transparent border-r-[#A855F7] rounded-full animate-spin`}
          style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}
        />
      </div>
      {message && (
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{message}</p>
      )}
    </div>
  );
}
