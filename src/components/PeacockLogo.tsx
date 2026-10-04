import React from 'react';

interface PeacockLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'gold' | 'light' | 'dark';
}

export const PeacockLogo: React.FC<PeacockLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'gold',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl md:text-3xl',
  };

  const subSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs',
  };

  const textColor =
    variant === 'light'
      ? 'text-white'
      : variant === 'dark'
      ? 'text-[#380510]'
      : 'text-[#500B1A]';

  const subTextColor =
    variant === 'light'
      ? 'text-[#F3E5AB]'
      : 'text-[#9E782F]';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Peacock Emblem SVG */}
      <div
        className={`${iconSizes[size]} shrink-0 rounded-full flex items-center justify-center p-1.5 shadow-sm border ${
          variant === 'light'
            ? 'bg-[#500B1A] border-[#D4AF37]/50 text-[#F3E5AB]'
            : 'bg-gradient-to-br from-[#FAF7F2] to-[#F5EFE6] border-[#D4AF37]/60 text-[#9E782F]'
        }`}
      >
        <svg
          viewBox="0 0 64 64"
          fill="currentColor"
          className="w-full h-full drop-shadow-sm"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stylized peacock crest and feather fan */}
          <path
            d="M32 6C30.5 14 26 21 21 25C27 24 33 21 37 15C39 21 44 24 50 25C45 20 40 13 38 6C36 10 34 10 32 6Z"
            fill="#D4AF37"
          />
          <circle cx="32" cy="18" r="3" fill="#6B1124" />
          <circle cx="23" cy="20" r="2.5" fill="#3C133A" />
          <circle cx="41" cy="20" r="2.5" fill="#3C133A" />
          {/* Graceful peacock body & neck */}
          <path
            d="M32 20C29 20 27 22.5 27 25.5C27 28 29 29.5 30 32C31 34.5 28 37 25 39C23 40.5 21 43 21 47C21 53 26 58 32 58C38 58 43 53 43 47C43 43 41 40.5 39 39C36 37 33 34.5 34 32C35 29.5 37 28 37 25.5C37 22.5 35 20 32 20Z"
            fill="currentColor"
          />
          {/* Royal feather eyes */}
          <ellipse cx="32" cy="46" rx="4" ry="6" fill="#D4AF37" />
          <circle cx="32" cy="46" r="2" fill="#500B1A" />
          <path
            d="M26 49C24 47 23 44 24 41C26 42 27 45 28 48C27 48.5 26.5 48.8 26 49Z"
            fill="#D4AF37"
          />
          <path
            d="M38 49C40 47 41 44 40 41C38 42 37 45 36 48C37 48.5 37.5 48.8 38 49Z"
            fill="#D4AF37"
          />
        </svg>
      </div>

      {/* Brand Name Typography */}
      <div className="flex flex-col">
        <span
          className={`font-display font-bold tracking-wider uppercase leading-none ${titleSizes[size]} ${textColor}`}
        >
          Azhagu Mayil
        </span>
        <span
          className={`font-serif-luxury tracking-[0.22em] uppercase font-semibold ${subSizes[size]} ${subTextColor} mt-0.5`}
        >
          Collection · Chennai
        </span>
      </div>
    </div>
  );
};
