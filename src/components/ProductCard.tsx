import React from 'react';
import { Star, Heart, ShoppingBag, Eye, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
  badge?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, badge }) => {
  const {
    addToCart,
    openProductDetails,
    isInWishlist,
    toggleWishlist,
    setCurrentView,
  } = useApp();

  const inWishlist = isInWishlist(product.id);

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={() => openProductDetails(product.id)}
      className="group relative flex flex-col bg-white rounded-xl overflow-hidden border border-[#E8DFC8] hover:border-[#D4AF37]/60 hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      {/* Visual Badge / Tag */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
        {badge ? (
          <span className="bg-[#500B1A] text-[#F3E5AB] border border-[#D4AF37]/40 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded shadow-sm">
            {badge}
          </span>
        ) : product.discountPercent > 0 ? (
          <span className="bg-[#500B1A] text-[#F3E5AB] border border-[#D4AF37]/40 text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded shadow-sm">
            {product.discountPercent}% Off
          </span>
        ) : null}
      </div>

      {/* Wishlist Heart Button */}
      <button
        type="button"
        onClick={handleWishlist}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all duration-200 cursor-pointer ${
          inWishlist
            ? 'bg-[#500B1A] text-[#F3E5AB] shadow-md scale-105'
            : 'bg-white/80 text-gray-700 hover:text-[#500B1A] hover:bg-white shadow-sm'
        }`}
        title={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
        aria-label="Toggle wishlist"
      >
        <Heart
          className={`w-4 h-4 ${inWishlist ? 'fill-[#F3E5AB]' : ''}`}
        />
      </button>

      {/* Product Image Frame */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF7F2]">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Quick View Overlay on Desktop Hover */}
        <div className="absolute inset-0 bg-[#500B1A]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="px-3.5 py-1.5 bg-white/95 text-[#500B1A] font-semibold text-xs rounded-full shadow-md flex items-center gap-1.5 backdrop-blur-sm">
            <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
            Quick View
          </span>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-2 text-xs text-gray-500 mb-1.5">
            <span className="text-[11px] font-medium tracking-wide uppercase text-[#9E782F] truncate">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-600 shrink-0 font-medium text-[11px]">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-gray-400">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-serif-luxury font-semibold text-base text-[#241315] group-hover:text-[#500B1A] transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Pricing */}
          <div className="mt-2 flex items-baseline gap-2 flex-wrap">
            <span className="text-lg font-bold font-mono tracking-tight text-[#500B1A]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs line-through text-gray-400 font-mono">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            {product.discountPercent > 0 && (
              <span className="text-[11px] font-semibold text-emerald-700">
                Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons: Add to Cart & Buy Now */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#F0E6D2]">
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full py-2 px-2 rounded-lg bg-[#FAF7F2] hover:bg-[#F5EFE6] text-[#500B1A] border border-[#D4AF37]/40 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer hover:border-[#D4AF37]"
            title="Add to Cart"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>

          <button
            type="button"
            onClick={handleBuyNow}
            className="w-full py-2 px-2 rounded-lg bg-[#500B1A] hover:bg-[#3C133A] text-[#F3E5AB] text-xs font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer shadow-sm hover:shadow"
            title="Instant Checkout"
          >
            <span>Buy Now</span>
            <ArrowRight className="w-3 h-3 text-[#D4AF37]" />
          </button>
        </div>
      </div>
    </div>
  );
};
