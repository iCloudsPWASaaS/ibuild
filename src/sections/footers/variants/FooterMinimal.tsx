import type { FooterProps } from "../types";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { formatWebsiteName } from "../../../helper/function"

export  function FooterMinimal({ preferences, links, socialLinks, copyright, className = "", exportMode }: FooterProps) {
  // Flatten all links into one array for minimal display
  const allLinks = links.flatMap(column => column.items);
    const logo = preferences ? preferences?.logo : "";
  const brandName = preferences?.websiteName;


  return (
<footer className={`background-color border-t border-gray-200 ${className}`}>
  <div className="container mx-auto px-4 section-spacing">
    
    {/* Single Row Layout */}
    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
      
      {/* Brand */}
      <div>
        <a href="#" className="text-xl font-bold text-gray-900">
     {logo ? (
              <img src={logo} className="h-12 mx-auto" />
            ) : (
              <h1 className="text-3xl font-bold">{formatWebsiteName(brandName)}</h1>
            )}
        </a>
      </div>

      {/* Links */}
      <nav className="flex flex-wrap items-center justify-center gap-6">
        {allLinks.slice(0, 6).map((link, index) => (
          <a
            key={index}
            href={`${link.href}`}
            className="text-sm text-gray-600 hover:text-gray-900 transition"
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Social Links */}
      {socialLinks && (
        <div className="flex gap-3">
          {socialLinks.facebook && (
            <a
              href={exportMode ? socialLinks.facebook : "#"}
              className="w-9 h-9 flex items-center justify-center text-gray-600 hover:text-blue-500 transition"
            >
              <Facebook className="w-5 h-5" />
            </a>
          )}

          {socialLinks.twitter && (
            <a
              href={exportMode ? socialLinks.twitter : "#"}
              className="w-9 h-9 flex items-center justify-center text-gray-600 hover:text-primary transition"
            >
              <Twitter className="w-5 h-5" />
            </a>
          )}

          {socialLinks.instagram && (
            <a
              href={exportMode ? socialLinks.instagram : "#"}
              className="w-9 h-9 flex items-center justify-center text-gray-600 hover:text-pink-600 transition"
            >
              <Instagram className="w-5 h-5" />
            </a>
          )}

          {socialLinks.linkedin && (
            <a
              href={exportMode ? socialLinks.linkedin : "#"}
              className="w-9 h-9 flex items-center justify-center text-gray-600 hover:text-blue-700 transition"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          )}
        </div>
      )}
    </div>

    {/* Divider */}
    <div className="border-t border-gray-200 my-8 " />

    {/* Bottom */}
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600 ">
      <p>
        {copyright ||
          `© ${new Date().getFullYear()} ${brandName}. All rights reserved.`}
      </p>

      <div className="flex gap-6">
        <a href="#" className="hover:text-gray-900 transition">
          Privacy
        </a>
        <a href="#" className="hover:text-gray-900 transition">
          Terms
        </a>
      </div>
    </div>

  </div>
</footer>
  );
}
