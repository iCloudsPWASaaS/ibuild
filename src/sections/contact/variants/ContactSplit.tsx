import type { ContactProps } from "../types";
import { SectionButton } from "../../../components/ui/index";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function ContactSplit({ title, description, contactInfo, socialLinks, className = "",exportMode }: ContactProps) {
  return (
        <section className={`py-20 bg-gradient-extra-light section-spacing ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

          {/* Left: Contact Info */}
          <div className="scroll-animation scroll-slide-left delay-600">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {title}
            </h2>
            {description && (
              <p className="text-lg text-gray-600 mb-8  delay-100">
                {description}
              </p>
            )}

            {contactInfo && (
              <div className="space-y-6 mb-8">
                {contactInfo.email && (
                  <div className="flex items-center gap-4   delay-200">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <a href={exportMode ? `mailto:${contactInfo.email}`:"#"} className="text-lg font-semibold text-gray-900">
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                )}
                {contactInfo.phone && (
                  <div className="flex items-center gap-4  delay-300">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <a href={exportMode ? `tel:${contactInfo.phone}` :"#"} className="text-lg font-semibold text-gray-900">
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>
                )}
                {contactInfo.address && (
                  <div className="flex items-center gap-4  delay-400">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="text-lg font-semibold text-gray-900">{contactInfo.address}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {socialLinks && (
              <div className="scroll-animation  delay-500">
                <p className="text-sm font-semibold text-gray-600 mb-4">Follow Us</p>
                <div className="flex gap-3">
                  {socialLinks.facebook && (
                    <a href={exportMode ? socialLinks.facebook : "#"} className="w-10 h-10 bg-white-200 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition">
                      <Facebook className="w-5 h-5" />
                    </a>
                  )}
                  {socialLinks.twitter && (
                    <a href={exportMode ? socialLinks.twitter : "#"} className="w-10 h-10 bg-white-200 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition">
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                  {socialLinks.instagram && (
                    <a href={exportMode ? socialLinks.instagram : "#"} className="w-10 h-10 bg-white-200 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition">
                      <Instagram className="w-5 h-5" />
                    </a>
                  )}
                  {socialLinks.linkedin && (
                    <a href={exportMode ? socialLinks.linkedin : "#"} className="w-10 h-10 bg-white-200 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right: Form */}
          <form className="bg-white rounded-2xl p-8 shadow-xl scroll-animation scroll-slide-right delay-600">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-2">Name</label>
              <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="Your name" />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
              <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="your@email.com" />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-2">Message</label>
              <textarea rows={5} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none" placeholder="Your message..." />
            </div>
            <SectionButton type="submit" className="w-full" variant={'web'}>
              Send Message
            </SectionButton>
          </form>

        </div>
      </div>
    </section>
  );
}
