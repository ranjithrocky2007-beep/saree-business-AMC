import React from 'react';
import { Award, Sparkles, ShieldCheck, Truck } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'Carefully selected fabrics and craftsmanship with pure mulberry silk and certified zari.',
    },
    {
      icon: Sparkles,
      title: 'Authentic Collections',
      description: 'Traditional sarees with modern elegance directly from generational master handloom weavers.',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Shopping',
      description: 'Safe and secure online shopping experience with UPI, Net Banking, and Cash on Delivery.',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Reliable and insured express delivery across all pin codes in India with live tracking.',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9E782F] mb-1 font-serif-luxury">
            The Azhagu Mayil Promise
          </p>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#380510]">
            Why Choose Us
          </h2>
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-[#D4AF37]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <span className="h-px w-8 bg-[#D4AF37]" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl border border-[#E8DFC8] hover:border-[#D4AF37]/80 hover:shadow-md transition-all duration-300 text-center flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#D4AF37]/50 text-[#500B1A] flex items-center justify-center mb-4 shadow-xs">
                  <Icon className="w-6 h-6 text-[#9E782F]" />
                </div>
                <h3 className="font-serif-luxury font-bold text-lg text-[#380510] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-[#5C3D42] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
