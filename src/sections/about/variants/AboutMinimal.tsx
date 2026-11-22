import type { AboutProps } from "../types";

export function AboutMinimal({ title, description, className = "",missionDescription,visionDescription,quote }: AboutProps) {
  return (
    
    <section className={`py-32 background-color section-spacing ${className}`}>
  <div className="container mx-auto px-4">
    <div className="max-w-4xl mx-auto">

      {/* Title */}
      <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-12 leading-tight scroll-animation scroll-fade-up delay-700">
        {title}
      </h2>

      {/* Description */}
      <div className="prose prose-lg max-w-none scroll-animation scroll-fade-up delay-800">
        <p className="text-2xl text-gray-600 leading-relaxed mb-8">
          {description}
        </p>

       {(missionDescription || visionDescription) && <div className="grid md:grid-cols-2 gap-12 mt-16">
          {missionDescription && <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">{missionDescription}</p>
          </div>}

        {visionDescription &&  <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">{visionDescription}</p>
          </div>}
        </div>}
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-200 my-16 scroll-animation animate-divider delay-800" />

      {/* Quote */}
      <blockquote className="text-3xl font-medium text-gray-700 italic border-l-4 border-gray-900 pl-6 scroll-animation scroll-fade-up delay-500">
        {quote}
      </blockquote>

    </div>
  </div>
</section>

  );
}
