'use client';
import { useAuth } from '@/lib/auth';
import {
  FaBuilding,
  FaTools,
  FaUsers,
  FaChartLine,
  FaClipboardList,
  FaShieldAlt,
  FaExclamationTriangle,
  FaCheckCircle,
  FaArrowRight,
} from 'react-icons/fa';

export default function DashboardHome() {
  const { user } = useAuth();

  const isAdmin = user?.role === 'ADMIN';
  const isManager = user?.role === 'MANAGER';
  const canSeeRevenue = isAdmin || isManager;

  return (
    <div className="p-6 space-y-8 bg-slate-50 min-h-full">
      {/* ================= HEADER ================= */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Dashboard Overview</h1>
          <p className="text-sm text-slate-500 mt-1">
            Logged in as <span className="font-medium text-blue-600">{user?.name}</span>{' '}
            <span className="mx-2">•</span>
            <span className="uppercase text-xs font-semibold">{user?.role}</span>
          </p>
        </div>

        <div className="flex items-center gap-3 border border-slate-200 bg-white px-4 py-2 rounded-lg">
          <span className="text-xs font-medium text-slate-600">Server Status</span>
          <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
          <span className="text-xs font-semibold text-slate-700">Optimal</span>
        </div>
      </header>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard icon={<FaBuilding />} label="Total Properties" value="24" trend="+2 this month" />
        <StatCard
          icon={<FaTools />}
          label="Active Maintenance"
          value="12"
          trend="4 High Priority"
        />

        {isAdmin ? (
          <StatCard icon={<FaUsers />} label="Total Staff" value="18" trend="4 Teams Active" />
        ) : (
          <StatCard icon={<FaUsers />} label="Total Tenants" value="142" trend="98% Occupancy" />
        )}

        {canSeeRevenue ? (
          <StatCard icon={<FaChartLine />} label="Gross Revenue" value="$42,500" trend="+12.3%" />
        ) : (
          <StatCard icon={<FaClipboardList />} label="Tasks Completed" value="156" trend="100%" />
        )}
      </div>

      {/* ================= CONTENT ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl">
          <div className="p-5 border-b border-slate-200 flex justify-between">
            <div>
              <h2 className="font-semibold text-slate-800">Operational Activity</h2>
              <p className="text-xs text-slate-500">Latest system updates</p>
            </div>
            <button className="text-sm text-blue-600 font-medium flex items-center gap-1">
              View all <FaArrowRight />
            </button>
          </div>

          {[
            {
              title: 'Emergency: Pipe Burst',
              loc: 'Sunset Unit 102',
              time: '12 mins ago',
              status: 'Urgent',
              type: 'error',
            },
            {
              title: 'Routine Inspection',
              loc: 'Skyline Towers',
              time: '4h ago',
              status: 'In Progress',
              type: 'info',
            },
            {
              title: 'Rent Payment Received',
              loc: 'Apt 4B - Alice W.',
              time: '6h ago',
              status: 'Verified',
              type: 'success',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-5 flex justify-between items-center border-b last:border-none border-slate-100"
            >
              <div className="flex gap-3">
                <StatusIcon type={item.type} />
                <div>
                  <p className="text-sm font-medium text-slate-800">{item.title}</p>
                  <p className="text-xs text-slate-500">
                    {item.loc} • {item.time}
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold text-slate-600">{item.status}</span>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <FaShieldAlt /> Quick Actions
            </h3>

            <div className="space-y-2">
              <ActionButton label="Create Work Order" />
              {isAdmin && <ActionButton label="Manage User Access" />}
              {isManager && <ActionButton label="Review Lease Requests" />}
              <button className="text-xs text-slate-500 mt-2 hover:text-slate-700">
                Download Weekly Summary
              </button>
            </div>
          </div>

          {/* Occupancy */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-slate-800 mb-4">Portfolio Occupancy</h3>

            <div className="flex items-end gap-2 h-24">
              {[40, 70, 55, 90, 85, 95, 92].map((h, i) => (
                <div key={i} className="flex-1 bg-slate-100 rounded">
                  <div className="bg-blue-500 rounded" style={{ height: `${h}%` }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function ActionButton({ label }: { label: string }) {
  return (
    <button className="w-full border border-slate-300 rounded-lg py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
      {label}
    </button>
  );
}

function StatusIcon({ type }: { type: string }) {
  const map: any = {
    error: <FaExclamationTriangle className="text-red-500" />,
    success: <FaCheckCircle className="text-emerald-500" />,
    info: <FaClipboardList className="text-blue-500" />,
  };

  return (
    <div className="w-9 h-9 flex items-center justify-center border border-slate-200 rounded-lg">
      {map[type]}
    </div>
  );
}

function StatCard({ icon, label, value, trend }: any) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5">
      <div className="w-9 h-9 border border-slate-200 rounded-lg flex items-center justify-center text-slate-600 mb-3">
        {icon}
      </div>
      <p className="text-xs font-semibold text-slate-500 uppercase">{label}</p>
      <p className="text-xl font-semibold text-slate-900">{value}</p>
      <p className="text-xs text-slate-500 mt-1">{trend}</p>
    </div>
  );
}
