import type { HeaderProps } from "../types";
import { SectionButton } from "../../../components";
import { Menu, X } from "lucide-react";
import { formatWebsiteName, getSlugFromHref } from "../../../helper/function"

export function HeaderMinimal({
  preferences,
  links,
  ctaText,
  ctaHref,
  className = "",
  exportMode
}: HeaderProps) {

  const toggleMobileMenu = () => {
    const menu = document.getElementById("mobileMenu");
    const menuIcon = document.getElementById("menuIcon");
    const closeIcon = document.getElementById("closeIcon");

    if (menu && menuIcon && closeIcon) {
      menu.classList.toggle("hidden");
      menuIcon.classList.toggle("hidden");
      closeIcon.classList.toggle("hidden");
    }
  };
  const logo = preferences?.logo;
  const brandName = preferences?.websiteName;

  return (
    <header className={`bg-transparent ${className}`}>
      <nav className="container mx-auto px-4 py-6">

        <div className="flex items-center justify-between">

          {/* Logo */}
          <div>
            <a href={exportMode ? "index.html" :"#"} className="text-xl font-bold text-gray-900">
                      {logo ? (
          <img src={logo} className="max-h-16 mx-auto" />
        ) : (
          <h1 className="text-3xl font-bold" data-field="data-site-name">{formatWebsiteName(brandName)}</h1>
        )}
            </a>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link, index) => (
              <a
                key={index}
                href={`${link.href}`}
                className={`${(preferences?.page == getSlugFromHref(link?.href)) ? "text-gray-900" : "text-gray-600"} text-sm hover:text-gray-900 transition-colors`}

              >
                {link.label}
              </a>
            ))}

            {ctaText && (
              <SectionButton
                href={`${ctaHref}`}
                variant={"default"}
              >
                {ctaText}
              </SectionButton>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-gray-900"
            onClick={toggleMobileMenu}
          >
            <Menu id="menuIcon" size={24} />
            <X id="closeIcon" size={24} className="hidden" />
          </button>

        </div>

        {/* Mobile Menu */}
        <div id="mobileMenu" className="hidden md:hidden mt-6 flex flex-col space-y-4">
          {links.map((link, index) => (
            <a
              key={index}
              href={`${link.href}`}
              onClick={toggleMobileMenu}
              className={`${(preferences?.page == getSlugFromHref(link?.href)) ? "text-gray-900" : "text-gray-600"} text-sm hover:text-gray-900 transition-colors`}

            >
              {link.label}
            </a>
          ))}

          {ctaText && (
            <SectionButton
              href={`${ctaHref}`}
             variant={"default"}
            >
              {ctaText}
            </SectionButton>
          )}
        </div>

      </nav>
    </header>
  );
}