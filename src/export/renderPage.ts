import { renderToStaticMarkup } from "react-dom/server";
import SectionRenderer from "../engine/SectionRenderer";
import React from "react";

export function renderPage(page: any, preferences: any) {
  var preferences = { ...preferences, page: page?.id }
 let websiteData = page.sections.filter((section: any) => section?.visible !== false)
  const sectionsHTML = websiteData 

    .map((section: any) =>
      renderToStaticMarkup(
        React.createElement(SectionRenderer, {
          section: section,
          exportMode: true,
          preferences: preferences
        })
      )
    )
    .join("");

  const fixedHTML = sectionsHTML
    // ✅ remove leading slash
    .replace(/href="\/(?!\/)(.*?)"/g, 'href="./$1"')
    .replace(/src="\/(?!\/)(.*?)"/g, 'src="./$1"')

    // ✅ home.html → index.html
    .replace(/home\.html/g, "index.html")
    .replace("./.html", "index.html");

  return fixedHTML;
}