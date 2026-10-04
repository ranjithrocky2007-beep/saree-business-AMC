import React, { useState } from 'react';
import { Mail, CheckCircle, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NewsletterSection: React.FC = () => {
  const { addToast } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address', 'warning');
      return;
    }
    setSubscribed(true);
    addToast('Thank you! You are now subscribed to Azhagu Mayil updates.', 'success');
    setEmail('');
  };

  return (
    <section className="py-16 bg-[#500B1A] text-[#FAF7F2] relative overflow-hidden border-t border-[#D4AF37]/40">
      {/* Decorative gold background motifs */}
      <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-[#3C133A]/40 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-[#D4AF37]/30 text-xs font-semibold text-[#F3E5AB] tracking-widest uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Exclusive VIP Circle</span>
        </div>

        <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#FAF7F2]">
          Stay Updated
        </h2>

        <p className="mt-3 text-sm sm:text-base text-[#F5EFE6]/90 max-w-xl mx-auto font-light leading-relaxed">
          Subscribe to receive new collection updates, exclusive offers and festive specials.
        </p>

        {subscribed ? (
          <div className="mt-8 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-900/60 border border-emerald-500/50 text-[#F3E5AB] text-sm animate-in fade-in">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span>Welcome! We have sent a ₹500 welcome voucher to your inbox.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row items-center gap-2"
          >
            <div className="relative w-full">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-[#D4AF37]/40 text-[#FAF7F2] placeholder-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:bg-white/20 transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#ECC875] via-[#D4AF37] to-[#B89025] hover:opacity-95 text-[#380510] font-bold text-sm tracking-wide shadow-md transition-all whitespace-nowrap cursor-pointer active:scale-95"
            >
              Subscribe
            </button>
          </form>
        )}

        <p className="mt-3 text-[11px] text-[#F5EFE6]/60">
          We respect your privacy. Unsubscribe at any time with one click.
        </p>
      </div>
    </section>
  );
};
