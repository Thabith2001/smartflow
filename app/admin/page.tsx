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
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      {/* HEADER */}
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
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="mb-8 w-full max-w-4xl rounded-lg border border-blue-200 bg-blue-50 px-5 py-3 text-sm text-blue-800 flex items-center gap-3">
          <span className="flex-shrink-0 bg-blue-800 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold">
            !
          </span>
          Authorized access only. Unauthorized misuse is strictly monitored.
        </div>

        <div className="w-full max-w-4xl overflow-hidden rounded border bg-white shadow-sm md:flex border-zinc-200">
          {/* LEFT – LOGIN */}
          <div className="w-full p-8 md:p-12 md:w-1/2">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 uppercase">Staff Login</h2>
              <p className="text-zinc-500 text-sm mt-1">Secure access for Admin & Managers</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-zinc-700">
                  Email Address
                </label>
                <div className="relative group">
                  <FaUserShield className="absolute left-3 top-3 text-zinc-400 group-focus-within:text-blue-900 transition-colors" />
                  <input
                    type="email"
                    placeholder="admin@pms.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-zinc-300 bg-zinc-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-zinc-700">Password</label>
                <div className="relative group">
                  <FaLock className="absolute left-3 top-3 text-zinc-400 group-focus-within:text-blue-900 transition-colors" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-zinc-300 bg-zinc-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-all"
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
                className="w-full rounded-lg bg-blue-900 py-3 text-sm font-bold text-white shadow-lg shadow-blue-900/20 hover:bg-blue-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    Authenticating...
                  </>
                ) : (
                  <>
                    Secure Login <FaArrowRight />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* RIGHT – PMS FEATURES */}
          <div className="w-full bg-blue-900 p-12 text-white md:w-1/2 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/5" />

            <div className="relative z-10">
              <h2 className="mb-6 text-3xl font-bold">
                Welcome <br />
                <span className="text-yellow-400">Staff</span>
              </h2>
              <p className="mb-8 text-blue-100 leading-relaxed">
                The all-in-one platform for internal staff management. Monitor and manage your
                operations effectively.
              </p>

              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-3">
                  <span className="text-yellow-400">✓</span> Portfolio Oversight
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-yellow-400">✓</span> Financial Approval Flow
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-yellow-400">✓</span> System Configuration
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-yellow-400">✓</span> Audit & Compliance Logs
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-zinc-100 mt-12 border-t border-zinc-300">
        <div className="mx-auto max-w-7xl flex justify-between items-center px-8 py-6 border-b border-zinc-300">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-900 text-white font-bold px-3 py-1.5 rounded text-sm uppercase tracking-wider">
              SmartFlow
            </div>
            <span className="text-zinc-700 font-bold text-sm hidden sm:inline">
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
