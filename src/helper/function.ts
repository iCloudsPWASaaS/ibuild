import { APIURL } from "../api/apiurl";
import { categoryColorMap, categoryKeywords } from "./data";

const backendiUrl = APIURL.BASE_URL;
export const getViewModeClass = (viewMode: string) => {
    switch (viewMode) {
        case "desktop":
            return "w-full";
        case "tablet":
            return "w-[47rem] mx-auto";
        case "mobile":
            return "w-[375px] mx-auto";
        default:
            return "w-full";
    }
};
export const validateEmail = (value = "") => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
};

export function hexToRgb(hex: any) {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
}

export function hexToRgbColor(hex: any) {
    const bigint = parseInt(hex.replace("#", ""), 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255,
    };
}

export function rgbToHexColor(r: any, g: any, b: any) {
    return (
        "#" +
        [r, g, b]
            .map((x) => {
                const hex = x.toString(16);
                return hex.length === 1 ? "0" + hex : hex;
            })
            .join("")
    );
}

// lighten function
export function lightenColor(hex: any, percent: any) {
    const { r, g, b } = hexToRgbColor(hex);

    const newR = Math.min(255, Math.floor(r + (255 - r) * percent));
    const newG = Math.min(255, Math.floor(g + (255 - g) * percent));
    const newB = Math.min(255, Math.floor(b + (255 - b) * percent));

    return rgbToHexColor(newR, newG, newB);
}
// darken function
export function darkenColor(hex: any, percent: any) {
    const { r, g, b } = hexToRgbColor(hex);

    const newR = Math.max(0, Math.floor(r * (1 - percent)));
    const newG = Math.max(0, Math.floor(g * (1 - percent)));
    const newB = Math.max(0, Math.floor(b * (1 - percent)));

    return rgbToHexColor(newR, newG, newB);
}

export function getRadiusValue(radius: string) {
    switch (radius) {
        case "none":
            return "0px";
        case "small":
            return "18px";
        case "medium":
            return "30px";
        case "large":
            return "70px";
        default:
            return "18px";
    }
}

export function getContainerWidthValue(width: string) {
    switch (width) {
        case "narrow":
            return "1024px";
        case "standard":
            return "1280px";
        case "fullwidth":
            return "1440px";
        default:
            return "1440px";
    }
}

export function getSectionSpacingValue(spacing: string) {
    switch (spacing) {
        case "compact":
            return "50px";
        case "normal":
            return "90px";
        case "spacious":
            return "140px";
        default:
            return "140px";
    }
}

export function getButtonstyleValue(style: string) {
    switch (style) {
        case "rounded":
            return "12px";
        case "sharp":
            return "0px";
        case "pill":
            return "999px";
        default:
            return "10px";
    }
}

export function getAllFontsList() {
    return [{ key: "inter", value: "Inter" },
    { key: "poppins", value: "Poppins" },
    { key: "dmsans", value: "DMSans" },
    { key: "montserrat", value: "Montserrat" },
    { key: "raleway", value: "Raleway" },
    { key: "lato", value: "Lato" },
    { key: "playfairdisplay", value: "Playfair Display" },
    { key: "opensans", value: "Open Sans" },
    { key: "roboto", value: "Roboto" }]
}

export function getAllDesignStyleList() {
    return [
        { value: "modern", label: "Modern & Minimalist" },
        { value: "bold", label: "Bold & Vibrant" },
        { value: "elegant", label: "Elegant & Professional" },
        { value: "creative", label: "Creative & Artistic" },
        { value: "corporate", label: "Corporate & Traditional" },
    ];
}

export function getSingleDesignStyleData(value: string) {
    var datacheck = getAllDesignStyleList().find((p: any) => p.value.toLowerCase() === value?.toLowerCase());
    return datacheck ? datacheck.label : value;
}

export function getAllBrandToneList() {
    return [
        { value: "professional", label: "Professional" },
        { value: "friendly", label: "Friendly" },
        { value: "creative", label: "Creative" },
        { value: "corporate", label: "Corporate" },
    ];
}

export function getAllContentLengthList() {
    return [
        { value: "short", label: "Short" },
        { value: "medium", label: "Medium" },
        { value: "detailed", label: "Detailed" }
    ];
}
export function getAllBorderRadiusList() {
    return [
        { value: "none", label: "None" },
        { value: "small", label: "Small" },
        { value: "medium", label: "Medium" },
        { value: "large", label: "Large" }

    ];
}
export function getAllSectionSpacingList() {
    return [
        { value: "compact", label: "Compact" },
        { value: "normal", label: "Normal" },
        { value: "spacious", label: "Spacious" }

    ];
}
export function getAllContainerWidthList() {
    return [
        { value: "narrow", label: "Narrow" },
        { value: "standard", label: "Standard" },
        { value: "fullwidth", label: "Full Width" }

    ];
}
export function getAllButtonStyleList() {
    return [
        { value: "rounded", label: "Rounded" },
        { value: "sharp", label: "Sharp" },
        { value: "pill", label: "Pill" }

    ];
}
export function setPreferencesData(data: any) {

    var finaldata = data?.data?.config ?? {}
    var datatat = {
        websiteName: finaldata?.site?.websiteName ?? "",
        businessType: data?.data?.businessType ?? "",
        description: finaldata?.site?.description ?? "",
        industry: finaldata?.site?.industry ?? "",

        primaryColor: finaldata?.theme?.primaryColor,
        secondaryColor: finaldata?.theme?.secondaryColor,
        accent: finaldata?.theme?.accent,
        backgroundColor: finaldata?.theme?.backgroundColor ?? '#ffffff',

        font: finaldata?.typography?.font ?? "inter",
        headingSize: finaldata?.typography?.headingSize ?? "",
        fontWeight: finaldata?.typography?.fontWeight ?? "",
        lineSpacing: finaldata?.typography?.lineSpacing ?? "",

        containerWidth: finaldata?.layout?.containerWidth ?? "fullwidth",//Narrow,Standard,Full width
        borderRadius: finaldata?.layout?.borderRadius ?? "small",//None,Small,Medium,Large
        sectionSpacing: finaldata?.layout?.sectionSpacing ?? "compact",//Compact,Normal,Spacious

        logo: finaldata?.branding?.logo ? backendiUrl + "/" + APIURL.PREVIEW_PATH + "/" + data?.data?._id + "/" + finaldata?.branding?.logo : "",
        favicon: finaldata?.branding?.favicon ? backendiUrl + "/" + APIURL.PREVIEW_PATH + "/" + data?.data?._id + "/" + finaldata?.branding?.favicon : "",

        designStyle: finaldata?.ui?.designStyle ?? "modern",
        buttonStyle: finaldata?.ui?.buttonStyle ?? "rounded",//Rounded,Sharp,Pill
        brandTone: finaldata?.ui?.brandTone ?? "professional",
        contentlength: finaldata?.ui?.contentLength ?? "medium",

        animationStyle: finaldata?.animations?.style ?? "",

        activepages: data?.data?.userInput?.pages ?? ["home"],
        sections: data?.data?.userInput?.sections ?? ["hero"],
    };

    return datatat;
}
export function UpdateOriginalPreferencesData(preferences: any) {
    const fullPath = preferences?.logo;
    const logorelativePath = fullPath.includes(`img/`)
        ? fullPath.substring(fullPath.indexOf("img/"))
        : "";

    const fullPathfavicon = preferences?.favicon;
    const faviconrelativePath = fullPathfavicon.includes(`img/`)
        ? fullPathfavicon.substring(fullPathfavicon.indexOf("img/"))
        : "";


    var config = {
        site: {
            websiteName: preferences?.websiteName,
            description: preferences?.description,
            industry: preferences?.industry
        },
        branding: {
            logo: logorelativePath,
            favicon: faviconrelativePath,
        },
        theme: {
            primaryColor: preferences?.primaryColor,
            secondaryColor: preferences?.secondaryColor,
            accent: preferences?.accent,
            backgroundColor: preferences?.backgroundColor,
        },
        typography: {
            font: preferences?.font,
            headingSize: preferences?.headingSize,
            fontWeight: preferences?.fontWeight,
            lineSpacing: preferences?.lineSpacing,
        },
        layout: {
            containerWidth: preferences?.containerWidth,
            borderRadius: preferences?.borderRadius,
            sectionSpacing: preferences?.sectionSpacing
        },
        ui: {
            designStyle: preferences?.designStyle,
            buttonStyle: preferences?.buttonStyle,
            brandTone: preferences?.brandTone,
            contentLength: preferences?.contentlength
        },
        animations: {
            style: preferences?.animationStyle
        }
    }

    return {
        name: preferences?.websiteName,
        userInput: {
            pages: preferences?.activepages,
            sections: preferences?.sections
        },
        config: config
    }

}
export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
};

export function formatWebsiteName(name: string) {
    if (!name) return "";
    if (name.split(" ")?.length == 1) return name;
    return name
        .split(" ")
        .filter(Boolean)
        .map(word =>
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join("");
}

export const getRandomImage = (imagearray: any) => {
    return imagearray[Math.floor(Math.random() * imagearray.length)];
};
export const getIndaxImage = (imagearray: any, index: number) => {
    return imagearray[index];
};

export const getAllFontsArray = (exports = false) => {
    var path = exports ? "../" : "../../assets/";
    return {
        inter: {
            Regular: path + "fonts/inter/Inter_24pt-Regular.ttf",
            Medium: path + "fonts/inter/Inter_24pt-Medium.ttf",
            SemiBold: path + "fonts/inter/Inter_24pt-SemiBold.ttf",
            Bold: path + "fonts/inter/Inter_24pt-Bold.ttf",
            ExtraBold: path + "fonts/inter/Inter_24pt-ExtraBold.ttf",
        },
        poppins: {
            Regular: path + "fonts/poppins/Poppins-Regular.ttf",
            Medium: path + "fonts/poppins/Poppins-Medium.ttf",
            SemiBold: path + "fonts/poppins/Poppins-SemiBold.ttf",
            Bold: path + "fonts/poppins/Poppins-Bold.ttf",
            ExtraBold: path + "fonts/poppins/Poppins-ExtraBold.ttf",
        },
        dmsans: {
            Regular: path + "fonts/dmsans/DMSans_18pt-Regular.ttf",
            Medium: path + "fonts/dmsans/DMSans_18pt-Medium.ttf",
            SemiBold: "dmsans/fonts/DMSans_18pt-SemiBold.ttf",
            Bold: path + "fonts/dmsans/DMSans_18pt-Bold.ttf",
            ExtraBold: path + "fonts/dmsans/DMSans_18pt-ExtraBold.ttf",
        },
        montserrat: {
            Regular: path + "fonts/montserrat/Montserrat-Regular.ttf",
            Medium: path + "fonts/montserrat/Montserrat-Medium.ttf",
            SemiBold: path + "fonts/montserrat/Montserrat-SemiBold.ttf",
            Bold: path + "fonts/montserrat/Montserrat-Bold.ttf",
            ExtraBold: path + "fonts/montserrat/Montserrat-ExtraBold.ttf",
        },
        raleway: {
            Regular: path + "fonts/raleway/Raleway-Regular.ttf",
            Medium: path + "fonts/raleway/Raleway-Medium.ttf",
            SemiBold: path + "fonts/raleway/Raleway-SemiBold.ttf",
            Bold: path + "fonts/raleway/Raleway-Bold.ttf",
            ExtraBold: path + "fonts/raleway/Raleway-ExtraBold.ttf",
        },
        lato: {
            Regular: path + "fonts/lato/Lato-Regular.ttf",
            Medium: path + "fonts/lato/Lato-Regular.ttf",
            SemiBold: path + "fonts/lato/Lato-Bold.ttf",
            Bold: path + "fonts/lato/Lato-Bold.ttf",
            ExtraBold: path + "fonts/lato/Lato-Black.ttf",
        },
        opensans: {
            Regular: path + "fonts/opensans/OpenSans-Regular.ttf",
            Medium: path + "fonts/opensans/OpenSans-Medium.ttf",
            SemiBold: path + "fonts/opensans/OpenSans-SemiBold.ttf",
            Bold: path + "fonts/opensans/OpenSans-Bold.ttf",
            ExtraBold: path + "fonts/opensans/OpenSans-ExtraBold.ttf",
        },
        playfairdisplay: {
            Regular: path + "fonts/playfairdisplay/PlayfairDisplay-Regular.ttf",
            Medium: path + "fonts/playfairdisplay/PlayfairDisplay-Medium.ttf",
            SemiBold: path + "fonts/playfairdisplay/PlayfairDisplay-SemiBold.ttf",
            Bold: path + "fonts/playfairdisplay/PlayfairDisplay-Bold.ttf",
            ExtraBold: path + "fonts/playfairdisplay/PlayfairDisplay-ExtraBold.ttf",
        },
        roboto: {
            Regular: path + "fonts/roboto/Roboto-Regular.ttf",
            Medium: path + "fonts/roboto/Roboto-Medium.ttf",
            SemiBold: path + "fonts/roboto/Roboto-SemiBold.ttf",
            Bold: path + "fonts/roboto/Roboto-Bold.ttf",
            ExtraBold: path + "fonts/roboto/Roboto-ExtraBold.ttf",
        }
    };
};


export function fontString(selectedFont: any) {
    return `
@font-face {
  font-family: 'fontRegular';
  src: url('${selectedFont.Regular}');
}
@font-face {
  font-family: 'fontMedium';
  src: url('${selectedFont.Medium}');
}
@font-face {
  font-family: 'fontSemiBold';
  src: url('${selectedFont.SemiBold}');
}
@font-face {
  font-family: 'fontBold';
  src: url('${selectedFont.Bold}');
}
@font-face {
  font-family: 'fontExtraBold';
  src: url('${selectedFont.ExtraBold}');
}
`;
}
export const normalizeCategory = (text: any) => (text ?? "").toString().toLowerCase().replace(/[-\s]/g, "");


export const getCardColor = (type: any) => {
    const normalizedType = normalizeCategory(type);

    for (const key in categoryKeywords) {
        const keywords = (categoryKeywords as any)[key];
        if (keywords.some((word: any) => normalizedType.includes(word))) {
            return (categoryColorMap as any)[key];
        }
    }

    return "from-gray-400 to-gray-500"; // fallback
};

export const getExportHrefFinal = (finalurl: any,href:any, page: any, exportMode: boolean) => {
    let slug = exportMode ? finalurl != "" ? `${finalurl}` : "index.html" : "#"
    if (page == 1) {
        slug = "#" + href
        slug = slug.replace(/^#+/, "#");
    }
    return slug
};

export const getExportHref = (href: any, pageSlugs: any, exportMode: boolean) => {
    const slug = href?.replace("/", "").toLowerCase();
    const isHome = slug === "" || slug === "home";
    const exists = pageSlugs.includes(slug);

    let finalurl = (exists || isHome)
        ? isHome
            ? "index.html"
            : `${slug}.html`
        : "#";
    return getExportHrefFinal(finalurl,href, pageSlugs?.length, exportMode)
};

export const getSlugFromHref = (href: any) => {
    if (!href) return "home";

    const cleaned = href
        .replace(".html", "")
        .replace("/", "")
        .toLowerCase();
    // 🔥 IMPORTANT FIX
    if (cleaned === "" || cleaned === "index") {
        return "home";
    }
    return cleaned;
};