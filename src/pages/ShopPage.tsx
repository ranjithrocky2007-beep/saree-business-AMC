import React, { useState, useMemo } from 'react';
import {
  SlidersHorizontal,
  X,
  Search,
  Star,
  ChevronDown,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const ShopPage: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
  } = useApp();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [minDiscount, setMinDiscount] = useState<number>(0);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory && p.categorySlug !== selectedCategory) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const match =
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.material.toLowerCase().includes(q) ||
            p.color.toLowerCase().includes(q);
          if (!match) return false;
        }
        // Price filter
        if (p.price < priceRange[0] || p.price > priceRange[1]) {
          return false;
        }
        // Rating filter
        if (minRating > 0 && p.rating < minRating) {
          return false;
        }
        // Discount filter
        if (minDiscount > 0 && p.discountPercent < minDiscount) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
        if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        return 0; // featured default
      });
  }, [products, selectedCategory, searchQuery, priceRange, minRating, minDiscount, sortBy]);

  const resetFilters = () => {
    setSelectedCategory(null);
    setSearchQuery('');
    setPriceRange([0, 15000]);
    setMinRating(0);
    setMinDiscount(0);
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== null ||
    searchQuery.trim() !== '' ||
    priceRange[0] > 0 ||
    priceRange[1] < 15000 ||
    minRating > 0 ||
    minDiscount > 0;

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title & Breadcrumb */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-[#7A5B61] mb-2 font-medium">
            <span>Home</span>
            <span>/</span>
            <span className="text-[#380510]">Shop Sarees</span>
            {selectedCategory && (
              <>
                <span>/</span>
                <span className="text-[#500B1A] font-semibold">
                  {CATEGORIES.find((c) => c.slug === selectedCategory)?.name || selectedCategory}
                </span>
              </>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif-luxury font-bold text-3xl sm:text-4xl text-[#380510]">
                {selectedCategory
                  ? CATEGORIES.find((c) => c.slug === selectedCategory)?.name
                  : 'All Saree Collections'}
              </h1>
              <p className="mt-1 text-sm text-[#5C3D42]">
                Showing {filteredProducts.length} handcrafted sarees ready for immediate dispatch
              </p>
            </div>

            {/* Mobile Filter Toggle & Sort Bar */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden px-3.5 py-2 rounded-xl bg-white border border-[#E8DFC8] text-xs font-semibold text-[#500B1A] flex items-center gap-2 shadow-xs"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#D4AF37]" />
                <span>Filters</span>
                {hasActiveFilters && (
                  <span className="w-2 h-2 rounded-full bg-[#500B1A]" />
                )}
              </button>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline text-xs text-gray-500 font-medium">Sort by:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-[#E8DFC8] rounded-xl px-3.5 py-2 pr-8 text-xs font-semibold text-[#380510] focus:outline-none focus:border-[#D4AF37] cursor-pointer shadow-xs"
                  >
                    <option value="featured">Featured Collection</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="discount">Biggest Discount</option>
                    <option value="newest">Newest Arrivals</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="bg-white p-5 rounded-xl border border-[#E8DFC8] shadow-xs space-y-6 sticky top-24">
              <div className="flex items-center justify-between border-b border-[#F0E6D2] pb-3">
                <h3 className="font-serif-luxury font-bold text-base text-[#380510] flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#D4AF37]" />
                  Filter Sarees
                </h3>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="text-xs text-[#500B1A] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </button>
                )}
              </div>

              {/* Search Inside Shop */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Keyword Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search zari, color, fabric..."
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-[#E8DFC8] focus:outline-none focus:border-[#D4AF37]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Categories
                </label>
                <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                      selectedCategory === null
                        ? 'bg-[#500B1A] text-[#F3E5AB] font-semibold'
                        : 'text-gray-700 hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <span>All Sarees</span>
                    <span className="text-[10px] opacity-80">{products.length}</span>
                  </button>

                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                        selectedCategory === cat.slug
                          ? 'bg-[#500B1A] text-[#F3E5AB] font-semibold'
                          : 'text-gray-700 hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <span className="truncate">{cat.name}</span>
                      <span className="text-[10px] opacity-80">{cat.itemCount}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Max Price
                  </label>
                  <span className="text-xs font-bold font-mono text-[#500B1A]">
                    Up to ₹{priceRange[1].toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="15000"
                  step="500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full accent-[#500B1A] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-500 font-mono mt-1">
                  <span>₹1,000</span>
                  <span>₹15,000</span>
                </div>
              </div>

              {/* Customer Rating Filter */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Customer Rating
                </label>
                <div className="space-y-1.5">
                  {[4.5, 4.0, 3.5].map((rating) => (
                    <label
                      key={rating}
                      className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="ratingFilter"
                        checked={minRating === rating}
                        onChange={() => setMinRating(minRating === rating ? 0 : rating)}
                        className="accent-[#500B1A]"
                      />
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                        <span className="font-semibold text-gray-800">{rating}★</span>
                        <span className="text-gray-500">& above</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Discount Filter */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Discount
                </label>
                <div className="space-y-1.5">
                  {[30, 20, 10].map((disc) => (
                    <label
                      key={disc}
                      className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="discountFilter"
                        checked={minDiscount === disc}
                        onChange={() => setMinDiscount(minDiscount === disc ? 0 : disc)}
                        className="accent-[#500B1A]"
                      />
                      <span>{disc}% off or more</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-3">
            {/* Active Filter Tags */}
            {hasActiveFilters && (
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="text-xs text-gray-500">Active filters:</span>
                {selectedCategory && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-[#E8DFC8] text-xs text-[#500B1A] font-medium">
                    {CATEGORIES.find((c) => c.slug === selectedCategory)?.name}
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-[#E8DFC8] text-xs text-[#500B1A] font-medium">
                    "{searchQuery}"
                    <button onClick={() => setSearchQuery('')} className="hover:text-red-600">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {minRating > 0 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-[#E8DFC8] text-xs text-[#500B1A] font-medium">
                    {minRating}★+
                    <button onClick={() => setMinRating(0)} className="hover:text-red-600">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs text-[#9E782F] hover:underline font-semibold ml-2"
                >
                  Clear all
                </button>
              </div>
            )}

            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-[#E8DFC8] my-6">
                <Sparkles className="w-12 h-12 text-[#D4AF37] mx-auto mb-3" />
                <h3 className="font-serif-luxury font-bold text-xl text-[#380510]">
                  No matching sarees found
                </h3>
                <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
                  Try adjusting your filters or price range to find your ideal handloom saree.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-[#500B1A] text-[#F3E5AB] font-semibold text-xs tracking-wider uppercase hover:bg-[#3C133A] transition-all cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    badge={product.isNewArrival ? 'New Arrival' : undefined}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#F0E6D2] pb-3 mb-4">
                <h3 className="font-serif-luxury font-bold text-base text-[#380510]">
                  Filter Sarees
                </h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Category
                </label>
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory(null);
                      setMobileFilterOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs ${
                      selectedCategory === null
                        ? 'bg-[#500B1A] text-[#F3E5AB] font-semibold'
                        : 'text-gray-700'
                    }`}
                  >
                    All Sarees
                  </button>
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(c.slug);
                        setMobileFilterOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs ${
                        selectedCategory === c.slug
                          ? 'bg-[#500B1A] text-[#F3E5AB] font-semibold'
                          : 'text-gray-700'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Max Price
                  </label>
                  <span className="text-xs font-bold font-mono text-[#500B1A]">
                    ₹{priceRange[1].toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="15000"
                  step="500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full accent-[#500B1A]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#F0E6D2] space-y-2">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-2.5 rounded-xl bg-[#500B1A] text-[#F3E5AB] font-bold text-xs uppercase tracking-wider"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
              <button
                type="button"
                onClick={() => {
                  resetFilters();
                  setMobileFilterOpen(false);
                }}
                className="w-full py-2 rounded-xl text-center text-xs font-semibold text-gray-600 hover:text-gray-900"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
