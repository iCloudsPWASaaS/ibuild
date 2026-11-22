import type { ContactProps } from "../types";

export function ContactMinimal({ title, contactInfo, className = "" , exportMode}: ContactProps) {
  return (
    <section className={`py-32 background-color section-spacing ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">

          {/* Title */}
          <h2 className="text-6xl md:text-7xl font-bold text-gray-900 mb-16 scroll-animation scroll-fade-up">
            {title}
          </h2>

          {/* Contact Info */}
          <div className="space-y-12">
            {contactInfo?.email && (
              <div className="scroll-animation scroll-fade-up delay-100">
                <p className="text-gray-600 mb-2">Email</p>
                <a href={exportMode? `mailto:${contactInfo.email}`:"#"} className="text-3xl md:text-4xl font-bold text-gray-900 hover:text-primary transition">
                  {contactInfo.email}
                </a>
              </div>
            )}

            {contactInfo?.phone && (
              <div className="scroll-animation scroll-fade-up delay-200">
                <p className="text-gray-600 mb-2">Phone</p>
                <a href={exportMode? `tel:${contactInfo.phone}`:"#"} className="text-3xl md:text-4xl font-bold text-gray-900 hover:text-primary transition">
                  {contactInfo.phone}
                </a>
              </div>
            )}

            {contactInfo?.address && (
              <div className="scroll-animation scroll-fade-up delay-300">
                <p className="text-gray-600 mb-2">Address</p>
                <p className="text-3xl md:text-4xl font-bold text-gray-900">
                  {contactInfo.address}
                </p>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200 my-16 scroll-animation scroll-fade-up delay-400" />

          {/* Response Note */}
          <p className="text-xl text-gray-600 scroll-animation scroll-fade-up delay-500">
            We typically respond within 24 hours
          </p>

        </div>
      </div>
    </section>
  );
}
