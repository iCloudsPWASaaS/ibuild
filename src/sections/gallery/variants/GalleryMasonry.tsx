import { useEffect } from "react";
import type { GalleryProps } from "../types";
import { ZoomIn } from "lucide-react";
import { ImageWithFallback } from "../../../helper/ImageWithFallback";
import { galleryImages } from "../../../helper/data";

export function GalleryMasonry({ title, description, items, className = "" }: GalleryProps) {

  function initSimpleGallery() {
     const closemodal = document.getElementById("closemodal");
    const modal = document.getElementById("lightboxModal") as HTMLDivElement;
    const modalImg = document.getElementById("lightboxImage") as HTMLImageElement;
    const galleryItems = document.querySelectorAll(".gallery-item-mas");

    function handleClick(item:any) {
      const img = item.querySelector("img");
      const src = img?.getAttribute("src") || "";
      modalImg.src = src;
        modalImg.setAttribute("srcSet", src);
      modal.classList.remove("hidden");
    }

    galleryItems.forEach((item) => {
      item.addEventListener("click", () => handleClick(item));
    });

    // close modal
    modal?.addEventListener("click", () => {
      modal.classList.add("hidden");
      modalImg.src = "";
    });
  closemodal?.addEventListener("click", () => {
      modal.classList.add("hidden");
      modalImg.src = "";
    });
    modal?.querySelector("div")?.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }
useEffect(() => {
  initSimpleGallery();
  }, []);

  return (
    <section className={`py-20 bg-gradient-to-br from-pink-50 to-purple-50 section-spacing ${className}`}>
  <div className="container mx-auto px-4">

    {/* Header */}
    <div className="text-center max-w-3xl mx-auto mb-16">
      <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 scroll-animation scroll-fade-up">
        {title}
      </h2>

      {description && (
        <p className="text-xl text-gray-600 leading-relaxed scroll-animation scroll-fade-up delay-100">
          {description}
        </p>
      )}
    </div>

    {/* Masonry Gallery */}
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`gallery-item-mas relative rounded-xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-shadow scroll-animation scroll-fade-up delay-${Math.min(
            (index + 1) * 100,
            1000
          )} hover:scale-[1.02] transition-transform duration-300`}
        >
          <ImageWithFallback
            src={item.image}
            alt={item.title || `Gallery item ${index + 1}`}
            className="w-full h-full object-cover"
            srcSet={galleryImages[index]}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              {item.title && (
                <h3 className="text-white font-bold text-lg mb-2">
                  {item.title}
                </h3>
              )}

              {item.category && (
                <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium w-fit">
                  {item.category}
                </div>
              )}
            </div>

            {/* Zoom Icon */}
            <div className="absolute top-4 right-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <ZoomIn className="w-6 h-6 text-gray-900" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Lightbox Modal */}

      <div
       id="lightboxModal"
        className="hidden fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 scroll-animation scroll-show scroll-fade"
      >
        <button
        id="closemodal"
          className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <span className="text-2xl text-gray-900">×</span>
        </button>

        <div
          className="max-w-6xl w-full scroll-animation scroll-show scroll-fade-scale"
        >
          <ImageWithFallback
            id="lightboxImage"
            alt="Gallery preview"
            className="w-full h-auto max-h-[90vh] object-contain rounded-lg shadow-2xl"

          />
        </div>
      </div>

  </div>
</section>

  );
}
