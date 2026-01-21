'use client';

import RoleGuard from '../../components/RoleGuard';
import { FaBuilding, FaPlus, FaHome, FaMoneyBillWave, FaTools, FaChartLine } from 'react-icons/fa';
import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

/* ================= TYPES ================= */
interface User {
  id: number;
  name: string;
  role: 'ADMIN' | 'MANAGER';
  email: string;
}

interface Property {
  id: number;
  name: string;
  rent: number;
  status: 'Occupied' | 'Vacant';
}

interface Payment {
  id: number;
  tenant: string;
  amount: number;
  status: 'Paid' | 'Pending';
  date: string;
}

/* ================= DATA ================= */
const revenueData = [
  { month: 'Jan', revenue: 3200 },
  { month: 'Feb', revenue: 4100 },
  { month: 'Mar', revenue: 3800 },
  { month: 'Apr', revenue: 4600 },
];

const occupancyData = [
  { name: 'Occupied', value: 78 },
  { name: 'Vacant', value: 22 },
];

const COLORS = ['#2563eb', '#e5e7eb'];

/* ================= MAIN ================= */
export default function AdminDashboard() {
  const [properties, setProperties] = useState<Property[]>([
    { id: 1, name: 'Sunset Apartment 4B', rent: 1200, status: 'Occupied' },
    { id: 2, name: 'Grand View Villa', rent: 2500, status: 'Vacant' },
  ]);

  const [payments] = useState<Payment[]>([
    { id: 1, tenant: 'John Silva', amount: 1200, status: 'Paid', date: '2026-01-05' },
    { id: 2, tenant: 'Nuwan Perera', amount: 2500, status: 'Pending', date: '2026-01-10' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newProperty, setNewProperty] = useState({
    name: '',
    rent: '',
    status: 'Vacant' as 'Vacant' | 'Occupied',
  });

  const addProperty = () => {
    if (!newProperty.name || !newProperty.rent) return;

    setProperties([
      ...properties,
      {
        id: Date.now(),
        name: newProperty.name,
        rent: Number(newProperty.rent),
        status: newProperty.status,
      },
    ]);
    setShowModal(false);
    setNewProperty({ name: '', rent: '', status: 'Vacant' });
  };

  return (
    <RoleGuard allow={['ADMIN']}>
      <div className="min-h-screen bg-slate-50">
        {/* HEADER */}
        <header className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold flex items-center gap-2">
              <FaBuilding className="text-blue-600" />
              Admin Dashboard
            </h1>

            <button
              onClick={() => setShowModal(true)}
              className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md flex items-center gap-2"
            >
              <FaPlus /> Add Property
            </button>
          </div>
        </header>

        {/* MAIN */}
        <main className="max-w-7xl mx-auto p-8 space-y-10">
          {/* KPI */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <KPI icon={<FaHome />} label="Properties" value={properties.length} />
            <KPI icon={<FaMoneyBillWave />} label="Revenue" value="$15,700" />
            <KPI icon={<FaTools />} label="Work Orders" value="18" />
            <KPI icon={<FaChartLine />} label="Occupancy" value="78%" />
          </div>

          {/* CHARTS */}
          <div className="grid md:grid-cols-2 gap-6">
            <Section title="Monthly Revenue">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#2563eb" />
                </LineChart>
              </ResponsiveContainer>
            </Section>

            <Section title="Occupancy Rate">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={occupancyData} dataKey="value" innerRadius={60}>
                    {occupancyData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Section>
          </div>

          {/* PAYMENTS MODULE */}
          <Section title="Payments">
            <table className="w-full border">
              <thead className="bg-slate-100 text-sm">
                <tr>
                  <th className="p-3 border">Tenant</th>
                  <th className="p-3 border">Amount</th>
                  <th className="p-3 border">Date</th>
                  <th className="p-3 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id} className="text-sm">
                    <td className="p-3 border">{p.tenant}</td>
                    <td className="p-3 border">${p.amount}</td>
                    <td className="p-3 border">{p.date}</td>
                    <td className="p-3 border">
                      <span
                        className={`px-2 py-1 text-xs border rounded ${
                          p.status === 'Paid'
                            ? 'border-green-500 text-green-600'
                            : 'border-amber-500 text-amber-600'
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          {/* PROPERTIES */}
          <Section title="Properties">
            <div className="grid md:grid-cols-2 gap-4">
              {properties.map((p) => (
                <div key={p.id} className="border p-4 rounded-md">
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-sm text-slate-500">${p.rent} / month</p>
                  <span
                    className={`text-xs px-2 py-1 border rounded inline-block mt-2 ${
                      p.status === 'Occupied'
                        ? 'border-green-500 text-green-600'
                        : 'border-amber-500 text-amber-600'
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          </Section>
        </main>

        {/* MODAL */}
        {showModal && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
            <div className="bg-white border rounded-md p-6 w-full max-w-md">
              <h3 className="font-bold mb-4">Add Property</h3>

              <input
                className="w-full border p-2 mb-3 rounded"
                placeholder="Property Name"
                value={newProperty.name}
                onChange={(e) => setNewProperty({ ...newProperty, name: e.target.value })}
              />

              <input
                type="number"
                className="w-full border p-2 mb-3 rounded"
                placeholder="Monthly Rent"
                value={newProperty.rent}
                onChange={(e) => setNewProperty({ ...newProperty, rent: e.target.value })}
              />

              <select
                className="w-full border p-2 mb-4 rounded"
                value={newProperty.status}
                onChange={(e) => setNewProperty({ ...newProperty, status: e.target.value as any })}
              >
                <option value="Vacant">Vacant</option>
                <option value="Occupied">Occupied</option>
              </select>

              <div className="flex justify-end gap-3">
                <button onClick={() => setShowModal(false)}>Cancel</button>
                <button
                  onClick={addProperty}
                  className="border border-blue-600 text-blue-600 px-4 py-2 rounded"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </RoleGuard>
  );
}

/* ================= UI ================= */
function KPI({ icon, label, value }: any) {
  return (
    <div className="border rounded-md p-4 bg-white">
      <div className="text-blue-600 mb-2">{icon}</div>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}

function Section({ title, children }: any) {
  return (
    <div className="bg-white border rounded-md p-6">
      <h2 className="font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}
