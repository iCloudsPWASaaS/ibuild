import type { StatsProps } from "../types";

export function StatsMinimal({ stats, className = "" }: StatsProps) {
  return (
    <section className={`py-20 background-color section-spacing ${className}`}>
  <div className="container mx-auto px-4">
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`text-center scroll-animation scroll-fade-up delay-${(index + 1) * 100}`}
          >
            <div className="text-5xl md:text-6xl font-bold text-gray-900 mb-3">
              {stat.prefix}{stat.value}{stat.suffix}
            </div>
            <div className="text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

  );
}
