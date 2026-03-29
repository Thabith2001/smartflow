'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  FaLinkedin,
  FaEnvelope,
  FaChartLine,
  FaUsers,
  FaBuilding,
  FaGlobeAmericas,
} from 'react-icons/fa';

const stats = [
  { label: 'Managed Assets', value: '$2.4B', icon: <FaChartLine /> },
  { label: 'Total Units', value: '1,250+', icon: <FaBuilding /> },
  { label: 'Active Clients', value: '850+', icon: <FaUsers /> },
  { label: 'States Covered', value: '14', icon: <FaGlobeAmericas /> },
];

const team = [
  {
    name: 'Alexander Sterling',
    role: 'Chief Executive Officer',
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Sarah Jenkins',
    role: 'Director of Operations',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Marcus Vane',
    role: 'Head of Asset Management',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
  },
];

const milestones = [
  {
    year: '2010',
    title: 'Foundation',
    desc: 'Established in NY with a focus on urban residential portfolios.',
  },
  {
    year: '2016',
    title: 'Commercial Pivot',
    desc: 'Expanded into industrial and high-rise commercial management.',
  },
  {
    year: '2022',
    title: 'Tech Innovation',
    desc: 'Integrated AI-driven predictive analytics for market trends.',
  },
  {
    year: '2026',
    title: 'Billion Milestone',
    desc: 'Surpassed $2.4B in Assets Under Management (AUM).',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header />

      {/* --- HERO SECTION --- */}
      <section className="relative py-32 bg-[#0A1D37] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
            className="w-full h-full object-cover"
            alt="Corporate background"
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <span className="bg-[#FFB800] text-[#0A1D37] px-4 py-1 text-[10px] font-black uppercase tracking-widest mb-6 inline-block">
            About Our Firm
          </span>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-tight mb-6">
            Pioneering <span className="text-[#FFB800]">Asset Excellence</span>
          </h1>
          <p className="max-w-3xl mx-auto text-zinc-300 text-lg md:text-xl font-medium leading-relaxed">
            We provide institutional-grade property management solutions, merging traditional real
            estate values with future-forward technology.
          </p>
        </div>
      </section>

      {/* --- DATA STATS BAR --- */}
      <section className="bg-zinc-50 border-b border-zinc-200 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center md:items-start border-l-2 border-[#FFB800] pl-6"
              >
                <div className="text-[#1E3A8A] text-xl mb-2">{stat.icon}</div>
                <span className="text-3xl font-black text-[#0A1D37] leading-none">
                  {stat.value}
                </span>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-2">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MISSION & VISION --- */}
      <section className="py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <h2 className="text-xs font-black text-[#FFB800] uppercase tracking-[0.3em] mb-4">
            Our Mission
          </h2>
          <h3 className="text-4xl font-black text-[#0A1D37] uppercase tracking-tighter leading-tight mb-6">
            Empowering Investors Through <span className="text-[#1E3A8A]">Data & Precision</span>
          </h3>
          <p className="text-zinc-500 leading-loose">
            To deliver unparalleled property management services by leveraging real-time data
            analytics, fostering sustainable community growth, and maximizing ROI for our diverse
            portfolio of international stakeholders.
          </p>
        </div>
        <div className="bg-[#1E3A8A] p-12 text-white flex flex-col justify-center">
          <h2 className="text-xs font-black text-[#FFB800] uppercase tracking-[0.3em] mb-4">
            Our Vision
          </h2>
          <p className="text-2xl font-bold leading-snug italic">
            &#34;To become the global standard in intelligent asset management, where every property is
            optimized for its highest and best use.&#34;
          </p>
        </div>
      </section>

      {/* --- LEADERSHIP --- */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <span className="text-[#FFB800] font-black uppercase tracking-widest text-xs">
                The Experts
              </span>
              <h2 className="text-4xl font-black text-[#0A1D37] uppercase tracking-tighter mt-2">
                Executive Leadership
              </h2>
            </div>
            <p className="max-w-sm text-zinc-400 text-sm mt-4 border-l border-zinc-200 pl-6">
              Our partners bring over 75 years of combined experience in high-stakes real estate and
              asset strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {team.map((member, i) => (
              <div
                key={i}
                className="group bg-white p-4 border border-zinc-100 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="relative overflow-hidden aspect-[4/5] mb-6 cursor-pointer">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#0A1D37]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button className="bg-white p-3 text-[#1E3A8A] hover:bg-[#FFB800] hover:text-[#0A1D37] transition-colors cursor-pointer">
                      <FaLinkedin />
                    </button>
                    <button className="bg-white p-3 text-[#1E3A8A] hover:bg-[#FFB800] hover:text-[#0A1D37] transition-colors cursor-pointer">
                      <FaEnvelope />
                    </button>
                  </div>
                </div>
                <h3 className="text-xl font-black text-[#0A1D37] uppercase">{member.name}</h3>
                <p className="text-zinc-400 font-bold uppercase tracking-widest text-[10px] mt-1">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- HISTORY SECTION  --- */}
      <section className="py-24 bg-white border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 border-l-8 border-[#FFB800] pl-6">
            <h2 className="text-4xl md:text-5xl font-black text-[#0A1D37] uppercase tracking-tighter leading-none">
              The Firm&#39;s <br />
              <span className="text-[#1E3A8A]">Evolution</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border border-zinc-200">
            {milestones.map((item, i) => (
              <div
                key={i}
                className="relative p-8 border-b md:border-b-0 md:border-r border-zinc-200 group hover:bg-[#0A1D37] transition-all duration-300 cursor-default"
              >
                <div className="bg-[#FFB800] text-[#0A1D37] inline-block px-3 py-1 text-xs font-black mb-6 group-hover:bg-white transition-colors">
                  {item.year}
                </div>

                <h4 className="text-sm font-black text-[#0A1D37] uppercase tracking-widest mb-4 group-hover:text-white transition-colors">
                  {item.title}
                </h4>

                <p className="text-[11px] text-zinc-500 leading-relaxed font-bold uppercase group-hover:text-zinc-400 transition-colors">
                  {item.desc}
                </p>

                <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#FFB800] group-hover:w-full transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- LOGO STRIP  --- */}
      <section className="py-12 bg-[#0A1D37]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-between items-center gap-8">
            <div className="text-[#FFB800] font-black text-[10px] uppercase tracking-[0.4em] border-r border-[#FFB800]/30 pr-8 hidden lg:block">
              Institutional <br /> Partners
            </div>

            <div className="flex-1 flex flex-wrap justify-around items-center gap-10 opacity-60 grayscale brightness-200 hover:opacity-100 hover:grayscale-0 transition-all duration-500">
              <span className="font-black text-xl text-white italic tracking-tighter">FORBES</span>
              <span className="font-black text-xl text-white italic tracking-tighter">
                REALTOR.COM
              </span>
              <span className="font-black text-xl text-white italic tracking-tighter">
                BLOOMBERG
              </span>
              <span className="font-black text-xl text-white italic tracking-tighter">ZILLOW</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
