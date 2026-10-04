import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Tag } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, products, openProductDetails, setCurrentView, setSelectedCategory } = useApp();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const results = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.material.toLowerCase().includes(query.toLowerCase()) ||
          p.color.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const popularSearches = [
    'Kanchipuram Silk',
    'Banarasi',
    'Bridal Saree',
    'Soft Silk',
    'Organza',
    'Cotton Handloom',
    'Tissue Silk',
  ];

  const handleSelectProduct = (id: string) => {
    setIsSearchOpen(false);
    openProductDetails(id);
  };

  const handlePopularSearch = (term: string) => {
    setQuery(term);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="relative mx-auto max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#D4AF37]/50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#E8DFC8] flex items-center gap-3 bg-[#FAF7F2]">
          <Search className="w-5 h-5 text-[#500B1A] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Kanchipuram silk, Banarasi, Bridal, Organza..."
            className="w-full bg-transparent text-sm sm:text-base text-[#380510] placeholder-gray-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-gray-400 hover:text-gray-600 px-1"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsSearchOpen(false)}
            className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-[#F5EFE6] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto">
          {query.trim() === '' ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#9E782F] mb-3 font-serif-luxury">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => handlePopularSearch(term)}
                    className="px-3 py-1.5 rounded-lg bg-[#FAF7F2] hover:bg-[#F5EFE6] text-xs font-medium text-[#500B1A] border border-[#E8DFC8] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Tag className="w-3 h-3 text-[#D4AF37]" />
                    <span>{term}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-sm font-semibold text-[#380510]">
                No sarees found matching "{query}"
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Try searching with broader terms like "Silk", "Bridal", or "Zari".
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Found {results.length} Sarees
              </p>
              {results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product.id)}
                  className="flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-[#FAF7F2] border border-transparent hover:border-[#E8DFC8] transition-all cursor-pointer group"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-16 object-cover rounded-lg bg-[#F5EFE6] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-medium text-[#9E782F] uppercase truncate">
                      {product.category}
                    </p>
                    <h4 className="font-serif-luxury font-semibold text-sm text-[#380510] group-hover:text-[#500B1A] truncate">
                      {product.name}
                    </h4>
                    <p className="text-xs text-gray-500 truncate">
                      {product.color} · {product.material}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm font-bold font-mono text-[#500B1A]">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#D4AF37] ml-auto mt-1 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
