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
  FaHome,
  FaIdCard,
} from 'react-icons/fa';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [homeAddress, setHomeAddress] = useState('');
  const [ssn, setSsn] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    console.log({ name, email, phone, homeAddress, ssn, password });
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
            <h2 className="mb-6 text-xl font-bold text-zinc-800 uppercase">Create Your Account</h2>

            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-zinc-700">
                  Full Name
                </label>

                <div className="relative group">
                  <FaUser className="absolute left-3 top-3 text-zinc-400 group-focus-within:text-blue-900 transition-colors" />

                  <input
                    type="text"
                    className="w-full rounded-lg border border-zinc-300 bg-zinc-50 py-2.5 pl-10 pr-4 text-sm outline-none
                 focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-all"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-zinc-700">
                  Email Address
                </label>

                <div className="relative group">
                  <FaEnvelope className="absolute left-3 top-3 text-zinc-400 group-focus-within:text-blue-900 transition-colors" />
                  <input
                    type="email"
                    className="w-full rounded-lg border border-zinc-300 bg-zinc-50 py-2.5 pl-10 pr-4 text-sm outline-none
                 focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-all"
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
                <div className="relative group">
                  <FaPhone className="absolute left-3 top-3 text-zinc-400 group-focus-within:text-blue-900 transition-colors" />
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="\(\d{3}\) \d{3}-\d{4}"
                    maxLength={14}
                    className="w-full rounded-lg border border-zinc-300 bg-zinc-50 py-2.5 pl-10 pr-4 text-sm outline-none
                 focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-all"
                    placeholder="(555) 000-0000"
                    value={phone}
                    onChange={(e) => {
                      let input = e.target.value.replace(/\D/g, '');
                      if (input.length > 10) input = input.slice(0, 10);

                      const areaCode = input.slice(0, 3);
                      const middle = input.slice(3, 6);
                      const last = input.slice(6, 10);
                      let formatted = '';
                      if (areaCode) formatted += `(${areaCode})`;
                      if (middle) formatted += ` ${middle}`;
                      if (last) formatted += `-${last}`;

                      setPhone(formatted);
                    }}
                    required
                  />
                </div>
              </div>

              {/* SSN (Social Security Number) */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-zinc-700">
                  SSN (Social Security Number)
                </label>

                <div className="relative group">
                  <FaIdCard className="absolute left-3 top-3 text-zinc-400 group-focus-within:text-blue-900 transition-colors" />
                  <input
                    type="text"
                    className="w-full rounded-lg border border-zinc-300 bg-zinc-50 py-2.5 pl-10 pr-4 text-sm outline-none
                 focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-all"
                    placeholder="123-45-6789"
                    value={ssn}
                    onChange={(e) => {
                      let input = e.target.value.replace(/\D/g, '');
                      if (input.length > 9) input = input.slice(0, 9);

                      const part1 = input.slice(0, 3);
                      const part2 = input.slice(3, 5);
                      const part3 = input.slice(5, 9);

                      let formatted = part1;
                      if (part2) formatted += `-${part2}`;
                      if (part3) formatted += `-${part3}`;

                      setSsn(formatted);
                    }}
                    pattern="\d{3}-\d{2}-\d{4}"
                    title="Enter valid SSN in format XXX-XX-XXXX"
                    required
                  />
                </div>
              </div>

              {/* Home Address */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-zinc-700">
                  Home Address
                </label>

                <div className="relative group">
                  <FaHome className="absolute left-3 top-3 text-zinc-400 group-focus-within:text-blue-900 transition-colors" />
                  <input
                    type="text"
                    className="w-full rounded-lg border border-zinc-300 bg-zinc-50 py-2.5 pl-10 pr-4 text-sm outline-none
                 focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-all"
                    placeholder="123 Main St, City, State"
                    value={homeAddress}
                    onChange={(e) => setHomeAddress(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password Group */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-zinc-700">
                    Password
                  </label>

                  <div className="relative group">
                    <FaLock className="absolute left-3 top-3 text-zinc-400 group-focus-within:text-blue-900 transition-colors" />
                    <input
                      type="password"
                      className="w-full rounded-lg border border-zinc-300 bg-zinc-50 py-2.5 pl-10 pr-4 text-sm outline-none
                   focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-all"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-zinc-700">
                    Confirm Password
                  </label>

                  <div className="relative group">
                    <FaLock className="absolute left-3 top-3 text-zinc-400 group-focus-within:text-blue-900 transition-colors" />
                    <input
                      type="password"
                      className="w-full rounded-lg border border-zinc-300 bg-zinc-50 py-2.5 pl-10 pr-4 text-sm outline-none
                   focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-all"
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
                Create User Account
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

          <div className="relative w-full bg-blue-900 p-10 text-white md:w-1/2 flex flex-col justify-center overflow-hidden">
            <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-white/10" />

            <h2 className="mb-4 text-3xl font-bold leading-tight">
              Welcome to <br />
              <span className="text-yellow-400">SMARTFLOW</span>
            </h2>

            <p className="mb-8 text-sm text-blue-100 leading-relaxed max-w-sm">
              The all-in-one platform for modern property management. Create your account and
              streamline your operations today.
            </p>

            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-yellow-400">✓</span>
                Secure user access with role-based permissions
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-yellow-400">✓</span>
                Property & tenant automation in one dashboard
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-yellow-400">✓</span>
                Automated rent, invoices & payment tracking
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-yellow-400">✓</span>
                Real-time maintenance requests & reports
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-yellow-400">✓</span>
                Vendor collaboration with secure portals
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
