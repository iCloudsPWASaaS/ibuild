import { Menu, X } from "lucide-react";
import { SectionButton } from "../../../components/ui/index";
import type { HeaderProps } from "../types";
import { formatWebsiteName, getSlugFromHref } from "../../../helper/function"

export function HeaderSplit({
  preferences,
  links,
  ctaText,
  ctaHref,
  className = "",
  exportMode
}: HeaderProps) {

  const midPoint = Math.ceil(links.length / 2);
  const leftLinks = links.slice(0, midPoint);
  const rightLinks = links.slice(midPoint);

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
    <header className={`bg-white border-b border-gray-200 ${className}`}>
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">

          {/* Left Navigation */}
          <div className="hidden lg:flex items-center space-x-8 flex-1">
            {leftLinks.map((link, index) => (
              <a
                key={index}
                href={`${link.href}`}
                className={`${(preferences?.page == getSlugFromHref(link?.href)) ? "text-gray-900" : "text-gray-700"} hover:text-gray-900 transition-colors font-medium`}

              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Center Logo */}
          <div className="flex items-center justify-center px-8">
            <a
              href={exportMode ? "index.html" :"#"}
              className="text-3xl font-bold text-gray-900 whitespace-nowrap"
            >
                       {logo ? (
          <img src={logo} className="max-h-16 mx-auto" />
        ) : (
          <h1 className="text-3xl font-bold" data-field="data-site-name">{formatWebsiteName(brandName)}</h1>
        )}
            </a>
          </div>

          {/* Right Navigation + CTA */}
          <div className="hidden lg:flex items-center space-x-8 flex-1 justify-end">
            {rightLinks.map((link, index) => (
              <a
                key={index}
                href={`${link.href}`}
                className={`${(preferences?.page == getSlugFromHref(link?.href)) ? "text-gray-900" : "text-gray-700"} hover:text-gray-900 transition-colors font-medium`}

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

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-gray-700 hover:text-gray-900"
          >
            <Menu id="menuIcon" className="w-6 h-6" />
            <X id="closeIcon" className="w-6 h-6 hidden" />
          </button>

        </div>

        {/* Mobile Menu */}
        <div id="mobileMenu" className="hidden lg:hidden overflow-hidden">
          <div className="py-4 space-y-2">
            {links.map((link, index) => (
              <a
                key={index}
                href={`${link.href}`}
                onClick={toggleMobileMenu}
                className={`${(preferences?.page == getSlugFromHref(link?.href)) ? "text-gray-900" : "text-gray-700"} block px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors`}
              >
                {link.label}
              </a>
            ))}

            {ctaText && (
              <div className="px-4 pt-4">
                <SectionButton
                  href={`${ctaHref}`}
                  variant={"default"}
                >
                  {ctaText}
                </SectionButton>
              </div>
            )}
          </div>
        </div>

      </nav>
    </header>
  );
}