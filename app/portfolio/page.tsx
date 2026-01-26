'use client';

import { useState, useMemo, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  FaMapMarkerAlt,
  FaSearch,
  FaTimes,
  FaBath,
  FaRulerCombined,
  FaBed,
  FaExpandArrowsAlt,
  FaChevronLeft,
  FaChevronRight,
  FaSortAmountDown,
} from 'react-icons/fa';

interface Property {
  id: number;
  category: string;
  title: string;
  location: string;
  price: number;
  landSize: number;
  beds: number;
  baths: number;
  status: string;
  date: string;
  isFeatured: boolean;
  image: string;
}

const portfolio: Property[] = [
  {
    id: 1,
    category: 'House',
    title: 'Bel Air Mansion',
    location: 'Los Angeles, CA',
    price: 12500000,
    landSize: 8500,
    beds: 6,
    baths: 8,
    status: 'Sale',
    date: '2024-01-20',
    isFeatured: true,
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 2,
    category: 'Land',
    title: 'Vineyard Estate',
    location: 'Napa Valley, CA',
    price: 4200000,
    landSize: 45000,
    beds: 0,
    baths: 0,
    status: 'Sale',
    date: '2024-01-15',
    isFeatured: false,
    image:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 3,
    category: 'Apartment',
    title: 'Penthouse 54',
    location: 'New York, NY',
    price: 8900000,
    landSize: 2400,
    beds: 3,
    baths: 4,
    status: 'Rent',
    date: '2024-01-18',
    isFeatured: true,
    image:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 4,
    category: 'House',
    title: 'Modernist Glass Villa',
    location: 'Austin, TX',
    price: 3400000,
    landSize: 5200,
    beds: 4,
    baths: 3,
    status: 'Sale',
    date: '2024-01-22',
    isFeatured: false,
    image:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 5,
    category: 'Land',
    title: 'Mountain Ridge Plot',
    location: 'Aspen, CO',
    price: 1800000,
    landSize: 125000,
    beds: 0,
    baths: 0,
    status: 'Sale',
    date: '2024-01-05',
    isFeatured: true,
    image:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 6,
    category: 'Apartment',
    title: 'Industrial Loft',
    location: 'Chicago, IL',
    price: 1200000,
    landSize: 1800,
    beds: 2,
    baths: 2,
    status: 'Rent',
    date: '2024-01-24',
    isFeatured: false,
    image:
      'https://images.unsplash.com/photo-1536376074432-8d640596717d?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 7,
    category: 'House',
    title: 'Coastal Sanctuary',
    location: 'Malibu, CA',
    price: 7200000,
    landSize: 6800,
    beds: 5,
    baths: 5,
    status: 'Sale',
    date: '2024-01-26',
    isFeatured: true,
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 8,
    category: 'House',
    title: 'Desert Oasis',
    location: 'Phoenix, AZ',
    price: 2100000,
    landSize: 4200,
    beds: 3,
    baths: 3,
    status: 'Sale',
    date: '2024-01-12',
    isFeatured: false,
    image:
      'https://images.unsplash.com/photo-1449156001437-37c645dcf501?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 9,
    category: 'Apartment',
    title: 'Luxury Studio',
    location: 'London, UK',
    price: 850000,
    landSize: 950,
    beds: 1,
    baths: 1,
    status: 'Rent',
    date: '2024-01-21',
    isFeatured: false,
    image:
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 10,
    category: 'Land',
    title: 'Golden Fields',
    location: 'Lexington, KY',
    price: 550000,
    landSize: 89000,
    beds: 0,
    baths: 0,
    status: 'Sale',
    date: '2023-12-28',
    isFeatured: false,
    image:
      'https://images.unsplash.com/photo-1500322969630-a26ab6eb64bb?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 11,
    category: 'House',
    title: 'Lakefront Cabin',
    location: 'Lake Tahoe, NV',
    price: 2800000,
    landSize: 3100,
    beds: 4,
    baths: 3,
    status: 'Sale',
    date: '2024-01-02',
    isFeatured: true,
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 12,
    category: 'Apartment',
    title: 'Metropolitan Suite',
    location: 'Tokyo, JP',
    price: 4500000,
    landSize: 1600,
    beds: 2,
    baths: 2,
    status: 'Sale',
    date: '2024-01-19',
    isFeatured: false,
    image:
      'https://images.unsplash.com/photo-1560448204-61dc36dc98ce?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 13,
    category: 'Land',
    title: 'Ocean View Bluff',
    location: 'Oregon Coast, OR',
    price: 1300000,
    landSize: 22000,
    beds: 0,
    baths: 0,
    status: 'Sale',
    date: '2024-01-14',
    isFeatured: false,
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 14,
    category: 'House',
    title: 'Colonial Manor',
    location: 'Charleston, SC',
    price: 3900000,
    landSize: 7200,
    beds: 5,
    baths: 6,
    status: 'Sale',
    date: '2024-01-08',
    isFeatured: false,
    image:
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 15,
    category: 'Apartment',
    title: 'Riverside Flat',
    location: 'Paris, FR',
    price: 2600000,
    landSize: 1200,
    beds: 2,
    baths: 1,
    status: 'Rent',
    date: '2024-01-25',
    isFeatured: true,
    image:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 16,
    category: 'House',
    title: 'Eco-Friendly Retreat',
    location: 'Portland, OR',
    price: 1650000,
    landSize: 2400,
    beds: 3,
    baths: 2,
    status: 'Sale',
    date: '2024-01-11',
    isFeatured: false,
    image:
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 17,
    category: 'Land',
    title: 'Highland Ranch',
    location: 'Bozeman, MT',
    price: 950000,
    landSize: 320000,
    beds: 0,
    baths: 0,
    status: 'Sale',
    date: '2023-12-15',
    isFeatured: false,
    image:
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 18,
    category: 'Apartment',
    title: 'Skyline Terrace',
    location: 'Dubai, UAE',
    price: 5800000,
    landSize: 3100,
    beds: 4,
    baths: 4,
    status: 'Sale',
    date: '2024-01-26',
    isFeatured: true,
    image:
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 19,
    category: 'House',
    title: 'Hidden Valley Estate',
    location: 'Ojai, CA',
    price: 4900000,
    landSize: 15000,
    beds: 4,
    baths: 5,
    status: 'Sale',
    date: '2024-01-09',
    isFeatured: false,
    image:
      'https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 20,
    category: 'Apartment',
    title: 'Minimalist Penthouse',
    location: 'Berlin, DE',
    price: 2200000,
    landSize: 1450,
    beds: 2,
    baths: 2,
    status: 'Rent',
    date: '2024-01-23',
    isFeatured: false,
    image:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800',
  },
];

export default function PortfolioPage() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Latest');
  const [priceRange, setPriceRange] = useState(20000000);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const itemsPerPage = 9;

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, activeFilter, statusFilter, priceRange, sortBy]);

  // Filtering & Sorting Logic
  const filteredProperties = useMemo(() => {
    let result = portfolio.filter((item) => {
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

  // Pagination Logic
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

          {/* Grid */}
          {currentItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {currentItems.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white border border-zinc-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-zinc-200">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {item.isFeatured && (
                      <div className="absolute top-4 left-4 bg-blue-900 text-white text-[10px] font-black uppercase px-3 py-1.5 tracking-widest">
                        LATEST
                      </div>
                    )}
                    <div
                      className="absolute top-4 right-4 bg-[#FFB800] p-2.5 text-blue-900 cursor-pointer hover:bg-white transition-colors"
                      onClick={() => setSelectedImg(item.image)}
                    >
                      <FaExpandArrowsAlt size={16} />
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start gap-4 mb-1">
                      <h3 className="text-xl font-black uppercase text-blue-900 leading-tight flex-1 tracking-tight">
                        {item.title}
                      </h3>
                      <span className="text-xl font-black text-[#FFB800]">
                        ${item.price.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-zinc-400 text-sm flex items-center gap-1 mb-6 font-bold">
                      <FaMapMarkerAlt className="text-zinc-300" size={14} /> {item.location}
                    </p>
                    <div className="w-full h-[1px] bg-zinc-100 mb-6"></div>
                    <div
                      className={`flex items-center text-blue-900 ${item.category === 'Land' ? 'justify-start' : 'justify-between'}`}
                    >
                      {item.category !== 'Land' && (
                        <>
                          <div className="flex items-center gap-2">
                            <FaBed className="text-blue-900" size={20} />
                            <span className="text-[11px] font-black uppercase tracking-tight">
                              {item.beds} BEDS
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FaBath className="text-blue-900" size={18} />
                            <span className="text-[11px] font-black uppercase tracking-tight">
                              {item.baths} BATHS
                            </span>
                          </div>
                        </>
                      )}
                      <div className="flex items-center gap-2">
                        <FaRulerCombined className="text-blue-900" size={16} />
                        <span className="text-[11px] font-black uppercase tracking-tight">
                          {item.landSize.toLocaleString()} SQFT
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
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
            <div className="mt-12 flex justify-center items-center gap-2">
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

        {/* RIGHT: Filters */}
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

      {/* Lightbox */}
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
