import React from 'react';
import { Instagram, Heart, Eye } from 'lucide-react';
import {
  heroImg,
  kanchipuramImg,
  banarasiImg,
  organzaImg,
  bridalImg,
} from '../data/products';

export const InstagramGallery: React.FC = () => {
  const galleryItems = [
    { img: heroImg, tag: '#AzhaguMayilBride', likes: '1.4k' },
    { img: kanchipuramImg, tag: '#KanchipuramPureZari', likes: '980' },
    { img: banarasiImg, tag: '#BanarasiHeritage', likes: '2.1k' },
    { img: organzaImg, tag: '#BlushPastelSaree', likes: '1.8k' },
    { img: bridalImg, tag: '#SouthIndianWedding', likes: '3.4k' },
    { img: heroImg, tag: '#FestiveDrape2026', likes: '1.2k' },
  ];

  return (
    <section className="py-16 md:py-20 bg-[#F5EFE6]/40 border-t border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-[#500B1A] mb-2 font-medium text-xs tracking-wider uppercase">
            <Instagram className="w-4 h-4 text-[#D4AF37]" />
            <span>@azhagumayilcollection</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#380510]">
            Follow Our Style
          </h2>
          <p className="mt-2 text-sm text-[#5C3D42]">
            Discover the latest looks from Azhagu Mayil Collection styled by our patron brides and fashion connoisseurs.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className="group relative aspect-square rounded-xl overflow-hidden bg-white border border-[#E8DFC8] shadow-xs cursor-pointer"
            >
              <img
                src={item.img}
                alt={`Instagram look ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              {/* Instagram Hover Overlay */}
              <div className="absolute inset-0 bg-[#500B1A]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center text-white">
                <Instagram className="w-5 h-5 text-[#F3E5AB] mb-1.5" />
                <span className="text-[11px] font-semibold text-[#FAF7F2] truncate max-w-full">
                  {item.tag}
                </span>
                <div className="mt-2 flex items-center gap-1 text-[11px] text-[#F3E5AB]">
                  <Heart className="w-3.5 h-3.5 fill-[#F3E5AB]" />
                  <span>{item.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
