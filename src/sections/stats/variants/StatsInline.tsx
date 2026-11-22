import DynamicIcon from "../../../components/ui/icon";
import type { StatsProps } from "../types";

export function StatsInline({ stats, className = "" }: StatsProps) {
  return (
    <section className={`py-16 bg-gradient-primary text-white section-spacing ${className}`}>
  <div className="container mx-auto px-4">
    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
      {stats.map((stat:any, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className={`text-center scroll-animation  scroll-fade-up delay-${(index + 1) * 100}`}
          >
            {Icon && (
              <div className="flex justify-center mb-3">
                <DynamicIcon name={Icon} className="w-8 h-8 text-white" />
              </div>
            )}
            <div className="text-4xl md:text-5xl font-bold mb-2">
              {stat.prefix}{stat.value}{stat.suffix}
            </div>
            <div className="text-blue-100 font-medium">{stat.label}</div>
          </div>
        );
      })}
    </div>
  </div>
</section>

  );
}
