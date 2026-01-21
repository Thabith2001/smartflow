'use client';
import { useAuth } from '@/lib/auth';
import Link from 'next/link';
import {
  FaUsers,
  FaBuilding,
  FaWallet,
  FaChartBar,
  FaArrowRight,
  FaUserCog,
  FaDollarSign,
  FaCheckCircle,
  FaPlus,
  FaTrash,
} from 'react-icons/fa';
import { useState } from 'react';

// Dummy Data
const employeesMock = [
  { id: 1, name: 'John Doe', role: 'Technician', salary: 4500 },
  { id: 2, name: 'Jane Smith', role: 'Technician', salary: 4800 },
];
const workOrdersMock = [
  { id: 1, task: 'Fix AC', property: 'Sunset Apartments', status: 'Pending' },
  { id: 2, task: 'Plumbing Leak', property: 'Skyline Tower', status: 'In Progress' },
];
const paymentsMock = [
  { id: 1, tenant: 'Alice W.', property: 'Unit 4B', amount: 1200, status: 'Paid' },
  { id: 2, tenant: 'Bob K.', property: 'Unit 3A', amount: 1000, status: 'Pending' },
];

export default function ManagerDashboard() {
  const { user } = useAuth();
  const [employees, setEmployees] = useState(employeesMock);
  const [workOrders, setWorkOrders] = useState(workOrdersMock);
  const [payments, setPayments] = useState(paymentsMock);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({ name: '', role: '', salary: 0 });

  const handleAddEmployee = () => {
    if (!newEmployee.name || !newEmployee.role || !newEmployee.salary) return;
    setEmployees([...employees, { id: Date.now(), ...newEmployee }]);
    setNewEmployee({ name: '', role: '', salary: 0 });
    setShowModal(false);
  };

  const handleDeleteEmployee = (id: number) => {
    setEmployees(employees.filter((e) => e.id !== id));
  };

  const handleCompleteWorkOrder = (id: number) => {
    setWorkOrders(workOrders.map((w) => (w.id === id ? { ...w, status: 'Completed' } : w)));
  };

  return (
    <div className="p-8 space-y-8 bg-neutral-50 min-h-full font-inter">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-neutral-900 tracking-tight">
            Manager <span className="text-blue-600">Portal</span>
          </h1>
          <p className="text-neutral-500 font-medium mt-1">
            Welcome back, {user?.name || 'Manager'}. Here is your operations summary.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-neutral-200">
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium text-neutral-600 uppercase tracking-wide">
            System Active
          </span>
        </div>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<FaBuilding />}
          label="Properties"
          value="14"
          trend="+2 this month"
          color="blue"
        />
        <StatCard
          icon={<FaUsers />}
          label="Technicians"
          value="86"
          trend="Active on field"
          color="slate"
        />
        <StatCard
          icon={<FaWallet />}
          label="Payroll Total"
          value="$32,450"
          trend="Monthly projection"
          color="green"
        />
        <StatCard
          icon={<FaChartBar />}
          label="Pending Balances"
          value="5"
          trend="Requires attention"
          color="amber"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Employees, Work Orders, Payments */}
        <div className="lg:col-span-2 space-y-6">
          {/* Employees */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-neutral-900">Team Employees</h2>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-1 text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500"
              >
                <FaPlus /> Add Employee
              </button>
            </div>
            <table className="w-full text-left border-collapse">
              <thead className="bg-neutral-100">
                <tr>
                  <th className="px-4 py-2 text-xs font-semibold text-neutral-600">Name</th>
                  <th className="px-4 py-2 text-xs font-semibold text-neutral-600">Role</th>
                  <th className="px-4 py-2 text-xs font-semibold text-neutral-600">Salary</th>
                  <th className="px-4 py-2 text-xs font-semibold text-neutral-600 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {employees.map((e) => (
                  <tr key={e.id} className="border-b hover:bg-neutral-50">
                    <td className="px-4 py-2">{e.name}</td>
                    <td className="px-4 py-2">{e.role}</td>
                    <td className="px-4 py-2">${e.salary.toLocaleString()}</td>
                    <td className="px-4 py-2 text-right">
                      <button
                        onClick={() => handleDeleteEmployee(e.id)}
                        className="text-red-600 hover:underline text-xs flex items-center gap-1"
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Work Orders */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">Active Work Orders</h2>
            <div className="space-y-3">
              {workOrders.map((w) => (
                <div
                  key={w.id}
                  className="flex justify-between items-center border-b last:border-0 pb-2"
                >
                  <div>
                    <p className="font-medium text-neutral-900">{w.task}</p>
                    <p className="text-xs text-neutral-500">{w.property}</p>
                  </div>
                  <button
                    onClick={() => handleCompleteWorkOrder(w.id)}
                    className={`text-sm px-2 py-1 rounded ${
                      w.status === 'Completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {w.status}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Payments */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">Payments</h2>
            <table className="w-full text-left border-collapse">
              <thead className="bg-neutral-100">
                <tr>
                  <th className="px-4 py-2 text-xs font-semibold text-neutral-600">Tenant</th>
                  <th className="px-4 py-2 text-xs font-semibold text-neutral-600">Property</th>
                  <th className="px-4 py-2 text-xs font-semibold text-neutral-600">Amount</th>
                  <th className="px-4 py-2 text-xs font-semibold text-neutral-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id} className="border-b hover:bg-neutral-50">
                    <td className="px-4 py-2">{p.tenant}</td>
                    <td className="px-4 py-2">{p.property}</td>
                    <td className="px-4 py-2">${p.amount}</td>
                    <td
                      className={`px-4 py-2 font-semibold ${
                        p.status === 'Paid' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {p.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions Sidebar */}
        <div className="bg-slate-900 rounded-xl p-6 text-white space-y-4">
          <h2 className="text-lg font-semibold">Quick Actions</h2>
          <Link
            href="/dashboard/manager/work-orders"
            className="flex justify-between items-center w-full bg-blue-600 hover:bg-blue-500 px-4 py-3 rounded font-medium transition-all"
          >
            <span>Create Work Order</span>
            <FaArrowRight />
          </Link>
          <Link
            href="/dashboard/manager/employees"
            className="flex justify-between items-center w-full bg-slate-800 hover:bg-slate-700 px-4 py-3 rounded font-medium transition-all"
          >
            <span>Manage Employees</span>
            <FaArrowRight />
          </Link>
          <Link
            href="/dashboard/manager/payments"
            className="flex justify-between items-center w-full bg-slate-800 hover:bg-slate-700 px-4 py-3 rounded font-medium transition-all"
          >
            <span>View Payments</span>
            <FaArrowRight />
          </Link>
          <Link
            href="/dashboard/manager/reports"
            className="flex justify-between items-center w-full bg-slate-800 hover:bg-slate-700 px-4 py-3 rounded font-medium transition-all"
          >
            <span>Generate Reports</span>
            <FaArrowRight />
          </Link>
        </div>
      </div>

      {/* Add Employee Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-96 p-6 space-y-4 border border-neutral-300">
            <h3 className="text-lg font-semibold text-neutral-900">Add New Employee</h3>
            <input
              type="text"
              placeholder="Name"
              value={newEmployee.name}
              onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
              className="w-full border border-neutral-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Role"
              value={newEmployee.role}
              onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
              className="w-full border border-neutral-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Salary"
              value={newEmployee.salary}
              onChange={(e) => setNewEmployee({ ...newEmployee, salary: Number(e.target.value) })}
              className="w-full border border-neutral-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-neutral-200 hover:bg-neutral-300 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEmployee}
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white text-sm flex items-center gap-1"
              >
                <FaPlus /> Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// StatCard Component
function StatCard({ icon, label, value, trend, color }: any) {
  const colorMap: any = {
    blue: 'text-blue-600 bg-blue-50',
    green: 'text-green-600 bg-green-50',
    amber: 'text-amber-600 bg-amber-50',
    slate: 'text-slate-600 bg-slate-50',
  };
  return (
    <div className="bg-white p-6 rounded-xl border border-neutral-200 group hover:bg-neutral-100 transition-all">
      <div className={`w-12 h-12 flex items-center justify-center mb-4 ${colorMap[color]}`}>
        {icon}
      </div>
      <p className="text-xs font-medium text-neutral-500">{label}</p>
      <p className="text-2xl font-semibold text-neutral-900 mt-1">{value}</p>
      <p className="text-xs font-medium text-blue-600 mt-2">{trend}</p>
    </div>
  );
}
