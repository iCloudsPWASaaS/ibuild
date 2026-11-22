import {
  Mail
} from "lucide-react";
import { SectionButton } from "../../../components/ui/index";
import DynamicIcon from "../../../components/ui/icon";
import { getRandomGradient, splitTitle } from "../types";
import type { HeroProps } from "../types";

export function PortfolioHero({
  title,
  description,
  actions,
  features,
  exportMode,
}: HeroProps) {
    const titleParts = splitTitle(String(title || "Creative Developer & Designer"));

  var socials = [
    { icon: "Github", label: "GitHub", href: "#" },
    { icon: "Linkedin", label: "LinkedIn", href: "#" },
    { icon: "Mail", label: "Email", href: "#" },
  ]
  return (
    <div className="relative bg-black overflow-hidden section-spacing">

      {/* Animated gradient orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/30 rounded-full blur-[100px] animate-orb-1" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/30 rounded-full blur-[100px] animate-orb-2" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-pattern-white-low)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-pattern-white-low)_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* Content */}
      <div className="relative container mx-auto px-4 flex items-center">
        <div className="w-full">
          <div className="max-w-5xl mx-auto text-center">

            <div className="scroll-animation scroll-fade-up">

              {/* Profile Icon / Avatar */}
              <div className="inline-block mb-6 animate-profile-pop">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-primary rounded-full blur-xl opacity-75 animate-avatar-rotate" />

                  <div className="relative w-32 h-32 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center border-4 border-white/10">
                    <DynamicIcon name="Sparkles" className="w-16 h-16 text-white" />
                  </div>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight animate-title-in">
                {titleParts.prefix}{" "}

                <span className="block bg-gradient-primary-heading bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-text">
                  {titleParts.highlight}
                </span>

                {titleParts.suffix}
              </h1>

              {/* Description */}
              <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed animate-desc-in">
                {description}
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 mb-12 animate-buttons-in">
                <SectionButton size="lg" href={`${actions?.primary.href}`} variant="web">
                  {actions?.primary.text}
                </SectionButton>

                <SectionButton
                  size="lg"
                  variant="common"
                  href={`${actions?.secondary.href}`}
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  <Mail className="mr-2 w-5 h-5" />
                  {actions?.secondary.text}
                </SectionButton>
              </div>

              {/* Social links */}
              <div className="flex items-center justify-center gap-6 mb-16 animate-socials-in">
                {socials.map((social, index) => (
                  <a
                    key={index}
                    href={exportMode ? social.href : "#"}
                    className="w-12 h-12 bg-white/5 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/10 hover:border-purple-400 transition-colors group social-hover"
                  >
                    <DynamicIcon name={social.icon} className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Floating skill cards */}
            <div className="relative mt-16">
              <div className="flex items-center justify-center gap-6 flex-wrap">
                {features?.map((skill:any, index) => (
                  <div
                    key={index}
                    className="group skill-hover animate-skill-card"
                    style={{
                      animationDelay: `${1 + index * 0.1}s`,
                    }}
                  >
                    <div className="relative">
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${getRandomGradient(index)} rounded-2xl blur-xl opacity-0 group-hover:opacity-75 transition-opacity animate-skill-glow`}
                        style={{
                          animationDelay: `${index * 0.3}s`,
                        }}
                      />

                      <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 group-hover:border-white/30 transition-colors min-w-[160px]">
                        <DynamicIcon name={skill.icon} className="w-8 h-8 text-white mb-3 mx-auto" />
                        <div className="text-white font-medium text-center">{skill.label}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full animate-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 10 + 10}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

    </div>

  );
}