'use client';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { useRouter, usePathname } from 'next/navigation';
import { NAV_ACCESS } from '@/lib/roles';
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
  dashboard: { label: 'Overview', icon: <FaChartPie /> },
  'dashboard/admin': { label: 'Admin Dashboard', icon: <FaUserShield /> },
  'dashboard/admin/audit': { label: 'Audit Logs', icon: <FaClipboardList /> },
  'dashboard/admin/reports': { label: 'Reports', icon: <FaFileAlt /> },
  'dashboard/admin/settings': { label: 'System Settings', icon: <FaSlidersH /> },
  'dashboard/admin/users': { label: 'User Management', icon: <FaUserFriends /> },
  'dashboard/admin/customers': { label: 'Customers', icon: <FaUserCircle /> },
  'dashboard/manager': { label: 'Manager Dashboard', icon: <FaUsers /> },
  'dashboard/manager/work': { label: 'Work Orders', icon: <FaTools /> },
  'dashboard/manager/leasing': { label: 'Leasing', icon: <FaUserEdit /> },
  'dashboard/manager/payments': { label: 'Payments', icon: <FaHandHoldingUsd /> },
  'dashboard/manager/settings': { label: 'Manager Settings', icon: <FaCogs /> },
  'dashboard/manager/customers': { label: 'Customers', icon: <FaUserCircle /> },
  'dashboard/vendor': { label: 'Vendor Dashboard', icon: <FaTools /> },
  'dashboard/vendor/jobs': { label: 'Jobs', icon: <FaClipboardList /> },
  'dashboard/vendor/work-orders': { label: 'Work Orders', icon: <FaTools /> },
  'dashboard/vendor/settings': { label: 'Vendor Settings', icon: <FaSlidersH /> },
};

export default function Sidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();

    router.push('/admin');
  };

  const allowed = user?.role ? NAV_ACCESS[user.role as keyof typeof NAV_ACCESS] || [] : [];

  return (
    <aside className="w-64 bg-slate-950 text-slate-400 flex flex-col h-screen sticky top-0 border-r border-slate-800">
      {/* Brand */}
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
          <FaBuilding size={18} />
        </div>
        <div>
          <span className="text-white font-semibold text-lg block tracking-tight">SMRTFLOW</span>
          <span className="text-blue-500 text-[10px] font-medium uppercase tracking-widest">
            Property PMS
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 mt-6 space-y-1 overflow-y-auto custom-scrollbar">
        <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest px-3 mb-3">
          Main Menu
        </p>
        {allowed.map((key) => {
          const link = ICON_MAP[key];
          if (!link) return null;

          const href = `/${key}`;
          const isActive =
            pathname === href || (href !== '/dashboard' && pathname.startsWith(href + '/'));

          return (
            <Link
              key={key}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600/10 text-blue-400'
                  : 'text-slate-500 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <span className={`text-base ${isActive ? 'text-blue-400' : ''}`}>{link.icon}</span>
              <span className="text-sm font-medium">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User & Logout Section */}
      <div className="p-4 mt-auto border-t border-slate-800">
        {user ? (
          <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 font-bold border border-blue-500/20">
                {user.name?.charAt(0) || user.role?.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{user.name || 'User'}</p>
                <p className="text-[10px] text-blue-500 font-bold uppercase tracking-wide">
                  {user.role}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-red-500/10 px-3 py-2.5 text-xs font-bold text-red-400 hover:bg-red-500 hover:text-white transition-all duration-200"
            >
              <FaSignOutAlt size={12} />
              Logout System
            </button>
          </div>
        ) : (
          <Link
            href="/admin"
            className="block w-full rounded-lg bg-blue-600 px-4 py-3 text-white text-center text-xs font-bold uppercase tracking-widest hover:bg-blue-700 transition-colors"
          >
            Staff Login
          </Link>
        )}
      </div>
    </aside>
  );
}
