'use client';

import Link from 'next/link';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaYoutube,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-auto border-t border-zinc-200 bg-white">
      {/* TOP SECTION: Links Grid */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: About Us & Contact */}
          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-blue-900 border-l-4 border-yellow-500 pl-3">
              About Us & Contact
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-zinc-600">
              {[
                'About Us',
                'Contact us',
                'Careers',
                'Testimonials',
                'KYC',
                'Privacy Policy',
                'Terms and Conditions',
                'Disclaimer',
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(/ /g, '-')}`}
                    className="hover:text-blue-900 hover:translate-x-1 transition-all inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Property & Services */}
          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-blue-900 border-l-4 border-yellow-500 pl-3">
              Property & Services
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-zinc-600">
              {[
                'Lands',
                'Houses',
                'Apartments',
                'Portfolio Properties',
                'Services',
                'Virtual Tour',
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(/ /g, '-')}`}
                    className="hover:text-blue-900 hover:translate-x-1 transition-all inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: News & Publications */}
          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-blue-900 border-l-4 border-yellow-500 pl-3">
              News & Publications
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-zinc-600">
              {['News', 'Online Publications', 'Blogs'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(/ /g, '-')}`}
                    className="hover:text-blue-900 hover:translate-x-1 transition-all inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Details */}
          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-blue-900 border-l-4 border-yellow-500 pl-3">
              Contact Details
            </h3>
            <div className="flex flex-col gap-4 text-sm text-zinc-600">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-yellow-500 mt-1 shrink-0" />
                <p>
                  <strong>Head Office:</strong>
                  <br />
                  123 Sunshine Blvd, Suite 400,
                  <br />
                  Miami, Florida, USA
                </p>
              </div>
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-yellow-500 shrink-0" />
                <a href="tel:+18001234567" className="hover:text-blue-900">
                  +1 (800) 123-4567
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-yellow-500 shrink-0" />
                <a href="mailto:info@smartflow.com" className="hover:text-blue-900">
                  info@smartflow.com
                </a>
              </div>

              {/* SOCIAL MEDIA */}
              <div className="pt-4">
                <p className="text-[10px] font-bold uppercase text-zinc-400 mb-3">Follow Us On:</p>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center hover:bg-yellow-500 transition-colors"
                  >
                    <FaLinkedinIn size={14} />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center hover:bg-yellow-500 transition-colors"
                  >
                    <FaTiktok size={14} />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center hover:bg-yellow-500 transition-colors"
                  >
                    <FaInstagram size={14} />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center hover:bg-yellow-500 transition-colors"
                  >
                    <FaFacebookF size={14} />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center hover:bg-yellow-500 transition-colors"
                  >
                    <FaYoutube size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM STRIP */}
      <div className="bg-blue-950 text-white py-6">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="space-y-1">
            <Link href="/" className="text-xl font-black tracking-tighter">
              SMART<span className="text-yellow-400">FLOW</span>
            </Link>
            <p className="text-[10px] uppercase tracking-[0.2em] opacity-60">
              Personal Property Management System®
            </p>
          </div>

          <div className="text-[11px] opacity-70">
            © {currentYear} SmartFlow Inc. All rights reserved.
          </div>

          <div className="text-[11px] font-medium tracking-wide">
            DESIGN BY{' '}
            <a href="https://www.makeitviralmedia.com/" className="text-yellow-400 hover:underline">
              MAKE IT VIRAL MEDIA & TECHNOLOGIES
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
