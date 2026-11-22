import { useEffect } from "react";
import type { GalleryProps } from "../types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "../../../helper/ImageWithFallback";
import { galleryImages } from "../../../helper/data";

export function GallerySlider({ title, description, items, className = "" }: GalleryProps) {
// =========================
// SIMPLE GALLERY INIT
// =========================

function initSimpleGallery() {
  const galleries = document.querySelectorAll(".gallery-section");

  galleries.forEach((gallery) => {
    let currentIndex = 0;

    const modalImg = document.getElementById("lightboxImage") as HTMLImageElement;
    const gallerytitle = document.getElementById("gallerytitle") as HTMLHeadingElement;
    const gallerycategory = document.getElementById("gallerycategory") as HTMLDivElement;
    const gallerycounter = document.getElementById("gallerycounter") as HTMLDivElement;

    const thumbs = gallery.querySelectorAll(".thumb");
    const nextBtn = gallery.querySelector(".nextBtn");
    const prevBtn = gallery.querySelector(".prevBtn");

    function show(index:number) {
      thumbs.forEach((t) => t.classList.remove("galleryActive"));
      thumbs.forEach((t) => t.classList.add("galleryInActive"));
   const img = thumbs[index]?.querySelector("img");
   const src = img?.getAttribute("src") || "";
      modalImg.src = src;
      modalImg.alt = img?.getAttribute("data-title") || "Gallery item "+index + 1;
      gallerytitle.innerHTML = img?.getAttribute("data-title") ?? "";
      gallerycategory.innerHTML = img?.getAttribute("data-category") ?? "";
      gallerycounter.innerHTML =String(index + 1).padStart(2, "0") + " / "+String(thumbs.length).padStart(2, "0")

      thumbs[index]?.classList.remove("galleryInActive");
      thumbs[index]?.classList.add("galleryActive");
    }

    function next() {
      currentIndex = (currentIndex + 1) % thumbs.length;
      show(currentIndex);
    }

    function prev() {
      currentIndex = (currentIndex - 1 + thumbs.length) % thumbs.length;
      show(currentIndex);
    }

    nextBtn?.addEventListener("click", next);
    prevBtn?.addEventListener("click", prev);

    thumbs.forEach((thumb, index) => {
      thumb.addEventListener("click", () => {
        currentIndex = index;
        show(index);
      });
    });

    show(0);
  });
}

useEffect(() => {
  initSimpleGallery();
}, []);

  return (
    <section className={`py-20 bg-gray-900 text-white gallery-section section-spacing ${className}`}>
  <div className="container mx-auto px-4">

    {/* Header */}
    <div className="text-center max-w-3xl mx-auto mb-16">
      <h2 className="text-4xl md:text-6xl font-bold mb-6 scroll-animation scroll-fade-up">
        {title}
      </h2>

      {description && (
        <p className="text-xl text-gray-300 leading-relaxed scroll-animation scroll-fade-up delay-100">
          {description}
        </p>
      )}
    </div>

    {/* Main Slider */}
    <div className="relative max-w-6xl mx-auto">

      {/* Slide Wrapper */}
      <div
        className={`relative slider-animation  gallery-slider slide-enter-left`}
      >
        <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
          <ImageWithFallback
          id="lightboxImage"
          className="slide w-full h-full object-cover"    
          />
        </div>

        {/* Info Overlay */}
        <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 scroll-animation scroll-show scroll-fade-up delay-300">
          <div className="flex items-center justify-between">
            <div>
                <h3 id="gallerytitle" className="text-2xl font-bold mb-2"></h3>
                <div id="gallerycategory" className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-medium"></div>
            </div>
            <div id="gallerycounter" className="gallery-counter text-4xl font-bold text-white/50">              
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        className="prevBtn absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 w-16 h-16 bg-white rounded-full shadow-2xl flex items-center justify-center hover:bg-gray-100 transition-colors z-10"
      >
        <ChevronLeft className="w-8 h-8 text-gray-900" />
      </button>
      <button
        className="nextBtn absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 w-16 h-16 bg-white rounded-full shadow-2xl flex items-center justify-center hover:bg-gray-100 transition-colors z-10"
      >
        <ChevronRight className="w-8 h-8 text-gray-900" />
      </button>
    </div>

    {/* Thumbnail Strip */}
    <div className="gallery-thumbs mt-8 flex justify-center gap-3 overflow-x-auto pt-4 pb-4">
      {items.map((item, index) => (
        <button
          key={item.id}
          className={`thumb relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden transition-all hover:scale-110 galleryInActive`}
        >
          <ImageWithFallback
            src={item.image}
            alt={item.title || `Thumbnail ${index + 1}`}
            className="w-full h-full object-cover"
            srcSet={galleryImages[index]}   
            data-category={item.category}
            data-title={item.title}
          />
        </button>
      ))}
    </div>

  </div>
</section>

  );
}
