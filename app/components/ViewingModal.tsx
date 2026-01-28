'use client';

import React, { useState } from 'react';
import { FaTimes, FaPaperPlane, FaCalendarAlt, FaClock, FaCheckCircle } from 'react-icons/fa';

interface ViewingModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitle: string;
}

const ViewingModal = ({ isOpen, onClose, propertyTitle }: ViewingModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);
    }, 1500);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-blue-900/10 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={handleOverlayClick}
    >
      {/* MODAL CONTAINER */}
      <div className="bg-white w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-gray-200 relative">
        {/* HEADER */}
        <div className="bg-[#1e3a8a] (PMS 281 C) px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-white text-sm md:text-base font-bold uppercase tracking-widest">
              Schedule Viewing
            </h2>
            <p className="text-white/60 text-[10px] uppercase truncate max-w-[250px]">
              {propertyTitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-[#facc15] transition-colors"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* SUCCESS MESSAGE OVERLAY */}
        {isSuccess ? (
          <div className="p-12 flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in-90">
            <FaCheckCircle className="text-green-500" size={60} />
            <h3 className="text-xl font-bold text-blue-900">Request Sent!</h3>
            <p className="text-gray-500">We will contact you shortly to confirm your viewing.</p>
          </div>
        ) : (
          /* FORM */
          <form className="p-6 md:p-8 space-y-5" onSubmit={handleSubmit}>
            {/* DATE & TIME */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-blue-900 uppercase tracking-tighter">
                  Preferred Date
                </label>
                <div className="flex items-center gap-2 border-b border-gray-300 focus-within:border-[#eab308] transition-all">
                  <FaCalendarAlt className="text-gray-400 text-sm" />
                  <input
                    required
                    type="date"
                    className="w-full py-3 text-sm outline-none bg-transparent cursor-pointer accent-[#1e3a8a]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-blue-900 uppercase tracking-tighter">
                  Preferred Time
                </label>
                <div className="flex items-center gap-2 border-b border-gray-300 focus-within:border-[#eab308] transition-all">
                  <FaClock className="text-gray-400 text-sm" />
                  <select
                    required
                    className="w-full py-3 text-sm outline-none bg-transparent cursor-pointer appearance-none"
                  >
                    <option value="">Select Time</option>
                    <option>09:00 AM - 11:00 AM</option>
                    <option>11:00 AM - 01:00 PM</option>
                    <option>02:00 PM - 05:00 PM</option>
                  </select>
                </div>
              </div>
            </div>

            {/* NAME */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                required
                type="text"
                placeholder="First Name"
                className="w-full border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-blue-900 transition-all bg-transparent"
              />
              <input
                required
                type="text"
                placeholder="Last Name"
                className="w-full border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-blue-900 transition-all bg-transparent"
              />
            </div>

            {/* EMAIL */}
            <input
              required
              type="email"
              placeholder="Email Address"
              className="w-full border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-blue-900 transition-all bg-transparent"
            />

            {/* PHONE */}
            <div className="relative group">
              <input
                required
                type="tel"
                pattern="[0-9]{9}"
                placeholder="Phone: 94 XXX XXX XXX"
                className="w-full border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-blue-900 transition-all bg-transparent"
              />
              <span className="absolute right-0 -bottom-5 text-[10px] text-gray-400 group-focus-within:text-red-500 font-medium transition-colors">
                Enter 9 digits after country code
              </span>
            </div>

            {/* MESSAGE */}
            <textarea
              placeholder="Your Message..."
              rows={3}
              className="w-full border border-gray-200 p-4 mt-8 text-sm focus:outline-none focus:border-blue-900 transition-all resize-none bg-gray-50 rounded-sm"
            ></textarea>

            {/* FOOTER */}
            <div className="flex justify-end items-center gap-6 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 font-bold text-xs hover:text-blue-900 uppercase tracking-widest transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`${
                  isSubmitting ? 'bg-gray-400' : 'bg-[#eab308] hover:bg-[#1e3a8a] hover:text-white'
                } text-blue-900 px-8 py-3 flex items-center gap-3 text-xs font-black uppercase tracking-widest transition-all shadow-md active:scale-95 disabled:cursor-not-allowed`}
              >
                <FaPaperPlane size={12} className={isSubmitting ? 'animate-pulse' : ''} />
                {isSubmitting ? 'Sending...' : 'Submit Request'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ViewingModal;
