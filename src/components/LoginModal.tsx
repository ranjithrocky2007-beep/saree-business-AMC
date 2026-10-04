import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LoginModal: React.FC = () => {
  const { isAuthOpen, setIsAuthOpen, login, setCurrentView } = useApp();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  if (!isAuthOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    login(email, name || 'Priya Raman', 'customer');
    setIsAuthOpen(false);
  };

  const handleQuickCustomer = () => {
    login('priya.saree@example.com', 'Priya Sundaram', 'customer');
    setIsAuthOpen(false);
  };

  const handleQuickAdmin = () => {
    login('admin@azhagumayil.com', 'Azhagu Mayil Admin', 'admin');
    setIsAuthOpen(false);
    setCurrentView('admin');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsAuthOpen(false)}
      />

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#D4AF37]/50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="bg-[#500B1A] text-[#FAF7F2] p-6 text-center relative border-b border-[#D4AF37]/40">
          <button
            type="button"
            onClick={() => setIsAuthOpen(false)}
            className="absolute top-4 right-4 p-1 rounded-full text-[#F3E5AB] hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 mx-auto rounded-full bg-[#3C0813] border border-[#D4AF37]/60 flex items-center justify-center mb-3">
            <Sparkles className="w-6 h-6 text-[#D4AF37]" />
          </div>
          <h3 className="font-serif-luxury text-2xl font-bold text-[#F3E5AB]">
            Azhagu Mayil Account
          </h3>
          <p className="mt-1 text-xs text-[#FAF7F2]/80">
            {isRegister
              ? 'Join our circle of handcrafted silk connoisseurs'
              : 'Sign in to access your orders & saved sarees'}
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-[#E8DFC8] bg-[#FAF7F2]">
          <button
            type="button"
            onClick={() => setIsRegister(false)}
            className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider transition-colors ${
              !isRegister
                ? 'text-[#500B1A] border-b-2 border-[#500B1A] bg-white'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsRegister(true)}
            className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider transition-colors ${
              isRegister
                ? 'text-[#500B1A] border-b-2 border-[#500B1A] bg-white'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            New Customer Register
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {isRegister && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sowmya Raghavan"
                    className="w-full pl-10 pr-3 py-2.5 text-xs rounded-xl border border-[#E8DFC8] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-3 py-2.5 text-xs rounded-xl border border-[#E8DFC8] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            {isRegister && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Phone Number (for order delivery SMS)
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98402 12345"
                    className="w-full pl-10 pr-3 py-2.5 text-xs rounded-xl border border-[#E8DFC8] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3 py-2.5 text-xs rounded-xl border border-[#E8DFC8] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 rounded-xl bg-[#500B1A] hover:bg-[#3C133A] text-[#F3E5AB] font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              {isRegister ? 'Create My Account' : 'Sign In To Azhagu Mayil'}
            </button>
          </form>

          {/* Quick Demo Access Helpers */}
          <div className="mt-6 pt-5 border-t border-[#F0E6D2]">
            <p className="text-[11px] font-semibold uppercase text-gray-500 text-center mb-2.5 tracking-wider">
              Quick One-Click Demo Access
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleQuickCustomer}
                className="py-2 px-2.5 rounded-lg bg-[#FAF7F2] hover:bg-[#F5EFE6] border border-[#E8DFC8] text-[11px] font-semibold text-[#500B1A] flex items-center justify-center gap-1.5 transition-colors"
              >
                <UserIcon className="w-3.5 h-3.5 text-[#9E782F]" />
                <span>Demo Customer</span>
              </button>

              <button
                type="button"
                onClick={handleQuickAdmin}
                className="py-2 px-2.5 rounded-lg bg-[#500B1A]/10 hover:bg-[#500B1A]/20 border border-[#D4AF37]/50 text-[11px] font-bold text-[#500B1A] flex items-center justify-center gap-1.5 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Demo Admin</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
