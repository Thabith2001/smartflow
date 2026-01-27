'use client';

import { useState, useMemo, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PropertyCard from '../components/PropertyCard';
import { portfolioData, Property } from '../data/properties';
import { FaSearch, FaTimes, FaChevronLeft, FaChevronRight, FaSortAmountDown } from 'react-icons/fa';

export default function PortfolioPage() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Latest');
  const [priceRange, setPriceRange] = useState(20000000);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const itemsPerPage = 9;

  useEffect(() => {
    setCurrentPage(1);
  }, [search, activeFilter, statusFilter, priceRange, sortBy]);

  const filteredProperties = useMemo(() => {
    let result = portfolioData.filter((item: Property) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.location.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeFilter === 'All' || item.category === activeFilter;
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      const matchesPrice = item.price <= priceRange;
      return matchesSearch && matchesCategory && matchesStatus && matchesPrice;
    });

    if (sortBy === 'Latest') {
      result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === 'Price Low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price High') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [search, activeFilter, statusFilter, priceRange, sortBy]);

  //Pagination Logic
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const currentItems = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F2F4F7] flex flex-col font-sans">
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 text-white overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000"
          alt="USA Land Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-[1400px] mx-auto px-6">
          <h1 className="text-6xl md:text-6xl font-black uppercase tracking-tighter leading-none">
            Elite <span className="text-[#FFB800]">Inventory</span>
          </h1>
          <p className="mt-6 text-zinc-300 font-bold uppercase tracking-[0.3em] text-xs flex items-center gap-3">
            <span className="w-12 h-[2px] bg-[#FFB800]"></span> Premium Real Estate Assets
          </p>
        </div>
      </section>

      <main className="max-w-[1400px] mx-auto px-6 py-10 flex flex-col lg:flex-row gap-8 w-full">
        {/* LEFT: Content */}
        <div className="flex-1 order-2 lg:order-1">
          <div className="flex justify-between items-center mb-6 bg-white p-4 border border-zinc-200 rounded-sm">
            <div className="text-xs font-black uppercase tracking-tight text-blue-900">
              Showing {filteredProperties.length} Matches
            </div>
            <div className="flex items-center gap-2">
              <FaSortAmountDown className="text-zinc-400" size={12} />
              <select
                className="text-[10px] font-black uppercase bg-transparent outline-none cursor-pointer"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="Latest">Latest Added</option>
                <option value="Price High">Highest Price</option>
                <option value="Price Low">Lowest Price</option>
              </select>
            </div>
          </div>

          {/* Property Grid */}
          {currentItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {currentItems.map((item) => (
                <PropertyCard key={item.id} item={item} onExpand={setSelectedImg} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white border border-dashed border-zinc-300">
              <p className="text-zinc-400 uppercase font-black text-sm tracking-widest">
                No properties match your criteria
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-end items-end gap-2">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center border bg-white text-blue-900 hover:bg-[#FFB800] disabled:opacity-30"
              >
                <FaChevronLeft size={12} />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`w-10 h-10 text-xs font-black border ${currentPage === i + 1 ? 'bg-blue-900 text-white' : 'bg-white text-blue-900'}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 flex items-center justify-center border bg-white text-blue-900 hover:bg-[#FFB800] disabled:opacity-30"
              >
                <FaChevronRight size={12} />
              </button>
            </div>
          )}
        </div>

        {/* RIGHT: Sidebar Filters */}
        <aside className="w-full lg:w-[320px] order-1 lg:order-2">
          <div className="sticky top-10 space-y-6">
            <div className="bg-blue-900 p-6 text-white">
              <label className="text-[10px] font-medium uppercase tracking-[0.2em] mb-3 block text-[#FFB800]">
                Global Search
              </label>
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  placeholder="City, Title, Zip..."
                  className="w-full bg-white/10 border border-white/20 p-3 pl-10 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#FFB800]"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="bg-white p-6 border border-zinc-200">
              <label className="text-[10px] font-black uppercase tracking-widest mb-4 block text-zinc-400 border-b pb-2">
                Listing Status
              </label>
              <div className="flex flex-col gap-2">
                {['All', 'Sale', 'Rent'].map((status) => (
                  <label key={status} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      className="accent-blue-900"
                      checked={statusFilter === status}
                      onChange={() => setStatusFilter(status)}
                    />
                    <span
                      className={`text-[11px] font-black uppercase ${statusFilter === status ? 'text-blue-900' : 'text-zinc-400'}`}
                    >
                      {status === 'All' ? 'Show All' : `For ${status}`}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Asset Class Filter */}
            <div className="bg-white p-6 border border-zinc-200">
              <label className="text-[10px] font-black uppercase tracking-widest mb-4 block text-zinc-400 border-b pb-2">
                Asset Class
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['All', 'House', 'Apartment', 'Land'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`text-[10px] font-black py-3 border transition-all ${activeFilter === cat ? 'bg-blue-900 text-white' : 'bg-[#F8F9FA] text-zinc-500 border-transparent'}`}
                  >
                    {cat.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Slider */}
            <div className="bg-white p-6 border border-zinc-200">
              <div className="flex justify-between items-center mb-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                  Price Ceiling
                </label>
                <span className="text-xs font-black text-blue-900">
                  {(priceRange / 1000000).toFixed(1)}M
                </span>
              </div>
              <input
                type="range"
                min="500000"
                max="20000000"
                step="500000"
                value={priceRange}
                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                className="w-full accent-[#FFB800] h-1 bg-zinc-100 appearance-none cursor-pointer"
              />
            </div>

            {/* Reset Button */}
            <button
              onClick={() => {
                setSearch('');
                setActiveFilter('All');
                setStatusFilter('All');
                setPriceRange(20000000);
              }}
              className="w-full py-4 text-[10px] font-black uppercase bg-[#FFB800] text-blue-900 hover:bg-blue-900 hover:text-white transition-all shadow-lg"
            >
              Reset Filters
            </button>
          </div>
        </aside>
      </main>

      <Footer />

      {/* Lightbox Overlay */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImg(null)}
        >
          <button
            className="absolute top-8 right-8 text-white hover:text-[#FFB800] transition-colors"
            onClick={() => setSelectedImg(null)}
          >
            <FaTimes size={40} />
          </button>
          <img
            src={selectedImg}
            alt="Full size"
            className="max-w-4xl w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
