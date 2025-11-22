'use client';

import Link from "next/link";
import { FileText, Upload, History, Download, Sparkles, Zap, RefreshCw, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <section className="hero-padding relative z-10">
        <div className="container mx-auto">
          {/* Hero Content */}
          <div className="text-center max-w-5xl mx-auto mb-20 animate-fade-in" style={{ marginBottom: 'var(--section-gap)' }}>
            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 glass-card-sm mb-8 animate-float" style={{ marginBottom: 'var(--element-gap)' }}>
              <Sparkles className="w-4 h-4" style={{ color: 'var(--accent-cyan)' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>AI-Powered Assignment Assistant</span>
            </div>

            {/* Main Title */}
            <h1 className="text-[64px] font-bold mb-8 leading-[1.1] tracking-tight" style={{ color: 'var(--text-primary)', marginBottom: 'var(--element-gap)' }}>
              <span className="gradient-text">Your AI‑powered</span>
              <br />
              <span style={{ color: 'var(--text-primary)' }}>Assignment Assistant</span>
            </h1>

            {/* Subtitle */}
            <p className="text-[22px] mb-12 max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)', marginBottom: 'var(--element-gap)' }}>
              Upload PDFs or paste questions — get clean, clear answers instantly.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20" style={{ gap: 'var(--button-gap)', marginBottom: 'var(--section-gap)' }}>
              <Link
                href="/upload"
                className="btn-neon glow-hover group flex items-center gap-2"
              >
                <Upload className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                <span>Upload PDF</span>
              </Link>
              <Link
                href="/upload"
                className="btn-glass glow-hover group flex items-center gap-2"
              >
                <FileText className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span>Paste Question</span>
              </Link>
            </div>

            {/* Preview Card */}
            <div className="glass-card-strong max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-4 mb-8" style={{ gap: 'var(--element-gap-sm)', marginBottom: 'var(--element-gap)' }}>
                <div className="p-3 glass-card rounded-lg">
                  <FileText className="w-6 h-6" style={{ color: 'var(--accent-cyan)' }} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>Question Preview</h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Sample assignment question</p>
                </div>
              </div>
              <div className="glass-input p-6 rounded-lg mb-6" style={{ marginBottom: 'var(--element-gap-sm)' }}>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Explain the key principles of quantum computing and its potential applications...
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Zap className="w-4 h-4 animate-pulse-glow" style={{ color: 'var(--accent-purple)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>AI Answer Generation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="section-padding relative z-10">
        <div className="container mx-auto">
          <div className="text-center mb-20" style={{ marginBottom: 'var(--section-gap)' }}>
            <h2 className="text-[32px] font-bold mb-6" style={{ color: 'var(--text-primary)', marginBottom: 'var(--element-gap-sm)' }}>Powerful Features</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Everything you need to excel in your academic assignments
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4" style={{ gap: 'var(--card-gap)' }}>
            {/* Feature Card 1: Upload & Parse PDF */}
            <div className="glass-card hover-scale group animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="p-4 glass-card-strong rounded-lg w-fit mb-6 group-hover:glow-cyan transition-all duration-300" style={{ marginBottom: 'var(--element-gap-sm)' }}>
                <Upload className="w-8 h-8" style={{ color: 'var(--accent-cyan)' }} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)', marginBottom: '12px' }}>Upload & Parse PDF</h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)', marginBottom: 'var(--element-gap-sm)' }}>
                Drag and drop your PDF files. Automatic text extraction powered by advanced AI.
              </p>
              <div className="h-0.5 w-0 bg-gradient-to-r from-[#00E8FF] to-[#A855F7] group-hover:w-full transition-all duration-500" />
            </div>

            {/* Feature Card 2: AI Answer Generation */}
            <div className="glass-card hover-scale group animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="p-4 glass-card-strong rounded-lg w-fit mb-6 group-hover:glow-purple transition-all duration-300" style={{ marginBottom: 'var(--element-gap-sm)' }}>
                <Sparkles className="w-8 h-8" style={{ color: 'var(--accent-purple)' }} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)', marginBottom: '12px' }}>AI Answer Generation</h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)', marginBottom: 'var(--element-gap-sm)' }}>
                Get comprehensive, well-structured answers powered by GPT-4. Perfect for any subject.
              </p>
              <div className="h-0.5 w-0 bg-gradient-to-r from-[#A855F7] to-[#00E8FF] group-hover:w-full transition-all duration-500" />
            </div>

            {/* Feature Card 3: Rewrite to Human Style */}
            <div className="glass-card hover-scale group animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="p-4 glass-card-strong rounded-lg w-fit mb-6 group-hover:glow-cyan transition-all duration-300" style={{ marginBottom: 'var(--element-gap-sm)' }}>
                <RefreshCw className="w-8 h-8" style={{ color: 'var(--accent-cyan)' }} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)', marginBottom: '12px' }}>Rewrite to Human Style</h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)', marginBottom: 'var(--element-gap-sm)' }}>
                Transform AI-generated text into natural, human-like content with one click.
              </p>
              <div className="h-0.5 w-0 bg-gradient-to-r from-[#00E8FF] to-[#A855F7] group-hover:w-full transition-all duration-500" />
            </div>

            {/* Feature Card 4: One-click Export */}
            <div className="glass-card hover-scale group animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="p-4 glass-card-strong rounded-lg w-fit mb-6 group-hover:glow-purple transition-all duration-300" style={{ marginBottom: 'var(--element-gap-sm)' }}>
                <Download className="w-8 h-8" style={{ color: 'var(--accent-purple)' }} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)', marginBottom: '12px' }}>One-click Export</h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)', marginBottom: 'var(--element-gap-sm)' }}>
                Download your answers as professional PDF or DOCX files. Perfect formatting for submission.
              </p>
              <div className="h-0.5 w-0 bg-gradient-to-r from-[#A855F7] to-[#00E8FF] group-hover:w-full transition-all duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding relative z-10">
        <div className="container mx-auto">
          <div className="glass-card-strong text-center max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-[32px] font-bold mb-6 gradient-text" style={{ marginBottom: 'var(--element-gap-sm)' }}>Ready to Get Started?</h2>
            <p className="mb-10 text-lg max-w-xl mx-auto" style={{ color: 'var(--text-secondary)', marginBottom: 'var(--element-gap)' }}>
              Join thousands of students using AI to excel in their assignments
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center" style={{ gap: 'var(--button-gap)' }}>
              <Link
                href="/upload"
                className="btn-neon glow-hover group flex items-center gap-2"
              >
                <span>Start Now - It's Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                href="/history"
                className="btn-glass glow-hover"
              >
                View History
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="section-padding relative z-10" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 mb-12" style={{ gap: 'var(--card-gap)', marginBottom: 'var(--element-gap)' }}>
            <div>
              <h3 className="text-lg font-semibold mb-6" style={{ color: 'var(--text-primary)', marginBottom: 'var(--element-gap-sm)' }}>Product</h3>
              <ul className="flex flex-col" style={{ gap: '12px' }}>
                <li><Link href="/upload" className="hover:text-[#00E8FF] transition-colors text-sm" style={{ color: 'var(--text-secondary)' }}>Upload</Link></li>
                <li><Link href="/history" className="hover:text-[#00E8FF] transition-colors text-sm" style={{ color: 'var(--text-secondary)' }}>History</Link></li>
                <li><Link href="/login" className="hover:text-[#00E8FF] transition-colors text-sm" style={{ color: 'var(--text-secondary)' }}>Login</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6" style={{ color: 'var(--text-primary)', marginBottom: 'var(--element-gap-sm)' }}>Resources</h3>
              <ul className="flex flex-col" style={{ gap: '12px' }}>
                <li><a href="#" className="hover:text-[#00E8FF] transition-colors text-sm" style={{ color: 'var(--text-secondary)' }}>Documentation</a></li>
                <li><a href="#" className="hover:text-[#00E8FF] transition-colors text-sm" style={{ color: 'var(--text-secondary)' }}>FAQ</a></li>
                <li><a href="#" className="hover:text-[#00E8FF] transition-colors text-sm" style={{ color: 'var(--text-secondary)' }}>Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6" style={{ color: 'var(--text-primary)', marginBottom: 'var(--element-gap-sm)' }}>Company</h3>
              <ul className="flex flex-col" style={{ gap: '12px' }}>
                <li><a href="#" className="hover:text-[#00E8FF] transition-colors text-sm" style={{ color: 'var(--text-secondary)' }}>About</a></li>
                <li><a href="#" className="hover:text-[#00E8FF] transition-colors text-sm" style={{ color: 'var(--text-secondary)' }}>Privacy</a></li>
                <li><a href="#" className="hover:text-[#00E8FF] transition-colors text-sm" style={{ color: 'var(--text-secondary)' }}>Terms</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6" style={{ color: 'var(--text-primary)', marginBottom: 'var(--element-gap-sm)' }}>Connect</h3>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 glass-card rounded-lg flex items-center justify-center hover:glow-cyan transition-all duration-300">
                  <span style={{ color: 'var(--text-secondary)' }} className="hover:text-[#00E8FF] transition-colors">@</span>
                </a>
                <a href="#" className="w-10 h-10 glass-card rounded-lg flex items-center justify-center hover:glow-purple transition-all duration-300">
                  <span style={{ color: 'var(--text-secondary)' }} className="hover:text-[#A855F7] transition-colors">#</span>
                </a>
              </div>
            </div>
          </div>
          <div className="text-center pt-8" style={{ borderTop: '1px solid var(--border-subtle)' }}>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              © 2025 Assignment Assistant. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
