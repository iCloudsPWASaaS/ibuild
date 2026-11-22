import type { FooterProps } from "../types";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { formatWebsiteName } from "../../../helper/function"

export function FooterClassic({ preferences, description, links, socialLinks, copyright, className = "", exportMode }: FooterProps) {
     const logo = preferences ? preferences?.logo : "";
     const brandName = preferences ? preferences?.websiteName : "";
  return (
    <footer className={`bg-gray-900 text-white ${className}`}>
      <div className="container mx-auto px-4 section-spacing">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="text-2xl font-bold mb-4">       
                {logo ? (
              <img src={logo} className="h-12" />
            ) : (
              <h1 className="text-3xl font-bold">{formatWebsiteName(brandName)}</h1>
            )}</div>
            {description && <p className="text-gray-200 mb-6 leading-relaxed">{description}</p>}

            {/* Social Links */}
            {socialLinks && (
              <div className="flex gap-3">
                {socialLinks.facebook && (
                  <a href={exportMode ? socialLinks.facebook : "#"} className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-500 transition">
                    <Facebook className="w-5 h-5" />
                  </a>
                )}
                {socialLinks.twitter && (
                  <a href={exportMode ? socialLinks.twitter : "#"} className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition">
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
                {socialLinks.instagram && (
                  <a href={exportMode ? socialLinks.instagram : "#"} className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-600 transition">
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
                {socialLinks.linkedin && (
                  <a href={exportMode ? socialLinks.linkedin : "#"} className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-700 transition">
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Link Columns */}
          {links.map((column, index) => (
            <div key={index}>
              <h4 className="font-bold mb-4">{column.title}</h4>
              <ul className="space-y-2">
                {column.items.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                    href={`${link.href}`}
                     className="text-gray-200 hover:text-white transition">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
         {links.length <= 2 &&  <div>
              <h4 className="font-bold mb-4">+1 (555) 123-4567</h4>
              <ul className="space-y-2">
                  <li>
                    <a href={`#`} className="text-gray-200 hover:text-white transition">
                      123 Corporate Blvd, Suite 200, Business City, BC 12345
                    </a>
                  </li>
              </ul>
            </div>}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 text-center text-gray-200">
          <p>{copyright || `© ${new Date().getFullYear()} ${brandName}. All rights reserved.`}</p>
        </div>
      </div>
    </footer>
  );
}
