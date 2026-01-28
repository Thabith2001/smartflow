'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Home, Tag, Search } from 'lucide-react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

import { portfolioData } from '../../data/properties';

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
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  // --- EXTRACT DYNAMIC DATA ---
  const uniqueLocations = useMemo(() => {
    const locs = portfolioData.map((p) => p.location.split(',')[0].trim());
    return Array.from(new Set(locs)).sort();
  }, []);

  const [filters, setFilters] = useState({
    location: '',
    category: '',
    price: '',
  });

  const handleSearch = () => {
    const { location, category, price } = filters;

    let basePath = '/portfolio';
    if (category === 'House') basePath = '/houses';
    if (category === 'Apartment') basePath = '/apartments';
    if (category === 'Land') basePath = '/lands';

    const params = new URLSearchParams();
    if (location) params.append('location', location.toLowerCase());
    if (category) params.append('category', category);
    if (price) params.append('priceRange', price);

    router.push(`${basePath}?${params.toString()}`);
  };

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

      {/* --- FUNCTIONAL SEARCH BAR  --- */}
      <div className="relative md:absolute md:bottom-10 md:left-1/2 w-full max-w-6xl md:-translate-x-1/2 px-4 md:px-6 z-30 pb-10 md:pb-0">
        <div className="flex w-full flex-col md:flex-row items-stretch bg-white shadow-2xl border-t-4 md:border-t-0 md:border-b-4 border-[#FFB800]">
          <div className="flex w-full md:flex-1 items-center gap-4 px-5 py-4 md:px-6 md:py-4 border-b md:border-b-0 md:border-r border-gray-100 hover:bg-gray-50 transition-colors">
            <MapPin className="h-5 w-5 md:h-6 md:w-6 text-blue-900 flex-shrink-0" />
            <div className="flex flex-col text-left w-full">
              <label className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                Location
              </label>
              <select
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="bg-transparent text-xs md:text-sm font-black text-blue-900 outline-none cursor-pointer appearance-none w-full uppercase"
              >
                <option value="">Any Location</option>
                {uniqueLocations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Dynamic Property Category */}
          <div className="flex w-full md:flex-1 items-center gap-4 px-5 py-4 md:px-6 md:py-4 border-b md:border-b-0 md:border-r border-gray-100 hover:bg-gray-50 transition-colors">
            <Home className="h-5 w-5 md:h-6 md:w-6 text-blue-900 flex-shrink-0" />
            <div className="flex flex-col text-left w-full">
              <label className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                Property Type
              </label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="bg-transparent text-xs md:text-sm font-black text-blue-900 outline-none cursor-pointer appearance-none w-full uppercase"
              >
                <option value="">Any Type</option>
                <option value="House">Houses</option>
                <option value="Apartment">Apartments</option>
                <option value="Land">Land / Plots</option>
              </select>
            </div>
          </div>

          {/* Price Range  */}
          <div className="flex w-full md:flex-1 items-center gap-4 px-5 py-4 md:px-6 md:py-4 border-b md:border-b-0 border-gray-100 hover:bg-gray-50 transition-colors">
            <Tag className="h-5 w-5 md:h-6 md:w-6 text-blue-900 flex-shrink-0" />
            <div className="flex flex-col text-left w-full">
              <label className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                Price Range
              </label>
              <select
                value={filters.price}
                onChange={(e) => setFilters({ ...filters, price: e.target.value })}
                className="bg-transparent text-xs md:text-sm font-black text-blue-900 outline-none cursor-pointer appearance-none w-full uppercase"
              >
                <option value="">Any Budget</option>
                <option value="0-1000000">Under $1M</option>
                <option value="1000000-5000000">$1M - $5M</option>
                <option value="5000000-10000000">$5M - $10M</option>
                <option value="10000000-100000000">$10M Plus</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="w-full md:w-auto flex items-center justify-center gap-3 bg-blue-900 px-10 py-5 md:py-6 font-black text-white transition-all hover:bg-[#FFB800] hover:text-blue-900 group"
          >
            <Search className="h-5 w-5 transition-transform group-hover:scale-110" />
            <span className="text-[11px] md:text-xs tracking-[0.3em]">SEARCH</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
