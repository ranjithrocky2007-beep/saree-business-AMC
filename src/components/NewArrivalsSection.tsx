import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';

export const NewArrivalsSection: React.FC = () => {
  const { products, setCurrentView, setSelectedCategory } = useApp();

  // Filter new arrivals or slice latest items
  const newArrivals = products.filter((p) => p.isNewArrival || p.id === 'prod-3' || p.id === 'prod-4' || p.id === 'prod-6' || p.id === 'prod-7');

  const handleViewAll = () => {
    setSelectedCategory(null);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="new-arrivals" className="py-16 md:py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#9E782F] mb-1 font-serif-luxury">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Fresh Off The Loom</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#380510]">
              New Arrivals
            </h2>
            <p className="mt-2 text-sm text-[#5C3D42] max-w-xl">
              Be the first to adorn our latest festive weaves, pastel organzas, and handcrafted designer creations.
            </p>
          </div>

          <button
            type="button"
            onClick={handleViewAll}
            className="self-start sm:self-auto inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#500B1A] hover:text-[#D4AF37] transition-colors group cursor-pointer"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {newArrivals.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              badge="New Arrival"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
