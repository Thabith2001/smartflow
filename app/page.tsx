'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaArrowRight,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaWifi,
  FaParking,
  FaSwimmingPool,
  FaShieldAlt,
  FaChartPie,
} from 'react-icons/fa';
import { MapPin, Home, Tag, Search } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';

const slides = [
  {
    image:
      'https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-zinc-900">
      <Header />

      <main className="flex-grow">
        {/* TOP SECTION: HERO */}
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
                  <span className="text-[#FFB800]">
                    {slides[currentIndex].title.split(' ').pop()}.
                  </span>
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
                    <option value="tampa">Tampa, Florida (USA)</option>
                    <option value="jacksonville">Jacksonville, Florida (USA)</option>
                    <option value="fort-lauderdale">Fort Lauderdale, Florida (USA)</option>
                    <option value="davie">Davie, Florida (USA)</option>
                    <option value="hialeah">Hialeah, Florida (USA)</option>
                    <option value="washington">Washington, D.C. (USA)</option>
                    <option value="new-york">New York, New York (USA)</option>
                    <option value="los-angeles">Los Angeles, California (USA)</option>
                  </select>
                </div>
              </div>

              {/* Type of Property Dropdown */}
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
                    <option value="apartment">Modern Apartment</option>
                    <option value="townhouse">Cozy Townhouse</option>
                    <option value="farmhouse">Rustic Farmhouse</option>
                    <option value="duplex">Spacious Duplex</option>
                    <option value="penthouse">Elegant Penthouse</option>
                  </select>
                </div>
              </div>

              {/* Price Range Dropdown */}
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
                    <option value="5m-10m">$5M - $10M</option>
                    <option value="10m-20m">$10M - $20M</option>
                    <option value="20m-50m">$20M - $50M</option>
                    <option value="50m+">$50M+</option>
                    <option value="100m+">$100M+</option>
                  </select>
                </div>
              </div>

              {/* Search Button */}
              <button className="w-full md:w-auto flex items-center justify-center gap-3 bg-blue-900 px-12 py-5 md:py-6 font-black text-white transition-all hover:bg-[#FFB800] hover:text-blue-900 active:bg-blue-950 group">
                <Search className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span className="tracking-widest">SEARCH</span>
              </button>
            </div>
          </div>
        </section>

        {/* PROPERTY GALLERY & DETAILS SECTION */}
        <section className="bg-zinc-50 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col gap-12 lg:flex-row">
              <div className="lg:w-2/3">
                <div className="mb-10 grid grid-cols-3 gap-6 border-b pb-6">
                  {[
                    { icon: <FaBed />, label: 'Bedrooms', value: '4' },
                    { icon: <FaBath />, label: 'Bathrooms', value: '3.5' },
                    { icon: <FaRulerCombined />, label: 'Sq Ft', value: '3,200' },
                  ].map((item, i) => (
                    <div key={i} className="text-center">
                      <p className="text-xs uppercase text-zinc-400">{item.label}</p>
                      <p className="mt-1 flex justify-center items-center gap-2 text-lg font-semibold text-blue-950">
                        {item.icon} {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                <h3 className="mb-3 text-xl font-semibold text-blue-950">Description</h3>
                <p className="mb-8 text-sm leading-relaxed text-zinc-600">
                  Experience premium coastal living with SmartFlow-powered automation, open layouts,
                  and panoramic skyline views designed for comfort, security, and efficiency.
                </p>

                <h3 className="mb-4 text-lg font-semibold text-blue-950">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                  {[
                    { icon: <FaWifi />, label: 'High-Speed Internet' },
                    { icon: <FaParking />, label: 'Secure Parking' },
                    { icon: <FaSwimmingPool />, label: 'Swimming Pool' },
                    { icon: <FaShieldAlt />, label: '24/7 Security' },
                  ].map((a, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm"
                    >
                      <span className="text-blue-600">{a.icon}</span>
                      <span className="text-sm text-zinc-700">{a.label}</span>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-lg font-semibold text-blue-950">
                    Climate-Resilient Design
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      'Impact-Resistant Windows',
                      'Reinforced Structure',
                      'Backup Power System',
                      'Energy-Efficient HVAC',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-zinc-600">
                        <FaCheckCircle className="text-green-500" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* SIDEBAR */}
              <div className="lg:w-1/3">
                <h3 className="mb-4 text-lg font-semibold text-blue-950">Interior Gallery</h3>

                <div className="grid grid-cols-3 gap-3 mb-10">
                  {[
                    'photo-1600607687940-4e5a48a259c9',
                    'photo-1600566753376-12c8ab7fb75b',
                    'photo-1600585154526-990dcea4db0d',
                    'photo-1600210492486-724fe5c67fb0',
                    'photo-1600607687939-ce8a6c25118c',
                    'photo-1599423300746-b62533397364',
                  ].map((img, i) => (
                    <img
                      key={i}
                      src={`https://images.unsplash.com/${img}?auto=format&fit=crop&w=400&q=80`}
                      className="h-28 w-full rounded-lg object-cover hover:opacity-90 transition"
                      alt="Interior"
                    />
                  ))}
                </div>

                {/* Info Card */}
                <div className="rounded-xl bg-blue-950 p-6 text-white shadow-md">
                  <h4 className="mb-3 flex items-center gap-2 font-semibold">
                    <FaChartPie className="text-yellow-400" />
                    Investment Summary
                  </h4>

                  <div className="space-y-2 text-sm opacity-90">
                    <div className="flex justify-between">
                      <span>Annual Yield</span>
                      <span className="font-semibold text-yellow-400">6.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Occupancy</span>
                      <span className="font-semibold">100%</span>
                    </div>
                  </div>

                  <button className="mt-5 w-full rounded-md bg-yellow-400 py-2 text-xs font-bold uppercase text-blue-950 hover:bg-yellow-300">
                    View Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- NEW SECTION: ENHANCED PROPERTY IMAGES --- */}
        <section className="bg-white py-14">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                  Property Media
                </h2>
                <h3 className="text-2xl font-bold text-blue-950">Property Gallery</h3>
              </div>

              <button className="mt-4 md:mt-0 rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
                Download Images
              </button>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[
                'https://images.unsplash.com/photo-1613490493576-7fde63acd811',
                'https://images.unsplash.com/photo-1613977257363-707ba9348227',
                'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
                'https://images.unsplash.com/photo-1600607687644-c7171bb3e29b',
                'https://images.unsplash.com/photo-1600566752355-35792bedcfea',
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
                'https://images.unsplash.com/photo-1599423300746-b62533397364',
              ].map((img, index) => (
                <div key={index} className="group relative overflow-hidden rounded-xl bg-gray-100">
                  <img
                    src={`${img}?auto=format&fit=crop&w=600&q=80`}
                    alt="Property view"
                    className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- NEW SECTION: DETAILED PROPERTY SPECS --- */}
        <section className="bg-zinc-50 py-20 border-y border-zinc-200">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-bold text-blue-950 mb-8">Asset Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                  {[
                    { label: 'Property Type', value: 'Luxury Condominium' },
                    { label: 'Year Built', value: '2023' },
                    { label: 'Lot Size', value: 'N/A (High-Rise)' },
                    { label: 'Cooling', value: 'Central, Zoned' },
                    { label: 'Heating', value: 'Electric' },
                    { label: 'Parking', value: '2 Assigned Spaces' },
                    { label: 'HOA Fees', value: '$1,250 / mo' },
                    { label: 'Tax ID', value: '30-4231-042-0010' },
                  ].map((spec, i) => (
                    <div key={i} className="flex justify-between py-3 border-b border-zinc-200">
                      <span className="text-zinc-500 font-medium">{spec.label}</span>
                      <span className="text-blue-950 font-bold">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Asset Management Note */}
              <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
                <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                  <FaShieldAlt size={24} />
                </div>
                <h4 className="text-xl font-bold text-blue-950 mb-4">Management Note</h4>
                <p className="text-sm text-zinc-500 leading-relaxed mb-6">
                  This asset is under **Premium Management**. All exterior maintenance, landscaping,
                  and pool sanitation are handled by our approved Florida vendors. Digital logs for
                  all services are available in the landlord portal.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-black text-blue-600 hover:gap-3 transition-all"
                >
                  Request Compliance Documents <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
