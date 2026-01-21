'use client';
import { useAuth } from '@/lib/auth';
import { ROUTES } from '@/lib/routes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaLock, FaEnvelope } from 'react-icons/fa';

export default function AdminLoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');

    if (email === 'admin@pms.com' && password === 'admin123') {
      login('ADMIN');

      router.push(`/${ROUTES.DASHBOARD}`);
    } else if (email === 'manager@pms.com' && password === 'manager123') {
      login('MANAGER');

      router.push(`/${ROUTES.DASHBOARD}`);
    } else {
      setError('Invalid credentials.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 p-4 font-inter">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10 text-center">
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">SMRTFLOW</h1>
          <p className="text-neutral-500 text-sm mt-1">Secure Property Management Access</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-8">
          <h2 className="text-2xl font-semibold text-neutral-800 mb-6 text-center">Welcome Back</h2>

          <div className="space-y-5">
            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="email"
                placeholder="name@pms.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-neutral-300 bg-neutral-50 text-neutral-800 focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-neutral-300 bg-neutral-50 text-neutral-800 focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg border border-red-200 font-medium">
                {error}
              </div>
            )}

            {/* Sign In Button */}
            <button
              onClick={handleLogin}
              className="w-full bg-black hover:bg-neutral-800 text-white font-medium py-3 rounded-lg transition active:scale-[0.98]"
            >
              Sign In
            </button>
          </div>
        </div>

        <p className="text-center mt-6 text-neutral-500 text-sm">
          Don't have an account?{' '}
          <span className="text-blue-600 font-medium cursor-pointer hover:underline">
            Contact Administrator
          </span>
        </p>
      </div>
    </div>
  );
}
