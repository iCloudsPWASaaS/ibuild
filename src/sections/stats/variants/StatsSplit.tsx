import DynamicIcon from "../../../components/ui/icon";
import type { StatsProps } from "../types";

export function StatsSplit({ title, stats, className = "" }: StatsProps) {
  return (
 <section className={`py-20 background-color section-spacing ${className}`}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          
          {/* Left: Stats */}
          <div className="scroll-animation scroll-slide-left">
            {title && (
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 scroll-animation scroll-fade-up ">
                {title}
              </h2>
            )}

            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat:any, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className={`scroll-animation scroll-fade-up delay-${(index + 1) * 100}`}
                  >
                    {Icon && (
                      <DynamicIcon name={Icon} className="w-10 h-10 text-primary mb-4" />
                    )}

                    <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                      {stat.prefix}
                      {stat.value}
                      {stat.suffix}
                    </div>

                    <div className="text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Image/Visual */}
          <div className="relative scroll-animation scroll-slide-right">
            <div className="relative aspect-square bg-gradient-primary rounded-3xl shadow-2xl flex items-center justify-center">
              <div className="text-center text-white p-8">
                <div className="text-8xl font-bold mb-4">📊</div>
                <p className="text-2xl font-semibold">Growing Together</p>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-400 rounded-full shadow-xl scroll-float" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary rounded-full shadow-xl scroll-float" />
          </div>

        </div>
      </div>
    </section>
  );
}