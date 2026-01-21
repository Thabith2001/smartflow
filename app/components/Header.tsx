import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-black/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-black dark:text-white">
          PMS<span className="text-zinc-500">.system</span>
        </Link>

        {/* Navigation - Main Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/properties"
            className="text-sm font-medium text-zinc-600 hover:text-black transition-colors dark:text-zinc-400 dark:hover:text-white"
          >
            Browse Properties
          </Link>
          <Link
            href="/services"
            className="text-sm font-medium text-zinc-600 hover:text-black transition-colors dark:text-zinc-400 dark:hover:text-white"
          >
            Services
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-zinc-600 hover:text-black transition-colors dark:text-zinc-400 dark:hover:text-white"
          >
            About
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <Link
            href="/auth/login"
            className="text-sm font-medium text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
          >
            Log in
          </Link>
          <Link
            href="/auth/signup"
            className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white hover:bg-zinc-800 transition-colors dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}
