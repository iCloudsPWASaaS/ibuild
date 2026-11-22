import type { AboutProps } from "../types";

export function AboutTimeline({ label, title, description, timeline, className = "" }: AboutProps) {
  const defaultTimeline = timeline || [
    { year: "2020", title: "Founded", description: "Started with a vision to transform the industry" },
    { year: "2021", title: "Growth", description: "Expanded our team and reached 1000+ customers" },
    { year: "2022", title: "Innovation", description: "Launched groundbreaking new features" },
    { year: "2023", title: "Recognition", description: "Awarded industry leader of the year" },
    { year: "2024", title: "Global", description: "Opened offices in 10+ countries worldwide" }
  ];

  return (
 <section className={`py-20 background-color section-spacing ${className}`}>
  <div className="container mx-auto px-4">
    
    {/* Header */}
    <div className="max-w-3xl mx-auto text-center mb-16">
      <div className="inline-block mb-4 px-4 py-2 bg-primary-light text-primary rounded-full text-sm font-semibold scroll-animation scroll-fade-up">
       {label}
      </div>

      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 scroll-animation scroll-fade-up delay-100">
        {title}
      </h2>

      <p className="text-lg text-gray-600 leading-relaxed scroll-animation scroll-fade-up delay-200">
        {description}
      </p>
    </div>

    {/* Timeline */}
    <div className="max-w-5xl mx-auto relative">
      
      {/* Vertical Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-primary-light hidden md:block" />

      {/* Timeline Items */}
      <div className="space-y-12">
        {defaultTimeline.map((item, index) => {
          const isEven = index % 2 === 0;

          const delayClass =
            index === 0 ? "delay-100" :
            index === 1 ? "delay-200" :
            index === 2 ? "delay-300" :
            index === 3 ? "delay-400" :
            index === 4 ? "delay-500" :
            "delay-600";

          const dotDelayClass =
            index === 0 ? "delay-200" :
            index === 1 ? "delay-300" :
            index === 2 ? "delay-400" :
            index === 3 ? "delay-500" :
            index === 4 ? "delay-600" :
            "delay-700";

          return (
            <div
              key={index}
              className={`relative flex items-center ${
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              } flex-col md:gap-8 scroll-animation ${
                isEven ? "scroll-slide-left" : "scroll-slide-right"
              } ${delayClass}`}
            >
              {/* Content */}
              <div
                className={`md:w-1/2 ${
                  isEven ? "md:text-right md:pr-8" : "md:text-left md:pl-8"
                } mb-8 md:mb-0`}
              >
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow scroll-hover-scale">
                  <div className="text-primary font-bold text-sm mb-2">
                    {item.year}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>

              {/* Center Dot */}
              <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex justify-center">
                <div className={`w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg scroll-animation scroll-dot-scale ${dotDelayClass}`} />
              </div>

              {/* Empty space for alignment */}
              <div className="hidden md:block md:w-1/2" />
            </div>
          );
        })}
      </div>
    </div>
  </div>
</section> 


  );
}
