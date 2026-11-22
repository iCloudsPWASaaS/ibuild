import type { TeamProps } from "../types";
import { Linkedin, Twitter, Mail } from "lucide-react";
import { ImageWithFallback } from "../../../helper/ImageWithFallback";
import { getRandomImage } from "../../../helper/function";
import { teamImages } from "../../../helper/data";

export function TeamMinimal({ title, members, className = "", exportMode }: TeamProps) {
  return (
    <section className={`py-32 background-color section-spacing ${className}`}>
  <div className="container mx-auto px-4">
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <h2 className="text-6xl md:text-7xl font-bold text-gray-900 mb-20 scroll-animation scroll-fade-up-subtle">
        {title}
      </h2>

      {/* Team List */}
      <div className="space-y-0">
        {members.map((member, index) => (
          <div
            key={member.id}
            className={`group border-b border-gray-200 last:border-0 scroll-animation scroll-fade-up delay-${(index + 1) * 200}`}
          >
            <a
              href="#"
              className="flex flex-col md:flex-row md:items-center gap-8 py-12 hover:bg-gray-50 transition-colors px-8 -mx-8"
            >
              {/* Photo */}
              <div className="relative shrink-0">
                {member.image ? (
                  <div className="w-32 h-32 rounded-full overflow-hidden">
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      srcSet={getRandomImage(teamImages)}
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gradient-extra-light flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 hover-text">
                <h3 className="text-3xl font-bold text-gray-900 mb-2 transition-colors">
                  {member.name}
                </h3>
                <p className="text-xl text-primary font-medium mb-4">{member.role}</p>
                {member.bio && (
                  <p className="text-gray-600 leading-relaxed max-w-2xl">{member.bio}</p>
                )}
              </div>

              {/* Social Links */}
              <div className="flex md:flex-col gap-3 flex-shrink-0">
                {member.social?.linkedin && (
                  <a
                    href={exportMode ? member.social.linkedin : "#"}
                    onClick={(e) => e.stopPropagation()}
                    className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover-bg-link transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {member.social?.twitter && (
                  <a
                    href={exportMode ? member.social.twitter : "#"}
                    onClick={(e) => e.stopPropagation()}
                    className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover-bg-link transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
                {member.social?.email && (
                  <a
                    href={exportMode ? `mailto:${member.social.email}` : "#"}
                    onClick={(e) => e.stopPropagation()}
                    className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover-bg-link transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                )}
              </div>
            </a>
          </div>
        ))}
      </div>

      {/* Join Team CTA */}
      <div className="mt-20 pt-12 border-t border-gray-200 text-center scroll-animation scroll-fade-up delay-600">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          Want to join our team?
        </h3>
        <p className="text-lg text-gray-600 mb-8">
          We're always looking for talented people to join our mission
        </p>
        <a
          href="#"
          className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold text-xl group"
        >
          View open positions
          <span className="ml-2 animate-arrow-x">→</span>
        </a>
      </div>
    </div>
  </div>
</section>
  );
}
