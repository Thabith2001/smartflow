import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-auto border-t border-zinc-200 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      {/* TOP SECTION: Links Grid */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="text-xl font-extrabold tracking-tight text-blue-900">
              SMART<span className="text-yellow-500">FLOW</span>
            </Link>
            <p className="text-sm leading-relaxed text-zinc-500">
              The complete solution for modern property management. Streamlining connections between
              owners, tenants, and technicians.
            </p>
            <div className="flex gap-4 text-zinc-400 mt-2">
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

          {/* User Side Links */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-blue-900">
              Users
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-zinc-600">
              <li>
                <Link
                  href="/properties"
                  className="hover:text-yellow-600 transition-colors flex items-center gap-2"
                >
                  Browse Listings
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-yellow-600 transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-yellow-600 transition-colors">
                  Tenant Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Vendor Side Links */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-blue-900">
              Vendors
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-zinc-600">
              <li>
                <Link href="/vendor" className="hover:text-yellow-600 transition-colors">
                  Vendor Dashboard
                </Link>
              </li>
              <li>
                <Link href="/vendor/profile" className="hover:text-yellow-600 transition-colors">
                  Business Profile
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-yellow-600 transition-colors">
                  Become a Partner
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-blue-900">
              Support
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-zinc-600">
              <li>
                <Link href="/help" className="hover:text-yellow-600 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-yellow-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-yellow-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li className="pt-2">
                <a
                  href="mailto:support@smartflow.com"
                  className="flex items-center gap-2 text-blue-900 font-semibold"
                >
                  <FaEnvelope className="text-yellow-500" /> support@smartflow.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* BOTTOM STRIP: Branded Blue Section */}
      <div className="bg-blue-950 text-zinc-300">
        <div className="container mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-900 text-white text-[10px] font-bold px-2 py-1 rounded uppercase">
              SmartFlow Official
            </div>
            <span className="text-xs font-medium">Personal Property Management System®</span>
          </div>

          <p className="text-[11px] md:text-xs opacity-70">
            © {currentYear} SmartFlow Inc. All rights reserved. Authorized access only.
          </p>
        </div>
      </div>
    </footer>
  );
}
