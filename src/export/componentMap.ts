import {AboutSplit,AboutCentered,AboutTimeline,AboutStats,AboutMinimal} from "../sections/about/index";
import { BlogGrid,BlogCards,BlogList,BlogFeatured,BlogMinimal } from "../sections/blog/index";
import {CTACentered,CTASplit,CTABoxed} from "../sections/cta/index"
import {ContactForm,ContactSplit,ContactMinimal} from "../sections/contact/index"
import {FAQAccordion,FAQGrid,FAQMinimal} from "../sections/faq/index"
import {FeaturesGrid,FeaturesCards,FeaturesList,FeaturesTimeline} from "../sections/features/index"
import {FooterClassic,FooterColumns,FooterMinimal} from "../sections/footers/index"
import {GalleryGrid,GalleryMasonry,GallerySlider} from "../sections/gallery/index"
import { HeaderSplit,HeaderClassic,HeaderCentered,HeaderMinimal,HeaderSticky} from "../sections/headers/index"
import {HeroCentered,HeroMedia,HeroSplit,HeroMinimal,BusinessWebsiteHero,EcommerceStoreHero,PortfolioHero,RestaurantHero,RealEstateHero,SaaSProductHero,DigitalAgencyHero,ConsultingFirmHero,GymFitnessHero,EducationPlatformHero,ClinicHospitalHero,SalonSpaHero,EventManagementHero,StartupLandingPageHero} from "../sections/heroes/index";
import {PricingCards,PricingComparison,PricingMinimal} from "../sections/pricing/index"
import {ProductsGrid,ProductsCarousel,ProductsSplit,ProductsFeatured,ProductsMinimal} from "../sections/products/index"
import {ServicesCards,ServicesSplit,ServicesIcons} from "../sections/services/index"
import {StatsGrid,StatsInline,StatsCards,StatsSplit,StatsMinimal} from "../sections/stats/index"
import {TeamGrid,TeamCards,TeamMinimal} from "../sections/team/index"
import {TestimonialsGrid,TestimonialsCarousel,TestimonialsMinimal} from "../sections/testimonials/index"


export const componentMap = {
  header: {
    split: HeaderSplit,
    classic: HeaderClassic,
    centered: HeaderCentered,
    minimal: HeaderMinimal,
    sticky: HeaderSticky,
  },

  hero: {
    centered: HeroCentered,
    media: HeroMedia,
    split: HeroSplit,
    minimal: HeroMinimal,
    business: BusinessWebsiteHero,
    ecommerce: EcommerceStoreHero,
    portfolio: PortfolioHero,
    restaurant: RestaurantHero,
    realestate: RealEstateHero,
    saas: SaaSProductHero,
    agency: DigitalAgencyHero,
    consulting: ConsultingFirmHero,
    gym: GymFitnessHero,
    education: EducationPlatformHero,
    clinic: ClinicHospitalHero,
    salon: SalonSpaHero,
    event: EventManagementHero,
    startup: StartupLandingPageHero,
  },

  about: {
    split: AboutSplit,
    centered: AboutCentered,
    timeline: AboutTimeline,
    stats: AboutStats,
    minimal: AboutMinimal,
  },

  blog: {
    grid: BlogGrid,
    cards: BlogCards,
    list: BlogList,
    featured: BlogFeatured,
    minimal: BlogMinimal,
  },

  cta: {
    centered: CTACentered,
    split: CTASplit,
    boxed: CTABoxed,
  },

  contact: {
    centered: ContactForm,
    split: ContactSplit,
    minimal: ContactMinimal,
  },

  faq: {
    accordion: FAQAccordion,
    grid: FAQGrid,
    minimal: FAQMinimal,
  },

  features: {
    grid: FeaturesGrid,
    cards: FeaturesCards,
    list: FeaturesList,
    timeline: FeaturesTimeline,
  },

  gallery: {
    grid: GalleryGrid,
    masonry: GalleryMasonry,
    slider: GallerySlider,
  },

  pricing: {
    cards: PricingCards,
    comparison: PricingComparison,
    minimal: PricingMinimal,
  },

  products: {
    grid: ProductsGrid,
    carousel: ProductsCarousel,
    split: ProductsSplit,
    featured: ProductsFeatured,
    minimal: ProductsMinimal,
  },

  services: {
    cards: ServicesCards,
    split: ServicesSplit,
    icons: ServicesIcons,
  },

  stats: {
    split: StatsSplit,
    grid: StatsGrid,
    inline: StatsInline,
    cards: StatsCards,
    minimal: StatsMinimal,
  },

  team: {
    grid: TeamGrid,
    cards: TeamCards,
    minimal: TeamMinimal,
  },

  testimonials: {
    grid: TestimonialsGrid,
    carousel: TestimonialsCarousel,
    minimal: TestimonialsMinimal,
  },

  footer: {
    classic: FooterClassic,
    columns: FooterColumns,
    minimal: FooterMinimal,
  },
};
