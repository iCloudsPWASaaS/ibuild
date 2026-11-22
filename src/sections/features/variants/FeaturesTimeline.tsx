import DynamicIcon from "../../../components/ui/icon";
import type { FeaturesProps } from "../types";

export function FeaturesTimeline({ title, description, features, className = "" }: FeaturesProps) {
  return (
    <section className={`py-20 bg-gradient-extra-light section-spacing ${className}`}>
  <div className="container mx-auto px-4">
    {/* Header */}
    <div className="text-center max-w-3xl mx-auto mb-16">
      <h2
        className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 scroll-animation scroll-fade-up"
        data-delay="100"
      >
        {title}
      </h2>

      {description && (
        <p
          className="text-lg text-gray-600 leading-relaxed scroll-animation scroll-fade-up"
          data-delay="200"
        >
          {description}
        </p>
      )}
    </div>

    {/* Timeline */}
    <div className="max-w-4xl mx-auto">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        const isLast = index === features.length - 1;

        return (
          <div
            key={index}
            className="relative scroll-animation scroll-fade-up"
            data-delay={100 + index * 150}
          >
            <div className="flex gap-6 md:gap-8 pb-12">
              {/* Timeline Line & Dot */}
              <div className="flex flex-col items-center">
                {/* Dot */}
                <div
                  className="relative z-10 w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-lg scroll-animation scroll-scale"
                  data-delay={150 + index * 150}
                >
                  <DynamicIcon name={Icon} className="w-8 h-8 text-white" />
                </div>

                {/* Vertical Line */}
                {!isLast && (
                  <div
                    className="w-0.5 bg-gradient-primary flex-1 mt-2 scroll-animation scroll-fade-up"
                    data-delay={200 + index * 150}
                  />
                )}
              </div>

              {/* Content Card */}
              <div className="flex-1 bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all scroll-animation scroll-fade-scale"
                   data-delay={250 + index * 150}>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-2xl font-bold text-gray-900">{feature.title}</h3>
                  <div className="px-3 py-1 bg-primary-light text-primary rounded-full text-xs font-semibold">
                    Step {index + 1}
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed">{feature.description}</p>

                {/* Progress Bar */}
                <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-primary scroll-animation scroll-scale"
                    data-delay={300 + index * 150}
                    style={{ width: `${((index + 1) / features.length) * 100}%` }}
                  />
                </div>
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
