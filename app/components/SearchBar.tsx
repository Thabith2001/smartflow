'use client';

import { useState, useEffect, useRef } from 'react';
import { FaSearch, FaMapMarkerAlt, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import { portfolioData, Property } from '../data/properties';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Property[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !(searchRef.current as HTMLElement).contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);

    if (val.length > 1) {
      const filtered = portfolioData
        .filter(
          (p) =>
            p.title.toLowerCase().includes(val.toLowerCase()) ||
            p.location.toLowerCase().includes(val.toLowerCase())
        )
        .slice(0, 6);
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  return (
    <div className="hidden md:flex flex-1 max-w-lg px-4 relative" ref={searchRef}>
      <div className="relative w-full flex items-center bg-white/5 border border-white/20 focus-within:border-yellow-400 transition-all">
        <span className="pl-4 text-blue-300">
          <FaSearch size={13} />
        </span>
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="SEARCH ASSETS..."
          className="w-full bg-transparent py-3 px-4 text-[11px] font-black uppercase tracking-widest text-white placeholder-blue-300/40 outline-none"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="pr-4 text-white/40 hover:text-white"
          >
            <FaTimes size={12} />
          </button>
        )}
      </div>

      {/* --- SEARCH RESULTS --- */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-4 right-4 mt-2 bg-white shadow-2xl border border-gray-200 overflow-hidden z-[100]">
          <div className="grid grid-cols-1 divide-y divide-gray-100">
            {results.map((portfolioData) => (
              <Link
                key={portfolioData.id}
                href={`/property/${portfolioData.id}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors group"
              >
                <div className="h-14 w-14 shrink-0 overflow-hidden bg-zinc-100">
                  <img
                    src={portfolioData.image}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <h4 className="text-[11px] font-black uppercase text-blue-900 truncate">
                    {portfolioData.title}
                  </h4>
                  <div className="flex items-center gap-1 text-gray-700 text-[9px] font-bold uppercase tracking-tight">
                    <FaMapMarkerAlt size={8} className="text-blue-300" /> {portfolioData.location}
                  </div>
                  <p className="text-[#222222] text-[12px] font-black mt-1">
                    ${portfolioData.price.toLocaleString()}
                  </p>
                </div>
                <div className="bg-blue-900 text-white text-[8px] font-black px-3 py-2 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  View
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
