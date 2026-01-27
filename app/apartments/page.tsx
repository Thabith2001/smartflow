'use client';

import { useState, useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import { portfolioData, Property } from '../data/properties';
import { FaSearch, FaChevronLeft, FaChevronRight, FaTimes as X } from 'react-icons/fa';

export default function ApartmentsPage() {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const itemsPerPage = 6;

  const filteredApartments = useMemo(() => {
    return portfolioData.filter(
      (item: Property) =>
        item.category === 'Apartment' &&
        (item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.location.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search]);

  const totalPages = Math.ceil(filteredApartments.length / itemsPerPage);
  const currentItems = filteredApartments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      <Header />

      {/* --- PROFESSIONAL PMS HERO SECTION --- */}
      <section className="relative py-24 md:py-32 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1534655610770-dd69616f05ff?q=80&w=2156&auto=format&fit=crop"
            alt="City Apartments Background"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1D37]/90 via-[#0A1D37]/60 to-[#0A1D37]/90 backdrop-blur-[1px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <span className="bg-[#FFB800] text-[#0A1D37] px-4 py-1 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-6 inline-block shadow-xl">
            Urban Living
          </span>
          <h1 className="text-4xl md:text-7xl font-black mb-6 uppercase tracking-tighter leading-none">
            Urban <span className="text-[#FFB800]">Apartments</span>
          </h1>
          <p className="text-zinc-300 font-medium text-sm md:text-lg max-w-2xl mx-auto leading-relaxed border-l-2 border-[#FFB800]/50 px-6">
            Discover luxury rentals and modern condos in the heart of the city's most vibrant
            neighborhoods.
          </p>

          {/* Integrated Search Bar */}
          <div className="w-full max-w-2xl mx-auto mt-12 group">
            <div className="relative flex items-center bg-white p-2 shadow-2xl rounded-sm overflow-hidden">
              <FaSearch
                className="absolute left-6 text-zinc-400 group-focus-within:text-[#1E3A8A] transition-colors"
                size={20}
              />
              <input
                type="text"
                className="w-full py-4 md:py-5 pl-14 pr-32 md:pr-40 text-black outline-none text-sm md:text-lg font-medium placeholder:text-zinc-400"
                placeholder="Search by city or apartment name..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />
              <button className="absolute right-2 top-2 bottom-2 bg-[#1E3A8A] hover:bg-[#FFB800] text-white hover:text-[#0A1D37] px-6 md:px-10 font-black uppercase text-[10px] md:text-xs tracking-widest transition-all duration-300 cursor-pointer">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {currentItems.map((item) => (
            <Card key={item.id} house={item} onExpand={setSelectedImg} />
          ))}
        </div>

        {/* Pagination Section */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-end items-end gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 flex items-center justify-center border bg-white text-blue-900 hover:bg-[#FFB800] hover:text-white transition-colors disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-blue-900"
            >
              <FaChevronLeft size={12} />
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 text-xs font-black border transition-colors ${
                  currentPage === i + 1
                    ? 'bg-[#1E3A8A] border-[#1E3A8A] text-white'
                    : 'bg-white text-blue-900 border-zinc-200 hover:border-[#FFB800] hover:bg-[#FFB800] hover:text-white'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 flex items-center justify-center border bg-white text-blue-900 hover:bg-[#FFB800] hover:text-white transition-colors disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-blue-900"
            >
              <FaChevronRight size={12} />
            </button>
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 md:p-12"
          onClick={() => setSelectedImg(null)}
        >
          <button
            className="absolute top-8 right-8 text-white hover:text-[#FFB800] transition-colors"
            onClick={() => setSelectedImg(null)}
          >
            <X size={40} />
          </button>
          <img
            src={selectedImg}
            alt="Full size property"
            className="max-w-5xl w-full max-h-[85vh] object-contain rounded-sm shadow-2xl border-4 border-white/10"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <Footer />
    </div>
  );
}
