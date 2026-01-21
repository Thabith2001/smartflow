import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-zinc-200 bg-white py-12 dark:border-zinc-800 dark:bg-black">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="text-xl font-bold text-black dark:text-white">
              PMS<span className="text-zinc-500">.system</span>
            </Link>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              The complete solution for modern property management. Streamlining connections between
              owners, tenants, and technicians.
            </p>
          </div>

          {/* User Side Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-black dark:text-white">
              Users
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li>
                <Link href="/properties" className="hover:text-black dark:hover:text-white">
                  Browse Listings
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-black dark:hover:text-white">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-black dark:hover:text-white">
                  Tenant Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Vendor Side Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-black dark:text-white">
              Vendors
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li>
                <Link href="/vendor" className="hover:text-black dark:hover:text-white">
                  Vendor Dashboard
                </Link>
              </li>
              <li>
                <Link href="/vendor/profile" className="hover:text-black dark:hover:text-white">
                  Business Profile
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-black dark:hover:text-white">
                  Become a Partner
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal/Support */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-black dark:text-white">
              Support
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li>
                <Link href="/help" className="hover:text-black dark:hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-black dark:hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-black dark:hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-zinc-100 pt-8 dark:border-zinc-900">
          <p className="text-center text-xs text-zinc-400">
            © {currentYear} Property Management System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
