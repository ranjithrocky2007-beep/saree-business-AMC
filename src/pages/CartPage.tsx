import React, { useState } from 'react';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Tag,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CartPage: React.FC = () => {
  const {
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

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode) return;
    const res = applyCoupon(couponCode);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponCode('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="bg-[#FAF7F2] min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="text-center max-w-md bg-white p-8 sm:p-10 rounded-2xl border border-[#E8DFC8] shadow-sm">
          <div className="w-20 h-20 rounded-full bg-[#FAF7F2] border border-[#D4AF37]/50 flex items-center justify-center mx-auto mb-4 text-[#500B1A]">
            <ShoppingBag className="w-10 h-10 stroke-1" />
          </div>
          <h2 className="font-serif-luxury font-bold text-2xl text-[#380510]">
            Your Bag is Empty
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-500 leading-relaxed">
            Your shopping bag does not contain any sarees yet. Explore our handcrafted Kanchipuram and festive collection to find your heirloom drape.
          </p>
          <button
            type="button"
            onClick={() => setCurrentView('shop')}
            className="mt-6 py-3 px-8 rounded-xl bg-[#500B1A] hover:bg-[#3C133A] text-[#F3E5AB] font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
          >
            Start Shopping Sarees
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif-luxury font-bold text-3xl sm:text-4xl text-[#380510] mb-8">
          Shopping Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)} Items)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Cart Items Table/List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl border border-[#E8DFC8] p-6 shadow-xs divide-y divide-[#E8DFC8]">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
                >
                  {/* Thumbnail & Info */}
                  <div className="flex gap-4 items-center">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      onClick={() => openProductDetails(item.product.id)}
                      className="w-24 h-28 object-cover rounded-xl bg-[#FAF7F2] border border-[#E8DFC8] shrink-0 cursor-pointer"
                    />
                    <div>
                      <span className="text-[11px] font-medium text-[#9E782F] uppercase tracking-wider">
                        {item.product.category}
                      </span>
                      <h3
                        onClick={() => openProductDetails(item.product.id)}
                        className="font-serif-luxury font-bold text-base text-[#380510] hover:text-[#500B1A] transition-colors cursor-pointer"
                      >
                        {item.product.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {item.product.color} · Free Fall & Pico Included
                      </p>
                      <p className="text-sm font-mono font-bold text-[#500B1A] mt-1 sm:hidden">
                        ₹{item.product.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>

                  {/* Price, Stepper & Total */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                    <span className="hidden sm:inline font-mono font-bold text-sm text-[#500B1A]">
                      ₹{item.product.price.toLocaleString('en-IN')}
                    </span>

                    {/* Stepper */}
                    <div className="flex items-center border border-[#E8DFC8] rounded-lg bg-[#FAF7F2]">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="px-2.5 py-1 text-gray-600 hover:bg-[#E8DFC8] transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-xs font-mono font-bold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-2.5 py-1 text-gray-600 hover:bg-[#E8DFC8] transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Total item amount */}
                    <span className="font-mono font-bold text-base text-[#380510] min-w-[80px] text-right">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>

                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setCurrentView('shop')}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#500B1A] hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Continue Shopping Sarees</span>
              </button>
            </div>
          </div>

          {/* Order Summary & Coupon Card */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-[#E8DFC8] p-6 shadow-sm space-y-5">
              <h2 className="font-serif-luxury font-bold text-xl text-[#380510] border-b border-[#F0E6D2] pb-3">
                Order Summary
              </h2>

              {/* Coupon Field */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Apply Coupon Code
                </label>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                    <div className="flex items-center gap-2 text-emerald-800">
                      <Tag className="w-4 h-4 text-emerald-600" />
                      <div>
                        <span className="font-bold">{appliedCoupon.code}</span>
                        <p className="text-[11px] text-emerald-700">{appliedCoupon.description}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-xs text-red-600 hover:underline font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApply} className="space-y-1.5">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value.toUpperCase());
                          setCouponError('');
                        }}
                        placeholder="e.g. MAYIL10"
                        className="flex-1 px-3 py-2 text-xs border border-[#E8DFC8] rounded-xl focus:outline-none focus:border-[#D4AF37] uppercase font-mono"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#500B1A] hover:bg-[#3C133A] text-[#F3E5AB] font-bold text-xs rounded-xl transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && <p className="text-xs text-red-600">{couponError}</p>}
                    <div className="flex items-center gap-2 text-[11px] text-gray-500">
                      <span>Available:</span>
                      <button
                        type="button"
                        onClick={() => setCouponCode('MAYIL10')}
                        className="underline text-[#9E782F]"
                      >
                        MAYIL10 (10% off)
                      </button>
                      <span>·</span>
                      <button
                        type="button"
                        onClick={() => setCouponCode('FESTIVE30')}
                        className="underline text-[#9E782F]"
                      >
                        FESTIVE30 (₹500 off)
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Price Calculation */}
              <div className="space-y-3 pt-3 border-t border-[#F0E6D2] text-xs text-[#422026]">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-mono text-sm">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>

                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Coupon Discount</span>
                    <span className="font-mono text-sm">-₹{cartDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="font-mono text-sm">
                    {cartShipping === 0 ? (
                      <span className="text-emerald-700 font-bold">FREE Express Delivery</span>
                    ) : (
                      `₹${cartShipping}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-lg font-bold text-[#380510] pt-3 border-t border-[#F0E6D2]">
                  <span>Grand Total</span>
                  <span className="font-mono text-xl text-[#500B1A]">
                    ₹{cartGrandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Proceed to Checkout CTA */}
              <button
                type="button"
                onClick={() => {
                  setCurrentView('checkout');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#ECC875] via-[#D4AF37] to-[#B89025] hover:opacity-95 text-[#380510] font-bold text-sm uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#380510]" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-[#9E782F]" />
                <span>SSL Encrypted & Verified Indian Payment Gateways</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
