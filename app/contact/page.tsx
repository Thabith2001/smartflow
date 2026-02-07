'use client';
/* eslint-disable @next/next/no-img-element */

import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from 'react-icons/fa';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    alert('Thank you! Our team will contact you within 24 hours.');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Hero Section  */}
      <section className="relative py-28 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000"
            alt="Office Background"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-[#0A1D37]/85 backdrop-blur-[2px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <span className="text-[#FFB800] font-black uppercase tracking-[0.3em] text-xs block mb-4">
            Connect With Us
          </span>
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-4">
            Get In <span className="text-[#FFB800]">Touch</span>
          </h1>
          <p className="text-zinc-300 max-w-xl text-lg font-medium">
            Have questions about a property or investment opportunity? Our elite team is ready to
            assist you.
          </p>
        </div>

        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#FFB800]/10 skew-x-12 translate-x-20 hidden lg:block"></div>
      </section>

      {/* Main Contact Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-black text-[#0A1D37] uppercase tracking-tighter mb-6">
                Contact Information
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-zinc-100 flex items-center justify-center rounded-sm text-[#1E3A8A] shrink-0">
                    <FaPhoneAlt size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-1">
                      Call Us
                    </p>
                    <p className="text-lg font-bold text-[#0A1D37]">+1 (555) 000-1234</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-zinc-100 flex items-center justify-center rounded-sm text-[#1E3A8A] shrink-0">
                    <FaEnvelope size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-1">
                      Email Us
                    </p>
                    <p className="text-lg font-bold text-[#0A1D37]">support@realtyelite.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-zinc-100 flex items-center justify-center rounded-sm text-[#1E3A8A] shrink-0">
                    <FaMapMarkerAlt size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-1">
                      Visit Office
                    </p>
                    <p className="text-lg font-bold text-[#0A1D37]">
                      725 5th Ave, New York, NY 10022
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-zinc-50 p-8 rounded-sm border-l-4 border-[#FFB800]">
              <div className="flex items-center gap-3 mb-4">
                <FaClock className="text-[#1E3A8A]" />
                <h3 className="font-black uppercase tracking-widest text-sm text-[#0A1D37]">
                  Operating Hours
                </h3>
              </div>
              <div className="space-y-2 text-sm text-zinc-600 font-medium">
                <div className="flex justify-between">
                  <span>Mon - Fri:</span> <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span> <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between text-red-500">
                  <span>Sunday:</span> <span>Closed</span>
                </div>
              </div>
            </div>

            {/* Social Connect */}
            <div>
              <h3 className="font-black uppercase tracking-widest text-xs text-zinc-400 mb-4">
                Follow Our Updates
              </h3>
              <div className="flex gap-4">
                {[FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 border border-zinc-200 flex items-center justify-center rounded-sm text-zinc-400 hover:bg-[#1E3A8A] hover:text-white transition-all"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 md:p-12 rounded-sm border border-gray-200 shadow-xl relative">
            <div className="absolute -top-4 right-8 bg-[#1E3A8A] text-white text-[10px] font-black px-4 py-2 uppercase tracking-widest shadow-xl z-10">
              Quick Support
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-[#0A1D37]">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-4 bg-zinc-50 border border-zinc-200 outline-none focus:border-[#1E3A8A] transition-colors rounded-sm"
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-[#0A1D37]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-4 bg-zinc-50 border border-zinc-200 outline-none focus:border-[#1E3A8A] transition-colors rounded-sm"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-[#0A1D37]">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-4 bg-zinc-50 border border-zinc-200 outline-none focus:border-[#1E3A8A] transition-colors rounded-sm"
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-[#0A1D37]">
                    Subject
                  </label>
                  <select
                    className="w-full px-4 py-4 bg-zinc-50 border border-zinc-200 outline-none focus:border-[#1E3A8A] transition-colors rounded-sm"
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  >
                    <option>General Inquiry</option>
                    <option>Buy a Property</option>
                    <option>Sell a Property</option>
                    <option>Investment Advice</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-[#0A1D37]">
                  Your Message
                </label>
                <textarea
                  rows={5}
                  required
                  className="w-full px-4 py-4 bg-zinc-50 border border-zinc-200 outline-none focus:border-[#1E3A8A] transition-colors rounded-sm resize-none"
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0A1D37] text-white font-black uppercase tracking-widest py-5 hover:bg-[#FFB800] hover:text-[#0A1D37] transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Integrated Google Map  */}
      <section className="w-full h-[500px] bg-gray-100 relative group">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.9732!3d40.7619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258f9cfcb250d%3A0xdb570dd4f1f09b01!2sTrump%20Tower!5e0!3m2!1sen!2sus!4v1674550000000!5m2!1sen!2sus"
          className="w-full h-full border-0 grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Location Map"
        ></iframe>

        <div className="absolute top-10 left-10 bg-white p-6 shadow-2xl rounded-sm hidden md:block border border-zinc-100">
          <h4 className="font-black text-[#0A1D37] uppercase tracking-tighter mb-1">New York HQ</h4>
          <p className="text-xs text-zinc-500 mb-4 font-medium italic">725 5th Ave, Manhattan</p>
          <div className="flex items-center gap-2 text-[#1E3A8A] text-[10px] font-black uppercase tracking-widest cursor-pointer hover:text-[#FFB800]">
            Get Directions <FaMapMarkerAlt size={10} />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
