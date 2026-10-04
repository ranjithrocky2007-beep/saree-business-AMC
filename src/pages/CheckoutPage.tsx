import React, { useState } from 'react';
import {
  ShieldCheck,
  CreditCard,
  Banknote,
  QrCode,
  ArrowLeft,
  CheckCircle,
  Truck,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CustomerInfo } from '../types';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartGrandTotal,
    appliedCoupon,
    placeOrder,
    setCurrentView,
    addToast,
    user,
  } = useApp();

  const [customer, setCustomer] = useState<CustomerInfo>({
    fullName: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    address: '',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600017',
    instructions: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'COD' | 'Card'>('UPI');
  const [upiId, setUpiId] = useState('user@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="bg-[#FAF7F2] min-h-[70vh] flex items-center justify-center p-4">
        <div className="text-center max-w-md bg-white p-8 rounded-2xl border border-[#E8DFC8]">
          <h2 className="font-serif-luxury font-bold text-2xl text-[#380510]">
            No Items in Checkout
          </h2>
          <p className="mt-2 text-xs text-gray-500">
            Please add sarees to your bag before proceeding to checkout.
          </p>
          <button
            type="button"
            onClick={() => setCurrentView('shop')}
            className="mt-6 px-6 py-2.5 rounded-xl bg-[#500B1A] text-[#F3E5AB] text-xs font-bold uppercase tracking-wider"
          >
            Explore Sarees
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  };

  const handleFillDemoAddress = () => {
    setCustomer({
      fullName: 'Sowmya Raghavan',
      phone: '+91 98402 11928',
      email: 'sowmya.r@gmail.com',
      address: 'Plot 42, 2nd Main Road, Gandhi Nagar, Adyar',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600020',
      instructions: 'Kindly deliver wrapped in the traditional cloth pouch.',
    });
    addToast('Demo address filled for instant testing!', 'info');
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customer.fullName || !customer.phone || !customer.address || !customer.pincode) {
      addToast('Please fill in all mandatory delivery details', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      placeOrder(customer, paymentMethod);
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Title */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <button
              onClick={() => setCurrentView('cart')}
              className="inline-flex items-center gap-1.5 text-xs text-[#500B1A] hover:underline mb-2 font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Bag</span>
            </button>
            <h1 className="font-serif-luxury font-bold text-3xl sm:text-4xl text-[#380510]">
              Secure Checkout
            </h1>
          </div>

          <button
            type="button"
            onClick={handleFillDemoAddress}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#D4AF37] text-xs font-semibold text-[#500B1A] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Quick Fill Demo Address</span>
          </button>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Customer Info & Payment Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* 1. Customer Information */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DFC8] shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-[#F0E6D2] pb-3">
                <h2 className="font-serif-luxury font-bold text-xl text-[#380510] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#500B1A] text-[#F3E5AB] text-xs flex items-center justify-center font-sans font-bold">
                    1
                  </span>
                  Delivery Address & Customer Info
                </h2>
                <button
                  type="button"
                  onClick={handleFillDemoAddress}
                  className="sm:hidden text-xs text-[#500B1A] underline font-semibold"
                >
                  Quick Fill
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="e.g. Sowmya Raghavan"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E8DFC8] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Phone Number (for Courier Updates) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={customer.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+91 98402 12345"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E8DFC8] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Email Address (for Digital Tax Invoice) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={customer.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="sowmya@example.com"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E8DFC8] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Street Address / House No. / Landmark <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={customer.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Flat 4B, Temple Towers, Near Shiva Temple..."
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E8DFC8] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E8DFC8] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E8DFC8] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Pincode / Postal Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.pincode}
                    onChange={(e) => handleInputChange('pincode', e.target.value)}
                    placeholder="600017"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E8DFC8] focus:outline-none focus:border-[#D4AF37] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Delivery Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={customer.instructions}
                    onChange={(e) => handleInputChange('instructions', e.target.value)}
                    placeholder="e.g. Ring bell or leave with security"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E8DFC8] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Payment Method */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DFC8] shadow-xs space-y-5">
              <div className="border-b border-[#F0E6D2] pb-3">
                <h2 className="font-serif-luxury font-bold text-xl text-[#380510] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#500B1A] text-[#F3E5AB] text-xs flex items-center justify-center font-sans font-bold">
                    2
                  </span>
                  Select Payment Method
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* UPI Option */}
                <label
                  onClick={() => setPaymentMethod('UPI')}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    paymentMethod === 'UPI'
                      ? 'border-[#500B1A] bg-[#500B1A]/5 shadow-xs'
                      : 'border-[#E8DFC8] hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <QrCode className="w-5 h-5 text-[#500B1A]" />
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'UPI'}
                      onChange={() => setPaymentMethod('UPI')}
                      className="accent-[#500B1A]"
                    />
                  </div>
                  <span className="font-semibold text-xs text-[#380510] block">
                    Instant UPI
                  </span>
                  <span className="text-[10px] text-gray-500">
                    GPay, PhonePe, Paytm, BHIM
                  </span>
                </label>

                {/* Cash on Delivery */}
                <label
                  onClick={() => setPaymentMethod('COD')}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    paymentMethod === 'COD'
                      ? 'border-[#500B1A] bg-[#500B1A]/5 shadow-xs'
                      : 'border-[#E8DFC8] hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Banknote className="w-5 h-5 text-[#500B1A]" />
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'COD'}
                      onChange={() => setPaymentMethod('COD')}
                      className="accent-[#500B1A]"
                    />
                  </div>
                  <span className="font-semibold text-xs text-[#380510] block">
                    Cash on Delivery (COD)
                  </span>
                  <span className="text-[10px] text-gray-500">
                    Pay in cash upon doorstep delivery
                  </span>
                </label>

                {/* Credit/Debit Card */}
                <label
                  onClick={() => setPaymentMethod('Card')}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    paymentMethod === 'Card'
                      ? 'border-[#500B1A] bg-[#500B1A]/5 shadow-xs'
                      : 'border-[#E8DFC8] hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <CreditCard className="w-5 h-5 text-[#500B1A]" />
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'Card'}
                      onChange={() => setPaymentMethod('Card')}
                      className="accent-[#500B1A]"
                    />
                  </div>
                  <span className="font-semibold text-xs text-[#380510] block">
                    Credit / Debit Card
                  </span>
                  <span className="text-[10px] text-gray-500">
                    Visa, MasterCard, RuPay
                  </span>
                </label>
              </div>

              {/* Dynamic details for chosen payment */}
              {paymentMethod === 'UPI' && (
                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFC8] space-y-2 text-xs">
                  <p className="font-semibold text-[#500B1A]">Enter Virtual Payment Address (VPA / UPI ID):</p>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourname@upi"
                    className="w-full px-3 py-2 bg-white rounded-lg border border-[#E8DFC8] focus:outline-none font-mono"
                  />
                  <p className="text-[11px] text-gray-500">
                    A payment request will be sent to your UPI app once you tap Place Order.
                  </p>
                </div>
              )}

              {paymentMethod === 'Card' && (
                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFC8] space-y-3 text-xs">
                  <div>
                    <label className="block text-gray-600 mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4111 2222 3333 4444"
                      className="w-full px-3 py-2 bg-white rounded-lg border border-[#E8DFC8] font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-600 mb-1">Expiry Date (MM/YY)</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="12/28"
                        className="w-full px-3 py-2 bg-white rounded-lg border border-[#E8DFC8] font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">CVV</label>
                      <input
                        type="password"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="•••"
                        maxLength={4}
                        className="w-full px-3 py-2 bg-white rounded-lg border border-[#E8DFC8] font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'COD' && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                  <span className="font-semibold flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-amber-700" />
                    Cash on Delivery Available Across India
                  </span>
                  <p className="text-[11px] text-amber-800">
                    Please keep exact cash ready upon delivery. Our logistics agent will provide a physical stamped Azhagu Mayil receipt.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-[#E8DFC8] shadow-sm space-y-4">
              <h3 className="font-serif-luxury font-bold text-lg text-[#380510] border-b border-[#F0E6D2] pb-3">
                Order Review ({cart.length} Sarees)
              </h3>

              {/* Items mini list */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex gap-3 text-xs items-center">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-14 object-cover rounded-md bg-[#FAF7F2] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#380510] truncate">{item.product.name}</p>
                      <p className="text-gray-500 text-[11px]">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-mono font-semibold text-[#500B1A]">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Calculations */}
              <div className="space-y-2 pt-3 border-t border-[#F0E6D2] text-xs text-[#422026]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Coupon ({appliedCoupon?.code})</span>
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
                <div className="flex justify-between text-base font-bold text-[#380510] pt-2 border-t border-[#F0E6D2]">
                  <span>Total Payable</span>
                  <span className="font-mono text-xl text-[#500B1A]">
                    ₹{cartGrandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#ECC875] via-[#D4AF37] to-[#B89025] hover:opacity-95 text-[#380510] font-bold text-sm uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Securing Your Order...</span>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 text-[#380510]" />
                    <span>Place Order · ₹{cartGrandTotal.toLocaleString('en-IN')}</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-[#9E782F]" />
                <span>100% Buyer Protection & Tamper-Evident Packaging</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
