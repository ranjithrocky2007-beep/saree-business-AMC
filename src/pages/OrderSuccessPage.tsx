import React from 'react';
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  Calendar,
  Printer,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const OrderSuccessPage: React.FC = () => {
  const { latestOrder, orders, setCurrentView } = useApp();

  const order = latestOrder || orders[0];

  if (!order) {
    return (
      <div className="bg-[#FAF7F2] min-h-[60vh] flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-sm text-gray-500">No recent order found.</p>
          <button
            onClick={() => setCurrentView('home')}
            className="mt-4 px-4 py-2 bg-[#500B1A] text-[#F3E5AB] rounded-lg text-xs"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10 md:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Success Banner */}
        <div className="bg-white rounded-3xl border border-[#D4AF37]/50 shadow-xl overflow-hidden p-6 sm:p-10 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-500/30 flex items-center justify-center mx-auto mb-4 text-emerald-600">
            <CheckCircle2 className="w-10 h-10 stroke-2" />
          </div>

          <span className="text-xs font-semibold uppercase tracking-widest text-[#9E782F] font-serif-luxury">
            Vanakkam & Thank You!
          </span>
          <h1 className="font-serif-luxury font-bold text-3xl sm:text-4xl text-[#380510] mt-1">
            Order Confirmed
          </h1>
          <p className="mt-2 text-sm text-[#5C3D42] max-w-lg mx-auto">
            Your heirloom sarees from Azhagu Mayil Collection are being prepared for dispatch with traditional blessings and pure muslin packaging.
          </p>

          <div className="mt-6 inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFC8]">
            <span className="text-xs text-gray-500">Order Reference:</span>
            <span className="font-mono font-bold text-sm sm:text-base text-[#500B1A]">
              {order.orderId}
            </span>
          </div>

          {/* Stepper Progress */}
          <div className="mt-10 py-6 border-y border-[#F0E6D2]">
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-[#500B1A] text-[#F3E5AB] flex items-center justify-center mb-1 text-xs font-bold shadow-xs">
                  ✓
                </div>
                <span className="font-bold text-[#500B1A]">Confirmed</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#D4AF37] text-[#9E782F] flex items-center justify-center mb-1 text-xs font-bold">
                  2
                </div>
                <span className="text-gray-600">Quality Check</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#E8DFC8] text-gray-400 flex items-center justify-center mb-1 text-xs font-bold">
                  3
                </div>
                <span className="text-gray-400">Shipped</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#E8DFC8] text-gray-400 flex items-center justify-center mb-1 text-xs font-bold">
                  4
                </div>
                <span className="text-gray-400">Delivered</span>
              </div>
            </div>
          </div>

          {/* Delivery & Summary Details */}
          <div className="mt-8 text-left grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#FAF7F2] p-5 rounded-2xl border border-[#E8DFC8] text-xs">
            <div>
              <p className="font-semibold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                Delivery Address
              </p>
              <p className="font-bold text-[#380510] text-sm">{order.customer.fullName}</p>
              <p className="text-gray-600">{order.customer.address}</p>
              <p className="text-gray-600">
                {order.customer.city}, {order.customer.state} - {order.customer.pincode}
              </p>
              <p className="text-gray-600 font-mono mt-1">Phone: {order.customer.phone}</p>
            </div>

            <div>
              <p className="font-semibold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                Order Meta
              </p>
              <p className="text-gray-700">Date: <strong className="text-[#380510]">{order.date}</strong></p>
              <p className="text-gray-700">Payment: <strong className="text-[#380510]">{order.paymentMethod}</strong> ({order.paymentStatus})</p>
              <p className="text-gray-700">Estimated Delivery: <strong className="text-emerald-700">Within 3-4 Business Days</strong></p>
            </div>
          </div>

          {/* Itemized Saree List */}
          <div className="mt-6 text-left space-y-3">
            <h4 className="font-serif-luxury font-bold text-sm text-[#380510]">
              Ordered Sarees ({order.items.length})
            </h4>
            <div className="border border-[#E8DFC8] rounded-xl overflow-hidden divide-y divide-[#E8DFC8]">
              {order.items.map((item, idx) => (
                <div key={idx} className="p-3 flex items-center justify-between text-xs bg-white">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-14 object-cover rounded-md bg-[#FAF7F2]"
                    />
                    <div>
                      <p className="font-semibold text-[#380510]">{item.product.name}</p>
                      <p className="text-gray-500 text-[11px]">Qty: {item.quantity} · {item.product.category}</p>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-[#500B1A]">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            {/* Total Row */}
            <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DFC8] flex items-center justify-between font-bold text-sm">
              <span className="text-[#380510]">Total Paid / Due on Delivery:</span>
              <span className="font-mono text-base text-[#500B1A]">
                ₹{order.total.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-white border border-[#E8DFC8] hover:border-[#D4AF37] text-xs font-semibold text-[#500B1A] flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Print Tax Receipt</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setCurrentView('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto py-2.5 px-6 rounded-xl bg-[#500B1A] hover:bg-[#3C133A] text-[#F3E5AB] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <span>Explore More Sarees</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
