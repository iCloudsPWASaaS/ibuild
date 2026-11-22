import type { AboutProps } from "../types";
import { CheckCircle } from "lucide-react";
import { ImageWithFallback } from "../../../helper/ImageWithFallback";
import { aboutImages } from "../../../helper/data";
import { getRandomImage } from "../../../helper/function";
export function AboutSplit({ title, description, image, stats,label, className = "",features }: AboutProps) {

  return (
    <section className={`about py-20 background-color section-spacing ${className}`}>
      <div className=" container mx-auto px-4">
        <div className=" grid md:grid-cols-2 gap-12 items-center">

          {/* Image Side */}
          <div className=" scroll-animation scroll-slide-left delay-200 relative">
            {image ? (
              <div className=" relative aspect-square rounded-2xl flex overflow-hidden shadow-2xl ">
                <ImageWithFallback
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                  srcSet={getRandomImage(aboutImages)}
                />
                {/* Overlay gradient */}
                <div className=" absolute inset-0 bg-linear-to-tr from-blue-600/20 to-transparent" />
              </div>
            ) : (
              <div className=" bg-gradient-primary aspect-square rounded-2xl flex items-center justify-center">
                <div className=" text-white text-center p-8">
                  <div className="text-8xl font-bold mb-4">10+</div>
                  <p className=" text-2xl">Years Experience</p>
                </div>
              </div>
            )}

            {/* Floating Stats Card */}
            {stats && stats.length > 0 && (
              <div className="absolute -bottom-8 -right-8 bg-white rounded-xl shadow-2xl p-6 border border-gray-100 scroll-animation scroll-fade-up delay-300">
                <div className=" grid grid-cols-2 gap-6">
                  {stats.slice(0, 2).map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-primary text-3xl font-bold">{stat.value}</div>
                      <div className=" text-gray-600 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Content Side */}
          <div className="text-primary scroll-animation scroll-slide-right delay-200">
            <div className="bg-primary-light scroll-animation scroll-fade delay-300 inline-block mb-4 px-4 py-2 text-primary rounded-full text-sm font-semibold">
              {label}
            </div>

            <h2 className="scroll-animation  scroll-fade-up delay-400 text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {title}
            </h2>

            <p className="scroll-animation scroll-fade-up-subtle delay-500 text-lg text-gray-400 mb-8 leading-relaxed">
              {description}
            </p>

            {/* Features List */}
            <div className="space-y-4 mb-8">
              {features?.map((feature, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 scroll-animation scroll-slide-right delay-${
                    index === 0 ? "100" :
                    index === 1 ? "200" :
                    index === 2 ? "300" :
                    index === 3 ? "400" :
                    index === 4 ? "500" :
                    "900"
                  }`}
                >
                  <CheckCircle className=" w-6 h-6 text-primary shrink-0" />
                  <span className="text-gray-700">{feature?.title}</span>
                </div>
              ))}
            </div>

            {/* Additional Stats */}
            {stats && stats.length > 2 && (
              <div className=" grid grid-cols-2 gap-6 mt-8 pt-8 border-t border-gray-200 scroll-animation scroll-fade-up">
                {stats.slice(2, 4).map((stat, index) => (
                  <div
                    key={index}
                    className={` scroll-animation scroll-fade-up delay-${
                      index === 0 ? "400" : "400"
                    }`}
                  >
                    <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
