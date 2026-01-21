'use client';

import Sidebar from '../components/Sidebar';
import RoleGuard from '../components/RoleGuard';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allow={['ADMIN', 'MANAGER']}>
      <div className="flex h-screen bg-slate-950 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-slate-50 rounded-tl-[2.5rem] my-2 mr-2 shadow-2xl border-t border-l border-slate-200">
          <div className="min-h-full p-4">{children}</div>
        </main>
      </div>
    </RoleGuard>
  );
}
