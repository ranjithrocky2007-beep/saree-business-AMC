import React, { useState, useEffect } from 'react';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ShieldCheck,
  ChevronDown,
  Phone,
  Sparkles,
  LogOut,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PeacockLogo } from './PeacockLogo';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsSearchOpen,
    setIsAuthOpen,
    user,
    logout,
    setSelectedCategory,
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', view: 'home' },
    { label: 'Shop', view: 'shop' },
    { label: 'Categories', view: 'categories' },
    { label: 'New Arrivals', view: 'new-arrivals' },
    { label: 'Best Sellers', view: 'best-sellers' },
    { label: 'About Us', view: 'about' },
    { label: 'Contact', view: 'contact' },
  ];

  const handleNavClick = (view: string) => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);

    if (view === 'categories') {
      if (currentView !== 'home') {
        setCurrentView('home');
      }
      setTimeout(() => {
        const el = document.getElementById('shop-by-category');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    if (view === 'new-arrivals') {
      if (currentView !== 'home') {
        setCurrentView('home');
      }
      setTimeout(() => {
        const el = document.getElementById('new-arrivals');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    if (view === 'best-sellers') {
      setSelectedCategory(null);
      setCurrentView('shop');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setCurrentView(view as any);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#500B1A] text-[#F3E5AB] text-xs py-2 px-4 border-b border-[#D4AF37]/30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center font-medium tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
            <span>✨ Festive Collection 2026 Arrivals | Free Express Shipping on Orders Above ₹1,999</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-[11px] text-[#FAF7F2]/90">
            <span className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors">
              <Phone className="w-3 h-3 text-[#D4AF37]" />
              Direct Weavers Hotline: +91 98401 23456
            </span>
            <span>·</span>
            <span>100% Pure Silk Certified</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION BAR */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-md border-b border-[#D4AF37]/30 py-3'
            : 'bg-[#FAF7F2] border-b border-[#E8DFC8] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Mobile menu trigger */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#500B1A] hover:text-[#3C133A] rounded-lg transition-colors focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Brand Logo */}
            <button
              onClick={() => handleNavClick('home')}
              className="text-left focus:outline-none cursor-pointer transition-transform hover:scale-[1.01]"
              aria-label="Azhagu Mayil Collection Home"
            >
              <PeacockLogo size="md" />
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => {
                const isActive = currentView === link.view;
                return (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.view)}
                    className={`text-sm tracking-wide transition-all cursor-pointer font-medium relative py-1 ${
                      isActive
                        ? 'text-[#500B1A] font-semibold'
                        : 'text-[#422026] hover:text-[#500B1A]'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D4AF37] rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Action Icons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Button */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-[#500B1A] hover:text-[#D4AF37] hover:bg-[#F5EFE6] rounded-full transition-colors cursor-pointer"
                title="Search Sarees"
                aria-label="Search sarees"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={() => {
                  setCurrentView('wishlist');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-2 text-[#500B1A] hover:text-[#D4AF37] hover:bg-[#F5EFE6] rounded-full transition-colors relative cursor-pointer"
                title="Your Wishlist"
                aria-label="View wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#500B1A] text-[#F3E5AB] border border-[#D4AF37] text-[11px] font-bold flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Cart Button */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-[#500B1A] hover:text-[#D4AF37] hover:bg-[#F5EFE6] rounded-full transition-colors relative cursor-pointer"
                title="Shopping Bag"
                aria-label="View cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#D4AF37] text-[#500B1A] font-bold text-[11px] flex items-center justify-center shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User Account / Login */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    if (user) {
                      setUserDropdownOpen(!userDropdownOpen);
                    } else {
                      setIsAuthOpen(true);
                    }
                  }}
                  className="flex items-center gap-1.5 p-2 text-[#500B1A] hover:text-[#D4AF37] hover:bg-[#F5EFE6] rounded-full transition-colors cursor-pointer"
                  title={user ? user.name : 'Sign In'}
                  aria-label="User Account"
                >
                  <User className="w-5 h-5" />
                  {user && (
                    <span className="hidden xl:inline text-xs font-medium text-[#500B1A] max-w-[85px] truncate">
                      {user.name.split(' ')[0]}
                    </span>
                  )}
                  {user && <ChevronDown className="w-3.5 h-3.5 text-[#500B1A]" />}
                </button>

                {/* User Dropdown */}
                {user && userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-[#E8DFC8] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b border-[#F0E6D2]">
                      <p className="text-xs text-gray-500">Signed in as</p>
                      <p className="text-sm font-semibold text-[#500B1A] truncate">{user.name}</p>
                      <p className="text-[11px] text-gray-500 truncate">{user.email}</p>
                    </div>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        setCurrentView('admin');
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-[#FAF7F2] hover:text-[#500B1A] flex items-center gap-2 cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                      Admin Dashboard
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>

              {/* Quick Admin Access Button */}
              <button
                type="button"
                onClick={() => {
                  setCurrentView('admin');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#500B1A] text-[#F3E5AB] hover:bg-[#3C133A] border border-[#D4AF37]/50 transition-all cursor-pointer shadow-sm"
                title="Switch to Admin Dashboard"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Admin</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-[#D4AF37]/30 px-6 py-5 shadow-2xl transition-all">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.view)}
                className="text-left py-2 text-base font-serif-luxury font-medium text-[#500B1A] border-b border-[#E8DFC8]/60 hover:text-[#D4AF37] transition-colors"
              >
                {link.label}
              </button>
            ))}

            <div className="pt-3 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCurrentView('admin');
                }}
                className="w-full py-2.5 px-4 text-center rounded-lg bg-[#500B1A] text-[#F3E5AB] font-medium text-sm flex items-center justify-center gap-2 border border-[#D4AF37]"
              >
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                Admin Dashboard
              </button>
              {!user && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAuthOpen(true);
                  }}
                  className="w-full py-2.5 px-4 text-center rounded-lg bg-white text-[#500B1A] font-medium text-sm border border-[#D4AF37]/40 shadow-sm"
                >
                  Customer Sign In / Register
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
