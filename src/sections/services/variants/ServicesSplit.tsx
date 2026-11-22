
import DynamicIcon from "../../../components/ui/icon";
import type { ServicesProps } from "../types";
export function ServicesSplit({ title, description, services, className = "" }: ServicesProps) {
  return (
    <section className={`py-20 bg-gradient-extra-light section-spacing ${className}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 scroll-animation scroll-fade-up">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {title}
          </h2>

          {description && (
            <p className="text-xl text-gray-600 leading-relaxed scroll-animation scroll-fade-up delay-100">
              {description}
            </p>
          )}
        </div>

        {/* Services - Alternating Layout */}
        <div className="max-w-6xl mx-auto space-y-20">
          {services.map((service:any, index) => {
            const Icon = service.icon;
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"
                  } items-center gap-12`}
              >
                {/* Icon Side */}
                <div className="md:w-1/2 flex justify-center scroll-animation scroll-scale delay-200">
                  <div className="relative">
                    {/* Main Icon Circle */}
                    <div className="w-64 h-64 bg-gradient-primary rounded-full flex items-center justify-center shadow-2xl relative z-10 ">
                      <DynamicIcon name={Icon} className="w-32 h-32 text-white " />
                    </div>

                    {/* Decorative Rings */}
                    <div
                      className="absolute inset-0 rounded-full border-4 border-primary-light opacity-20 animate-ping"
                      style={{ animationDuration: "3s" }}
                    />
                    <div className="absolute -inset-4 rounded-full border-2 border-primary-light opacity-30" />
                  </div>
                </div>

                {/* Content Side */}
                <div className="md:w-1/2">
                  <div
                    className={`scroll-animation delay-300 ${isEven ? "scroll-slide-right" : "scroll-slide-left"
                      }`}
                  >
                    <div className="inline-block mb-4 px-4 py-2 bg-primary-light text-primary rounded-full text-sm font-semibold scroll-animation scroll-fade-scale">
                      Service {index + 1}
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 scroll-animation scroll-fade-up">
                      {service.title}
                    </h3>

                    <p className="text-lg text-gray-600 leading-relaxed mb-6 scroll-animation scroll-fade-up delay-100">
                      {service.description}
                    </p>

                    {service.price && (
                      <div className="mb-6 scroll-fade-scale scroll-animation">
                        <span className="text-4xl font-bold text-gray-900">
                          {service.price}
                        </span>
                        <span className="text-gray-500 ml-2">starting from</span>
                      </div>
                    )}

                    <button className="px-6 py-3 bg-primary text-white font-semibold rounded-lg flex items-center group hover:bg-primary-dark transition-colors">
                  Get Started
                 <span className="ml-2">→</span>
                </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
