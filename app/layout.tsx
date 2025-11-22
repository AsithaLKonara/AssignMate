import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Assignment Assistant - AI-Powered Academic Helper",
  description: "Upload PDFs or paste questions — get clean, clear answers instantly with AI-powered assignment assistance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="relative">
        <Navbar />
        <main className="relative z-10">
          {children}
        </main>
        <Toaster 
          position="top-right"
          toastOptions={{
            className: 'glass-card',
            style: {
              background: 'rgba(15, 22, 41, 0.95)',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            },
          }}
        />
      </body>
    </html>
  );
}

