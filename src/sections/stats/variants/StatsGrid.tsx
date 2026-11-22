import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import type { StatsProps } from "../types";
import DynamicIcon from "../../../components/ui/icon";

export function StatsGrid({ title, stats, className = "" }: StatsProps) {
  return (
    <section className={`py-20 background-color stats-section section-spacing ${className}`}>
  <div className="container mx-auto px-4">
    {/* Header */}
    {title && (
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16 scroll-animation scroll-fade-up">
        {title}
      </h2>
    )}

    {/* Stats Grid */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <StatCard
            key={index}
            stat={stat}
            icon={Icon}
            index={index}
            className={`scroll-animation scroll-fade-up delay-${(index + 1) * 100}`}
          />
        );
      })}
    </div>
  </div>
</section>

  );
}

function StatCard({ stat, icon: Icon }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const numericValue = parseInt(stat.value.replace(/[^0-9]/g, ''));
      if (!isNaN(numericValue)) {
        let start = 0;
        const duration = 2000;
        const increment = numericValue / (duration / 16);

        const timer = setInterval(() => {
          start += increment;
          if (start >= numericValue) {
            setCount(numericValue);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);

        return () => clearInterval(timer);
      }
    }
  }, [isInView, stat.value]);

  const suffix = stat?.suffix ?? stat.value.replace(/[0-9]/g, '');

  return (
    <div
      ref={ref}
      className="text-center p-6 bg-gradient-extra-light rounded-xl border border-gray-200 hover:shadow-lg transition-all stats-card-hover"
    >
      {Icon && (
        <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
          <DynamicIcon name={Icon} className="w-7 h-7 text-white" />
        </div>
      )}
      <div className="stat-number text-4xl md:text-5xl font-bold text-gray-900 mb-2">
        {stat.prefix}{count > 0 ? count : stat.value.replace(/[^0-9]/g, '')}{suffix}
      </div>
      <div className="text-gray-600 font-medium">{stat.label}</div>
    </div>
  );
}
