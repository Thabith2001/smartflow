"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import {
  FaBell,
  FaSignInAlt,
  FaBars,
  FaTimes,
  FaUserCircle,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronRight,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaShieldAlt,
} from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import type { SafeUser } from '@/types/users.type';

// Accept `initialUser` from the server wrapper (read from HttpOnly cookie)
export default function Header({ initialUser }: { initialUser?: SafeUser | null }) {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navLinks: { name: string; href: string }[] = [
    { name: 'Home', href: '/' },
    { name: 'Lands', href: '/lands' },
    { name: 'Houses', href: '/houses' },
    { name: 'Apartments', href: '/apartments' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Contact Us', href: '/contact' },
  ];

  const router = useRouter();
  const [user, setUser] = useState<SafeUser | null>(initialUser ?? null);

  // If `initialUser` is undefined (client usage), fetch current user from server
  useEffect(() => {
    if (typeof initialUser === 'undefined') {
      // client-side pages: request /api/auth/me which reads HttpOnly cookie on server
      fetch('/api/auth/me')
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => {
          if (data && data.user) setUser(data.user as SafeUser);
        })
        .catch(() => {});
    }
  }, [initialUser]);

  const isLoggedIn = Boolean(user);

  function onLogout() {
    // Call server route to clear HttpOnly cookie
    fetch('/api/auth/logout', { method: 'POST' })
      .then(() => {
        setUser(null);
      })
      .catch(() => {})
      .finally(() => {
        try {
          router.push('/auth/login');
        } catch (err) {
          // ignore
        }
      });
  }

  // console.log('user', user);
  return (
    <>
      {/* MOBILE OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[60] bg-blue-900/60 backdrop-blur-sm md:hidden"
        />
      )}

      <header className="sticky top-0 z-50 w-full shadow-2xl">
        {/* TOP BAR  */}
        <div className="bg-blue-900 border-b border-white/10">
          <div className="mx-auto flex h-16 md:h-20 max-w-7xl items-center justify-between px-4 md:px-6 gap-4">
            {/* LOGO */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setOpen(true)}
                className="md:hidden text-white hover:text-yellow-400 transition-colors"
              >
                <FaBars size={22} />
              </button>
              <Link
                href="/"
                className="text-xl md:text-2xl font-black tracking-tighter text-white uppercase shrink-0"
              >
                SMART<span className="text-yellow-400">FLOW</span>
              </Link>
            </div>

            {/* SEARCH  */}
            <SearchBar />

            {/* ACTIONS */}
            <div className="flex items-center gap-3 md:gap-6">
              <button className="relative text-white hover:text-yellow-400">
                <FaBell size={19} />
                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-yellow-400 border border-blue-900" />
              </button>

              <div className="h-8 w-[1px] bg-white/40 hidden sm:block" />

              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-3 group"
                  >
                    <div className="flex flex-col items-end hidden md:flex text-right">
                      <span
                        className="text-[9px] font-black text-yellow-400 uppercase tracking-widest leading-none mb-1 flex items-center gap-1">
                        {user?.role === 'technician' && <FaShieldAlt size={8} />}
                        {user?.role}
                      </span>
                      <div className="flex items-center gap-1 text-white text-[12px] font-black uppercase">
                        {user?.name}{' '}
                        <FaChevronDown
                          size={8}
                          className={`transition-transform ${profileOpen ? 'rotate-180' : ''}`}
                        />
                      </div>
                    </div>
                    <div
                      className="h-10 w-10 md:h-11 md:w-11 bg-blue-800 border-2 border-yellow-400 flex items-center justify-center group-hover:bg-yellow-400 transition-all">
                      <span className="text-white group-hover:text-blue-900 text-lg font-black">
                        {user?.name?.charAt(0)}
                      </span>
                    </div>
                  </button>

                  {/* DROPDOWN */}
                  {profileOpen && (
                    <div
                      className="absolute right-0 mt-3 w-52 bg-white shadow-2xl border border-gray-100 py-1 flex flex-col">
                      <Link
                        href="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-[11px] font-black uppercase text-blue-950 hover:bg-gray-50"
                      >
                        <FaUserCircle className="text-blue-400" /> Dashboard
                      </Link>
                      <button
                        onClick={onLogout}
                        className="flex items-center gap-3 px-4 py-3 text-[11px] font-black uppercase text-red-600 hover:bg-red-50 border-t border-gray-50 transition-colors"
                      >
                        <FaSignOutAlt /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  className="flex items-center gap-2 bg-yellow-400 px-5 md:px-8 py-2 md:py-3 text-[11px] font-black uppercase tracking-widest text-blue-900 hover:bg-white transition-all"
                >
                  <FaSignInAlt size={13} /> <span
                  className="hidden sm:inline">{user?.name || 'Login'}</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* BOTTOM NAV */}
        <nav className="hidden md:flex items-center justify-center gap-10 py-3 bg-white border-b border-gray-200">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="group relative text-[11px] font-black uppercase tracking-[0.15em] text-blue-950 hover:text-blue-600 transition-colors"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 h-[3px] w-0 bg-yellow-400 transition-all group-hover:w-full" />
            </Link>
          ))}
        </nav>
      </header>

      {/* MOBILE DRAWER */}
      <aside
        className={`fixed left-0 top-0 z-[70] h-full w-[85%] max-w-sm transform bg-white transition-transform duration-500 ease-in-out flex flex-col md:hidden shadow-2xl ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-6 py-6 bg-blue-900 text-white">
          <span className="text-xl font-black uppercase">
            SMART<span className="text-yellow-400">FLOW</span>
          </span>
          <button onClick={() => setOpen(false)} className="text-yellow-400">
            <FaTimes size={24} />
          </button>
        </div>

        <nav className="flex flex-col flex-1 overflow-y-auto pt-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between px-8 py-4 border-b border-gray-50 text-blue-950 text-[11px] font-black uppercase tracking-widest"
            >
              {link.name} <FaChevronRight size={10} className="text-blue-100" />
            </Link>
          ))}
        </nav>

        <div className="mt-auto border-t border-gray-100 p-8 bg-gray-50/80">
          {isLoggedIn ? (
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <div
                  className="h-12 w-12 bg-blue-900 flex items-center justify-center font-black text-yellow-400 text-xl border-2 border-yellow-400">
                  {user?.name?.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="text-blue-950 font-black uppercase text-sm">{user?.name}</span>
                  <span className="text-blue-400 text-[10px] font-bold uppercase tracking-widest">
                    {user?.role}
                  </span>
                </div>
              </div>
              <button
                onClick={onLogout}
                className="w-full bg-white border border-red-200 text-red-600 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all"
              >
                Logout System
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                href="/auth/register"
                className="w-full bg-blue-900 text-white py-3 text-center text-[10px] font-black uppercase tracking-widest"
              >
                Register Account
              </Link>
              <Link
                href="/auth/login"
                className="w-full border-2 border-blue-900 text-blue-900 py-3 text-center text-[10px] font-black uppercase tracking-widest"
              >
                Login Portal
              </Link>
            </div>
          )}

          {/* SOCIAL ICONS */}
          <div className="flex justify-center gap-8 mt-10 text-blue-900/30">
            <FaFacebookF className="hover:text-blue-600" />
            <FaTwitter className="hover:text-blue-600" />
            <FaInstagram className="hover:text-blue-600" />
            <FaLinkedinIn className="hover:text-blue-600" />
          </div>
        </div>
      </aside>
    </>
  );
}
