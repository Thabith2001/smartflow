'use client';
/* eslint-disable @next/next/no-img-element */

import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CustomerDetailsModal } from '../components/technician/CustomerDetailsModal';
import UpdateProfileModal from '../components/technician/UpdateProfileModal';
import {
  FaUser,
  FaTools,
  FaCalendarCheck,
  FaClock,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaStar,
  FaSignOutAlt,
  FaEdit,
  FaBell,
} from 'react-icons/fa';

type Job = {
  id: number;
  status: string;
  name: string;
  date: string;
  service: string;
  phone?: string;
  email?: string;
  address?: string;
  notes?: string;
};

type TechInfo = {
  name: string;
  id: string;
  role: string;
  rating: number;
  email: string;
  phone: string;
  location: string;
  status: string;
  completedJobs: number;
  image: string | null;
};

const TechnicianDashboard: React.FC = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const [techInfo, setTechInfo] = useState<TechInfo>({
    name: 'Alex Rivera',
    id: 'TECH-8821',
    role: 'Senior HVAC Specialist',
    rating: 4.9,
    email: 'alex.rivera@smartflow.com',
    phone: '+1 (555) 123-4567',
    location: 'Austin, TX',
    status: 'Active',
    completedJobs: 142,
    image: null,
  });

  const [jobs, setJobs] = useState<Job[]>([
    {
      id: 1,
      status: 'pending',
      name: 'James Miller',
      date: 'Feb 02, 10:00 AM',
      service: 'HVAC Repair',
      phone: '(555) 012-3456',
      email: 'james@example.com',
      address: '123 Luxury Ave, Austin, TX',
      notes: 'Unit makes clicking sound.',
    },
    {
      id: 2,
      status: 'accepted',
      name: 'Sarah Connor',
      date: 'Feb 02, 02:30 PM',
      service: 'Electrical Check',
      phone: '(555) 987-6543',
      email: 'sarah@example.com',
      address: '742 Evergreen Terr, Austin, TX',
      notes: 'Check main breaker panel.',
    },
  ]);

  const handleAcceptJob = (jobId: number) => {
    setJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, status: 'accepted' } : j)));
    setSelectedJob(null);
  };

  const handleMarkComplete = (jobId: number) => {
    setJobs((prev) => prev.filter((j) => j.id !== jobId));
    setTechInfo((prev) => ({ ...prev, completedJobs: prev.completedJobs + 1 }));
    setSelectedJob(null);
  };

  const handleUpdateProfile = (newData: { name?: string; profileImage?: string }) => {
    setTechInfo((prev) => ({
      ...prev,
      name: newData.name || prev.name,
      image: newData.profileImage || prev.image,
    }));
    setIsProfileModalOpen(false);
  };

  const pendingJobs = jobs.filter((j) => j.status === 'pending');
  const activeJobs = jobs.filter((j) => j.status === 'accepted');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6 md:py-12">
        {/* WELCOME BAR */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 bg-white p-5 sm:p-6 border-l-4 border-[#eab308] shadow-sm">
          <div className="w-full sm:w-auto">
            <h1 className="text-xl sm:text-2xl font-black text-[#1e3a8a] uppercase tracking-tight leading-none">
              Welcome Back, {techInfo.name.split(' ')[0]}
            </h1>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.15em] mt-2">
              Technician Portal • ID: {techInfo.id}
            </p>
          </div>

          <div className="flex items-center justify-between w-full sm:w-auto gap-4 pt-4 sm:pt-0 border-t sm:border-t-0 sm:border-l sm:pl-6 border-gray-100">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 text-[10px] font-black uppercase rounded-sm border border-green-100">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              {techInfo.status}
            </div>
            <button className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 hover:text-red-600 transition-colors">
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>

        {/* ASSIGNMENTS SECTION */}
        {pendingJobs.length > 0 && (
          <div className="mb-8 space-y-4">
            <h3 className="text-[#1e3a8a] font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 ml-1">
              <FaBell className="text-[#eab308] animate-bounce" /> New Requests From Admin
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-[#1e3a8a] p-5 flex justify-between items-center shadow-lg border-b-4 border-[#eab308]"
                >
                  <div className="pr-4">
                    <p className="text-white font-black uppercase text-sm tracking-tight leading-tight">
                      {job.name}
                    </p>
                    <p className="text-[#eab308] text-[9px] font-black uppercase tracking-widest mt-1">
                      {job.service} • {job.date}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="shrink-0 bg-[#eab308] text-[#1e3a8a] px-4 py-2.5 text-[9px] font-black uppercase hover:bg-white transition-all active:scale-95"
                  >
                    Review
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* PROFILE COLUMN */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border-2 border-gray-100 p-8 text-center relative shadow-sm">
              <div className="absolute top-0 right-0 bg-[#eab308] text-[#1e3a8a] px-4 py-1 font-black text-[9px] uppercase">
                {techInfo.role}
              </div>

              <div className="w-32 h-32 bg-gray-100 rounded-full mx-auto mb-4 border-4 border-white shadow-lg flex items-center justify-center relative group overflow-hidden">
                {techInfo.image ? (
                  <img
                    src={techInfo.image}
                    alt="Profile"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <FaUser className="text-gray-300 text-5xl" />
                )}

                <button
                  onClick={() => setIsProfileModalOpen(true)}
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                  title="Update Profile Info"
                >
                  <FaEdit size={24} />
                </button>
              </div>

              <h2 className="text-xl font-black text-[#1e3a8a] uppercase tracking-tighter">
                {techInfo.name}
              </h2>
              <div className="flex justify-center items-center gap-1 mt-1 mb-6 text-[#eab308]">
                <FaStar size={12} />
                <span className="text-xs font-black text-gray-800">{techInfo.rating} Rating</span>
              </div>

              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="w-full mb-6 py-2 border-2 border-[#1e3a8a] text-[#1e3a8a] text-[9px] font-black uppercase tracking-widest hover:bg-[#1e3a8a] hover:text-white transition-all"
              >
                Update Personal Info
              </button>

              <div className="space-y-4 text-left border-t border-gray-50 pt-6">
                <InfoItem icon={<FaEnvelope />} label="Email" value={techInfo.email} />
                <InfoItem icon={<FaPhone />} label="Phone" value={techInfo.phone} />
                <InfoItem
                  icon={<FaMapMarkerAlt />}
                  label="Service Area"
                  value={techInfo.location}
                />
              </div>
            </div>
          </div>

          {/* ACTIVE JOBS COLUMN */}
          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard
                icon={<FaTools />}
                count={techInfo.completedJobs}
                label="Total Done"
                color="blue"
              />
              <StatCard
                icon={<FaClock />}
                count={activeJobs.length}
                label="Active Today"
                color="yellow"
              />
              <StatCard icon={<FaCalendarCheck />} count="98%" label="Reliability" color="gray" />
            </div>

            <div className="bg-white border-2 border-gray-100 overflow-hidden shadow-sm">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                <h3 className="text-[10px] font-black text-[#1e3a8a] uppercase tracking-widest">
                  Confirmed Schedule
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr className="bg-white border-b border-gray-100">
                      <th className="px-6 py-4 text-[9px] font-black uppercase text-gray-400">
                        Customer
                      </th>
                      <th className="px-6 py-4 text-[9px] font-black uppercase text-gray-400">
                        Date/Time
                      </th>
                      <th className="px-6 py-4 text-[9px] font-black uppercase text-gray-400">
                        Service
                      </th>
                      <th className="px-6 py-4 text-[9px] font-black uppercase text-gray-400 text-right">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-[11px] font-bold">
                    {activeJobs.length > 0 ? (
                      activeJobs.map((job) => (
                        <JobRow
                          key={job.id}
                          name={job.name}
                          date={job.date}
                          service={job.service}
                          onManage={() => setSelectedJob(job)}
                        />
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-gray-400 italic">
                          No active jobs. Accept requests above.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      {selectedJob && (
        <CustomerDetailsModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onMarkComplete={handleMarkComplete}
          onAccept={handleAcceptJob}
        />
      )}
      {isProfileModalOpen && (
        <UpdateProfileModal
          techInfo={techInfo}
          onClose={() => setIsProfileModalOpen(false)}
          onSave={handleUpdateProfile}
        />
      )}
      <Footer />
    </div>
  );
};

/* HELPERS */
const InfoItem: React.FC<{ icon: React.ReactNode; label: string; value: string | number }> = ({
  icon,
  label,
  value,
}) => (
  <div className="flex items-center gap-3">
    <div className="text-gray-300 w-4">{icon}</div>
    <div>
      <p className="text-[8px] font-black text-gray-400 uppercase tracking-tighter">{label}</p>
      <p className="text-[11px] font-bold text-[#1e3a8a]">{value}</p>
    </div>
  </div>
);

const StatCard: React.FC<{
  icon: React.ReactNode;
  count: number | string;
  label: string;
  color: 'blue' | 'yellow' | 'gray';
}> = ({ icon, count, label, color }) => {
  const colors: Record<'blue' | 'yellow' | 'gray', string> = {
    blue: 'bg-[#1e3a8a] text-white',
    yellow: 'bg-[#eab308] text-[#1e3a8a]',
    gray: 'bg-gray-100 text-gray-800',
  };
  return (
    <div
      className={`p-6 rounded-sm flex flex-col items-center justify-center text-center space-y-2 ${colors[color]}`}
    >
      <div className="opacity-80">{icon}</div>
      <p className="text-2xl font-black tracking-tighter">{count}</p>
      <p className="text-[9px] font-black uppercase tracking-widest">{label}</p>
    </div>
  );
};

const JobRow: React.FC<{
  name: string;
  date: string;
  service: string;
  onManage: () => void;
}> = ({ name, date, service, onManage }) => (
  <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
    <td className="px-6 py-4 uppercase text-[#1e3a8a]">{name}</td>
    <td className="px-6 py-4 text-gray-500 uppercase">{date}</td>
    <td className="px-6 py-4">
      <span className="bg-gray-100 px-2 py-0.5 uppercase text-[9px]">{service}</span>
    </td>
    <td className="px-6 py-4 text-right">
      <button
        onClick={onManage}
        className="text-[#eab308] hover:text-[#1e3a8a] uppercase text-[9px] font-black underline decoration-2 underline-offset-4"
      >
        Manage
      </button>
    </td>
  </tr>
);

export default TechnicianDashboard;
