import type { TeamProps } from "../types";
import { Linkedin, Twitter, Mail } from "lucide-react";
import { ImageWithFallback } from "../../../helper/ImageWithFallback";
import { getRandomImage } from "../../../helper/function";
import { teamImages } from "../../../helper/data";

export function TeamGrid({label="Our Team", title, description, members, className = "", exportMode }: TeamProps) {
  return (
    <section className={`py-20 background-color section-spacing ${className}`}>
  <div className="container mx-auto px-4">
    {/* Header */}
    <div className="text-center max-w-3xl mx-auto mb-16 scroll-animation scroll-fade-up-subtle">
      <div className="inline-block mb-4 px-4 py-2 bg-primary-light text-primary rounded-full text-sm font-semibold scroll-animation scroll-fade-scale">
       {label}
      </div>

      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 scroll-animation scroll-fade-up delay-100">
        {title}
      </h2>

      {description && (
        <p className="text-lg text-gray-600 leading-relaxed scroll-animation scroll-fade-up delay-200">
          {description}
        </p>
      )}
    </div>

    {/* Team Grid */}
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto ">
      {members.map((member, index) => (
        <div
          key={member.id}
          className={`group scroll-animation scroll-fade-up delay-${(index + 1) * 200} hover-service`}
        >
          {/* Photo */}
          <div className="relative mb-6 overflow-hidden rounded-2xl">
            {member.image ? (
              <ImageWithFallback
                src={member.image}
                alt={member.name}
                className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
                srcSet={getRandomImage(teamImages)}
              />
            ) : (
              <div className="aspect-square bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                <span className="text-6xl font-bold text-white">
                  {member.name.charAt(0)}
                </span>
              </div>
            )}

            {/* Social Links Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
              <div className="flex gap-3">
                {member.social?.linkedin && (
                  <a
                    href={exportMode ? member.social.linkedin : "#"}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover-bg-link transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {member.social?.twitter && (
                  <a
                    href={exportMode ? member.social.twitter :"#"}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover-bg-link transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
                {member.social?.email && (
                  <a
                    href={exportMode ? `mailto:${member.social.email}` : "#"}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover-bg-link transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
            <p className="text-primary font-medium mb-3">{member.role}</p>
            {member.bio && (
              <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
  );
}
