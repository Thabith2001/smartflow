'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { ROUTES } from '@/lib/routes';
import Link from 'next/link';
import {
  FaLock,
  FaUserShield,
  FaCheckCircle,
  FaArrowRight,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from 'react-icons/fa';

export default function AdminLoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (email === 'admin@gmail.com' && password === 'admin123') {
        login('ADMIN');
        router.push(`/${ROUTES.DASHBOARD}`);
      } else if (email === 'manager@pms.com' && password === 'manager123') {
        login('MANAGER');
        router.push(`/${ROUTES.DASHBOARD}`);
      } else {
        setError('Invalid credentials. Please try again.');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col font-sans">
      {/* HEADER  */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-blue-900 shadow-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <Link href="/" className="text-xl font-extrabold tracking-tight text-white">
            SMART<span className="text-yellow-400">FLOW</span>
          </Link>
          <nav className="flex gap-6 text-sm font-medium text-white/80">
            <Link href="/" className="hover:text-yellow-400 transition-colors">
              Home
            </Link>
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-grow flex items-center justify-center p-6 py-12">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white border border-zinc-200 shadow-sm overflow-hidden rounded-lg">
          {/* LEFT – LOGIN */}
          <div className="p-10 md:p-14">
            <h1 className="text-3xl font-bold text-blue-950 uppercase">Staff Login</h1>
            <p className="text-sm text-slate-500 mt-2">Secure access for Admin & Managers</p>

            <form onSubmit={handleLogin} className="mt-10 space-y-6">
              {/* Email */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Email Address
                </label>
                <div className="relative mt-2">
                  <FaUserShield className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@pms.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-sm font-medium focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Password
                </label>
                <div className="relative mt-2">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-sm font-medium focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-semibold p-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-950 hover:bg-blue-900 text-white font-bold py-4 rounded-xl shadow-blue-900/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
              >
                {loading ? (
                  'Authenticating...'
                ) : (
                  <>
                    Secure Login <FaArrowRight />
                  </>
                )}
              </button>
            </form>

            <p className="text-xs text-center text-slate-400 mt-8">
              Need help?{' '}
              <Link href="#" className="text-blue-600 font-bold hover:underline">
                Contact Technical Support
              </Link>
            </p>
          </div>

          {/* RIGHT – PMS FEATURES */}
          <div className="hidden md:flex bg-gradient-to-br from-blue-950 to-blue-900 text-white p-14 flex-col justify-center relative">
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl" />
            <div className="relative">
              <span className="bg-yellow-500 text-blue-950 text-[10px] font-black uppercase px-3 py-1 rounded-full">
                Internal Access Only
              </span>

              <h2 className="text-4xl font-bold mt-6 leading-tight">
                Control <br />
                <span className="text-yellow-400">Panel</span> Dashboard
              </h2>

              <p className="text-blue-200/70 text-sm mt-4 max-w-sm">
                Authorized personnel only. All access attempts are logged and monitored.
              </p>

              <div className="mt-10 space-y-5">
                {[
                  'Portfolio Oversight',
                  'Financial Approval Flow',
                  'System Configuration',
                  'Audit & Compliance Logs',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <FaCheckCircle className="text-yellow-400" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* TWO-TONE BRANDED FOOTER */}
      <footer className="bg-zinc-100 mt-auto border-t border-zinc-300">
        <div className="mx-auto max-w-7xl flex justify-between items-center px-8 py-6 border-b border-zinc-300">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-900 text-white font-bold px-3 py-1.5 rounded text-sm uppercase tracking-wider">
              SmartFlow
            </div>
            <span className="text-zinc-700 font-bold text-sm hidden sm:inline text-nowrap">
              Staff Portal • Internal Systems®
            </span>
          </div>

          <div className="flex space-x-5 text-zinc-600">
            <a href="#" className="hover:text-blue-900 transition-colors">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-blue-900 transition-colors">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-blue-900 transition-colors">
              <FaInstagram />
            </a>
          </div>
        </div>

        <div className="bg-blue-950 text-zinc-300 text-xs px-8 py-4 flex justify-between items-center flex-wrap gap-4">
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white hover:underline">
              System Status
            </Link>
            <Link href="#" className="hover:text-white hover:underline">
              Security Policy
            </Link>
            <Link href="#" className="hover:text-white hover:underline">
              Support
            </Link>
          </div>
          <div className="font-medium">
            &copy; {new Date().getFullYear()} SmartFlow Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
