'use client';

import { useState } from 'react';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    console.log({ name, email, phone, password });
    // API call later
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSignup} className="bg-white p-8 rounded-lg border w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6">User Registration</h1>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Full Name</label>
          <input
            type="text"
            className="w-full border rounded-md px-3 py-2 focus:outline-none"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Phone Number</label>
          <input
            type="tel"
            className="w-full border rounded-md px-3 py-2 focus:outline-none"
            placeholder="07XXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
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

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block text-sm mb-1">Confirm Password</label>
          <input
            type="password"
            className="w-full border rounded-md px-3 py-2 focus:outline-none"
            placeholder="********"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:opacity-90 transition"
        >
          Sign Up
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{' '}
          <a href="/auth/login" className="underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
