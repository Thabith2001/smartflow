'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  FaMapMarkerAlt,
  FaSearch,
  FaExpandArrowsAlt,
  FaChevronLeft,
  FaChevronRight,
  FaTimes as X,
  FaTag,
} from 'react-icons/fa';
import { useState } from 'react';

const portfolio = [
  {
    id: 1,
    category: 'House',
    title: 'Bel Air Mansion',
    location: 'Los Angeles, CA',
    price: '$12,500,000',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 2,
    category: 'Land',
    title: 'Vineyard Estate',
    location: 'Napa Valley, CA',
    price: '$4,200,000',
    image:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 3,
    category: 'Apartment',
    title: 'Penthouse 54',
    location: 'New York, NY',
    price: '$8,900,000',
    image:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 4,
    category: 'House',
    title: 'Aspen Ski Lodge',
    location: 'Aspen, CO',
    price: '$5,400,000',
    image:
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 5,
    category: 'Apartment',
    title: 'Marina Vista',
    location: 'Miami, FL',
    price: '$2,100,000',
    image:
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 6,
    category: 'Land',
    title: 'Oceanfront Acre',
    location: 'Malibu, CA',
    price: '$7,500,000',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 7,
    category: 'House',
    title: 'Lakefront Manor',
    location: 'Lake Tahoe, NV',
    price: '$3,800,000',
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 8,
    category: 'Apartment',
    title: 'The Brickell Loft',
    location: 'Miami, FL',
    price: '$1,200,000',
    image:
      'https://images.unsplash.com/photo-1560448204-61dc36dc98ce?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 9,
    category: 'Land',
    title: 'Mountain Peak',
    location: 'Flagstaff, AZ',
    price: '$450,000',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 10,
    category: 'House',
    title: 'Modern Desert Home',
    location: 'Scottsdale, AZ',
    price: '$1,950,000',
    image:
      'https://images.unsplash.com/photo-1449156001437-37c645dcf501?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 11,
    category: 'Apartment',
    title: 'Chelsea Studio',
    location: 'London, UK',
    price: '$950,000',
    image:
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 12,
    category: 'Land',
    title: 'Rolling Meadows',
    location: 'Lexington, KY',
    price: '$890,000',
    image:
      'https://images.unsplash.com/photo-1500322969630-a26ab6eb64bb?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 13,
    category: 'House',
    title: 'Georgian Estate',
    location: 'Atlanta, GA',
    price: '$2,700,000',
    image:
      'https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 14,
    category: 'Apartment',
    title: 'Sky Tower Suite',
    location: 'Chicago, IL',
    price: '$3,100,000',
    image:
      'https://images.unsplash.com/photo-1536376074432-8d640596717d?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 15,
    category: 'Land',
    title: 'Riverbend Plot',
    location: 'Missoula, MT',
    price: '$620,000',
    image:
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 16,
    category: 'House',
    title: 'Beach Bungalow',
    location: 'Key West, FL',
    price: '$1,450,000',
    image:
      'https://images.unsplash.com/photo-1572120339559-0137c159fc8b?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 17,
    category: 'Apartment',
    title: 'Pacific Heights',
    location: 'San Francisco, CA',
    price: '$5,200,000',
    image:
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 18,
    category: 'Land',
    title: 'Forest Retreat',
    location: 'Burlington, VT',
    price: '$340,000',
    image:
      'https://images.unsplash.com/photo-1448375235591-282273b1503c?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 19,
    category: 'House',
    title: 'Colonial Manor',
    location: 'Charleston, SC',
    price: '$2,200,000',
    image:
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 20,
    category: 'Apartment',
    title: 'The Louvre Flat',
    location: 'Paris, FR',
    price: '$4,500,000',
    image:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1000',
  },
];

export default function PortfolioPage() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImg, setSelectedImg] = useState(null);
  const itemsPerPage = 6;

  const filteredProperties = portfolio.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === 'All' || item.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const currentItems = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/*  Hero Section */}
      <section className="bg-[#0A1D37] py-24 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
            Global <span className="text-[#FFB800]">Portfolio</span>
          </h1>
          <p className="text-zinc-400 max-w-xl mx-auto text-lg font-medium">
            Explore our most prestigious listings across all categories. Exclusive properties for
            elite investors.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-2 bg-zinc-100 p-1 rounded-md overflow-x-auto w-full md:w-auto">
            {['All', 'House', 'Land', 'Apartment'].map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  setActiveFilter(filter);
                  setCurrentPage(1);
                }}
                className={`px-6 py-2 rounded-sm text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeFilter === filter
                    ? 'bg-[#1E3A8A] text-white'
                    : 'text-zinc-500 hover:text-black'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Quick Search..."
              className="w-full pl-10 pr-4 py-3 bg-zinc-50 border-none focus:ring-2 ring-blue-900 rounded-md outline-none text-sm"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Portfolio Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentItems.map((item, index) => {
            const absoluteIndex = (currentPage - 1) * itemsPerPage + index;
            return (
              <div
                key={item.id}
                className="group relative overflow-hidden bg-zinc-900 aspect-[4/5] rounded-sm"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />

                <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                  <div className="flex justify-between items-start">
                    {absoluteIndex < 10 && (
                      <span className="bg-[#FFB800] text-[#0A1D37] text-[10px] font-black px-3 py-1 uppercase tracking-widest shadow-xl">
                        Latest
                      </span>
                    )}
                    <button
                      onClick={() => setSelectedImg(item.image)}
                      className="w-10 h-10 bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-[#FFB800] hover:text-[#0A1D37] transition-all"
                    >
                      <FaExpandArrowsAlt size={16} />
                    </button>
                  </div>

                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-2 text-[#FFB800] text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
                      <FaTag className="text-xs" /> {item.category}
                    </div>
                    <h3 className="text-white text-3xl font-black leading-none uppercase mb-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 text-zinc-300 text-sm mb-4">
                      <FaMapMarkerAlt className="text-[#FFB800]" /> {item.location}
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-white/20">
                      <span className="text-white font-bold text-xl">{item.price}</span>
                      <button className="text-[10px] font-black uppercase text-[#FFB800] hover:text-white transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              </div>
            );
          })}
        </div>

        {/* Right-Aligned Pagination */}
        {totalPages > 1 && (
          <div className="mt-20 flex justify-end items-center gap-3">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-3 border rounded-md hover:bg-blue-900 hover:text-white transition-all disabled:opacity-30"
              disabled={currentPage === 1}
            >
              <FaChevronLeft />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-12 h-12 rounded-md font-black transition-all border ${currentPage === i + 1 ? 'bg-blue-900 border-blue-900 text-white shadow-lg' : 'bg-white text-blue-900'}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-3 border rounded-md hover:bg-blue-900 hover:text-white transition-all disabled:opacity-30"
              disabled={currentPage === totalPages}
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImg(null)}
        >
          <button className="absolute top-8 right-8 text-white hover:text-[#FFB800]">
            <X size={40} />
          </button>
          <img
            src={selectedImg}
            alt="Portfolio Detail"
            className="max-w-4xl w-full max-h-full object-contain"
          />
        </div>
      )}

      <Footer />
    </div>
  );
}
