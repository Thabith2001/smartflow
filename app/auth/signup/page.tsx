'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaChevronRight,
  FaStore,
  FaUserCircle,
} from 'react-icons/fa';

export default function SignupPage() {
  const [role, setRole] = useState('user'); // New role state
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
    // Added role to the final submission
    console.log({ role, name, email, phone, password });
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
            <Link
              href="/auth/login"
              className="hover:text-yellow-400 transition-colors font-bold text-white"
            >
              Login
            </Link>
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-grow flex flex-col items-center justify-center p-6 py-12">
        {/* NOTICE BANNER */}
        <div className="mb-6 w-full max-w-4xl rounded border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
          <strong>Registration:</strong> Create an account to access the SMARTFLOW Property
          Management System. Verification is required for all new vendors and users.
        </div>

        {/* SIGNUP CARD */}
        <div className="w-full max-w-4xl overflow-hidden rounded border bg-white shadow-sm md:flex border-zinc-200">
          {/* LEFT – SIGNUP FORM */}
          <div className="w-full p-8 md:w-1/2">
            <h2 className="mb-6 text-xl font-bold text-zinc-800">Create Your Account</h2>

            <form onSubmit={handleSignup} className="space-y-4">
              {/* ROLE SELECTION */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-zinc-600">
                  I am registering as a:
                </label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-100 rounded-lg border border-zinc-200">
                  <button
                    type="button"
                    onClick={() => setRole('user')}
                    className={`flex items-center justify-center gap-2 py-2 text-sm font-bold rounded-md transition-all ${
                      role === 'user'
                        ? 'bg-blue-900 text-white shadow-sm'
                        : 'text-zinc-500 hover:text-blue-900'
                    }`}
                  >
                    <FaUserCircle /> User
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('vendor')}
                    className={`flex items-center justify-center gap-2 py-2 text-sm font-bold rounded-md transition-all ${
                      role === 'vendor'
                        ? 'bg-blue-900 text-white shadow-sm'
                        : 'text-zinc-500 hover:text-blue-900'
                    }`}
                  >
                    <FaStore /> Vendor
                  </button>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-600">
                  {role === 'vendor' ? 'Company / Vendor Name' : 'Full Name'}
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-3 text-zinc-400" />
                  <input
                    type="text"
                    className="w-full rounded border border-zinc-300 py-2 pl-10 pr-4 text-sm outline-none focus:border-blue-900"
                    placeholder={role === 'vendor' ? 'Smart Services Ltd' : 'John Doe'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-600">
                  Email Address
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-3 text-zinc-400" />
                  <input
                    type="email"
                    className="w-full rounded border border-zinc-300 py-2 pl-10 pr-4 text-sm outline-none focus:border-blue-900"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-600">Phone Number</label>
                <div className="relative">
                  <FaPhone className="absolute left-3 top-3 text-zinc-400" />
                  <input
                    type="tel"
                    className="w-full rounded border border-zinc-300 py-2 pl-10 pr-4 text-sm outline-none focus:border-blue-900"
                    placeholder="(555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password Group */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-600">Password</label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-3 text-zinc-400" />
                    <input
                      type="password"
                      className="w-full rounded border border-zinc-300 py-2 pl-10 pr-4 text-sm outline-none focus:border-blue-900"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-600">Confirm</label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-3 text-zinc-400" />
                    <input
                      type="password"
                      className="w-full rounded border border-zinc-300 py-2 pl-10 pr-4 text-sm outline-none focus:border-blue-900"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded bg-blue-900 py-2.5 mt-2 text-sm font-bold text-white hover:bg-blue-800 transition-colors shadow-md"
              >
                Create {role === 'vendor' ? 'Vendor' : 'User'} Account
              </button>

              <div className="text-center pt-2">
                <p className="text-sm text-zinc-600">
                  Already have an account?{' '}
                  <Link href="/auth/login" className="font-bold text-blue-900 hover:underline">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* RIGHT – INFO PANEL */}
          <div className="w-full bg-blue-900 p-8 text-white md:w-1/2 flex flex-col justify-center">
            <h2 className="mb-6 text-3xl font-bold">
              Why Join <br />
              <span className="text-yellow-400">SMARTFLOW</span>
            </h2>
            <p className="text-blue-100 text-sm mb-6 leading-relaxed">
              Join thousands of property managers and vendors using our automated ecosystem.
            </p>
            <ul className="space-y-4 text-sm opacity-90">
              <li className="flex items-center gap-3">
                <div className="bg-yellow-400 text-blue-900 rounded-full p-1">
                  <FaChevronRight className="text-[10px]" />
                </div>
                Manage properties and tenants easily
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-yellow-400 text-blue-900 rounded-full p-1">
                  <FaChevronRight className="text-[10px]" />
                </div>
                Track rent payments & invoices
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-yellow-400 text-blue-900 rounded-full p-1">
                  <FaChevronRight className="text-[10px]" />
                </div>
                Submit maintenance requests
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-yellow-400 text-blue-900 rounded-full p-1">
                  <FaChevronRight className="text-[10px]" />
                </div>
                Secure vendor collaboration
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-yellow-400 text-blue-900 rounded-full p-1">
                  <FaChevronRight className="text-[10px]" />
                </div>
                Real-time notifications & reports
              </li>
            </ul>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-zinc-100 mt-auto border-t border-zinc-300">
        <div className="mx-auto max-w-7xl flex justify-between items-center px-8 py-6 border-b border-zinc-300">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-900 text-white font-bold px-3 py-1.5 rounded text-sm uppercase tracking-wider">
              SmartFlow
            </div>
            <span className="text-zinc-700 font-bold text-sm hidden sm:inline text-nowrap">
              Personal Property Management System®
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
              About Us
            </Link>
            <Link href="#" className="hover:text-white hover:underline">
              Privacy Policy
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
