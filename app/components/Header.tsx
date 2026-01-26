'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  FaBell,
  FaSignInAlt,
  FaBars,
  FaTimes,
  FaSearch,
  FaUserCircle,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaChevronRight,
} from 'react-icons/fa';

export default function Header() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Lands', href: '/lands' },
    { name: 'Houses', href: '/houses' },
    { name: 'Apartments', href: '/apartments' },
    { name: 'Portfolio Properties', href: '/portfolio' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <>
      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}

      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full shadow-lg">
        {/* MAIN TOP BAR */}
        <div className="bg-blue-900 border-b border-white/10">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setOpen(true)}
                className="md:hidden rounded-md p-2 text-white hover:bg-white/10 transition-colors"
              >
                <FaBars size={22} />
              </button>
              <Link href="/" className="text-2xl font-black tracking-tighter text-white shrink-0">
                SMART<span className="text-yellow-400">FLOW</span>
              </Link>
            </div>

            {/* DESKTOP SEARCH BAR (Only visible on md screens and up) */}
            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <div className="relative w-full group">
                <span className="absolute inset-y-0 left-3 flex items-center text-zinc-400 group-focus-within:text-yellow-400 transition-colors">
                  <FaSearch size={14} />
                </span>
                <input
                  type="text"
                  placeholder="Search properties..."
                  className="w-full rounded-lg bg-white/10 border border-white/20 py-2 pl-10 pr-4 text-sm text-white placeholder-zinc-400 outline-none focus:bg-white/20 focus:border-yellow-400 transition-all"
                />
              </div>
            </div>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-3 lg:gap-6">
              <button className="relative flex items-center justify-center h-10 w-10 text-white hover:text-yellow-400 bg-white/5 hover:bg-white/10 rounded-full transition-all">
                <FaBell />
                <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500 border-2 border-blue-900" />
              </button>

              <div className="h-8 w-[1px] bg-white/20 hidden sm:block" />

              <Link
                href="/auth/login"
                className="flex items-center gap-2 bg-yellow-400 px-5 py-2.5 rounded-full text-sm font-bold text-blue-900 hover:bg-yellow-300 transition-all active:scale-95"
              >
                <FaSignInAlt />
                <span className="hidden sm:inline">Login</span>
              </Link>
            </div>
          </div>
        </div>

        {/* SECONDARY NAVIGATION (Desktop) */}
        <nav className="hidden md:flex items-center justify-center gap-10 py-3 bg-white border-b border-gray-200">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="group relative text-sm font-bold uppercase tracking-wide text-blue-950 hover:text-blue-600 transition-colors"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-yellow-400 transition-all group-hover:w-full" />
            </Link>
          ))}
        </nav>
      </header>

      {/* MOBILE SIDEBAR (Drawer) */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-80 transform bg-white shadow-2xl transition-transform duration-300 ease-in-out flex flex-col md:hidden
        ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5 bg-blue-950 text-white">
          <span className="text-xl font-black tracking-tight">SMARTFLOW</span>
          <button onClick={() => setOpen(false)} className="p-2 hover:bg-white/10 rounded-full">
            <FaTimes size={20} />
          </button>
        </div>

        {/* MOBILE SEARCH (Inside Menu Only) */}
        <div className="p-4 border-b border-gray-100">
          <div className="relative flex items-center">
            <FaSearch className="absolute left-3 text-gray-400" size={14} />
            <input
              type="text"
              placeholder="Search properties..."
              className="w-full bg-gray-100 border-none rounded-lg py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </div>
        </div>

        <nav className="flex flex-col gap-1 p-4 overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between px-4 py-4 rounded-xl text-blue-950 hover:bg-blue-50 hover:text-blue-700 transition-all font-bold"
            >
              {link.name}
              <FaChevronRight size={12} className="text-gray-300" />
            </Link>
          ))}
        </nav>

        <div className="mt-auto border-t border-gray-100 p-6 bg-gray-50">
          <Link href="/auth/login" className="flex items-center gap-3 text-blue-900 mb-8">
            <FaUserCircle size={24} />
            <span className="font-bold text-lg">My Account</span>
          </Link>
          <div className="flex gap-4 text-blue-900/40">
            <FaFacebookF size={20} className="hover:text-blue-600" />
            <FaTwitter size={20} className="hover:text-blue-600" />
            <FaInstagram size={20} className="hover:text-blue-600" />
          </div>
        </div>
      </aside>
    </>
  );
}
