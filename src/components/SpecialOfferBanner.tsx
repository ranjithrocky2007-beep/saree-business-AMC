import React from 'react';
import { ArrowRight, Sparkles, Tag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { bridalImg } from '../data/products';

export const SpecialOfferBanner: React.FC = () => {
  const { setCurrentView, setSelectedCategory } = useApp();

  const handleShopFestive = () => {
    setSelectedCategory(null);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#3C133A] via-[#500B1A] to-[#250711] text-[#FAF7F2] py-16 md:py-20 my-10 border-y border-[#D4AF37]/50 shadow-xl">
      {/* Background Accent Silk Image & Mandala Motif */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <img
          src={bridalImg}
          alt="Festive Weave"
          className="w-full h-full object-cover object-center mix-blend-overlay"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-[#3C133A]/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F2]/10 border border-[#D4AF37]/40 text-xs font-semibold text-[#F3E5AB] tracking-widest uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Limited Festive Edition</span>
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#FAF7F2] leading-tight">
              Festive Collection 2026
            </h2>

            <p className="mt-3 text-base sm:text-lg text-[#F5EFE6]/90 font-light leading-relaxed">
              Celebrate tradition with our handcrafted pure silk and designer drapes. Enjoy exclusive festive savings and free courier delivery across India.
            </p>

            <div className="mt-4 flex items-center justify-center lg:justify-start gap-2 text-xs font-mono text-[#ECC875]">
              <Tag className="w-3.5 h-3.5" />
              <span>Use coupon code <strong>MAYIL10</strong> or <strong>FESTIVE30</strong> at checkout</span>
            </div>
          </div>

          {/* Offer Highlight Box */}
          <div className="flex flex-col sm:flex-row items-center gap-6 bg-black/25 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-[#D4AF37]/50 shadow-2xl">
            <div className="text-center sm:text-right">
              <span className="block text-xs uppercase tracking-widest text-[#F3E5AB] font-serif-luxury">
                Special Celebration
              </span>
              <span className="block font-serif-luxury font-black text-4xl sm:text-5xl text-[#FAF7F2] mt-1">
                Up to 30% Off
              </span>
              <span className="block text-xs text-[#E8DFC8] mt-1">
                On Selected Handloom & Bridal Silks
              </span>
            </div>

            <button
              type="button"
              onClick={handleShopFestive}
              className="py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#ECC875] via-[#D4AF37] to-[#B89025] hover:opacity-95 text-[#380510] font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer active:scale-95"
            >
              <span>Shop Festive Collection</span>
              <ArrowRight className="w-4 h-4 text-[#380510]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
