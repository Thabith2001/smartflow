'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  FaBuilding,
  FaChartLine,
  FaKey,
  FaHandsHelping,
  FaSearchLocation,
  FaGavel,
  FaArrowRight,
} from 'react-icons/fa';

const services = [
  {
    icon: <FaBuilding size={40} />,
    title: 'Property Management',
    description:
      'End-to-end management for residential and commercial estates, focusing on value retention and tenant satisfaction.',
  },
  {
    icon: <FaChartLine size={40} />,
    title: 'Market Analysis',
    description:
      'Data-driven insights and 2026 market forecasting to help you make informed investment decisions.',
  },
  {
    icon: <FaSearchLocation size={40} />,
    title: 'Land Acquisition',
    description:
      'Identifying high-yield land opportunities and navigating the complexities of zoning and development.',
  },
  {
    icon: <FaKey size={40} />,
    title: 'Sales & Leasing',
    description:
      'Aggressive marketing strategies and elite networking to close deals at the highest possible market price.',
  },
  {
    icon: <FaGavel size={40} />,
    title: 'Legal Advisory',
    description:
      'Navigating zoning laws, title insurance, and property contracts with our expert in-house legal team.',
  },
  {
    icon: <FaHandsHelping size={40} />,
    title: 'Investment Consulting',
    description:
      'Bespoke portfolio building strategies for both institutional and individual private investors.',
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative py-28 bg-[#0A1D37] overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#1E3A8A]/10 skew-x-12 translate-x-20"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <span className="text-[#FFB800] font-black uppercase tracking-[0.3em] text-xs block mb-4">
            Expertise & Solutions
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6 leading-none">
            Our <span className="text-[#FFB800]">Services</span>
          </h1>
          <p className="max-w-2xl text-zinc-400 text-lg font-medium leading-relaxed">
            Delivering comprehensive real estate solutions through a blend of traditional expertise
            and modern technological innovation.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-10 border border-zinc-100 bg-white hover:border-[#1E3A8A] hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
            >
              <div className="text-[#1E3A8A] group-hover:text-[#FFB800] transition-colors mb-8 transform group-hover:scale-110 duration-500 origin-left">
                {service.icon}
              </div>
              <h3 className="text-2xl font-black text-[#0A1D37] uppercase tracking-tighter mb-4 group-hover:text-[#1E3A8A]">
                {service.title}
              </h3>
              <p className="text-zinc-500 leading-relaxed mb-8">{service.description}</p>
              <button className="flex items-center gap-2 text-[#1E3A8A] font-black text-xs uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
                Learn More <FaArrowRight className="text-[#FFB800]" />
              </button>

              <span className="absolute -bottom-4 -right-2 text-9xl font-black text-zinc-50 opacity-[0.03] group-hover:opacity-[0.08] pointer-events-none transition-opacity">
                0{index + 1}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#F8F9FA] py-20 border-t border-zinc-100">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-[#0A1D37] uppercase tracking-tighter mb-6">
            Ready to Start Your <span className="text-[#1E3A8A]">Next Project?</span>
          </h2>
          <p className="text-zinc-500 mb-10 max-w-2xl mx-auto">
            Contact our elite team today for a confidential consultation regarding your real estate
            goals and investment requirements.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-[#0A1D37] text-white px-10 py-5 font-black uppercase tracking-widest hover:bg-[#1E3A8A] transition-all text-sm">
              Book a Consultation
            </button>
            <button className="border-2 border-[#0A1D37] text-[#0A1D37] px-10 py-5 font-black uppercase tracking-widest hover:bg-[#0A1D37] hover:text-white transition-all text-sm">
              View Portfolio
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
