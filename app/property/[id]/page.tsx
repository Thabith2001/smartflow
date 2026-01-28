'use client';

import { useParams } from 'next/navigation';
import { portfolioData } from '../../data/properties';
import {
  FaMapMarkerAlt,
  FaCheckCircle,
  FaWhatsapp,
  FaCalendarAlt,
  FaEnvelope,
  FaChevronRight,
  FaChevronLeft,
  FaRulerCombined,
  FaBed,
  FaBath,
  FaCreditCard,
  FaUniversity,
  FaShieldAlt,
} from 'react-icons/fa';
import ViewingModal from '../../components/ViewingModal';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PurchaseModal from '../../components/PurchaseModal';
import { useState } from 'react';
import Link from 'next/link';

export default function PropertyPage() {
  const params = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);

  const house = portfolioData.find((p) => p.id === Number(params.id));

  const [activeImage, setActiveImage] = useState(house?.image || '');

  if (!house)
    return (
      <div className="p-20 text-center font-black uppercase tracking-tighter text-gray-300 text-3xl md:text-5xl">
        Property Not Found
      </div>
    );

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(house.price);

  /* --- IMAGE NAVIGATION LOGIC --- */
  const nextImage = () => {
    const currentIndex = house.images.indexOf(activeImage);
    const nextIndex = (currentIndex + 1) % house.images.length;
    setActiveImage(house.images[nextIndex]);
  };

  const prevImage = () => {
    const currentIndex = house.images.indexOf(activeImage);
    const prevIndex = (currentIndex - 1 + house.images.length) % house.images.length;
    setActiveImage(house.images[prevIndex]);
  };

  return (
    <div className="flex flex-col min-h-screen font-sans selection:bg-[#FFB800] selection:text-white">
      <Header />

      <main className="flex-grow bg-white">
        {/* --- BREADCRUMBS --- */}
        <div className="bg-gray-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center gap-2 text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest">
            <Link href="/" className="hover:text-[#1E3A8A] transition-colors">
              Home
            </Link>
            <FaChevronRight size={8} />
            <span>{house.category}s</span>
            <FaChevronRight size={8} />
            <span className="text-[#1E3A8A] truncate">{house.title}</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
          {/* --- PRICE SECTION --- */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
            <div className="space-y-1 w-full">
              <div className="flex items-center gap-2">
                <span className="bg-[#007BFF] text-white text-[8px] md:text-[9px] px-2 py-0.5 font-black uppercase tracking-widest rounded-sm">
                  {house.status}
                </span>
                <span className="text-gray-400 text-[9px] md:text-[10px] font-bold uppercase">
                  Ref: #PRO-{house.id}
                </span>
              </div>
              <h1 className="text-2xl md:text-4xl font-black text-gray-900 uppercase leading-tight">
                {house.title}
              </h1>
              <div className="flex items-center gap-2 text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                {/* --- ADDRESS --- */}
                <FaMapMarkerAlt className="text-[#1E3A8A]" /> {house.address || house.location}
              </div>
            </div>
            <div className="md:text-right bg-gray-50 md:bg-transparent p-4 md:p-0 w-full md:w-auto rounded-sm border md:border-0 mt-2 md:mt-0">
              <span className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase block mb-1">
                Total Investment
              </span>
              <span className="text-3xl md:text-4xl font-black text-[#1E3A8A]">
                {formattedPrice}
              </span>
              <p className="text-[8px] md:text-[9px] text-gray-400 font-bold uppercase mt-1 italic">
                Exclusive of taxes & fees
              </p>
            </div>
          </div>

          {/* --- IMAGE GRID VIEW --- */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-10 h-[250px] sm:h-[350px] md:h-[550px]">
            <div className="md:col-span-3 relative group overflow-hidden rounded-none bg-zinc-100">
              <img
                src={activeImage}
                className="w-full h-full object-cover transition-all duration-500"
                alt="Main View"
              />

              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={prevImage}
                  className="bg-white p-3 md:p-4 shadow-2xl hover:bg-[#1E3A8A] hover:text-white transition-all transform active:scale-90"
                >
                  <FaChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="bg-white p-3 md:p-4 shadow-2xl hover:bg-[#1E3A8A] hover:text-white transition-all transform active:scale-90"
                >
                  <FaChevronRight size={20} />
                </button>
              </div>

              <div className="absolute bottom-4 right-4 bg-black/70 text-white text-[10px] font-black px-3 py-1 uppercase tracking-widest">
                {house.images.indexOf(activeImage) + 1} / {house.images.length}
              </div>
            </div>

            <div className="hidden md:flex flex-col gap-2 md:col-span-1">
              {house.images.slice(0, 2).map((img, idx) => (
                <div
                  key={idx}
                  className="h-1/2 bg-zinc-100 overflow-hidden rounded-none relative group cursor-pointer"
                  onClick={() => setActiveImage(img)}
                >
                  <img
                    src={img}
                    className={`w-full h-full object-cover transition-all duration-500 
            ${activeImage === img ? 'brightness-110 border-2 border-[#1E3A8A]' : 'brightness-75 hover:brightness-100'}`}
                    alt="Alt View"
                  />
                  {idx === 1 && house.images.length > 2 && (
                    <div className="absolute inset-0 bg-[#1E3A8A]/40 flex flex-col items-center justify-center text-white transition-all group-hover:bg-[#1E3A8A]/60">
                      <span className="font-black text-xl md:text-2xl">
                        +{house.images.length - 2}
                      </span>
                      <span className="text-[9px] font-black uppercase tracking-[0.2em]">
                        Gallery
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            <div className="lg:col-span-2 space-y-8 md:space-y-12">
              {/* QUICK SUMMARY  */}
              <section className="bg-white p-6 md:p-10 border border-gray-200 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 md:w-2 bg-[#1E3A8A]"></div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-[10px] md:text-[11px] font-black text-[#1E3A8A] uppercase tracking-[0.4em]">
                      Quick Summary
                    </h3>
                    <div className="h-[1px] flex-grow bg-gray-100"></div>
                  </div>

                  <div className="relative">
                    <span className="absolute -top-4 -left-2 text-6xl text-blue-900/5 font-serif select-none">
                      “
                    </span>

                    <p className="relative z-10 text-gray-800 text-lg md:text-xl font-light leading-relaxed font-serif tracking-tight">
                      A{' '}
                      <span className="font-bold text-[#1E3A8A]">
                        {house.category === 'Land'
                          ? 'prime plot of land'
                          : `stunning ${house.beds} bedroom home`}
                      </span>{' '}
                      located in {house.location}. This property features{' '}
                      <span className="border-b-2 border-[#eab308]">
                        {house.landSize.toLocaleString()} sqft
                      </span>{' '}
                      of space, making it a top-tier choice for{' '}
                      {house.status === 'Sale' ? 'investment' : 'residence'}.
                    </p>
                  </div>
                </div>
              </section>

              {/* SPECS TABLE  */}
              <section className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-gray-200 bg-white">
                {[
                  {
                    icon: <FaRulerCombined />,
                    label: 'Lot Area',
                    val: `${house.landSize.toLocaleString()} SQFT`,
                  },
                  { icon: <FaBed />, label: 'Bedrooms', val: house.beds || 'N/A' },
                  { icon: <FaBath />, label: 'Bathrooms', val: house.baths || 'N/A' },
                  { icon: <FaCheckCircle />, label: 'Type', val: house.category },
                ].map((spec, i) => (
                  <div
                    key={i}
                    className={`group flex flex-col items-center justify-center py-6 md:py-10 px-4 text-center border-gray-200 
        ${i % 2 !== 0 ? 'border-l' : ''} 
        ${i >= 2 ? 'border-t md:border-t-0' : ''} 
        ${i > 0 ? 'md:border-l' : ''} 
        transition-colors hover:bg-gray-50`}
                  >
                    <div className="text-[#1E3A8A] text-lg md:text-xl mb-3 transition-transform group-hover:scale-110 duration-300">
                      {spec.icon}
                    </div>

                    <div className="space-y-1">
                      <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                        {spec.label}
                      </p>
                      <p className="font-black text-gray-900 text-xs md:text-sm uppercase tracking-tight">
                        {spec.val}
                      </p>
                    </div>
                  </div>
                ))}
              </section>

              {/* COMPACT PURCHASE OPTIONS */}
              <section className="border border-gray-200 bg-white rounded-none">
                <div className="px-5 py-3 border-b border-gray-200 bg-gray-50/50 flex justify-between items-center">
                  <h3 className="text-[11px] font-black text-[#1E3A8A] uppercase tracking-[0.2em]">
                    Rent Options
                  </h3>
                  <span className="text-[9px] text-gray-400 uppercase font-bold tracking-tighter">
                    Secure Checkout
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
                  {[
                    { icon: <FaCreditCard />, label: 'Secure Card' },
                    { icon: <FaUniversity />, label: 'Bank Transfer' },
                    { icon: <FaShieldAlt />, label: 'Escrow Pay' },
                  ].map((option, i) => (
                    <div
                      key={i}
                      className="group flex items-center justify-center gap-3 py-4 px-2 hover:bg-[#1E3A8A] transition-colors "
                    >
                      <div className="text-sm text-[#1E3A8A] group-hover:text-[#eab308] transition-colors">
                        {option.icon}
                      </div>
                      <p className="font-bold text-[10px] uppercase tracking-widest text-gray-600 group-hover:text-white transition-colors">
                        {option.label}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* DESCRIPTION */}
              <section>
                <div className="flex items-center gap-4 mb-6 md:mb-8">
                  <h3 className="text-xl md:text-2xl font-black text-[#1E3A8A] uppercase tracking-tighter whitespace-nowrap">
                    Property Details
                  </h3>
                  <div className="h-[2px] w-full bg-[#FFB800]"></div>
                </div>

                <div className="mt-8 md:mt-12">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-6">
                    Detailed Property Overview
                  </h4>

                  <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gray-200 hidden md:block"></div>

                    <div className="md:pl-8 text-gray-700 leading-[1.8] text-sm md:text-lg font-serif whitespace-pre-line">
                      {house.longDescription}
                    </div>
                  </div>

                  <div className="mt-10 h-[1px] w-12 bg-[#1E3A8A]"></div>
                </div>
              </section>

              {/* FEATURES  */}
              <section className="bg-[#1E3A8A] p-6 md:p-10 rounded-sm text-white">
                <h3 className="text-lg md:text-xl font-black uppercase mb-6 md:mb-10 tracking-widest border-b border-white/10 pb-4">
                  Features & Amenities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {house.features.map((feat) => (
                    <div
                      key={feat}
                      className="flex items-center gap-3 text-[10px] md:text-xs font-black uppercase tracking-widest"
                    >
                      <FaCheckCircle className="text-[#FFB800]" /> {feat}
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* SIDEBAR */}
            <aside className="w-full">
              <div className="md:sticky md:top-24 space-y-6">
                <div className="bg-white border-t-8 border-[#1E3A8A] p-6 md:p-8 shadow-xl space-y-6">
                  <div className="text-center space-y-1">
                    <h4 className="font-black text-[#1E3A8A] uppercase text-xs md:text-sm tracking-widest">
                      Rent Property
                    </h4>
                    <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-tight italic">
                      Verified USA Listing
                    </p>
                  </div>
                  <div className="space-y-3">
                    <button
                      onClick={() => setIsPurchaseOpen(true)}
                      className="w-full bg-[#1E3A8A] hover:bg-yellow-500 hover:text-[#1E3A8A] text-white py-5 font-black uppercase text-[11px] tracking-widest transition-all duration-300 shadow-lg"
                    >
                      Start Purchase
                    </button>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="w-full border-2 border-gray-200 hover:border-[#1E3A8A] text-gray-700 py-4 font-black uppercase text-[10px] tracking-widest transition-all flex items-center justify-center gap-3"
                    >
                      <FaCalendarAlt /> Schedule Tour
                    </button>
                    <a
                      href="#"
                      className="w-full border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white py-4 font-black uppercase text-[10px] tracking-widest transition-all flex items-center justify-center gap-3"
                    >
                      <FaWhatsapp size={18} /> WhatsApp
                    </a>
                  </div>
                  <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                    <p className="text-[9px] font-black text-gray-400 uppercase mb-2">
                      Support Hotline
                    </p>
                    <p className="text-xl md:text-2xl font-black text-gray-900">
                      +1 (800) 555-0199
                    </p>
                  </div>
                </div>
                <div className="bg-green-50 p-4 border border-green-100 text-[10px] md:text-[11px] text-green-800 leading-relaxed">
                  <p className="font-black uppercase mb-1 flex items-center gap-2">
                    <FaShieldAlt /> Secure Escrow
                  </p>
                  Payments are protected by our secure USA property management protocol.
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
      <ViewingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        propertyTitle={house.title}
      />
      <PurchaseModal
        isOpen={isPurchaseOpen}
        onClose={() => setIsPurchaseOpen(false)}
        house={house}
      />
    </div>
  );
}
