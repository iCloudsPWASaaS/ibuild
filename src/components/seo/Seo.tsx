import React from "react";
import { HeadProvider } from 'react-head';
import { APIURL } from "../../api/apiurl";
import { useseo } from "../../hooks/useSeo";
import { useGeneraldata } from "../../hooks/useGeneral";

interface SeoProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    author?: string;
    page?: string;
}
interface SeoDataState {
    title: string;
    description: string;
    keywords: string;
    image?: string;
    url?: string;
    author: string;
    favicon?: string;
}
interface SeoApiItem {
    type: string;
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
}
const Seo: React.FC<SeoProps> = ({
    title = "IClouds AI — get everyday work done with AI",
    description = "Tell IClouds AI what you need. Choose a service, explain it in plain English, and let AI prepare the steps, helpers and reminders.",
    keywords = "IClouds AI, AI services, AI usage, AI helpers, automation, everyday tasks, AI assistant",
    image,
    url,
    author = "IClouds AI",
    page = ""
}) => {
    const fronturl = APIURL.FRONT_URL;
    const { data: seoApiData } = useseo();
    const { data: generalData } = useGeneraldata();


    const pageSeo = page ? seoApiData?.find((item: SeoApiItem) => item.type === page) : undefined;
    const seoData: SeoDataState = {
        title: pageSeo?.metaTitle || title,
        description: pageSeo?.metaDescription || description,
        keywords: pageSeo?.metaKeywords || keywords,
        image: image,
        url: url,
        author: author,
        favicon: ""
    };

    const faviconUrl = generalData?.favicon
        ? `${APIURL.BASE_URL}${generalData.favicon}`
        : "icon/favicon.ico";
    return (
        <HeadProvider>
            <title>{seoData?.title}</title>
            {seoData?.description && <meta name="description" content={seoData?.description} />}
            {seoData?.keywords && <meta name="keywords" content={seoData?.keywords} />}
            <meta name="author" content={author} />

            <meta property="og:type" content="website" />
            <meta property="og:title" content={seoData.title} />
            <meta property="og:description" content={seoData.description} />
            {url && <meta property="og:url" content={`${fronturl}${url}`} />}
            {image && <meta property="og:image" content={image} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={seoData.title} />
            <meta name="twitter:description" content={seoData.description} />
            {image && <meta name="twitter:image" content={image} />}

            <link rel="icon" type="image/png" href={`${faviconUrl || ""}`} />
        </HeadProvider>
    );
};
export default Seo;
