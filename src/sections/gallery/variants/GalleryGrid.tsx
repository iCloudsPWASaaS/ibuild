
import { useEffect } from "react";
import type { GalleryProps } from "../types";
import { ZoomIn } from "lucide-react";
import { ImageWithFallback } from "../../../helper/ImageWithFallback";
import { galleryImages } from "../../../helper/data";

export function GalleryGrid({ title, description, items, className = "" }: GalleryProps) {

  function initSimpleGallery() {
     const modal = document.getElementById("lightboxModal") as HTMLDivElement;
    const modalImg = document.getElementById("lightboxImage") as HTMLImageElement;
    const galleryItems = document.querySelectorAll(".gallery-item");

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

    modal?.querySelector("div")?.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }
useEffect(() => {
  initSimpleGallery();
  }, []);


  return (
    <section className={`py-20 background-color section-spacing ${className}`}>
  <div className="container mx-auto px-4">
    
    {/* Header */}
    <div className="text-center max-w-3xl mx-auto mb-16">
      
      <div className="inline-block mb-4 px-4 py-2 bg-primary-light text-primary rounded-full text-sm font-semibold scroll-animation scroll-fade-up">
        Gallery
      </div>

      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 scroll-animation scroll-fade-up delay-100">
        {title}
      </h2>

      {description && (
        <p className="text-lg text-gray-600 leading-relaxed scroll-animation scroll-fade-up delay-200">
          {description}
        </p>
      )}
    </div>

    {/* Gallery Grid */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item, index) => (
        <div
          key={item.id}
          style={{ animationDelay: `${index * 0.05}s` }}
          className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer scroll-animation scroll-fade-scale gallery-item"
        
        >
          <ImageWithFallback
            src={item.image}
            alt={item.title || `Gallery item ${index + 1}`}
            className="w-full h-full object-cover"
            srcSet={galleryImages[index]}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              {item.title && (
                <h3 className="text-white font-bold mb-1">{item.title}</h3>
              )}
              {item.category && (
                <p className="text-white/80 text-sm">{item.category}</p>
              )}
            </div>

            {/* Zoom Icon */}
            <div className="absolute top-4 right-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <ZoomIn className="w-5 h-5 text-gray-900" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Lightbox Modal */}
      <div
       id="lightboxModal"
        className="hidden fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 lightbox-overlay"
      >
        <div
          className="max-w-5xl w-full lightbox-content"
        >
          <ImageWithFallback
            id="lightboxImage"
            alt="Gallery preview"
            className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
          />
        </div>
      </div>
  </div>
</section>

  );

}
