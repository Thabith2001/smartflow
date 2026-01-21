'use client';

import RoleGuard from '../../../components/RoleGuard';
import {
  FaChartBar,
  FaFileCsv,
  FaFilePdf,
  FaBuilding,
  FaMoneyBillWave,
  FaTools,
  FaUsers,
} from 'react-icons/fa';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
} from 'recharts';
import jsPDF from 'jspdf';

/* ================= MOCK DATA ================= */

const summary = [
  { label: 'Total Properties', value: 24, icon: <FaBuilding /> },
  { label: 'Total Tenants', value: 142, icon: <FaUsers /> },
  { label: 'Monthly Revenue', value: '$42,500', icon: <FaMoneyBillWave /> },
  { label: 'Open Work Orders', value: 12, icon: <FaTools /> },
];

const financialData = [
  { month: 'Jan', revenue: 38000 },
  { month: 'Feb', revenue: 39500 },
  { month: 'Mar', revenue: 42000 },
  { month: 'Apr', revenue: 42500 },
];

const categoryCosts = [
  { category: 'Rent Collected', amount: 12500 },
  { category: 'Maintenance', amount: 4200 },
  { category: 'Utilities', amount: 1800 },
];

const occupancy = [
  { name: 'Occupied', value: 94 },
  { name: 'Vacant', value: 6 },
];

const maintenance = [
  { type: 'Open', count: 12 },
  { type: 'Closed', count: 38 },
];

/* ================= EXPORT FUNCTIONS ================= */

const exportCSV = () => {
  const rows = [['Category', 'Amount'], ...categoryCosts.map((c) => [c.category, c.amount])];
  const csvContent = rows.map((r) => r.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', 'report.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const exportPDF = () => {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text('Property Management Report', 10, 10);

  // KPI Summary
  doc.setFontSize(12);
  let y = 20;
  doc.text('KPI Summary:', 10, y);
  y += 8;
  summary.forEach((s) => {
    doc.text(`${s.label}: ${s.value}`, 10, y);
    y += 6;
  });

  y += 6;
  doc.text('Collections & Costs:', 10, y);
  y += 6;
  doc.text('Category       Amount', 10, y);
  y += 6;
  categoryCosts.forEach((row) => {
    doc.text(`${row.category}       $${row.amount.toLocaleString()}`, 10, y);
    y += 6;
  });

  doc.save('report.pdf');
};

/* ================= PAGE ================= */

export default function AdminReportsPage() {
  return (
    <RoleGuard allow={['ADMIN']}>
      <div className="p-8 space-y-10 bg-slate-50 min-h-screen">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold flex items-center gap-2 text-slate-800">
            <FaChartBar className="text-blue-600" />
            Reports & Analytics
          </h1>

          <div className="flex gap-3">
            <button
              onClick={exportCSV}
              className="px-4 py-2 border border-slate-300 rounded text-sm flex items-center gap-2 hover:bg-slate-100"
            >
              <FaFileCsv /> Export CSV
            </button>
            <button
              onClick={exportPDF}
              className="px-4 py-2 border border-slate-300 rounded text-sm flex items-center gap-2 hover:bg-slate-100"
            >
              <FaFilePdf /> Export PDF
            </button>
          </div>
        </div>

        {/* KPI SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {summary.map((s, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-lg p-5">
              <div className="flex items-center gap-3 text-slate-600">
                <div className="p-2 bg-slate-100 rounded">{s.icon}</div>
                <span className="text-sm font-medium">{s.label}</span>
              </div>
              <p className="text-2xl font-bold text-slate-800 mt-3">{s.value}</p>
            </div>
          ))}
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* REVENUE TREND */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h2 className="text-sm font-semibold text-slate-700 mb-4">Monthly Revenue Trend</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={financialData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* MAINTENANCE STATUS */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h2 className="text-sm font-semibold text-slate-700 mb-4">Maintenance Overview</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={maintenance}>
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#0f766e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* TABLE REPORTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* COLLECTIONS & COSTS */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h2 className="text-sm font-semibold text-slate-700 mb-4">Collections & Costs</h2>
            <table className="w-full text-sm">
              <thead className="bg-slate-100 text-slate-600">
                <tr>
                  <th className="px-4 py-2 text-left">Category</th>
                  <th className="px-4 py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {categoryCosts.map((row, i) => (
                  <tr key={i} className="border-b">
                    <td className="px-4 py-2">{row.category}</td>
                    <td className="px-4 py-2 text-right">${row.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* OCCUPANCY */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h2 className="text-sm font-semibold text-slate-700 mb-4">Occupancy Summary</h2>
            <div className="space-y-4">
              {occupancy.map((o, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>{o.name}</span>
                    <span>{o.value}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded">
                    <div className="bg-blue-600 h-2 rounded" style={{ width: `${o.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
