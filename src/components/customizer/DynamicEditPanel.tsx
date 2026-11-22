import { FieldRenderer } from "./FieldRenderer";


type SectionType = "header" | "hero" | "about" | "blog" | "cta" | "contact" | "faq" | "features" | "gallery" | "pricing" | "products" | "services" | "stats" | "team" | "testimonials" | "footer"; // extend as needed
type VariantType = string;

type Section = {
  type: SectionType;
  variant: VariantType;
  data: Record<string, any>;
};

type Schema = Record<string, any>;

type Props = {
  section: Section;
  schema: Schema;
  onChange: (key: string, value: any) => void;
};
export function DynamicEditPanel({
  section,
  schema,
  onChange,
}:Props) {
  if (!section || !schema) return null;

const sectionFieldVisibility: Record<
  SectionType,
  Record<string, string[]>
>  = {
  header: {
    split: ["links", "ctaText", "ctaHref"],
    classic: ["links", "ctaText", "ctaHref"],
    centered: ["links", "ctaText", "ctaHref"],
    minimal: ["links", "ctaText", "ctaHref"],
    sticky: ["links", "ctaText", "ctaHref"],
  },

  hero: {
    centered: ["title", "badge", "description", "actions"],
    media: ["title", "badge", "description", "actions", "image", "video"],
    split: ["title", "badge", "description", "actions", "image"],
    minimal: ["title", "description", "actions", "image"],
    business: ["badge", "title", "description", "actions", "stats"],
    ecommerce: ["badge", "title", "description", "actions", "features"],
    portfolio: ["title", "description", "actions", "features"],
    restaurant: ["badge", "title", "description", "actions", "stats"],
    realestate: ["badge", "title", "description", "stats"],
    saas: ["badge", "title", "description", "actions", "features", "stats"],
    agency: ["badge", "title", "description", "actions", "stats"],
    consulting: ["badge", "title", "description", "actions", "features", "stats"],
    gym: ["badge", "title", "description", "actions", "stats", "features"],
    education: ["badge", "title", "description", "actions", "stats", "features"],
    clinic: ["badge", "title", "description", "actions", "stats", "features"],
    salon: ["badge", "title", "description", "actions", "stats"],
    event: ["badge", "title", "description", "actions", "stats", "features"],
    startup: ["badge", "title", "description", "actions", "features", "stats"],
  },

  about: {
    split: ["title", "description", "image", "stats", "label", "features"],
    centered: ["label", "title", "description", "stats", "features"],
    timeline: ["label", "title", "description", "timeline"],
    stats: ["title", "description", "stats", "quote"],
    minimal: ["title", "description", "missionDescription", "visionDescription", "quote"],
  },

  blog: {
    grid: ["title", "description", "posts"],
    cards: ["title", "description", "posts"],
    list: ["title", "posts"],
    featured: ["title", "posts"],
    minimal: ["title", "posts"],
  },

  cta: {
    centered: ["title", "description", "primaryCta", "secondaryCta"],
    split: ["title", "description", "primaryCta", "secondaryCta", "benefits"],
    boxed: ["title", "description", "primaryCta"],
  },

  contact: {
    centered: ["title", "description", "contactInfo"],
    split: ["title", "description", "contactInfo", "socialLinks"],
    minimal: ["title", "contactInfo"],
  },

  faq: {
    accordion: ["title", "description", "items"],
    grid: ["title", "description", "items"],
    minimal: ["title", "items"],
  },

  features: {
    grid: ["title", "description", "features"],
    cards: ["title", "description", "features"],
    list: ["title", "description", "features"],
    timeline: ["title", "description", "features"],
  },

  gallery: {
    grid: ["title", "description", "items"],
    masonry: ["title", "description", "items"],
    slider: ["title", "description", "items"],
  },

  pricing: {
    cards: ["label", "title", "description", "tiers"],
    comparison: ["title", "description", "tiers"],
    minimal: ["label", "title", "tiers"],
  },

  products: {
    grid: ["label", "title", "description", "products"],
    carousel: ["title", "description", "products"],
    split: ["label", "title", "description", "products"],
    featured: ["label", "title", "description", "products"],
    minimal: ["title", "products"],
  },

  services: {
    cards: ["label", "title", "description", "services"],
    split: ["title", "description", "services"],
    icons: ["title", "description", "services"],
  },

  stats: {
    split: ["title", "stats"],
    grid: ["title", "stats"],
    inline: ["stats"],
    cards: ["title", "stats"],
    minimal: ["stats"],
  },

  team: {
    grid: ["label", "title", "description", "members"],
    cards: ["title", "description", "members"],
    minimal: ["title", "members"],
  },

  testimonials: {
    grid: ["label", "title", "description", "testimonials"],
    carousel: ["title", "description", "testimonials"],
    minimal: ["title", "testimonials"],
  },

  footer: {
    classic: ["description", "links", "socialLinks", "copyright"],
    columns: ["description", "links", "socialLinks", "copyright"],
    minimal: ["links", "socialLinks", "copyright"],
  },
};

const visibleFields =
  sectionFieldVisibility[section.type]?.[section.variant] ??
  Object.keys(schema);

  return (
    <div className="w-full h-full bg-white">
      {visibleFields.map((key) => (
        (section.data?.[key]) &&
        <FieldRenderer
          key={key}
          fieldKey={key}
          schemaValue={schema[key]}
          value={section.data?.[key]}
          onChange={(val:any) => onChange(key, val)}
        />
      ))}
    </div>
  );
}