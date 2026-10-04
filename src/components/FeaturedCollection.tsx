import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';

export const FeaturedCollection: React.FC = () => {
  const { products, setCurrentView, setSelectedCategory } = useApp();
  const [activeTab, setActiveTab] = useState<string>('all');

  const filterTabs = [
    { label: 'All Featured', key: 'all' },
    { label: 'Kanchipuram Silk', key: 'kanchipuram-silk' },
    { label: 'Banarasi', key: 'banarasi-silk' },
    { label: 'Soft Silk', key: 'soft-silk' },
    { label: 'Bridal Grandeur', key: 'bridal-sarees' },
  ];

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'all') return true;
    return p.categorySlug === activeTab;
  });

  const handleViewAll = () => {
    setSelectedCategory(null);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 md:py-24 bg-[#F5EFE6]/50 border-y border-[#E8DFC8]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9E782F] mb-1 font-serif-luxury">
              Masterpiece Weaves
            </p>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#380510]">
              Featured Collection
            </h2>
            <p className="mt-2 text-sm text-[#5C3D42] max-w-xl">
              Hand-selected Kanchipuram bridal silks, Banarasi brocades, and modern festive drapes woven with uncompromised artistry.
            </p>
          </div>

          {/* Interactive Filter Tabs (Zero-Pill compliant segmented button controls) */}
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-lg border border-[#E8DFC8] overflow-x-auto no-scrollbar shrink-0">
            {filterTabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#500B1A] text-[#F3E5AB] shadow-xs'
                      : 'text-[#5C3D42] hover:text-[#500B1A] hover:bg-[#FAF7F2]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.slice(0, 8).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              badge={product.isBestSeller ? 'Best Seller' : undefined}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={handleViewAll}
            className="inline-flex items-center gap-2 py-3 px-8 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#500B1A] border border-[#D4AF37] font-semibold text-sm shadow-sm hover:shadow transition-all cursor-pointer"
          >
            <span>View All Sarees</span>
            <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
          </button>
        </div>
      </div>
    </section>
  );
};
