import { Menu, X } from "lucide-react";
import { SectionButton } from "../../../components/ui/index";
import type { HeaderProps } from "../types";
import { formatWebsiteName, getSlugFromHref } from "../../../helper/function"
export function HeaderCentered({
  preferences,
  links,
  ctaText,
  ctaHref,
  className = "",
  exportMode
}: HeaderProps) {

  const toggleMenu = () => {
    const menu = document.getElementById("mobileMenu");
    const menuIcon = document.getElementById("menuIcon");
    const closeIcon = document.getElementById("closeIcon");

    if (menu && menuIcon && closeIcon) {
      menu.classList.toggle("hidden");
      menuIcon.classList.toggle("hidden");
      closeIcon.classList.toggle("hidden");
    }
  };
  const logo = preferences ? preferences?.logo : "";
  const brandName = preferences?.websiteName;
  return (
    <header className={`bg-white border-b border-gray-200 ${className}`}>
      <nav className="container mx-auto px-4">
        
        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="text-center py-4 border-b border-gray-100">
            <div>
              <a href={exportMode ? "index.html" :"#"} className="text-3xl font-bold text-gray-900 inline-block">
                 {logo ? (
          <img src={logo} className="max-h-16 mx-auto" />
        ) : (
          <h1 className="text-3xl font-bold">{formatWebsiteName(brandName)}</h1>
        )}
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center h-16 space-x-8">
            {links.map((link, index) => (
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
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="text-2xl font-bold text-gray-900">
             {logo ? (
          <img src={logo} className="max-h-16 mx-auto" />
        ) : (
          <h1 className="text-3xl font-bold" data-field="data-site-name">{formatWebsiteName(brandName)}</h1>
        )}
            </a>

           
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-700 hover:text-gray-900"
            >
              <Menu id="menuIcon" className="w-6 h-6" />
              <X id="closeIcon" className="w-6 h-6 hidden" />
            </button>
          </div>

          
          <div id="mobileMenu" className="hidden overflow-hidden">
            <div className="py-4 space-y-2">
              {links.map((link, index) => (
                <a
                  key={index}
                   href={`${link.href}`}
                  onClick={toggleMenu}
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

        </div>
      </nav>
    </header>
  );
}