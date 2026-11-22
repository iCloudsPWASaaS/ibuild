import type { ContactProps } from "../types";
import { SectionButton } from "../../../components/ui/index";
import { Mail, Phone, MapPin } from "lucide-react";

export function ContactForm({ title, description, contactInfo, className = "", exportMode }: ContactProps) {
let grid = 0;

if (contactInfo?.email) grid++;
if (contactInfo?.phone) grid++;
if (contactInfo?.address) grid++;

  return (
     <section className={`py-20 background-color section-spacing ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">

          {/* Title & Description */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 scroll-animation scroll-fade-up">
              {title}
            </h2>
            {description && (
              <p className="text-lg text-gray-600 scroll-animation scroll-fade-up delay-100">
                {description}
              </p>
            )}
          </div>

          {/* Form */}
          <form className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg scroll-animation scroll-fade-up delay-200">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">First Name</label>
                <input type="text" placeholder="John" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-400 focus:border-gray-400 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Last Name</label>
                <input type="text" placeholder="Doe" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-400 focus:border-gray-400 outline-none transition" />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
              <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-400 focus:border-gray-400 outline-none transition" />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-2">Message</label>
              <textarea rows={6} placeholder="Your message..." className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-400 focus:border-gray-400 outline-none transition resize-none" />
            </div>

            <SectionButton variant={'web'} type="submit" className="w-full">
              Send Message
            </SectionButton>
          </form>

          {/* Contact Info */}
          {contactInfo && (
            <div className={`mt-12 grid md:grid-cols-${grid} gap-6`}>
              {contactInfo.email && (
                <div className="text-center scroll-animation scroll-fade-up delay-300">
                  <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Email</p>
                  <a href={exportMode ? `mailto:${contactInfo.email}` : '#'} className="font-semibold text-gray-900 hover:text-primary">{contactInfo.email}</a>
                </div>
              )}
              {contactInfo.phone && (
                <div className="text-center scroll-animation scroll-fade-up delay-400">
                  <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Phone</p>
                  <a href={exportMode ? `tel:${contactInfo.phone}` : '#'} className="font-semibold text-gray-900 hover:text-primary">{contactInfo.phone}</a>
                </div>
              )}
              {contactInfo.address && (
                <div className="text-center scroll-animation scroll-fade-up delay-500">
                  <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Address</p>
                  <p className="font-semibold text-gray-900">{contactInfo.address}</p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
