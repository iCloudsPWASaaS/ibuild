import type { FooterProps } from "../types";
import { Facebook, Twitter, Instagram, Linkedin} from "lucide-react";
import { formatWebsiteName } from "../../../helper/function"

export function FooterColumns({ preferences, description, links, socialLinks, copyright, className = "", exportMode }: FooterProps) {
      const logo = preferences ? preferences?.logo : "";
  const brandName = preferences?.websiteName;


  return (
<footer className={`gradient-black-full text-white ${className}`}>
  <div className="container mx-auto px-4 section-spacing">

    {/* Main Grid */}
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

      {/* Brand Column */}
      <div className="lg:col-span-1">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center justify-center">
               {logo ? (
              <img src={logo} className="h-12 mx-auto" />
            ) : (
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">{formatWebsiteName(brandName)}</h1>
            )}
          </div>
       
        </div>

        {description && (
          <p className="text-gray-200 mb-6 leading-relaxed text-sm">
            {description}
          </p>
        )}

        {/* Social Links */}
        {socialLinks && (
          <div className="flex gap-3">
            {socialLinks.facebook && (
              <a
                href={exportMode ? socialLinks.facebook : "#"}
                className="w-10 h-10 bg-gray-800/50 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-blue-500 transition border border-gray-700 hover:scale-110 hover:-translate-y-1"
              >
                <Facebook className="w-5 h-5" />
              </a>
            )}

            {socialLinks.twitter && (
              <a
                href={exportMode ? socialLinks.twitter : "#"}
                className="w-10 h-10 bg-gray-800/50 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-primary transition border border-gray-700 hover:scale-110 hover:-translate-y-1"
              >
                <Twitter className="w-5 h-5" />
              </a>
            )}

            {socialLinks.instagram && (
              <a
                href={exportMode ? socialLinks.instagram : "#"}
                className="w-10 h-10 bg-gray-800/50 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-pink-600 transition border border-gray-700 hover:scale-110 hover:-translate-y-1"
              >
                <Instagram className="w-5 h-5" />
              </a>
            )}

            {socialLinks.linkedin && (
              <a
                href={exportMode ? socialLinks.linkedin : "#"}
                className="w-10 h-10 bg-gray-800/50 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-blue-700 transition border border-gray-700 hover:scale-110 hover:-translate-y-1"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}
          </div>
        )}
      </div>

      {/* Link Columns */}
      {links?.map((column, index) => (
        <div
          key={index}
        >
          <h4 className="font-bold mb-6 text-lg">{column.title}</h4>
          <ul className="space-y-3">
            {column?.items?.map((link, linkIndex) => (
              <li key={linkIndex}>
                <a
                  href={`${link.href}`}
                  className="text-gray-200 hover:text-white transition text-sm flex items-center gap-2 group hover:translate-x-1"
                >
                  <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition" />
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

    {/* Newsletter Section */}
    <div className="py-8 border-y border-gray-800">
      <div className="max-w-2xl mx-auto text-center">
        <h4 className="text-xl font-bold mb-2">Stay Updated</h4>
        <p className="text-gray-200 mb-4 text-sm">
          Subscribe to our newsletter for the latest updates and news.
        </p>

        <div className="flex gap-2 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 
               rounded-lg text-white placeholder-gray-200 
               focus:outline-none focus:border-blue-600 transition"
          />
          <button className="w-full sm:w-auto px-6 py-3 
                     bg-gradient-primary 
                     hover:from-blue-700 hover:to-indigo-700 
                     rounded-lg font-medium transition">
            Subscribe
          </button>
        </div>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-gray-200 text-sm">
        {copyright ||
          `© ${new Date().getFullYear()} ${brandName}. All rights reserved.`}
      </p>

      <div className="flex gap-6 text-sm text-gray-200">
        <a href="#" className="hover:text-white transition">
          Privacy Policy
        </a>
        <a href="#" className="hover:text-white transition">
          Terms of Service
        </a>
        <a href="#" className="hover:text-white transition">
          Cookie Policy
        </a>
      </div>
    </div>

  </div>
</footer>
  );
}
