'use client';
import React, { useState } from 'react';
import { ReportIssueModal } from './ReportIssueModal';
import {
  FaTimes,
  FaPhone,
  FaEnvelope,
  FaExternalLinkAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTools,
} from 'react-icons/fa';

export const CustomerDetailsModal = ({ job, onClose, onMarkComplete, onAccept }) => {
  const [showReportModal, setShowReportModal] = useState(false);

  if (!job) return null;

  const handleAdminReport = (reportData) => {
    console.log('Report received for Admin:', reportData);
    alert(`Report for Job #${job.id} has been sent to the Admin.`);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
        <div className="bg-white w-full max-w-2xl max-h-[95vh] overflow-y-auto shadow-2xl border border-gray-200">
          {/* Header  */}
          <div className="sticky top-0 z-20 bg-[#1e3a8a] p-6 flex justify-between items-center text-white">
            <h2 className="text-sm font-black uppercase tracking-widest">Job Assignment Details</h2>
            <button onClick={onClose} className="hover:text-[#facc15] transition-colors p-1">
              <FaTimes size={20} />
            </button>
          </div>

          <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
            {/* Service Banner */}
            <div className="bg-blue-50 border-b-2 border-blue-100 -mt-4 sm:-mt-8 -mx-4 sm:-mx-8 p-6 mb-4 flex items-center gap-4">
              <div className="bg-[#1e3a8a] p-3 text-white">
                <FaTools size={20} />
              </div>
              <div>
                <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest">
                  Scheduled Service
                </h4>
                <p className="text-base sm:text-lg font-black text-[#1e3a8a] uppercase tracking-tight">
                  {job.service}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Contact Info */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Customer Contact
                </h4>
                <div className="bg-gray-50 border-2 border-gray-100 p-4 space-y-3">
                  <p className="text-sm font-black text-[#1e3a8a]">{job.name}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-600 font-bold">
                    <FaPhone className="text-[#eab308]" /> {job.phone}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600 font-bold">
                    <FaEnvelope className="text-[#eab308]" /> {job.email}
                  </div>
                </div>
              </div>

              {/* Location Info */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Service Location
                </h4>
                <div className="bg-gray-50 border-2 border-gray-100 p-4 space-y-3">
                  <p className="text-xs font-bold text-gray-700 leading-relaxed">{job.address}</p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(job.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[9px] font-black uppercase text-[#eab308] hover:underline transition-all w-fit"
                  >
                    <FaExternalLinkAlt /> Open in Google Maps
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-[#eab308] p-4">
              <p className="text-[10px] font-black text-[#1e3a8a] uppercase mb-1">
                Problem Description & Notes
              </p>
              <p className="text-xs text-gray-700 italic font-medium leading-relaxed">
                "{job.notes}"
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 pt-4">
              {job.status === 'pending' ? (
                <button
                  onClick={() => onAccept(job.id)}
                  className="flex-1 bg-blue-600 text-white py-4 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black transition-all shadow-lg active:scale-95"
                >
                  <FaCheckCircle /> Confirm & Accept Assignment
                </button>
              ) : (
                <button
                  onClick={() => onMarkComplete(job.id)}
                  className="flex-1 bg-green-600 text-white py-4 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black transition-all active:scale-95"
                >
                  <FaCheckCircle /> Mark Completed
                </button>
              )}

              <button
                onClick={() => setShowReportModal(true)}
                className="flex-1 bg-white border-2 border-red-100 text-red-500 py-4 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-red-50 transition-all text-center active:scale-95"
              >
                <FaExclamationTriangle /> Report Issue
              </button>
            </div>
          </div>
        </div>
      </div>

      {showReportModal && (
        <ReportIssueModal
          job={job}
          onClose={() => setShowReportModal(false)}
          onSendReport={handleAdminReport}
        />
      )}
    </>
  );
};
