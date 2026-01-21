'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
    // API call or authentication logic to be added later
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg border w-full max-w-md shadow-sm"
      >
        <h1 className="text-2xl font-semibold text-center mb-6">SmartFlow Login</h1>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            className="w-full border rounded-md px-3 py-2 focus:outline-none"
            placeholder="user@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            className="w-full border rounded-md px-3 py-2 focus:outline-none"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:opacity-90 transition"
        >
          Login
        </button>

        {/* Sign up link */}
        <p className="text-center text-sm mt-4">
          Don’t have an account?{' '}
          <a href="/auth/signup" className="underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}
