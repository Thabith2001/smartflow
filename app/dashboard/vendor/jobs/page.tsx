'use client';
import RoleGuard from '../../../components/RoleGuard';
import { useState, useMemo } from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

// Job Type
type Job = {
  id: string;
  vendor: string;
  task: string;
  property: string;
  assignedDate: string;
  dueDate: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  priority: 'High' | 'Medium' | 'Low';
};

// Dummy Jobs
const initialJobs: Job[] = [
  {
    id: 'j1',
    vendor: 'CleanPro',
    task: 'Monthly Cleaning',
    property: 'Sunset Apartments',
    assignedDate: '2026-01-20',
    dueDate: '2026-01-25',
    status: 'Scheduled',
    priority: 'High',
  },
  {
    id: 'j2',
    vendor: 'FixItNow',
    task: 'AC Repair',
    property: 'Skyline Tower',
    assignedDate: '2026-01-18',
    dueDate: '2026-01-22',
    status: 'In Progress',
    priority: 'Medium',
  },
];

export default function VendorJobsPage() {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | Job['status']>('All');
  const [modal, setModal] = useState<{ type: 'view' | 'edit'; job: Job } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  // Filter & Search
  const filteredJobs = useMemo(() => {
    return jobs
      .filter((j) => (filterStatus === 'All' ? true : j.status === filterStatus))
      .filter(
        (j) =>
          j.vendor.toLowerCase().includes(search.toLowerCase()) ||
          j.task.toLowerCase().includes(search.toLowerCase())
      );
  }, [jobs, search, filterStatus]);

  // Pagination
  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return filteredJobs.slice(start, start + perPage);
  }, [filteredJobs, currentPage]);

  // Handlers
  const deleteJob = (id: string) => {
    if (confirm('Are you sure to delete this job?')) setJobs(jobs.filter((j) => j.id !== id));
  };

  const saveJob = (job: Job) => {
    setJobs(jobs.map((j) => (j.id === job.id ? job : j)));
    setModal(null);
  };

  return (
    <RoleGuard allow={['MANAGER', 'ADMIN']}>
      <div className="p-6 space-y-6 bg-neutral-50 min-h-full font-inter">
        <h1 className="text-2xl font-semibold text-neutral-900">Vendor Jobs</h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Search Vendor or Task..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-4 py-2 w-full md:w-1/3 focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="border rounded px-4 py-2 w-full md:w-1/4 focus:ring-2 focus:ring-blue-500"
          >
            <option>All</option>
            <option>Scheduled</option>
            <option>In Progress</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
        </div>

        {/* Jobs Table */}
        <div className="overflow-x-auto rounded border bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Vendor</th>
                <th className="px-4 py-2 text-left">Task</th>
                <th className="px-4 py-2 text-left">Property</th>
                <th className="px-4 py-2 text-left">Due Date</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Priority</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedJobs.map((j) => (
                <tr key={j.id} className="border-t hover:bg-neutral-50">
                  <td className="px-4 py-2">{j.vendor}</td>
                  <td className="px-4 py-2">{j.task}</td>
                  <td className="px-4 py-2">{j.property}</td>
                  <td className="px-4 py-2">{j.dueDate}</td>
                  <td className="px-4 py-2">{j.status}</td>
                  <td className="px-4 py-2">{j.priority}</td>
                  <td className="px-4 py-2 text-center flex justify-center gap-2">
                    <button
                      onClick={() => setModal({ type: 'view', job: j })}
                      className="text-blue-600 hover:underline"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => setModal({ type: 'edit', job: j })}
                      className="text-amber-600 hover:underline"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteJob(j.id)}
                      className="text-red-600 hover:underline"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end gap-2 mt-2">
          {Array.from({ length: Math.ceil(filteredJobs.length / perPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Job Modal */}
        {modal && (
          <JobModal
            job={modal.job}
            type={modal.type}
            onClose={() => setModal(null)}
            onSave={saveJob}
          />
        )}
      </div>
    </RoleGuard>
  );
}

// Job Modal
function JobModal({ job, type, onClose, onSave }: any) {
  const [status, setStatus] = useState(job.status);
  const [priority, setPriority] = useState(job.priority);

  const handleSave = () => onSave({ ...job, status, priority });

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">
        <h2 className="text-lg font-semibold">{type === 'view' ? 'Job Details' : 'Edit Job'}</h2>

        <div className="space-y-2">
          <p>
            <strong>Vendor:</strong> {job.vendor}
          </p>
          <p>
            <strong>Task:</strong> {job.task}
          </p>
          <p>
            <strong>Property:</strong> {job.property}
          </p>
          <p>
            <strong>Assigned Date:</strong> {job.assignedDate}
          </p>
          <p>
            <strong>Due Date:</strong> {job.dueDate}
          </p>
          {type !== 'view' && (
            <>
              <div>
                <label className="block text-sm font-medium">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="mt-1 w-full border rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option>Scheduled</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="mt-1 w-full border rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 rounded border hover:bg-gray-100">
            Close
          </button>
          {type !== 'view' && (
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-500"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
