export type WebsiteType = "business" | "portfolio" | "landing" | "saas" | "ecommerce" | "service";

export interface WebsitePreferences {
  websiteName: string;
  businessType?: string;
  description: string;
  industry: string;
  designStyle: string;
  primaryColor: string;
  secondaryColor: string;
  accent: string;
  backgroundColor: string;
  font: string;


  contentlength: string;
  logo: string;
  favicon: string;

  buttonStyle: string;
  brandTone: string;
  containerWidth: string;
  sectionSpacing: string;
  borderRadius: string;

  headingSize: string;//
  fontWeight: string;// add if need
  lineSpacing: string;//

  activepages: string[];
  sections: string[];

  animationStyle: string;
  page?:string;
}

