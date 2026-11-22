export function splitTitle(title: string = "") {
  const words = title.trim().split(/\s+/).filter(Boolean);

  if (words.length === 0) {
    return {
      prefix: "",
      highlight: "",
      suffix: "",
    };
  }

  if (words.length === 1) {
    return {
      prefix: words[0],
      highlight: "",
      suffix: "",
    };
  }

  if (words.length === 2) {
    return {
      prefix: words[0],
      highlight: words[1],
      suffix: "",
    };
  }

  let prefixEnd = Math.floor(words.length / 2);
  let highlightStart = prefixEnd;
  let highlightCount = 1;

  if ((words[highlightStart] || "").length === 1 && words[highlightStart + 1]) {
    highlightCount = 2;
  } else {
    const suffixWords = words.length - (highlightStart + 1);
    if (suffixWords > 1) {
      highlightCount = 2;
    }
  }
  if (words.length == 4 && (words.slice(highlightStart, highlightStart + highlightCount).length == 1 && words.slice(highlightStart + highlightCount).length == 1)) {
    return {
      prefix: words.slice(0, highlightStart).join(" "),
      highlight: words.slice(highlightStart, highlightStart + highlightCount) + " " + words.slice(highlightStart + highlightCount),
      suffix: "",
    };
  } else {
    if (words.slice(highlightStart, highlightStart + highlightCount).length == 2 && words.slice(highlightStart, highlightStart + highlightCount)[1].length == 1) {
      highlightStart = highlightStart - 1;
      return {
        prefix: words.slice(0, highlightStart).join(" "),
        highlight: words.slice(highlightStart, highlightStart + highlightCount).join(" "),
        suffix: words.slice(highlightStart + highlightCount).join(" "),
      };
    }
    return {
      prefix: words.slice(0, highlightStart).join(" "),
      highlight: words.slice(highlightStart, highlightStart + highlightCount).join(" "),
      suffix: words.slice(highlightStart + highlightCount).join(" "),
    };
  }

}
const gradients = [
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  "from-orange-500 to-yellow-500",
  "from-green-500 to-emerald-500",
  "from-red-500 to-rose-500",
  "from-indigo-500 to-blue-500",
  "from-teal-500 to-lime-500",
  "from-fuchsia-500 to-purple-500",
  "from-sky-500 to-indigo-500",
  "from-amber-500 to-orange-500",
];
export function getRandomGradient(index: any) {
  if (index > 9) {
    return gradients[Math.floor(Math.random() * gradients.length)];

  } else {
    return gradients[index]

  }
};
export interface SectionProps {
  className?: string;
  id?: string;
  exportMode?: boolean;
}
export interface HeroStats {
  icon?: string;
  label?: string;
  value?: string;
}
export interface FeaturesStats {
  icon?: string;
  label?: string;
  value?: string;
}
export interface HeroProps extends SectionProps {
  badge?: string;
  title: string;
  description: string;
  actions?: {
    primary: {
      text: string;
      href?: string;
    };
    secondary: {
      text: string;
      href?: string;
    };
  };
  image?: string;
  video?: string;
  stats?: HeroStats[];
  features?: FeaturesStats[]
}

export const ecommerceHeroDefaults = {
  discountBadge: "50% OFF",
  reviewCount: "2,450 reviews",
  originalPrice: "$199.99",
  currentPrice: "$99.99",
  floatingBadges: {
    top: "NEW",
    bottom: "HOT 🔥",
  },

};

export const RestaurantHeroDefaults = {
  visuals: {
    discountBadge: {
      value: "20%",
      label: "OFF",
    },
    bottomBadge: "🔥 HOT",
  },
  contact: {
    label: "Call for Reservations",
    phone: "(555) 123-4567",
  }
};

export const RealEstateHeroDefaults = {
  search: {
    placeholder: "Enter location, zip, or neighborhood...",
    propertyTypes: ["Property Type", "House", "Apartment", "Condo", "Villa"],
    onSearch: "#",
  },
  propertyCards: [
    {
      tag: "For Sale",
      price: "$425,000",
      title: "Modern Villa",
      specs: { beds: 4, baths: 3, sqft: "2,500 sqft" },
    },
    {
      tag: "New",
      price: "$350,000",
      title: "City Apartment",
      specs: { beds: 2, baths: 2, sqft: "1,200 sqft" },
    },
    {
      tag: "Hot Deal",
      price: "$550,000",
      title: "Luxury Condo",
      specs: { beds: 3, baths: 2, sqft: "1,800 sqft" },
    },
  ]
};


export const SaaSProductHeroDefaults = {
  url: "app.yourplatform.com",
  notifications: {
    top: {
      title: "New Sale!",
      subtitle: "$2,500 revenue",
    },
    bottom: {
      title: "+125 Users",
      subtitle: "This week",
    },
  },
};

const numbers = [35, 55, 45, 70, 60, 85, 95];
const chartData = numbers.map(() => Math.floor(Math.random() * 100));
export const ConsultingHeroDefaults = {
  chartData: chartData,
  metrics: [
    {
      icon: "Briefcase",
      label: "Strategy",
      value: "A+",
    },
    {
      icon: "Users",
      label: "Team",
      value: (Math.floor(Math.random() * 50) + 51) + "+",
    },
    {
      icon: "MessageSquare",
      label: "Support",
      value: "24/7",
    },
    {
      icon: "Award",
      label: "Awards",
      value: (Math.floor(Math.random() * 50) + 51) + "+",
    },
  ],
  trustBadge: {
    title: "Certified",
    subtitle: "ISO 9001",
  },
  ratingBadge: {
    value: "4.9★",
    label: "Client Rating",
  },
};
var percentage = (Math.floor(Math.random() * 81) + 20);
export const EducationPlatformHeroDefaults = {
  courseCard: {
    tag: "BESTSELLER",
    title: "Complete Web Development",
    description: "Master modern web development from scratch",
    reviewCount: "12,450",
    instructor: {
      name: "Sarah Johnson",
      role: "Expert Instructor",
    },
    pricing: {
      original: "$199",
      discounted: "$49",
    },
    buttonText: "Enroll Now",
  },
  progressWidget: {
    label: "Course Progress",
    value: percentage + "%",
    percentage: percentage,
  }
}

const chartnumbers = [2, 3, 8, 15, 25, 28, 20, 8, 3, 2, 3, 8, 15, 25, 28, 20, 8, 3];
const ClinicchartData = [...chartnumbers].sort(() => Math.random() - 0.5);
export const ClinicHospitalHeroDefaults = {
  healthMonitor: {
    title: "Health Monitor",
    subtitle: "Live Status",
    heartRate: {
      value: "72",
      label: "BPM - Normal",
    },
  },
  doctorCard: {
    name: "Dr. Sarah Lee",
    specialty: "Cardiologist",
    status: "Available Now",
  },
  emergencyBadge: {
    label: "Emergency",
    phone: "Call 911",
  },
  chart: ClinicchartData
}
const floatingBadgesArray = [
  { label: "Massage", emoji: "💆" },
  { label: "Facial", emoji: "✨" },
  { label: "Nails", emoji: "💅" },
  { label: "Hair", emoji: "💇" },
]
const floatingBadges = [...floatingBadgesArray].sort(() => Math.random() - 0.5);
export const SalonSpaHeroDefaults = {
  serviceCard: {
    title: "Premium Hair Styling",
    subtitle: "Expert cuts, colors, and treatments",
    icon: "Scissors",
    items: [
      { service: "Hair Cut & Style", price: "$" + (Math.floor(Math.random() * 50) + 51) },
      { service: "Color Treatment", price: "$" + (Math.floor(Math.random() * 50) + 51) },
      { service: "Spa Manicure", price: "$" + (Math.floor(Math.random() * 50) + 51) },
    ],
    buttonText: "Book Now",
  },
  floatingBadges: floatingBadges,
  promo: {
    value: percentage + "%",
    label: "OFF",
  },
  openingHours: {
    label: "Open Daily",
    time: "9:00 AM - 8:00 PM",
  }
}

const EventfloatingBadgesArray = [
  { label: "Weddings", emoji: "💒" },
  { label: "Corporate", emoji: "💼" },
  { label: "Birthday", emoji: "🎂" },
]
const EventfloatingBadges = [...EventfloatingBadgesArray].sort(() => Math.random() - 0.5);
export const EventManagementHeroDefaults = {
  title: "Dream Wedding Package",
  subtitle: "Complete event management for your special day",
  buttonText: "Get Free Quote",
  floatingBadges: EventfloatingBadges
}