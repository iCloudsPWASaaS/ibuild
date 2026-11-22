import DynamicIcon from "../../../components/ui/icon";
import type { AboutProps } from "../types";

export function AboutCentered({ label ,title, description, stats, className = "", features }: AboutProps) {
  return (
<section className={`py-20 bg-linear-to-br from-gray-50 to-blue-50 section-spacing ${className}`}>
  <div className="container mx-auto px-4">
    <div className="max-w-4xl mx-auto text-center">
      
      {/* Header */}
      {label &&<div className="inline-block mb-4 px-4 py-2 bg-white text-primary rounded-full text-sm font-semibold shadow-sm scroll-animation  scroll-fade-up-subtle">
       {label}
      </div>}

      <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 scroll-animation scroll-fade-up delay-100">
        {title}
      </h2>

      <p className="text-xl text-primary2 mb-16 leading-relaxed scroll-animation scroll-fade-up delay-200">
        {description}
      </p>

  {/* Stats */}
{stats && stats.length > 0 && (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 scroll-animation scroll-fade-up delay-300">
    {stats.map((stat, index) => {
      const delayClass =
        index === 0 ? "delay-400" :
        index === 1 ? "delay-500" :
        index === 2 ? "delay-600" :
        index === 3 ? "delay-700" :
        "delay-800";

      return (
        <div
          key={index}
          className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow scroll-animation scroll-scale ${delayClass}`}
        >
          <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
          <div className="text-sm text-gray-600">{stat.label}</div>
        </div>
      );
    })}
  </div>
)}


      {/* Values Grid */}
     <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
  {features?.map((value:any, index) => {
    const Icon = value.icon;

    const delayClass =
      index === 0 ? "delay-500" :
      index === 1 ? "delay-600" :
      index === 2 ? "delay-700" :
      index === 3 ? "delay-800" :
      "delay-900";

    return (
      <div
        key={index}
        className={`bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow scroll-animation scroll-fade-up ${delayClass}`}
      >
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <DynamicIcon name={Icon} className="w-8 h-8 text-primary" />
        </div>
        <h3 className="font-bold text-gray-900 mb-2">{value.title}</h3>
        <p className="text-sm text-gray-600">{value.description}</p>
      </div>
    );
  })}
</div>


    </div>
  </div>
</section>
  );
}
