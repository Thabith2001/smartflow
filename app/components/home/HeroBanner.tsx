'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Home, Tag, Search } from 'lucide-react';
import { FaMapMarkerAlt } from 'react-icons/fa';

const slides = [
  {
    image:
      'https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?q=80&w=2070&auto=format&fit=crop',
    title: 'Emerald Garden Estate',
    location: '88 Griffin Rd, Coral Gables, FL 33134',
    tag: 'Coral Gables • Florida',
  },
  {
    image:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop',
    title: 'Azure Bay Mansion',
    location: '442 Ocean Drive, Miami Beach, FL 33139',
    tag: 'Miami Beach • Florida',
  },
  {
    image:
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=2074&auto=format&fit=crop',
    title: 'The Golden Heights',
    location: '12 Skyview Way, Orlando, FL 32801',
    tag: 'Orlando • Florida',
  },
];

const HeroBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[90vh] md:h-[90vh] w-full overflow-hidden bg-zinc-900 flex flex-col">
      <AnimatePresence mode="wait">
        <motion.img
          key={`img-${currentIndex}`}
          src={slides[currentIndex].image}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Content Container */}
      <div className="container relative z-10 mx-auto flex flex-1 flex-col justify-center px-6 pt-20 pb-12 md:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${currentIndex}`}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl text-white"
          >
            <div className="mb-4 inline-flex items-center rounded bg-[#FFB800] px-3 py-1 text-[10px] md:text-xs font-bold uppercase tracking-widest text-blue-950">
              {slides[currentIndex].tag}
            </div>

            <h1 className="mb-4 text-4xl font-bold uppercase text-white sm:text-5xl md:text-7xl leading-[1.1]">
              {slides[currentIndex].title.split(' ').slice(0, -1).join(' ')} <br />
              <span className="text-[#FFB800]">{slides[currentIndex].title.split(' ').pop()}.</span>
            </h1>

            <p className="mb-8 flex items-center gap-2 text-lg md:text-xl text-zinc-100 font-medium">
              <FaMapMarkerAlt className="text-[#FFB800]" /> {slides[currentIndex].location}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* --- SEARCH BAR FEATURE --- */}
      <div className="relative md:absolute md:bottom-10 md:left-1/2 w-full max-w-6xl md:-translate-x-1/2 px-6 z-30 pb-10 md:pb-0">
        <div className="flex w-full flex-col md:flex-row items-stretch bg-white shadow-2xl border-b-4 border-[#FFB800]">
          <div className="flex w-full md:flex-1 items-center gap-4 px-6 py-4 border-b md:border-b-0 md:border-r border-gray-100 hover:bg-gray-50 transition-colors">
            <MapPin className="h-5 w-5 md:h-6 md:w-6 text-blue-900 flex-shrink-0" />
            <div className="flex flex-col text-left w-full">
              <label
                htmlFor="location"
                className="text-[10px] font-bold uppercase tracking-wider text-gray-400"
              >
                Location
              </label>
              <select
                id="location"
                className="bg-transparent text-sm font-bold text-blue-900 outline-none cursor-pointer appearance-none w-full"
                defaultValue=""
              >
                <option value="" disabled>
                  Select Location
                </option>
                <option value="miami">Miami, Florida (USA)</option>
                <option value="orlando">Orlando, Florida (USA)</option>
              </select>
            </div>
          </div>

          {/* Type Dropdown */}
          <div className="flex w-full md:flex-1 items-center gap-4 px-6 py-4 border-b md:border-b-0 md:border-r border-gray-100 hover:bg-gray-50 transition-colors">
            <Home className="h-5 w-5 md:h-6 md:w-6 text-blue-900 flex-shrink-0" />
            <div className="flex flex-col text-left w-full">
              <label
                htmlFor="property-type"
                className="text-[10px] font-bold uppercase tracking-wider text-gray-400"
              >
                Property Type
              </label>
              <select
                id="property-type"
                className="bg-transparent text-sm font-bold text-blue-900 outline-none cursor-pointer appearance-none w-full"
                defaultValue=""
              >
                <option value="" disabled>
                  Select your wish
                </option>
                <option value="condo">Luxury Condominium</option>
                <option value="villa">Oceanfront Villa</option>
              </select>
            </div>
          </div>

          {/* Price Dropdown */}
          <div className="flex w-full md:flex-1 items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
            <Tag className="h-5 w-5 md:h-6 md:w-6 text-blue-900 flex-shrink-0" />
            <div className="flex flex-col text-left w-full">
              <label
                htmlFor="price-range"
                className="text-[10px] font-bold uppercase tracking-wider text-gray-400"
              >
                Price Range
              </label>
              <select
                id="price-range"
                className="bg-transparent text-sm font-bold text-blue-900 outline-none cursor-pointer appearance-none w-full"
                defaultValue=""
              >
                <option value="" disabled>
                  Select budget
                </option>
                <option value="1m-5m">$1M - $5M</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <button className="w-full md:w-auto flex items-center justify-center gap-3 bg-blue-900 px-12 py-5 md:py-6 font-black text-white transition-all hover:bg-[#FFB800] hover:text-blue-900 group">
            <Search className="h-5 w-5 transition-transform group-hover:scale-110" />
            <span className="tracking-widest">SEARCH</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
