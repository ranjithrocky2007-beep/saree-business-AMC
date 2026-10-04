import React from 'react';
import { Heart, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';

export const WishlistPage: React.FC = () => {
  const { wishlist, products, setCurrentView } = useApp();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <button
              onClick={() => setCurrentView('shop')}
              className="inline-flex items-center gap-1.5 text-xs text-[#500B1A] hover:underline mb-2 font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Shop</span>
            </button>
            <h1 className="font-serif-luxury font-bold text-3xl sm:text-4xl text-[#380510]">
              My Wishlist ({wishlistedProducts.length})
            </h1>
          </div>
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E8DFC8] p-12 text-center max-w-md mx-auto my-8">
            <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#D4AF37]/50 flex items-center justify-center mx-auto mb-4 text-[#500B1A]">
              <Heart className="w-8 h-8 stroke-1" />
            </div>
            <h3 className="font-serif-luxury font-bold text-xl text-[#380510]">
              Your Wishlist is Empty
            </h3>
            <p className="mt-2 text-xs text-gray-500">
              Save your favorite Kanchipuram and festive sarees here by tapping the heart icon on any product card.
            </p>
            <button
              type="button"
              onClick={() => setCurrentView('shop')}
              className="mt-6 py-2.5 px-6 rounded-xl bg-[#500B1A] text-[#F3E5AB] font-bold text-xs uppercase tracking-wider hover:bg-[#3C133A] transition-all shadow-md"
            >
              Explore Collection
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
