'use client';

import RoleGuard from '../../../components/RoleGuard';
import { useState } from 'react';
import { FaUserPlus, FaTrash, FaEdit, FaSearch } from 'react-icons/fa';

interface User {
  id: number;
  name: string;
  role: 'ADMIN' | 'MANAGER' | 'TECHNICIAN' | 'PROPERTY_OWNER' | 'CUSTOMER';
  email: string;
  status: 'Active' | 'Inactive';
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'Alice Admin',
      role: 'ADMIN',
      email: 'alice@example.com',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Bob Manager',
      role: 'MANAGER',
      email: 'bob@example.com',
      status: 'Active',
    },
  ]);

  const [form, setForm] = useState<User>({
    id: 0,
    name: '',
    role: 'MANAGER',
    email: '',
    status: 'Active',
  });

  const [search, setSearch] = useState('');

  const handleSave = () => {
    if (!form.name || !form.email) return;

    if (form.id) {
      setUsers((prev) => prev.map((u) => (u.id === form.id ? form : u)));
    } else {
      setUsers((prev) => [...prev, { ...form, id: prev.length + 1 }]);
    }

    setForm({ id: 0, name: '', role: 'MANAGER', email: '', status: 'Active' });
  };

  const handleDelete = (id: number) => {
    if (id === 1) return alert('Admin account cannot be deleted');
    if (confirm('Delete this user?')) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <RoleGuard allow={['ADMIN']}>
      <div className="p-8 min-h-full bg-slate-50 space-y-8 font-inter">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 flex items-center gap-2">
            <FaUserPlus className="text-blue-600" />
            User Management
          </h1>
          <p className="text-sm text-slate-500">
            Admin can create, update, disable and remove system users
          </p>
        </div>

        {/* Create / Edit */}
        <div className="bg-white border rounded-lg p-6 space-y-4">
          <h2 className="text-base font-semibold text-slate-800">
            {form.id ? 'Update User' : 'Create New User'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              className="px-4 py-2 border rounded-lg text-sm"
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              className="px-4 py-2 border rounded-lg text-sm"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <select
              className="px-4 py-2 border rounded-lg text-sm"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value as User['role'] })}
            >
              <option>ADMIN</option>
              <option>MANAGER</option>
              <option>TECHNICIAN</option>
              <option>PROPERTY_OWNER</option>
              <option>CUSTOMER</option>
            </select>

            <select
              className="px-4 py-2 border rounded-lg text-sm"
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value as 'Active' | 'Inactive' })
              }
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
            >
              {form.id ? 'Save Changes' : 'Create User'}
            </button>

            {form.id && (
              <button
                onClick={() =>
                  setForm({ id: 0, name: '', role: 'MANAGER', email: '', status: 'Active' })
                }
                className="px-6 py-2 border rounded-lg text-sm"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <FaSearch className="absolute left-3 top-2.5 text-slate-400" />
          <input
            className="pl-9 pr-4 py-2 w-full border rounded-lg text-sm"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Users Table */}
        <div className="bg-white border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="px-5 py-3 text-left">User</th>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u.id} className="border-t hover:bg-slate-50">
                  <td className="px-5 py-3">
                    <div className="font-medium">{u.name}</div>
                    <div className="text-xs text-slate-500">{u.email}</div>
                  </td>

                  <td className="px-5 py-3 text-center">
                    <span className="px-3 py-1 border rounded-lg text-xs">{u.role}</span>
                  </td>

                  <td className="px-5 py-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-lg text-xs border ${
                        u.status === 'Active'
                          ? 'text-emerald-700 border-emerald-300'
                          : 'text-rose-700 border-rose-300'
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>

                  <td className="px-5 py-3 text-right space-x-2">
                    <button
                      onClick={() => setForm(u)}
                      className="p-2 border rounded-lg hover:bg-blue-600 hover:text-white"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => handleDelete(u.id)}
                      className="p-2 border rounded-lg hover:bg-red-600 hover:text-white"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </RoleGuard>
  );
}
