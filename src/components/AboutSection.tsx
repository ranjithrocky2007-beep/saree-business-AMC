import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { bridalImg, kanchipuramImg } from '../data/products';

export const AboutSection: React.FC = () => {
  const { setCurrentView } = useApp();

  const handleLearnMore = () => {
    setCurrentView('about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 md:py-24 bg-[#F5EFE6]/60 border-t border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Visual Showcase with Layered Images */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-xl max-w-md mx-auto lg:max-w-none">
              <img
                src={bridalImg}
                alt="Azhagu Mayil Silk Weaving Heritage"
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Overlapping Detail Inset */}
            <div className="hidden sm:block absolute -bottom-8 -right-4 w-48 h-48 rounded-xl overflow-hidden border-2 border-[#FAF7F2] shadow-2xl">
              <img
                src={kanchipuramImg}
                alt="Intricate Zari Pallu Detail"
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Heritage Badge */}
            <div className="absolute -top-4 -left-4 bg-[#500B1A] text-[#F3E5AB] p-4 rounded-xl border border-[#D4AF37] shadow-lg text-center hidden sm:block">
              <span className="block font-serif-luxury font-bold text-2xl">100%</span>
              <span className="text-[10px] uppercase tracking-widest text-[#F3E5AB]">Authentic Silk</span>
            </div>
          </div>

          {/* Text Content */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9E782F] mb-2 font-serif-luxury">
              Our Heritage & Philosophy
            </p>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#380510] leading-tight">
              About Azhagu Mayil Collection
            </h2>

            <p className="mt-5 text-base text-[#422026] leading-relaxed">
              Azhagu Mayil Collection brings together timeless Indian tradition and contemporary elegance. Our collection is carefully curated for women who appreciate beautiful fabrics, detailed craftsmanship and sophisticated designs.
            </p>

            <p className="mt-4 text-sm text-[#5C3D42] leading-relaxed">
              Inspired by the grace and splendour of the peacock (Mayil), our sarees are handcrafted in historic weaving clusters of Kanchipuram, Arani, and Varanasi. Every pallu, border, and zari motif tells a story of devotion, patience, and ceremonial dignity.
            </p>

            <div className="mt-6 space-y-2.5">
              <div className="flex items-center gap-2.5 text-sm font-medium text-[#380510]">
                <CheckCircle2 className="w-4 h-4 text-[#9E782F]" />
                <span>Ethically sourced direct from master weaver clusters</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-medium text-[#380510]">
                <CheckCircle2 className="w-4 h-4 text-[#9E782F]" />
                <span>Tested gold and silver zari with certified purity</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-medium text-[#380510]">
                <CheckCircle2 className="w-4 h-4 text-[#9E782F]" />
                <span>Custom bridal consultation and worldwide shipping</span>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={handleLearnMore}
                className="py-3 px-7 rounded-xl bg-[#500B1A] hover:bg-[#3C133A] text-[#F3E5AB] text-xs font-bold uppercase tracking-wider shadow-sm hover:shadow flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
