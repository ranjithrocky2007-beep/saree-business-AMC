import React, { useState } from 'react';
import {
  Star,
  Heart,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Share2,
  Check,
  CheckCircle,
  Copy,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const {
    products,
    selectedProductId,
    addToCart,
    isInWishlist,
    toggleWishlist,
    setCurrentView,
    addToast,
  } = useApp();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [activeImage, setActiveImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);

  // Sync active image when product changes
  React.useEffect(() => {
    setActiveImage(product.image);
    setQuantity(1);
  }, [product]);

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    addToast('Product link copied to clipboard!', 'info');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Check out this stunning ${product.name} at Azhagu Mayil Collection! Price: ₹${product.price.toLocaleString('en-IN')}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  // Related products from same category
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.categorySlug === product.categorySlug)
    .concat(products.filter((p) => p.id !== product.id && p.categorySlug !== product.categorySlug))
    .slice(0, 4);

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#7A5B61] mb-6 font-medium">
          <button
            onClick={() => setCurrentView('home')}
            className="hover:text-[#500B1A]"
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => setCurrentView('shop')}
            className="hover:text-[#500B1A]"
          >
            Shop
          </button>
          <span>/</span>
          <span className="text-[#380510] truncate max-w-xs">{product.name}</span>
        </div>

        {/* Product Details Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DFC8] shadow-sm">
          {/* Left: Gallery & Zoomable Visual */}
          <div className="space-y-4">
            {/* Primary Large Image Frame */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#FAF7F2] border border-[#E8DFC8] group">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              {product.discountPercent > 0 && (
                <div className="absolute top-4 left-4 bg-[#500B1A] text-[#F3E5AB] border border-[#D4AF37] px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider shadow-md">
                  {product.discountPercent}% Off
                </div>
              )}
            </div>

            {/* Thumbnail Carousel */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.thumbnails.map((thumb, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(thumb)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    activeImage === thumb
                      ? 'border-[#500B1A] ring-2 ring-[#D4AF37]/50 scale-102'
                      : 'border-[#E8DFC8] opacity-75 hover:opacity-100'
                  }`}
                >
                  <img
                    src={thumb}
                    alt={`${product.name} angle ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Authenticity Guarantee Callout */}
            <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFC8] flex items-center justify-between text-xs text-[#500B1A]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span className="font-semibold">Silk Mark Certified Authentic Weave</span>
              </div>
              <span className="font-mono text-gray-500">SKU: {product.sku}</span>
            </div>
          </div>

          {/* Right: Product Purchase Module */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#9E782F] font-serif-luxury">
                  {product.category}
                </span>
                <div className="flex items-center gap-1.5 text-amber-500 font-semibold text-xs bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <span>{product.rating.toFixed(1)}</span>
                  <span className="text-gray-400">({product.reviewCount} customer reviews)</span>
                </div>
              </div>

              {/* Product Title */}
              <h1 className="font-serif-luxury font-bold text-2xl sm:text-3xl text-[#380510] leading-tight">
                {product.name}
              </h1>

              {/* Price Block */}
              <div className="mt-4 flex items-baseline gap-3 flex-wrap">
                <span className="font-mono font-bold text-3xl text-[#500B1A]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice > product.price && (
                  <span className="font-mono text-sm text-gray-400 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {product.discountPercent > 0 && (
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded">
                    Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')} ({product.discountPercent}% OFF)
                  </span>
                )}
              </div>
              <p className="mt-1 text-[11px] text-gray-500">
                Inclusive of all taxes · Free shipping across India
              </p>

              {/* Description */}
              <p className="mt-5 text-sm text-[#422026] leading-relaxed">
                {product.description}
              </p>

              {/* Key Specifications Table */}
              <div className="mt-6 border border-[#E8DFC8] rounded-xl overflow-hidden divide-y divide-[#E8DFC8] text-xs">
                <div className="grid grid-cols-3 p-2.5 bg-[#FAF7F2]">
                  <span className="font-semibold text-gray-600">Material / Fabric:</span>
                  <span className="col-span-2 text-[#380510] font-medium">{product.material}</span>
                </div>
                <div className="grid grid-cols-3 p-2.5">
                  <span className="font-semibold text-gray-600">Color Palette:</span>
                  <span className="col-span-2 text-[#380510] font-medium">{product.color}</span>
                </div>
                <div className="grid grid-cols-3 p-2.5 bg-[#FAF7F2]">
                  <span className="font-semibold text-gray-600">Saree Length:</span>
                  <span className="col-span-2 text-[#380510] font-medium">{product.length}</span>
                </div>
                <div className="grid grid-cols-3 p-2.5">
                  <span className="font-semibold text-gray-600">Blouse Details:</span>
                  <span className="col-span-2 text-[#380510] font-medium">{product.blouseDetails}</span>
                </div>
                <div className="grid grid-cols-3 p-2.5 bg-[#FAF7F2]">
                  <span className="font-semibold text-gray-600">Care Instructions:</span>
                  <span className="col-span-2 text-[#380510] font-medium">{product.careInstructions}</span>
                </div>
              </div>

              {/* Stock Status */}
              <div className="mt-4 flex items-center gap-2 text-xs">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold text-emerald-800">
                  In Stock ({product.stock} units left in Chennai Boutique)
                </span>
              </div>
            </div>

            {/* Actions: Quantity + Add to Cart + Buy Now + Wishlist */}
            <div className="space-y-4 pt-4 border-t border-[#F0E6D2]">
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold text-gray-700">Quantity:</span>
                <div className="flex items-center border border-[#E8DFC8] rounded-lg bg-[#FAF7F2]">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 hover:bg-[#E8DFC8] text-gray-700 font-semibold"
                  >
                    -
                  </button>
                  <span className="px-4 text-xs font-bold font-mono">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-3 py-1.5 hover:bg-[#E8DFC8] text-gray-700 font-semibold"
                  >
                    +
                  </button>
                </div>

                {/* Wishlist Button */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className={`ml-auto p-2.5 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer ${
                    inWishlist
                      ? 'bg-[#500B1A] text-[#F3E5AB] border-[#D4AF37]'
                      : 'bg-[#FAF7F2] text-[#500B1A] border-[#E8DFC8] hover:border-[#D4AF37]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-[#F3E5AB]' : ''}`} />
                  <span>{inWishlist ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                </button>
              </div>

              {/* Buy & Cart Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#500B1A] border-2 border-[#500B1A] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#500B1A] hover:bg-[#3C133A] text-[#F3E5AB] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <span>Buy Now</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] text-gray-600 text-center">
                <div className="p-2 rounded-lg bg-[#FAF7F2] border border-[#E8DFC8]">
                  <Truck className="w-4 h-4 text-[#9E782F] mx-auto mb-1" />
                  <span>Free Express Delivery</span>
                </div>
                <div className="p-2 rounded-lg bg-[#FAF7F2] border border-[#E8DFC8]">
                  <RotateCcw className="w-4 h-4 text-[#9E782F] mx-auto mb-1" />
                  <span>7-Day Easy Exchange</span>
                </div>
                <div className="p-2 rounded-lg bg-[#FAF7F2] border border-[#E8DFC8]">
                  <ShieldCheck className="w-4 h-4 text-[#9E782F] mx-auto mb-1" />
                  <span>100% Tested Pure Zari</span>
                </div>
              </div>

              {/* Share links */}
              <div className="flex items-center justify-between pt-2 border-t border-[#F0E6D2] text-xs text-gray-500">
                <span className="font-medium">Share this saree:</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleShareWhatsApp}
                    className="p-1.5 rounded-full hover:bg-emerald-50 text-emerald-700 transition-colors"
                    title="Share via WhatsApp"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="p-1.5 rounded-full hover:bg-gray-100 text-gray-700 transition-colors"
                    title="Copy Link"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Sarees Section */}
        <div className="mt-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#9E782F] mb-1 font-serif-luxury">
                Curated Suggestions
              </p>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#380510]">
                You May Also Adore
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setCurrentView('shop')}
              className="text-xs font-semibold uppercase tracking-wider text-[#500B1A] hover:underline"
            >
              View All Sarees
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
