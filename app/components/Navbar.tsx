'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { NAV_ACCESS } from '@/lib/roles';
import { ROUTES } from '@/lib/routes';

import {
  FaChartPie,
  FaUserShield,
  FaUsers,
  FaTools,
  FaBuilding,
  FaUserCircle,
  FaHandHoldingUsd,
  FaUserEdit,
  FaSignOutAlt,
  FaCogs,
  FaClipboardList,
  FaFileAlt,
  FaSlidersH,
  FaUserFriends,
} from 'react-icons/fa';

const ICON_MAP: Record<string, { label: string; icon: JSX.Element }> = {
  [ROUTES.DASHBOARD]: { label: 'Overview', icon: <FaChartPie /> },

  [ROUTES.ADMIN.ROOT]: { label: 'System Admin', icon: <FaUserShield /> },
  [ROUTES.ADMIN.AUDIT]: { label: 'Audit Logs', icon: <FaClipboardList /> },
  [ROUTES.ADMIN.REPORTS]: { label: 'Reports', icon: <FaFileAlt /> },
  [ROUTES.ADMIN.SETTINGS]: { label: 'System Settings', icon: <FaSlidersH /> },
  [ROUTES.ADMIN.USERS]: { label: 'User Management', icon: <FaUserFriends /> },

  [ROUTES.MANAGER.ROOT]: { label: 'Manager Overview', icon: <FaUsers /> },
  [ROUTES.MANAGER.EMPLOYER_MGMT]: { label: 'Employer Mgmt', icon: <FaUserEdit /> },
  [ROUTES.MANAGER.EMPLOYER_SALARY]: {
    label: 'Employer Salary',
    icon: <FaHandHoldingUsd />,
  },
  [ROUTES.MANAGER.SETTINGS]: { label: 'Manager Settings', icon: <FaCogs /> },

  [ROUTES.EMPLOYER.TECHNICIANS]: { label: 'Technicians', icon: <FaTools /> },
  [ROUTES.TECHNICIAN]: { label: 'Technician Tasks', icon: <FaTools /> },
  [ROUTES.OWNER]: { label: 'Owner Dashboard', icon: <FaBuilding /> },
  [ROUTES.CUSTOMER]: { label: 'Customer Portal', icon: <FaUserCircle /> },
};

export default function Sidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const allowed = user?.role ? NAV_ACCESS[user.role] ?? [] : [];

  return (
    <aside className="w-64 bg-slate-950 text-slate-400 flex flex-col h-screen sticky top-0 border-r border-slate-800">
      {/* Brand */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            <FaBuilding size={18} />
          </div>
          <div>
            <span className="text-white font-semibold text-lg block">SMRTFLOW</span>
            <span className="text-blue-500 text-[10px] uppercase tracking-wide">Property PMS</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 mt-6 space-y-1 overflow-y-auto">
        {allowed.map((route) => {
          const meta = ICON_MAP[route];
          if (!meta) return null;

          const href = `/${route}`;
          const isActive = pathname === href || pathname.startsWith(href + '/');

          return (
            <Link
              key={route}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive ? 'bg-blue-600/10 text-blue-400' : 'hover:bg-slate-900 hover:text-white'
              }`}
            >
              <span>{meta.icon}</span>
              <span className="text-sm font-medium">{meta.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-slate-800">
        {user ? (
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-red-500/10 px-3 py-2 text-xs font-medium text-red-400 hover:bg-red-500 hover:text-white"
          >
            <FaSignOutAlt size={12} /> Logout
          </button>
        ) : (
          <Link href="/login" className="block text-center bg-blue-600 rounded-lg py-2 text-white">
            Login
          </Link>
        )}
      </div>
    </aside>
  );
}
