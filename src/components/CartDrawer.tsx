import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  Tag,
  Check,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartGrandTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setCurrentView,
    openProductDetails,
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewCartPage = () => {
    setIsCartOpen(false);
    setCurrentView('cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl flex flex-col border-l border-[#D4AF37]/40 animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-[#E8DFC8] bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#500B1A]" />
              <h2 className="font-serif-luxury font-bold text-lg text-[#380510]">
                Your Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-[#FAF7F2] rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 py-2.5 bg-[#500B1A]/5 border-b border-[#E8DFC8] text-xs">
            {cartSubtotal >= 1999 ? (
              <span className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Congratulations! You unlocked FREE Express Shipping
              </span>
            ) : (
              <div className="flex flex-col gap-1 text-[#500B1A]">
                <span>
                  Add <strong>₹{(1999 - cartSubtotal).toLocaleString('en-IN')}</strong> more for FREE shipping
                </span>
                <div className="w-full bg-[#E8DFC8] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#D4AF37] h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (cartSubtotal / 1999) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white border border-[#E8DFC8] flex items-center justify-center mb-4 text-[#D4AF37]">
                  <ShoppingBag className="w-8 h-8 stroke-1" />
                </div>
                <h3 className="font-serif-luxury text-lg font-semibold text-[#380510]">
                  Your bag is currently empty
                </h3>
                <p className="mt-1 text-xs text-gray-500 max-w-xs">
                  Discover our timeless Kanchipuram and festive sarees to fill your wardrobe.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsCartOpen(false);
                    setCurrentView('shop');
                  }}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-[#500B1A] text-[#F3E5AB] font-semibold text-xs uppercase tracking-wider hover:bg-[#3C133A] transition-all cursor-pointer"
                >
                  Explore Sarees
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3.5 p-3 rounded-xl bg-white border border-[#E8DFC8] shadow-xs"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover rounded-lg bg-[#FAF7F2] shrink-0 cursor-pointer"
                    onClick={() => {
                      setIsCartOpen(false);
                      openProductDetails(item.product.id);
                    }}
                  />

                  {/* Info */}
                  <div className="flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          onClick={() => {
                            setIsCartOpen(false);
                            openProductDetails(item.product.id);
                          }}
                          className="font-serif-luxury font-semibold text-xs text-[#380510] hover:text-[#500B1A] transition-colors truncate cursor-pointer"
                        >
                          {item.product.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-gray-500 truncate mt-0.5">
                        {item.product.category}
                      </p>
                      <p className="text-xs font-bold font-mono text-[#500B1A] mt-1">
                        ₹{item.product.price.toLocaleString('en-IN')}
                      </p>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[#E8DFC8] rounded-md bg-[#FAF7F2]">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-[#E8DFC8] text-gray-700 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold font-mono">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:bg-[#E8DFC8] text-gray-700 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-bold font-mono text-[#380510]">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#E8DFC8] bg-white space-y-3.5">
              {/* Coupon Code Section */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-2.5 rounded-lg text-xs">
                  <div className="flex items-center gap-2 text-emerald-800">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Coupon <strong>{appliedCoupon.code}</strong> applied (-₹{cartDiscount})</span>
                  </div>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-emerald-700 hover:text-red-600 font-semibold text-[11px]"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => {
                        setCouponInput(e.target.value.toUpperCase());
                        setCouponError('');
                      }}
                      placeholder="Coupon Code (e.g. MAYIL10)"
                      className="flex-1 px-3 py-1.5 text-xs border border-[#E8DFC8] rounded-lg focus:outline-none focus:border-[#D4AF37] uppercase font-mono"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 bg-[#500B1A] text-[#F3E5AB] font-semibold text-xs rounded-lg hover:bg-[#3C133A] transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-[11px] text-red-600">{couponError}</p>
                  )}
                  <div className="flex items-center gap-2 text-[10px] text-gray-500">
                    <span>Try:</span>
                    <button
                      type="button"
                      onClick={() => setCouponInput('MAYIL10')}
                      className="underline text-[#9E782F]"
                    >
                      MAYIL10
                    </button>
                    <span>·</span>
                    <button
                      type="button"
                      onClick={() => setCouponInput('FESTIVE30')}
                      className="underline text-[#9E782F]"
                    >
                      FESTIVE30
                    </button>
                  </div>
                </form>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs border-t border-[#F0E6D2] pt-2 text-[#422026]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Festive Discount</span>
                    <span className="font-mono">-₹{cartDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-mono">
                    {cartShipping === 0 ? (
                      <span className="text-emerald-700 font-semibold">FREE</span>
                    ) : (
                      `₹${cartShipping}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#380510] pt-1 border-t border-[#F0E6D2]">
                  <span>Total Amount</span>
                  <span className="font-mono text-[#500B1A]">
                    ₹{cartGrandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={handleProceedToCheckout}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#ECC875] via-[#D4AF37] to-[#B89025] hover:opacity-95 text-[#380510] font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-[#380510]" />
                </button>

                <button
                  type="button"
                  onClick={handleViewCartPage}
                  className="w-full py-2 text-center text-xs font-semibold text-[#500B1A] hover:underline"
                >
                  View Full Cart & Summary
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
