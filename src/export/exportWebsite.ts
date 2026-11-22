import { renderPage } from "./renderPage";
import { getCSS } from "./getCSS";
import { darkenColor, fontString, getAllFontsArray, getButtonstyleValue, getContainerWidthValue, getRadiusValue, getSectionSpacingValue, lightenColor } from "../helper/function";
const { style, animations, designstyle } = await getCSS();

function getDesignStyleCSS(selectedStyle: any) {
  var styleCSS = designstyle;
  const regex = new RegExp(
    `\\[data-design-style="${selectedStyle}"\\]\\s*{[^}]*}`,
    "g"
  );

  const match = styleCSS.match(regex);
  return match ? match.join("\n") : "";
}
function generateThemeCSS(preferences: any) {
  const radiusValue = getRadiusValue(preferences?.borderRadius) ?? "18px";
  const containerValue = getContainerWidthValue(preferences?.containerWidth) ?? "1440px";
  const spacingValue = getSectionSpacingValue(preferences?.sectionSpacing) ?? "180px";
  const buttonValue = getButtonstyleValue(preferences?.buttonStyle) ?? "10px";

  return `
:root {
  --primary-color-rgb: ${preferences?.primaryColor};
  --secondary-color-rgb: ${preferences?.secondaryColor};
  --text-color: ${preferences?.accent};
  --background-color: ${preferences?.backgroundColor};

  --color-gray-900: ${preferences?.accent};
  --color-gray-800: ${lightenColor(preferences?.accent, 0.55)};
  --color-gray-700: ${lightenColor(preferences?.accent, 0.25)};
  --color-gray-600: ${lightenColor(preferences?.accent, 0.5)};

  --primary-color-dark: ${darkenColor(preferences?.primaryColor, 0.7)};
  --primary-color-light: ${lightenColor(preferences?.primaryColor, 0.7)};
  --secondary-color-light: ${lightenColor(preferences?.secondaryColor, 0.1)};

  --radius: ${radiusValue};
  --container-width: ${containerValue};
  --section-spacing: ${spacingValue};
  --button-radius: ${buttonValue};
}
`;
}

function generateFontCSS(preferences: any) {
  const fonts: Record<string, Record<string, string>> = getAllFontsArray(true);

  const fontName = preferences?.font?.toLowerCase() || "inter";
  const selectedFont = fonts[fontName];

  if (!selectedFont) return "";

  return fontString(selectedFont);
}


function generateFinalCSS(preferences: any) {
  const selectedStyleCSS = getDesignStyleCSS(preferences?.designStyle);
  return `
${generateThemeCSS(preferences)}
${generateFontCSS(preferences)}
${selectedStyleCSS}
${style}
`;
}
export default function buildExportPayload(websiteData: any, preferences: any) {

const pagearray = preferences?.activepages ?? [];
   const finalPage = websiteData.pages.filter((item:any) => pagearray.includes(item.id));


  const pages = finalPage.map((page: any) => ({
    name: page.name,
    fileName: `${page.slug}.html`,
    html: renderPage(page, preferences),
  }));

  return {
    pages,
    css: generateFinalCSS(preferences),
    animations: animations,
  };
}
