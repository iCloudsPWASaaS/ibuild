import { Menu, X, ChevronDown } from "lucide-react";
import { SectionButton } from "../../../components/ui/index";
import type { HeaderProps } from "../types";
import { formatWebsiteName, getSlugFromHref } from "../../../helper/function"

export function HeaderClassic({
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

  const showSubmenu = (label: string) => {
    const submenu = document.getElementById(`submenu-${label}`);
    if (submenu) submenu.classList.remove("hidden");
  };

  const hideSubmenu = (label: string) => {
    const submenu = document.getElementById(`submenu-${label}`);
    if (submenu) submenu.classList.add("hidden");
  };
  const logo = preferences?.logo;
  const brandName = preferences?.websiteName;

  return (
    <header className={`bg-white border-b border-gray-200 ${className}`}>
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center">
            <a href={exportMode ? "index.html" :"#"} className="text-2xl font-bold text-gray-900">
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
              <div
                key={index}
                className="relative"
                onMouseEnter={() => (link?.subMenu && link?.subMenu?.length != 0) && showSubmenu(link.label)}
                onMouseLeave={() => (link?.subMenu && link?.subMenu?.length != 0) && hideSubmenu(link.label)}
              >
                <a
                  href={`${link.href}`}
                className={`${(preferences?.page == getSlugFromHref(link?.href)) ? "text-gray-900" : "text-gray-700"} hover:text-gray-900 transition-colors font-medium flex items-center gap-1`}

                >
                  {link.label}
                  {(link?.subMenu && link?.subMenu?.length != 0) && <ChevronDown className="w-4 h-4" />}
                </a>

                {/* Submenu */}
                {(link?.subMenu && link?.subMenu?.length != 0) && link?.subMenu && (
                  <div
                    id={`submenu-${link.label}`}
                    className="hidden absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                  >
                    {link?.subMenu.map((subLink, subIndex) => (
                      <a
                        key={subIndex}
                        href={`${subLink.href}`}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                      >
                        {subLink.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
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
              <div key={index}>
                <a
                  href={`${link.href}`}
                  className={`${(preferences?.page == getSlugFromHref(link?.href)) ? "text-gray-900" : "text-gray-700"} block px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors`}
                >
                  {link.label}
                </a>

                {(link?.subMenu && link?.subMenu?.length != 0) && link?.subMenu && (
                  <div className="pl-4 space-y-1">
                    {link?.subMenu.map((subLink, subIndex) => (
                      <a
                        key={subIndex}
                        href={`${subLink?.href}`}
                        className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                      >
                        {subLink?.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
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