import { useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import type { AboutProps } from "../types";
import { TrendingUp, Users, Globe, Award } from "lucide-react";

export function AboutStats({ title, description, stats, className = "" , quote}: AboutProps) {
  const defaultStats = stats || [
    { label: "Active Users", value: "50K+" },
    { label: "Countries", value: "120+" },
    { label: "Success Rate", value: "99%" },
    { label: "Awards Won", value: "25+" }
  ];

  const statIcons = [TrendingUp, Users, Globe, Award];

  return (
    <section className={`py-20 bg-gradient-primary text-white aboutsection section-spacing ${className} `}>
  <div className="container mx-auto px-4">
    <div className="max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 scroll-animation scroll-fade-up">
          {title}
        </h2>

        <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed scroll-animation scroll-fade-up delay-100">
          {description}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {defaultStats.map((stat, index) => {
          const Icon = statIcons[index % statIcons.length];

          return (
            <StatCard
              key={index}
              stat={stat}
              icon={Icon}
              index={index}
            />
          );
        })}
      </div>

      {/* Bottom Description */}
      <div className="mt-16 text-center scroll-animation scroll-fade-up delay-600">
        <p className="text-lg text-blue-100 max-w-3xl mx-auto">{quote}</p>
      </div>

    </div>
  </div>

  {/* Background Pattern */}
  <div className="absolute inset-0 opacity-10">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
        backgroundSize: "40px 40px",
      }}
    />
  </div>
</section>

  );
}

function StatCard({ stat, icon: Icon }: { stat: { label: string; value: string }, icon: any, index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  // Animate number counting
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

  const suffix = stat.value.replace(/[0-9]/g, '');

  return (
    <div
      ref={ref}
      className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all stats-card-hover"
    >
      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="text-4xl md:text-5xl font-bold mb-2">
        {count > 0 ? `${count}${suffix}` : stat.value}
      </div>
      <div className="text-blue-100 text-sm font-medium">{stat.label}</div>
    </div>
  );
}
