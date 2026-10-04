import React, { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle, X } from 'lucide-react';

export const FloatingWidgets: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      'Namaste! I would like to inquire about silk sarees from Azhagu Mayil Collection.'
    );
    window.open(`Follow this link to join my WhatsApp group: https://chat.whatsapp.com/FqpD4mHf9YhB8ZEgfaDlsA?s=sh&p=a&mlu=4&ilr=4=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* WhatsApp Help Button & Tooltip */}
      <div className="relative flex items-center pointer-events-auto">
        {showTooltip && (
          <div className="hidden sm:flex items-center gap-2 bg-[#250711] text-[#F3E5AB] text-xs py-1.5 px-3 rounded-xl shadow-xl border border-[#D4AF37]/50 mr-3 animate-in fade-in duration-300">
            <span>Need Saree Advice? Chat with us</span>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-[#FAF7F2]/60 hover:text-white"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={handleWhatsApp}
          className="w-13 h-13 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer border-2 border-white"
          title="Direct WhatsApp with our Saree Specialist"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-7 h-7" />
        </button>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="pointer-events-auto w-11 h-11 rounded-full bg-[#500B1A] hover:bg-[#3C133A] text-[#F3E5AB] border border-[#D4AF37] shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer animate-in fade-in zoom-in-75"
          title="Back to Top"
          aria-label="Back to Top"
        >
          <ArrowUp className="w-5 h-5 text-[#F3E5AB]" />
        </button>
      )}
    </div>
  );
};
