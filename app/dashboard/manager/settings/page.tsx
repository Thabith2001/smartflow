'use client';

import { useState } from 'react';
import {
  FaUserTie,
  FaToggleOn,
  FaToggleOff,
  FaTrash,
  FaPlus,
  FaTimes,
  FaEdit,
} from 'react-icons/fa';

type Permissions = {
  leases: boolean;
  employees: boolean;
  paymentsView: boolean;
  technicians: boolean;
};

type Manager = {
  id: string;
  name: string;
  email: string;
  salary: number;
  commission: number;
  active: boolean;
  properties: number;
  employees: number;
  permissions: Permissions;
};

const INITIAL_MANAGERS: Manager[] = [
  {
    id: 'm1',
    name: 'Nimal Perera',
    email: 'nimal@company.com',
    salary: 120000,
    commission: 5,
    active: true,
    properties: 6,
    employees: 12,
    permissions: {
      leases: true,
      employees: true,
      paymentsView: true,
      technicians: true,
    },
  },
];

export default function ManagerSettingsPage() {
  const [managers, setManagers] = useState<Manager[]>(INITIAL_MANAGERS);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const [form, setForm] = useState<Omit<Manager, 'id'>>({
    name: '',
    email: '',
    salary: 0,
    commission: 0,
    active: true,
    properties: 0,
    employees: 0,
    permissions: {
      leases: false,
      employees: false,
      paymentsView: false,
      technicians: false,
    },
  });

  /* ---------------- ACTIONS ---------------- */

  const toggleStatus = (id: string) =>
    setManagers((prev) => prev.map((m) => (m.id === id ? { ...m, active: !m.active } : m)));

  const togglePermission = (id: string, key: keyof Permissions) =>
    setManagers((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              permissions: { ...m.permissions, [key]: !m.permissions[key] },
            }
          : m
      )
    );

  const deleteManager = (id: string) => setManagers(managers.filter((m) => m.id !== id));

  const openCreate = () => {
    setEditId(null);
    setForm({
      name: '',
      email: '',
      salary: 0,
      commission: 0,
      active: true,
      properties: 0,
      employees: 0,
      permissions: {
        leases: false,
        employees: false,
        paymentsView: false,
        technicians: false,
      },
    });
    setOpen(true);
  };

  const openEdit = (m: Manager) => {
    setEditId(m.id);
    setForm({ ...m });
    setOpen(true);
  };

  const saveManager = () => {
    if (!form.name || !form.email) return alert('Name & email required');

    if (editId) {
      setManagers((prev) => prev.map((m) => (m.id === editId ? { ...form, id: editId } : m)));
    } else {
      setManagers((prev) => [...prev, { ...form, id: crypto.randomUUID() }]);
    }

    setOpen(false);
  };

  return (
    <div className="space-y-8 p-6">
      {/* TITLE */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Manager Settings</h1>
        <p className="text-sm text-slate-500">
          Control manager permissions, salary and assignments
        </p>
      </div>

      {/* ADD BUTTON */}
      <button
        onClick={openCreate}
        className="inline-flex items-center gap-2 rounded border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
      >
        <FaPlus />
        Add Manager
      </button>

      {/* TABLE */}
      <div className="overflow-x-auto rounded border border-slate-200 bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-3 text-left">Manager</th>
              <th className="px-5 py-3">Salary</th>
              <th className="px-5 py-3">Commission</th>
              <th className="px-5 py-3">Assignments</th>
              <th className="px-5 py-3">Permissions</th>
              <th className="px-5 py-3 text-center">Status</th>
              <th className="px-5 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {managers.map((m) => (
              <tr key={m.id} className="border-t">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <FaUserTie className="text-blue-600" />
                    <div>
                      <p className="font-medium">{m.name}</p>
                      <p className="text-xs text-slate-500">{m.email}</p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4">₹{m.salary}</td>
                <td className="px-5 py-4">{m.commission}%</td>

                <td className="px-5 py-4 text-xs">
                  {m.properties} Properties <br />
                  {m.employees} Employees
                </td>

                <td className="px-5 py-4 space-x-1 text-xs">
                  {(Object.keys(m.permissions) as (keyof Permissions)[]).map((key) => (
                    <button
                      key={key}
                      onClick={() => togglePermission(m.id, key)}
                      className={`rounded border px-2 py-1 ${
                        m.permissions[key]
                          ? 'border-blue-600 text-blue-600'
                          : 'border-slate-300 text-slate-500'
                      }`}
                    >
                      {key}
                    </button>
                  ))}
                </td>

                <td className="px-5 py-4 text-center">
                  <button onClick={() => toggleStatus(m.id)} className="text-blue-600">
                    {m.active ? <FaToggleOn size={20} /> : <FaToggleOff size={20} />}
                  </button>
                </td>

                <td className="px-5 py-4 text-center space-x-2">
                  <button
                    onClick={() => openEdit(m)}
                    className="p-2 border rounded hover:bg-blue-600 hover:text-white"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => deleteManager(m.id)}
                    className="p-2 border rounded hover:bg-red-600 hover:text-white"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-lg border w-full max-w-lg p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">{editId ? 'Edit Manager' : 'Add Manager'}</h2>
              <button onClick={() => setOpen(false)}>
                <FaTimes />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input
                className="border rounded px-3 py-2 text-sm"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                className="border rounded px-3 py-2 text-sm"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <input
                type="number"
                className="border rounded px-3 py-2 text-sm"
                placeholder="Salary"
                value={form.salary}
                onChange={(e) => setForm({ ...form, salary: +e.target.value })}
              />
              <input
                type="number"
                className="border rounded px-3 py-2 text-sm"
                placeholder="Commission %"
                value={form.commission}
                onChange={(e) => setForm({ ...form, commission: +e.target.value })}
              />
            </div>

            <div className="flex justify-end gap-3">
              <button onClick={() => setOpen(false)} className="px-4 py-2 border rounded">
                Cancel
              </button>
              <button
                onClick={saveManager}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
