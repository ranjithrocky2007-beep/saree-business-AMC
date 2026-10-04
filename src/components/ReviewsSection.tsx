import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { INITIAL_REVIEWS } from '../data/products';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9E782F] mb-1 font-serif-luxury">
            Cherished Experiences
          </p>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#380510]">
            Customer Reviews
          </h2>
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-[#D4AF37]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <span className="h-px w-8 bg-[#D4AF37]" />
          </div>
          <p className="mt-3 text-sm text-[#5C3D42]">
            Over 5,000+ graceful women across India and worldwide celebrate their special days with Azhagu Mayil.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INITIAL_REVIEWS.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="bg-white p-7 rounded-xl border border-[#E8DFC8] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Rating stars & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#E8DFC8] stroke-1" />
                </div>

                <p className="text-sm text-[#380510] italic leading-relaxed">
                  "{review.comment}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#F0E6D2]">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif-luxury font-bold text-base text-[#380510]">
                      — {review.name.split(' ')[0]}
                    </h4>
                    <p className="text-[11px] text-[#7A5B61]">
                      {review.location}
                    </p>
                  </div>
                  {review.verified && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <CheckCircle className="w-3 h-3" />
                      Verified Buyer
                    </span>
                  )}
                </div>
                {review.sareePurchased && (
                  <p className="mt-2 text-[10px] text-[#9E782F] font-medium tracking-wide uppercase">
                    Purchased: {review.sareePurchased}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
