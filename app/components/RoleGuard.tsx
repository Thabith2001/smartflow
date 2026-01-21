'use client';
import { ReactNode, useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';

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
    // Only redirect if component is mounted and user is clearly missing
    if (isMounted && !user) {
      router.push('/login');
    }
  }, [isMounted, user, router]);

  // 1. Wait for mounting to avoid hydration mismatch
  // 2. Wait for user to exist to avoid "undefined" errors
  if (!isMounted || !user) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  // Check authorization safely
  const isAuthorized = allow.includes(user.role);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!isAuthorized) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="text-center p-8 bg-red-50 rounded-3xl border border-red-100">
          <p className="text-red-600 font-bold text-lg">Access Denied</p>
          <p className="text-sm text-red-400 mt-1">
            Your account ({user.role}) does not have permission to view this section.
          </p>
          <button
            onClick={handleLogout}
            className="mt-4 px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Logout and Try Again
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
