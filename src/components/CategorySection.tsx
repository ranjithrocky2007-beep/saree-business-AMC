import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { useApp } from '../context/AppContext';

export const CategorySection: React.FC = () => {
  const { setCurrentView, setSelectedCategory } = useApp();

  const handleCategorySelect = (slug: string) => {
    setSelectedCategory(slug);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="shop-by-category" className="py-16 md:py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9E782F] mb-2 font-serif-luxury">
            Artisanal Silks & Weaves
          </p>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#380510]">
            Shop by Category
          </h2>
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="h-px w-10 bg-[#D4AF37]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <span className="h-px w-10 bg-[#D4AF37]" />
          </div>
          <p className="mt-4 text-sm text-[#5C3D42] leading-relaxed">
            From majestic bridal Kanchipurams to breezy handloom cottons, discover handpicked drapes crafted for every auspicious celebration.
          </p>
        </div>

        {/* Categories Grid (8 Cards) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategorySelect(cat.slug)}
              className="group relative rounded-xl overflow-hidden bg-white border border-[#E8DFC8] hover:border-[#D4AF37] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Category Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F5EFE6]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <span className="absolute bottom-2.5 right-2.5 text-[11px] font-medium text-[#FAF7F2] bg-[#380510]/80 backdrop-blur-xs px-2 py-0.5 rounded">
                  {cat.itemCount} Designs
                </span>
              </div>

              {/* Category Info & Explore Button */}
              <div className="p-4 flex flex-col justify-between flex-1 gap-3">
                <div>
                  <h3 className="font-serif-luxury font-bold text-base text-[#380510] group-hover:text-[#6B1124] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="mt-1 text-xs text-[#6B5558] line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#F0E6D2] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#8B621F] group-hover:text-[#500B1A] transition-colors">
                    Explore
                  </span>
                  <div className="w-6 h-6 rounded-full bg-[#FAF7F2] group-hover:bg-[#500B1A] text-[#500B1A] group-hover:text-[#F3E5AB] flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
