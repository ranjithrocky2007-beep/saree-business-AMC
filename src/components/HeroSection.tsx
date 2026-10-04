import React from 'react';
import { ArrowRight, Sparkles, Award, ShieldCheck, Truck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { heroImg } from '../data/products';

export const HeroSection: React.FC = () => {
  const { setCurrentView, setSelectedCategory } = useApp();

  const handleShopCollection = () => {
    setSelectedCategory(null);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreNewArrivals = () => {
    const el = document.getElementById('new-arrivals');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setCurrentView('shop');
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#250711] text-[#FAF7F2]">
      {/* Background Image with Measured Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Azhagu Mayil Luxury South Indian Silk Saree Heritage"
          className="w-full h-full object-cover object-top opacity-40 mix-blend-luminosity scale-105 animate-in fade-in duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3C0813] via-[#3C0813]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#250711] via-transparent to-black/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-36">
        <div className="max-w-2xl">
          {/* Subtle Tagline */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F2]/10 backdrop-blur-md border border-[#D4AF37]/50 text-xs font-semibold text-[#F3E5AB] tracking-widest uppercase mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Kanchipuram · Banarasi · Handloom Silks</span>
          </div>

          {/* Heading */}
          <h1 className="font-serif-luxury font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.15] text-[#FAF7F2] text-balance">
            Elegance Woven in Every Thread
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-base sm:text-lg text-[#F5EFE6]/90 leading-relaxed font-normal max-w-xl text-balance">
            Discover exquisite sarees crafted for timeless beauty and unforgettable moments. Handcrafted by master weavers with pure zari and generational South Indian heritage.
          </p>

          {/* Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              type="button"
              onClick={handleShopCollection}
              className="py-3.5 px-7 rounded-xl bg-gradient-to-r from-[#ECC875] via-[#D4AF37] to-[#B89025] text-[#380510] font-bold text-sm tracking-wide shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Shop Collection</span>
              <ArrowRight className="w-4 h-4 text-[#380510]" />
            </button>

            <button
              type="button"
              onClick={handleExploreNewArrivals}
              className="py-3.5 px-7 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-[#D4AF37]/60 text-[#FAF7F2] font-semibold text-sm tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer hover:border-[#D4AF37]"
            >
              <span>Explore New Arrivals</span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-3 gap-4 text-[#F5EFE6]/80 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Silk Mark Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>100% Authentic Weave</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Express Pan-India Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Traditional Bottom Scallop Border Accent */}
      <div className="h-2 w-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] opacity-80" />
    </section>
  );
};
