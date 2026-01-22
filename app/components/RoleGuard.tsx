'use client';
import { ReactNode, useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaLock, FaExclamationTriangle, FaArrowLeft, FaSignOutAlt } from 'react-icons/fa';

interface RoleGuardProps {
  children: ReactNode;
  allow: string[];
}

export default function RoleGuard({ children, allow }: RoleGuardProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !user) {
      router.push('/admin');
    }
  }, [isMounted, user, router]);

  if (!isMounted) return null;

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-900 border-t-yellow-400"></div>
          <p className="text-sm font-bold text-blue-900 uppercase tracking-widest">
            Verifying Access...
          </p>
        </div>
      </div>
    );
  }

  const isAuthorized = allow.includes(user.role);

  const handleLogout = () => {
    logout();
    router.push('/admin');
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6 bg-zinc-50">
        <div className="w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl">
          {/* Top Decorative Bar */}
          <div className="h-2 w-full bg-blue-900"></div>

          <div className="p-10 text-center">
            {/* Icon Circle */}
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-500">
              <FaLock size={32} />
            </div>

            <h2 className="text-2xl font-extrabold text-zinc-800">Access Restricted</h2>

            <div className="mt-4 rounded-lg bg-zinc-50 p-4 border border-zinc-100">
              <p className="text-sm text-zinc-500 leading-relaxed">
                Your current account role
                <span className="block font-bold text-blue-900 mt-1 uppercase tracking-wider">
                  {user.role}
                </span>
                is not authorized to access this specific module.
              </p>
            </div>

            <div className="mt-8 space-y-3">
              <button
                onClick={() => router.back()}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-900 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-blue-800 transition-all active:scale-95"
              >
                <FaArrowLeft size={12} /> Return to Dashboard
              </button>

              <button
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white py-3.5 text-sm font-bold text-zinc-600 hover:bg-zinc-50 transition-all active:scale-95"
              >
                <FaSignOutAlt size={12} /> Logout & Switch Account
              </button>
            </div>

            <p className="mt-8 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              SmartFlow Security Protocol
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
