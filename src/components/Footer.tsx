import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PeacockLogo } from './PeacockLogo';

export const Footer: React.FC = () => {
  const { setCurrentView, setSelectedCategory } = useApp();

  const handleNav = (view: any) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (slug: string) => {
    setSelectedCategory(slug);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#24060E] text-[#F5EFE6] border-t-2 border-[#D4AF37]/50 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#FAF7F2]/10">
          {/* Brand & Mission Column (2 spans on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <PeacockLogo size="lg" variant="light" />

            <p className="text-sm text-[#F5EFE6]/80 leading-relaxed max-w-sm pt-2">
              Azhagu Mayil Collection brings together timeless Indian tradition and contemporary elegance. Handcrafted sarees curated for women who appreciate rich pure silk, intricate zari, and heritage craftsmanship.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-[#380510] flex items-center justify-center transition-colors text-[#F3E5AB]"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-[#380510] flex items-center justify-center transition-colors text-[#F3E5AB]"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/919840123456"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#25D366] hover:text-white flex items-center justify-center transition-colors text-[#F3E5AB]"
                title="WhatsApp Direct"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#FF0000] hover:text-white flex items-center justify-center transition-colors text-[#F3E5AB]"
                title="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2 flex items-center gap-4 text-xs text-[#F3E5AB]/80">
              <span className="flex items-center gap-1">
                <Award className="w-4 h-4 text-[#D4AF37]" /> Silk Mark Assured
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" /> 100% Secure Checkout
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif-luxury font-bold text-base text-[#FAF7F2] tracking-wider uppercase mb-4 border-b border-[#D4AF37]/30 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F5EFE6]/80">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('shop')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Shop Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  FAQ & Care Guides
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service & Categories */}
          <div>
            <h4 className="font-serif-luxury font-bold text-base text-[#FAF7F2] tracking-wider uppercase mb-4 border-b border-[#D4AF37]/30 pb-2">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F5EFE6]/80">
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Shipping Information
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Returns & Exchange
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('admin')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Order Tracking
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Bridal Styling Consultation
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('kanchipuram-silk')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Kanchipuram Silk Sarees
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('banarasi-silk')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Banarasi Sarees
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('bridal-sarees')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Bridal Troussseau
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-serif-luxury font-bold text-base text-[#FAF7F2] tracking-wider uppercase mb-4 border-b border-[#D4AF37]/30 pb-2">
              Flagship Boutique
            </h4>
            <ul className="space-y-3 text-xs text-[#F5EFE6]/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>
                  No. 48, Panagal Park Commercial Square, T. Nagar, Chennai - 600017, Tamil Nadu, India
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>+91 98401 23456 / +91 44 2434 5678</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>care@azhagumayil.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Mon – Sun: 10:00 AM – 9:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F5EFE6]/60">
          <p>© 2026 Azhagu Mayil Collection. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span>Handcrafted with Devotion in Tamil Nadu, India</span>
            <span>·</span>
            <button
              onClick={() => handleNav('admin')}
              className="text-[#F3E5AB] hover:underline font-medium"
            >
              Merchant Admin
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
