import { componentMap } from "../export/componentMap";
import { getExportHref } from "../helper/function";

const heroVariantAliases: Record<string, string> = {
  movie: "media",
  movies: "media",
  film: "media",
  cinema: "media",
  entertainment: "media",
  streaming: "media",
};

const movieHeroDefaultData = {
  badge: "Movie Agent",
  title: "Find the perfect film tonight",
  description: "Tell us your mood, runtime, and who you are watching with. Get a tailored shortlist of films, showtimes, and where to stream them.",
  actions: {
    primary: { text: "Find a movie", href: "#" },
    secondary: { text: "Browse showtimes", href: "#" },
  },
  image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1400&q=80",
  stats: [
    { icon: "Film", label: "Curated picks", value: "Instant" },
    { icon: "Star", label: "Taste match", value: "Personalized" },
    { icon: "Clock", label: "Runtime fit", value: "Exact" },
  ],
};

type HeroPreferences = {
  businessType?: string;
  websiteName?: string;
  industry?: string;
  name?: string;
};

function hasText(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isMovieHero(preferences?: HeroPreferences) {
  const value = [preferences?.businessType, preferences?.websiteName, preferences?.industry, preferences?.name]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return /(movie|film|cinema|entertainment|streaming)/.test(value);
}

function getHeroData(data: SectionData, preferences?: HeroPreferences): SectionData {
  if (!isMovieHero(preferences)) return data;

  return {
    ...movieHeroDefaultData,
    ...data,
    badge: hasText(data.badge) ? data.badge : movieHeroDefaultData.badge,
    title: hasText(data.title) ? data.title : movieHeroDefaultData.title,
    description: hasText(data.description) ? data.description : movieHeroDefaultData.description,
    image: hasText(data.image) ? data.image : movieHeroDefaultData.image,
    actions: data?.actions?.primary || data?.actions?.secondary ? data.actions : movieHeroDefaultData.actions,
    stats: Array.isArray(data.stats) && data.stats.length > 0 ? data.stats : movieHeroDefaultData.stats,
  };
}

export interface SectionData {
  [key: string]: any;
}

export interface Section {
  id?: string;
  type: string;        // hero, features, about
  variant: string;     // split, centered, grid
  data: SectionData;
  animation?: string;
}
interface SectionRendererProps {
  section: Section;
  exportMode?: boolean; // for HTML export if needed
  preferences?: any;
}

export default function SectionRenderer({
  section,
  exportMode = false,
  preferences,
}: SectionRendererProps) {

  const { type, variant, data } = section;
  const sectionData = data || {};
  const resolvedData = type === "hero" ? getHeroData(sectionData, preferences) : sectionData;
  let renderData = resolvedData;

    const pageSlugs = (preferences?.activepages || []).map((p: any) =>
      p.toLowerCase()
    );
    if (type === "cta") {
      if (data?.primaryCta?.href) {
        data.primaryCta.href = getExportHref(data?.primaryCta?.href, pageSlugs, exportMode);
      }
      if (data?.secondaryCta?.href) {
        data.secondaryCta.href = getExportHref(data?.secondaryCta?.href, pageSlugs, exportMode);
      }
    }
    if (type === "header") {
      if (data?.links) {
        data.links = data?.links?.map((link: any) => {
          return {
            ...link,
            href: getExportHref(link.href, pageSlugs, exportMode)
          };
        });
      }
      if (data?.ctaHref) {
        data.ctaHref = getExportHref(data?.ctaHref, pageSlugs, exportMode);
      }
    }
    if (type === "footer") {
      if (data?.links) {
        data.links = data?.links?.map((group: any) => ({
          ...group,
          items: group?.items?.map((item: any) => {
            return {
              ...item,
              href: getExportHref(item?.href, pageSlugs, exportMode)
            };
          })
        }));
      }
    }
    if (type === "hero" && renderData?.actions) {
      const primary = renderData.actions.primary;
      const secondary = renderData.actions.secondary;
      const primaryHref = primary?.href;
      const secondaryHref = secondary?.href;

      if (primaryHref || secondaryHref) {
        renderData = {
          ...renderData,
          actions: {
            ...renderData.actions,
            ...(primaryHref ? { primary: { ...primary, href: getExportHref(primaryHref, pageSlugs, exportMode) } } : {}),
            ...(secondaryHref ? { secondary: { ...secondary, href: getExportHref(secondaryHref, pageSlugs, exportMode) } } : {}),
          },
        };
      }
    }
  if (exportMode) {
    if (preferences?.logo) {
      const fullPath = preferences?.logo;
      const logorelativePath = fullPath.includes(`img/`)
        ? fullPath.substring(fullPath.indexOf("img/"))
        : "";
      preferences.logo = logorelativePath;
    }

    if (preferences?.favicon) {
      const fullPathfavicon = preferences?.favicon;
      const faviconrelativePath = fullPathfavicon.includes(`img/`)
        ? fullPathfavicon.substring(fullPathfavicon.indexOf("img/"))
        : "";
      preferences.favicon = faviconrelativePath;
    }
  }
  // Get component
  const resolvedVariant = type === "hero" ? heroVariantAliases[variant] || variant : variant;
  const Component = (componentMap as any)[type]?.[resolvedVariant];
  // If component not found
  if (!Component) {
    return (
      <div className="py-10 text-center text-red-500">
        Missing section: {type} / {variant}
      </div>
    );
  }
  if (exportMode && type != "header") {
    return (
      <div key={section?.id} id={type ?? section?.id} >
        <Component {...renderData} preferences={preferences} exportMode={exportMode} />
      </div>
    );
  } else {
    return (
      <Component {...renderData} preferences={preferences} exportMode={exportMode} />
    );
  }

}