import DynamicIcon from "../../../components/ui/icon";
import type { StatsProps } from "../types";

export function StatsCards({ title, stats, className = "" }: StatsProps) {
  return (
<section className={`py-20 bg-gradient-extra-light section-spacing ${className}`}>
  <div className="container mx-auto px-4">
    {/* Header */}
    {title && (
      <h2 className="text-4xl md:text-6xl font-bold text-gray-900 text-center mb-16 scroll-animation  scroll-fade-up">
        {title}
      </h2>
    )}

    {/* Stats Grid */}
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
      {stats.map((stat:any, index) => {
        const Icon = stat.icon;

        return (
          <div
            key={index}
            className={`relative bg-white rounded-2xl p-8 shadow-lg overflow-hidden group scroll-animation  scroll-fade-up delay-${(index + 1) * 100} 
              transition-all transform hover:-translate-y-1 hover:shadow-xl`}
          >
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-light rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform" />

            {/* Content */}
            <div className="relative z-10">
              {Icon && (
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <DynamicIcon name={Icon} className="w-8 h-8 text-white" />
                </div>
              )}
              <div className="text-5xl font-bold text-gray-900 mb-3">
                {stat.prefix}{stat.value}{stat.suffix}
              </div>
              <div className="text-gray-600 font-semibold">{stat.label}</div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
</section>


  );
}
