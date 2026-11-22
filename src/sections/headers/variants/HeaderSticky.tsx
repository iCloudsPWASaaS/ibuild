import { Menu, X } from "lucide-react";
import { SectionButton } from "../../../components/ui/index";
import type { HeaderProps } from "../types";
import { formatWebsiteName, getSlugFromHref } from "../../../helper/function"

export function HeaderSticky({
  preferences,
  links,
  ctaText,
  ctaHref,
  className = "",
  exportMode
}: HeaderProps) {
  if (typeof window !== "undefined") {
    window.onscroll = function () {
      const header = document.getElementById("stickyHeader");
      const inner = document.getElementById("headerInner");
      const logo = document.getElementById("headerLogo");

      if (window.scrollY > 50) {
        header?.classList.add("header-sticky-scrolled");
        header?.classList.remove("header-sticky-top");

        inner?.classList.add("header-inner-scrolled");
        inner?.classList.remove("header-inner-top");

        logo?.classList.remove("text-2xl");
        logo?.classList.add("text-xl");
      } else {
        header?.classList.remove("header-sticky-scrolled");
        header?.classList.add("header-sticky-top");

        inner?.classList.remove("header-inner-scrolled");
        inner?.classList.add("header-inner-top");

        logo?.classList.remove("text-xl");
        logo?.classList.add("text-2xl");
      }
    };
  }

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
    <header
      id="stickyHeader"
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 header-sticky header-sticky-top ${className}`}
    >
      <nav className="container mx-auto px-4">
        <div
          id="headerInner"
          className="flex items-center justify-between header-inner header-inner-top"
        >

          {/* Logo */}
          <div className="flex items-center">
            <a
              id="headerLogo"
              href={exportMode ? "index.html" : "#"}
              className="font-bold transition-all text-2xl text-gray-900"
            >
                  {logo ? (
          <img src={logo} className="max-h-16 mx-auto" />
        ) : (
          <h1 className="text-3xl font-bold" data-field="data-site-name">{formatWebsiteName(brandName)}</h1>
        )}
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link, index) => (
              <a
                key={index}
                href={`${link.href}`}
                className={`${(preferences?.page == getSlugFromHref(link?.href)) ? "text-gray-900" : "text-gray-700"} hover:text-gray-900 transition-colors font-medium relative group`}
              >
                {link.label}
                <span className={`${(preferences?.page == getSlugFromHref(link?.href)) ? "w-full" : ""} absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300`} />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            {ctaText  && (
              <div>
                <SectionButton
                  variant={"default"}
                  href={`${ctaHref}`}
                >
                  {ctaText}
                </SectionButton>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-gray-700 hover:text-gray-900"
          >
            <Menu id="menuIcon" className="w-6 h-6" />
            <X id="closeIcon" className="w-6 h-6 hidden" />
          </button>

        </div>

        {/* Mobile Menu */}
        <div id="mobileMenu" className="hidden md:hidden overflow-hidden">
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

            {ctaText  && (
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