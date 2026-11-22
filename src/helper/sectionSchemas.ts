
const aboutSchema = {
  label: "string",
  title: "string",
  description: "string",
  image: "string",
  stats: [
    {
      label: "string",
      value: "string"
    }
  ],
  timeline: [
    {
      year: "string",
      title: "string",
      description: "string"
    }
  ],
  features: [
    {
      icon: "string",
      title: "string",
      description: "string"
    }
  ],
  quote: "string",
  missionDescription: "string",
  visionDescription: "string"
};

const blogSchema = {
  title: "string",
  description: "string",
  posts: [
    {
      id: "string",
      title: "string",
      description: "string",
      image: "string",
      author: "string",
      date: "string",
      category: "string",
      readTime: "string"
    }
  ]
};

const contactSchema = {
  title: "string",
  description: "string",
  contactInfo: {
    email: "string",
    phone: "string",
    address: "string"
  },
  socialLinks: {
    facebook: "string",
    twitter: "string",
    instagram: "string",
    linkedin: "string"
  }
};
const ctaSchema = {
  title: "string",
  description: "string",
  primaryCta: {
    text: "string",
    action: "() => void"
  },
  secondaryCta: {
    text: "string",
    action: "() => void"
  },
  benefits: ["string"]
};

const faqSchema = {
  title: "string",
  description: "string",
  items: [
    {
      question: "string",
      answer: "string"
    }
  ]
};
const featuresSchema = {
  title: "string",
  description: "string",
  features: [
    {
      icon: "string",
      title: "string",
      description: "string"
    }
  ]
};

const footerSchema = {
  description: "string",
  links: [
    {
      title: "string",
      items: [
        {
          label: "string",
          href: "string",
          subMenu: [
            {
              label: "string",
              href: "string"
            }
          ]
        }
      ]
    }
  ],
  socialLinks: {
    facebook: "string",
    twitter: "string",
    instagram: "string",
    linkedin: "string"
  },
  copyright: "string"
};

const gallerySchema = {
  title: "string",
  description: "string",
  items: [
    {
      id: "string",
      image: "string",
      title: "string",
      category: "string"
    }
  ]
};

const headerSchema = {
  links: [
    {
      label: "string",
      href: "string",
      subMenu: [
        {
          label: "string",
          href: "string"
        }
      ]
    }
  ],
  ctaText: "string",
  ctaHref: "string",
  ctaAction: "() => void"
};

const heroSchema = {
  badge: "string",
  title: "string",
  description: "string",
  actions: {
    primary: {
      text: "string",
      onClick: "() => void"
    },
    secondary: {
      text: "string",
      onClick: "() => void"
    }
  },
  image: "string",
  video: "string",
  stats: [
    {
      icon: "string",
      label: "string",
      value: "string"
    }
  ],
  features: [
    {
      icon: "string",
      label: "string",
      value: "string"
    }
  ]
};

const pricingSchema = {
  lebel: "string",
  title: "string",
  description: "string",
  tiers: [
    {
      name: "string",
      price: "string",
      interval: "string",
      features: ["string"],
      highlighted: "boolean",
      ctaText: "string"
    }
  ]
};

const productsSchema = {
  label: "string",
  title: "string",
  description: "string",
  products: [
    {
      id: "string",
      name: "string",
      description: "string",
      price: "number",
      image: "string",
      category: "string",
      rating: "number",
      reviews: "number",
      features: ["string"]
    }
  ]
};

const servicesSchema = {
  label: "string",
  title: "string",
  description: "string",
  services: [
    {
      icon: "string",
      title: "string",
      description: "string",
      price: "string"
    }
  ]
};

const statsSchema = {
  title: "string",
  stats: [
    {
      label: "string",
      value: "string",
      icon: "string",
      suffix: "string",
      prefix: "string"
    }
  ]
};



const teamSchema = {
  label: "string",
  title: "string",
  description: "string",
  members: [
    {
      id: "string",
      name: "string",
      role: "string",
      image: "string",
      bio: "string",
      social: {
        linkedin: "string",
        twitter: "string",
        email: "string"
      }
    }
  ]
};

const testimonialsSchema = {
  label: "string",
  title: "string",
  description: "string",
  testimonials: [
    {
      id: "string",
      name: "string",
      role: "string",
      company: "string",
      image: "string",
      content: "string",
      rating: "number"
    }
  ]
};

export const sectionSchemas = {
  header:headerSchema,
  hero:heroSchema,
  about: aboutSchema,
  features:featuresSchema,
  services:servicesSchema,
  contact:contactSchema,
  cta:ctaSchema,
  faq:faqSchema,
  gallery:gallerySchema,
  pricing:pricingSchema,
  products:productsSchema,
  stats:statsSchema,
  blog:blogSchema,
  team:teamSchema,
  testimonials:testimonialsSchema,
  footer:footerSchema
} as const;;
