import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  HelpCircle,
  ChevronDown,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ContactPage: React.FC = () => {
  const { addToast } = useApp();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Bridal Saree Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      addToast('Please fill all mandatory fields', 'warning');
      return;
    }
    setSubmitted(true);
    addToast('Your message has been sent to our boutique stylists!', 'success');
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/919840123456', '_blank');
  };

  const faqs = [
    {
      q: 'How do I care for my pure Kanchipuram and Banarasi silk sarees?',
      a: 'Always dry-clean your pure silk sarees. Avoid spraying deodorants or perfumes directly onto the zari. Store your saree wrapped in a soft, breathable pure cotton or muslin bag, and refold periodically along alternate creases to avoid permanent fabric breaks.',
    },
    {
      q: 'Do your sarees come with unstitched blouse pieces?',
      a: 'Yes! All sarees at Azhagu Mayil Collection include a matching 0.8m to 0.9m unstitched pure silk or brocade blouse piece with woven zari borders that your tailor can easily customize to your measurements.',
    },
    {
      q: 'What is the delivery time within India and internationally?',
      a: 'Domestic metro deliveries across Chennai, Bengaluru, Mumbai, Hyderabad, and Delhi take 2-4 business days. Other pin codes take 4-6 business days. Express international air courier to USA, UK, Singapore, and UAE takes 5-7 business days.',
    },
    {
      q: 'What is your return and exchange policy?',
      a: 'We offer a 7-day hassle-free exchange policy from the date of delivery. Saree must be in its original folded condition with tags and blouse fabric intact.',
    },
    {
      q: 'Can I book a personalized video call to view sarees before ordering?',
      a: 'Absolutely! You can message us directly on WhatsApp (+91 98401 23456) to schedule an exclusive virtual showcase with our senior drape consultants.',
    },
  ];

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9E782F] mb-1 font-serif-luxury">
            We Are Here To Assist You
          </p>
          <h1 className="font-serif-luxury font-bold text-3xl sm:text-4xl text-[#380510]">
            Contact Azhagu Mayil
          </h1>
          <p className="mt-2 text-sm text-[#5C3D42]">
            Connect with our Chennai boutique curators for custom bridal trousseau, sizing, or general inquiries.
          </p>
        </div>

        {/* Contact Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Info Card (2 cols) */}
          <div className="lg:col-span-2 bg-[#500B1A] text-[#FAF7F2] p-8 rounded-3xl border border-[#D4AF37] shadow-xl space-y-6">
            <h2 className="font-serif-luxury font-bold text-2xl text-[#F3E5AB]">
              Flagship Boutique
            </h2>
            <p className="text-xs text-[#FAF7F2]/80 leading-relaxed">
              Step into our sanctuary of silk in the heart of Chennai’s textile district, or connect with our master stylists remotely.
            </p>

            <div className="space-y-4 text-xs text-[#F5EFE6]/90 pt-2 border-t border-[#D4AF37]/30">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#FAF7F2] font-serif-luxury text-sm">Chennai Boutique:</strong>
                  <span>No. 48, Panagal Park Commercial Square, T. Nagar, Chennai - 600017, Tamil Nadu, India</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <div>
                  <strong className="block text-[#FAF7F2] font-serif-luxury text-sm">Direct Phone:</strong>
                  <span>+91 98401 23456 / +91 44 2434 5678</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <div>
                  <strong className="block text-[#FAF7F2] font-serif-luxury text-sm">Email Inquiries:</strong>
                  <span>care@azhagumayil.com</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <div>
                  <strong className="block text-[#FAF7F2] font-serif-luxury text-sm">Store Hours:</strong>
                  <span>Monday – Sunday: 10:00 AM – 9:00 PM IST</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#D4AF37]/30">
              <button
                type="button"
                onClick={handleWhatsApp}
                className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp (+91 98401 23456)</span>
              </button>
            </div>
          </div>

          {/* Form (3 cols) */}
          <div className="lg:col-span-3 bg-white p-6 sm:p-8 rounded-3xl border border-[#E8DFC8] shadow-xs">
            <h2 className="font-serif-luxury font-bold text-2xl text-[#380510] mb-2">
              Send Us a Message
            </h2>
            <p className="text-xs text-[#5C3D42] mb-6">
              Fill in your inquiry details and our saree specialists will respond within 4 business hours.
            </p>

            {submitted ? (
              <div className="p-8 text-center space-y-3 bg-[#FAF7F2] rounded-2xl border border-emerald-300">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-serif-luxury font-bold text-xl text-[#380510]">
                  Message Received
                </h3>
                <p className="text-xs text-gray-600 max-w-sm mx-auto">
                  Thank you, {form.name}. Our head textile stylist has received your note and will contact you via WhatsApp or Email promptly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs font-semibold text-[#500B1A] underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Kavya Ramanathan"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E8DFC8] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98401 23456"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E8DFC8] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="kavya@example.com"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E8DFC8] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Inquiry Category
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E8DFC8] focus:outline-none focus:border-[#D4AF37] bg-white cursor-pointer"
                    >
                      <option value="Bridal Saree Inquiry">Bridal Saree Inquiry</option>
                      <option value="Custom Blouse Tailoring">Custom Blouse Tailoring</option>
                      <option value="Bulk Wedding Order">Bulk Wedding Order</option>
                      <option value="Order Tracking & Delivery">Order Tracking & Delivery</option>
                      <option value="International Shipment">International Shipment</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Your Message / Specific Requirements <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about the occasion, color preferences, or specific zari motifs you are looking for..."
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E8DFC8] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <button
                  type="submit"
                  className="py-3.5 px-6 rounded-xl bg-[#500B1A] hover:bg-[#3C133A] text-[#F3E5AB] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm hover:shadow"
                >
                  <Send className="w-4 h-4 text-[#D4AF37]" />
                  <span>Send Message to Azhagu Mayil</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="pt-8">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="font-serif-luxury font-bold text-2xl sm:text-3xl text-[#380510]">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-[#5C3D42] mt-1">
              Common questions on pure silk care, authenticity, and shipping.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-[#E8DFC8] overflow-hidden shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 font-serif-luxury font-semibold text-sm text-[#380510] hover:text-[#500B1A] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#D4AF37] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-[#5C3D42] leading-relaxed border-t border-[#F0E6D2] pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
