'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  FaBell,
  FaPlus,
  FaSearch,
  FaMoon,
  FaSignInAlt,
  FaBars,
  FaTimes,
  FaUserCircle,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from 'react-icons/fa';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
        />
      )}

      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-blue-900 shadow-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setOpen(true)}
              className="md:hidden rounded-md p-2 text-white hover:bg-white/10 transition-colors"
            >
              <FaBars size={20} />
            </button>
            <Link href="/" className="text-xl font-extrabold tracking-tight text-white">
              SMART<span className="text-yellow-400">FLOW</span>
            </Link>
          </div>

          {/* DESKTOP SEARCH BAR  */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full group">
              <span className="absolute inset-y-0 left-3 flex items-center text-zinc-400 group-focus-within:text-yellow-400 transition-colors">
                <FaSearch size={14} />
              </span>
              <input
                type="text"
                placeholder="Search properties, tenants, or invoices..."
                className="w-full rounded-lg bg-white/10 border border-white/20 py-2 pl-10 pr-4 text-sm text-white placeholder-zinc-400 outline-none focus:bg-white/20 focus:border-yellow-400 transition-all"
              />
            </div>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-2 lg:gap-4">
            <button
              title="Quick Add"
              className="hidden lg:flex items-center justify-center h-10 w-10 text-white hover:text-yellow-400 bg-white/5 hover:bg-white/10 rounded-full transition-all"
            >
              <FaPlus />
            </button>

            <button
              title="Notifications"
              className="relative flex items-center justify-center h-10 w-10 text-white hover:text-yellow-400 bg-white/5 hover:bg-white/10 rounded-full transition-all"
            >
              <FaBell />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500 border border-blue-900" />
            </button>

            <button
              title="Toggle Dark Mode"
              className="hidden lg:flex items-center justify-center h-10 w-10 text-white hover:text-yellow-400 bg-white/5 hover:bg-white/10 rounded-full transition-all"
            >
              <FaMoon />
            </button>

            <div className="h-8 w-[1px] bg-white/20 mx-1 hidden sm:block" />

            <Link
              href="/auth/login"
              className="flex items-center gap-2 bg-yellow-400 px-4 py-2 rounded-md text-sm font-semibold text-blue-900 hover:bg-yellow-300 transition-colors"
            >
              <FaSignInAlt />
              <span className="hidden sm:inline">Login</span>
            </Link>
          </div>
        </div>

        {/* SECONDARY DESKTOP NAV  */}
        <nav className="hidden md:flex items-center justify-center gap-8 py-2 border-t border-white/5 bg-white">
          {['Dashboard', 'Properties', 'Tenants', 'Payments', 'Reports'].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-xs font-medium uppercase tracking-wider text-gray-700 hover:text-yellow-400 transition-colors"
            >
              {item}
            </Link>
          ))}
        </nav>
      </header>

      {/* LEFT SLIDE MENU */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-72 transform bg-blue-950 shadow-2xl transition-transform duration-300 ease-in-out flex flex-col md:hidden
        ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
          <span className="text-lg font-bold text-white">SMARTFLOW</span>
          <button
            onClick={() => setOpen(false)}
            className="text-white hover:rotate-90 transition-transform"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* MOBILE SEARCH */}
        <div className="px-5 py-6">
          <div className="flex items-center rounded-lg bg-white/10 border border-white/20 px-3 py-2.5">
            <FaSearch className="text-zinc-400 text-sm" />
            <input
              placeholder="Search..."
              className="ml-2 w-full bg-transparent text-sm text-white outline-none placeholder-zinc-400"
            />
          </div>
        </div>

        <nav className="flex flex-col gap-1 px-3">
          {['Dashboard', 'Properties', 'Tenants', 'Payments', 'Reports'].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="px-4 py-3 rounded-lg text-white hover:bg-white/10 hover:text-yellow-400 transition-all font-medium"
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="mt-auto border-t border-white/10 px-5 py-8 bg-blue-950/20">
          <Link
            href="/auth/login"
            className="flex items-center gap-3 text-white hover:text-yellow-400 mb-8 group"
          >
            <FaUserCircle size={20} className="group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-md">My Account</span>
          </Link>

          <div className="flex flex-col gap-2 text-xs text-zinc-400 mb-6">
            <Link href="/faq" className="hover:text-white">
              FAQ
            </Link>
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/help" className="hover:text-white">
              Help Center
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms & Conditions
            </Link>
          </div>

          <div className="flex gap-5 text-zinc-300">
            <a href="#" className="hover:text-yellow-400 transition-colors">
              <FaFacebookF size={18} />
            </a>
            <a href="#" className="hover:text-yellow-400 transition-colors">
              <FaTwitter size={18} />
            </a>
            <a href="#" className="hover:text-yellow-400 transition-colors">
              <FaInstagram size={18} />
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
