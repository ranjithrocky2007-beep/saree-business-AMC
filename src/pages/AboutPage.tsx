import React from 'react';
import {
  Sparkles,
  Award,
  ShieldCheck,
  Heart,
  Users,
  Feather,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { heroImg, bridalImg, kanchipuramImg } from '../data/products';

export const AboutPage: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#D4AF37]/50 text-xs font-semibold text-[#9E782F] tracking-widest uppercase mb-4 shadow-xs">
            <Feather className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>The Story of Azhagu Mayil</span>
          </div>
          <h1 className="font-serif-luxury font-bold text-4xl sm:text-5xl text-[#380510] leading-tight">
            Weaving Grandeur, Preserving Heritage
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#5C3D42] leading-relaxed font-light">
            Founded with a passion for authentic South Indian textiles, Azhagu Mayil Collection celebrates the regal elegance of the sacred peacock through master handloom weaving.
          </p>
        </div>

        {/* Story Grid with Imagery */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-xl">
            <img
              src={bridalImg}
              alt="Artisanal Handloom Silk"
              className="w-full aspect-[4/3] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-xs uppercase tracking-widest text-[#F3E5AB]">Kanchipuram & Varanasi</span>
              <p className="font-serif-luxury font-bold text-xl mt-1">Generations of Weaving Excellence</p>
            </div>
          </div>

          <div className="space-y-5 text-sm text-[#422026] leading-relaxed">
            <h2 className="font-serif-luxury font-bold text-2xl sm:text-3xl text-[#380510]">
              The Meaning Behind "Azhagu Mayil"
            </h2>
            <p>
              In Tamil tradition, <strong>Azhagu</strong> signifies unmatched beauty and elegance, while <strong>Mayil</strong> is the majestic peacock—the emblem of divine splendour, auspicious celebration, and timeless grace.
            </p>
            <p>
              For decades, our master weavers in Kanchipuram and Varanasi have worked alongside patron families to create wedding sarees that are passed down from grandmothers to daughters as prized heirlooms.
            </p>
            <p>
              Every saree in our collection takes between 14 to 45 days on traditional wooden pit looms, meticulously interleaving pure mulberry silk warp with tested gold zari weft using the ancient <em>korvai</em> interlocking technique.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-3">
              <div className="p-4 rounded-xl bg-white border border-[#E8DFC8]">
                <h4 className="font-serif-luxury font-bold text-lg text-[#500B1A]">100% Tested Zari</h4>
                <p className="text-xs text-gray-500 mt-1">Silver and gold threads assayed for purity.</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#E8DFC8]">
                <h4 className="font-serif-luxury font-bold text-lg text-[#500B1A]">Fair Artisan Trade</h4>
                <p className="text-xs text-gray-500 mt-1">Direct livelihood support for 80+ weaver families.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pillars / Values */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E8DFC8] shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="font-serif-luxury font-bold text-2xl sm:text-3xl text-[#380510]">
              Our Guiding Principles
            </h3>
            <p className="text-xs sm:text-sm text-[#5C3D42] mt-2">
              Every fold, drape, and thread is governed by our uncompromising standard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#D4AF37]/50 text-[#500B1A] flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-[#9E782F]" />
              </div>
              <h4 className="font-serif-luxury font-bold text-lg text-[#380510]">Silk Purity Assurance</h4>
              <p className="text-xs text-[#5C3D42] leading-relaxed">
                Certified with Silk Mark tags. Pure natural silk proteins delivering peerless breathability and rich jewel sheen.
              </p>
            </div>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#D4AF37]/50 text-[#500B1A] flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-[#9E782F]" />
              </div>
              <h4 className="font-serif-luxury font-bold text-lg text-[#380510]">Bridal Concierge</h4>
              <p className="text-xs text-[#5C3D42] leading-relaxed">
                Personalized virtual consultations, color matching with wedding jewelry, and tailored blouse fabric planning.
              </p>
            </div>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#D4AF37]/50 text-[#500B1A] flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-6 h-6 text-[#9E782F]" />
              </div>
              <h4 className="font-serif-luxury font-bold text-lg text-[#380510]">Worldwide Shipping</h4>
              <p className="text-xs text-[#5C3D42] leading-relaxed">
                Insured express delivery to the USA, UK, Singapore, Malaysia, UAE, and across all states in India.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-[#500B1A] text-[#FAF7F2] p-8 sm:p-12 rounded-3xl border border-[#D4AF37] text-center relative overflow-hidden">
          <h3 className="font-serif-luxury font-bold text-2xl sm:text-3xl">
            Experience Azhagu Mayil's Craftsmanship
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-[#F5EFE6]/90 max-w-lg mx-auto">
            Explore our curated bridal and festive sarees or connect with our Chennai flagship boutique.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                setCurrentView('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="py-3 px-6 rounded-xl bg-gradient-to-r from-[#ECC875] via-[#D4AF37] to-[#B89025] text-[#380510] font-bold text-xs uppercase tracking-wider shadow-md hover:opacity-95"
            >
              Shop Collection
            </button>
            <button
              onClick={() => {
                setCurrentView('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="py-3 px-6 rounded-xl bg-white/10 border border-[#D4AF37] text-[#FAF7F2] font-semibold text-xs uppercase tracking-wider hover:bg-white/20"
            >
              Visit Chennai Store
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
