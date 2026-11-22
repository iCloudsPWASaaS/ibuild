import type { TeamProps } from "../types";
import { Linkedin, Twitter, Mail, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../../../helper/ImageWithFallback";
import { getRandomImage } from "../../../helper/function";
import { teamImages } from "../../../helper/data";

export function TeamCards({ title, description, members, className = "", exportMode }: TeamProps) {
  return (
    <section className={`py-20 bg-gradient-extra-light section-spacing ${className}`}>
  <div className="container mx-auto px-4">
    {/* Header */}
    <div className="text-center max-w-3xl mx-auto mb-16 scroll-animation scroll-fade-up-subtle">
      <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
        {title}
      </h2>

      {description && (
        <p className="text-xl text-gray-600 leading-relaxed scroll-animation scroll-fade-up-subtle delay-100">
          {description}
        </p>
      )}
    </div>

    {/* Team Cards */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {members.map((member, index) => (
        <div
          key={member.id}
          className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all scroll-animation scroll-fade-up delay-${(index + 1) * 200}`}
        >
          {/* Photo */}
          <div className="relative overflow-hidden">
            {member.image ? (
              <ImageWithFallback
                src={member.image}
                alt={member.name}
                className="w-full aspect-[4/5] object-cover group-hover:scale-110 transition-transform duration-500"
                srcSet={getRandomImage(teamImages)}
              />
            ) : (
              <div className="aspect-[4/5] bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                <span className="text-8xl font-bold text-white">
                  {member.name.charAt(0)}
                </span>
              </div>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Role Badge */}
            <div className="absolute top-4 left-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full">
              <span className="text-sm font-semibold text-gray-900">
                {member.role}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {member.name}
            </h3>

            {member.bio && (
              <p className="text-gray-600 leading-relaxed mb-6">{member.bio}</p>
            )}

            {/* Social Links */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <div className="flex gap-3">
                {member.social?.linkedin && (
                  <a
                    href={exportMode ? member.social.linkedin : "#"}
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover-bg-link transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {member.social?.twitter && (
                  <a
                    href={exportMode ? member.social.twitter : "#"}
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover-bg-link hover:text-white transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
                {member.social?.email && (
                  <a
                    href={exportMode ? `mailto:${member.social.email}` : "#"}
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover-bg-link hover:text-white transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                )}
              </div>

              {/* View Profile Link */}
              <a
                href="#"
                className="text-primary font-semibold flex items-center gap-2 group/link"
              >
                Profile
                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
  );
}
