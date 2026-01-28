'use client';

import { useState, useEffect } from 'react';
import {
  FaChevronUp,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaYoutube,
} from 'react-icons/fa';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroBanner from './components/home/HeroBanner';
import WhyChooseUs from './components/home/WhyChooseUs';
import PropertyListings from './components/home/PropertyListings';
import PropertyGallery from './components/home/PropertyGallery';
import FeaturedProperties from './components/home/FeaturedProperties';

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: <FaLinkedinIn />, label: 'LinkedIn', color: 'hover:bg-[#0077b5]' },
    { icon: <FaTiktok />, label: 'TikTok', color: 'hover:bg-[#000000]' },
    { icon: <FaInstagram />, label: 'Instagram', color: 'hover:bg-[#e4405f]' },
    { icon: <FaFacebookF />, label: 'Facebook', color: 'hover:bg-[#1877f2]' },
    { icon: <FaYoutube />, label: 'YouTube', color: 'hover:bg-[#ff0000]' },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-zinc-900 relative">
      <Header />

      {/* --- ELITE SOCIAL SIDEBAR --- */}

      <div className="hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 z-[100] flex-col shadow-2xl">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href="#"
            className={`w-12 h-12 flex items-center justify-center bg-blue-900 text-white border-b border-white/10 transition-all duration-300 group relative overflow-hidden hover:w-36 ${social.color}`}
          >
            <div className="text-lg z-10 w-12 flex justify-center shrink-0">{social.icon}</div>
            <span className="absolute left-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-black uppercase text-[10px] tracking-tighter whitespace-nowrap pr-4">
              {social.label}
            </span>
          </a>
        ))}
      </div>

      <main className="flex-grow">
        <HeroBanner />
        <WhyChooseUs />
        <PropertyListings />
        <PropertyGallery />
        <FeaturedProperties />
      </main>

      {/* --- SCROLL TO TOP BUTTON --- */}

      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 lg:bottom-8 lg:right-8 z-[99] p-3 lg:p-4 bg-blue-900 text-[#FFB800] rounded-sm shadow-2xl border border-gray-400 transition-all duration-500 transform hover:bg-[#FFB800] hover:text-[#0A1D37] ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
      >
        <FaChevronUp size={18} className="lg:size-[20px]" />
      </button>

      <Footer />
    </div>
  );
}
