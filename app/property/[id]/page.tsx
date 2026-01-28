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
            <div className="md:col-span-3 relative group overflow-hidden rounded-sm bg-zinc-100">
              <img
                src={activeImage}
                className="w-full h-full object-cover transition-all duration-500"
                alt="Main View"
              />
              <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-white/90 p-3 md:p-4 shadow-xl hover:bg-[#FFB800] hover:text-white transition-all transform">
                  <FaChevronLeft className="text-[#1E3A8A]" />
                </button>
                <button className="bg-white/90 p-3 md:p-4 shadow-xl hover:bg-[#FFB800] hover:text-white transition-all transform">
                  <FaChevronRight className="text-[#1E3A8A]" />
                </button>
              </div>
            </div>

            <div className="hidden md:flex flex-col gap-2 md:col-span-1">
              {house.images.slice(0, 2).map((img, idx) => (
                <div
                  key={idx}
                  className="h-1/2 bg-zinc-100 overflow-hidden rounded-sm relative group cursor-pointer"
                  onClick={() => setActiveImage(img)}
                >
                  <img
                    src={img}
                    className={`w-full h-full object-cover transition-all ${idx === 1 ? 'brightness-50 group-hover:brightness-75' : 'brightness-90 hover:brightness-110'}`}
                    alt="Alt View"
                  />
                  {idx === 1 && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white border-2 border-transparent group-hover:border-white/20 m-2 transition-all">
                      <span className="font-black text-lg md:text-xl">+{house.images.length}</span>
                      <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-tighter">
                        View Gallery
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            <div className="lg:col-span-2 space-y-8 md:space-y-12">
              {/* QUICK SUMMARY */}
              <section className="bg-blue-50/40 p-5 md:p-8 border-l-4 md:border-l-8 border-[#1E3A8A] rounded-r-lg">
                <h3 className="text-[9px] md:text-[10px] font-black text-[#1E3A8A] uppercase mb-3 tracking-[0.3em]">
                  Quick Summary
                </h3>
                <p className="text-gray-800 text-lg md:text-xl font-medium leading-relaxed italic font-serif">
                  "A{' '}
                  {house.category === 'Land'
                    ? 'prime plot of land'
                    : `stunning ${house.beds} bedroom home`}{' '}
                  located in {house.location}. This property features{' '}
                  {house.landSize.toLocaleString()} sqft of space, making it a top-tier choice for{' '}
                  {house.status === 'Sale' ? 'investment' : 'residence'}."
                </p>
              </section>

              {/* PAYMENT OPTIONS SECTION */}
              <section className="border-2 border-gray-100 p-6 md:p-10 rounded-sm bg-white">
                <div className="flex items-center gap-4 mb-8">
                  <h3 className="text-xl md:text-2xl font-black text-[#1E3A8A] uppercase tracking-tighter">
                    Purchase Options
                  </h3>
                  <div className="h-[2px] w-full bg-green-500"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="border p-4 text-center hover:border-[#1E3A8A] transition-all cursor-pointer">
                    <FaCreditCard className="mx-auto text-xl text-[#1E3A8A] mb-2" />
                    <p className="font-black text-[10px] uppercase">Secure Card</p>
                  </div>
                  <div className="border p-4 text-center hover:border-[#1E3A8A] transition-all cursor-pointer">
                    <FaUniversity className="mx-auto text-xl text-[#1E3A8A] mb-2" />
                    <p className="font-black text-[10px] uppercase">Bank Transfer</p>
                  </div>
                  <div className="border p-4 text-center hover:border-[#1E3A8A] transition-all cursor-pointer">
                    <FaShieldAlt className="mx-auto text-xl text-[#1E3A8A] mb-2" />
                    <p className="font-black text-[10px] uppercase">Escrow Pay</p>
                  </div>
                </div>
              </section>

              {/* SPECS TABLE */}
              <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 py-6 md:py-10 border-y-2 border-gray-100">
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
                    className={`flex items-center gap-3 ${i !== 0 ? 'md:border-l md:pl-4 border-gray-100' : ''}`}
                  >
                    <div className="p-2 md:p-3 bg-gray-50 rounded-full text-[#1E3A8A] text-sm md:text-base">
                      {spec.icon}
                    </div>
                    <div>
                      <p className="text-[8px] md:text-[9px] font-black text-gray-400 uppercase">
                        {spec.label}
                      </p>
                      <p className="font-black text-gray-800 text-sm md:text-base uppercase">
                        {spec.val}
                      </p>
                    </div>
                  </div>
                ))}
              </section>

              {/* DESCRIPTION */}
              <section>
                <div className="flex items-center gap-4 mb-6 md:mb-8">
                  <h3 className="text-xl md:text-2xl font-black text-[#1E3A8A] uppercase tracking-tighter whitespace-nowrap">
                    Property Description
                  </h3>
                  <div className="h-[2px] w-full bg-[#FFB800]"></div>
                </div>
                <div className="text-gray-600 leading-loose text-base md:text-lg font-medium whitespace-pre-line">
                  {house.longDescription}
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
                      USA Support Hotline
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
