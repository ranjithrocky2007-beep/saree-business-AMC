/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategorySection } from './components/CategorySection';
import { FeaturedCollection } from './components/FeaturedCollection';
import { NewArrivalsSection } from './components/NewArrivalsSection';
import { SpecialOfferBanner } from './components/SpecialOfferBanner';
import { WhyChooseUs } from './components/WhyChooseUs';
import { AboutSection } from './components/AboutSection';
import { ReviewsSection } from './components/ReviewsSection';
import { InstagramGallery } from './components/InstagramGallery';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { LoginModal } from './components/LoginModal';
import { FloatingWidgets } from './components/FloatingWidgets';
import { ToastContainer } from './components/ToastContainer';

import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { WishlistPage } from './pages/WishlistPage';
import { AdminDashboard } from './pages/AdminDashboard';

const MainLayout: React.FC = () => {
  const { currentView } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#241315]">
      {/* Top sticky Navigation */}
      <Navbar />

      {/* Main Dynamic View Content */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <HeroSection />
            <CategorySection />
            <FeaturedCollection />
            <NewArrivalsSection />
            <SpecialOfferBanner />
            <WhyChooseUs />
            <AboutSection />
            <ReviewsSection />
            <InstagramGallery />
            <NewsletterSection />
          </>
        )}

        {currentView === 'shop' && <ShopPage />}
        {currentView === 'product' && <ProductDetailPage />}
        {currentView === 'cart' && <CartPage />}
        {currentView === 'checkout' && <CheckoutPage />}
        {currentView === 'order-success' && <OrderSuccessPage />}
        {currentView === 'about' && <AboutPage />}
        {currentView === 'contact' && <ContactPage />}
        {currentView === 'wishlist' && <WishlistPage />}
        {currentView === 'admin' && <AdminDashboard />}
      </main>

      {/* Global Luxury Footer */}
      <Footer />

      {/* Interactive Drawers & Overlays */}
      <CartDrawer />
      <SearchModal />
      <LoginModal />
      <FloatingWidgets />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
