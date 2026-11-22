import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import type { WebsitePreferences } from "../../types/website";
import { Canvas } from "../../../editor";
import { darkenColor, fontString, getAllFontsArray, getButtonstyleValue, getContainerWidthValue, getRadiusValue, getSectionSpacingValue, lightenColor, setPreferencesData } from "../../../helper/function";
import { useWebDetailsydata } from "../../../hooks/useWebhistory";
import "../../../../public/website/designstyle.css";
import "../../../../public/website/theme.css";
import { GeneratingLoader } from "../../../components/customizer/GeneratingLoader";
import Seo from "../../../components/seo/Seo";
// KEEP THIS SAME
const fonts: Record<string, Record<string, string>> = getAllFontsArray(false);

export function WebiframePreview() {
    const { id, page } = useParams();
    const { data } = useWebDetailsydata(id);
    const [preferences, setPreferences] = useState<WebsitePreferences>();
    const [websiteData, setWebsiteData] = useState([]);

    function applyWebsiteSettings(preferences: any) {
        const themeElement = document.querySelector(".website-theme") as HTMLElement;

        if (!themeElement) return;
        /* =========================
           THEME COLORS
        ========================= */
        themeElement.style.setProperty("--primary-color-rgb", preferences?.primaryColor);
        themeElement.style.setProperty("--secondary-color-rgb", preferences?.secondaryColor);
        themeElement.style.setProperty("--text-color", preferences?.accent);
        themeElement.style.setProperty("--background-color", preferences?.backgroundColor);
        themeElement.style.setProperty("--color-gray-900", preferences?.accent);
        themeElement.style.setProperty("--color-gray-800", lightenColor(preferences?.accent, 0.55));
        themeElement.style.setProperty("--color-gray-700", lightenColor(preferences?.accent, 0.25));
        themeElement.style.setProperty("--color-gray-600", lightenColor(preferences?.accent, 0.5));
        themeElement.style.setProperty("--primary-color-dark", darkenColor(preferences?.primaryColor, 0.7));
        themeElement.style.setProperty("--primary-color-light", lightenColor(preferences?.primaryColor, 0.7));
        themeElement.style.setProperty("--secondary-color-light", lightenColor(preferences?.secondaryColor, 0.1));
        themeElement.setAttribute("data-design-style", preferences?.designStyle);

        /* =========================
           BORDER RADIUS
        ========================= */
        const radiusValue = getRadiusValue(preferences?.borderRadius);
        themeElement.style.setProperty("--radius", radiusValue ?? "18px");
        /* =========================
           CONTAINER WIDTH
        ========================= */
        const containerValue = getContainerWidthValue(preferences?.containerWidth);
        themeElement.style.setProperty("--container-width", containerValue ?? "1440px");

        /* =========================
           SECTION SPACING
        ========================= */
        const spacingValue = getSectionSpacingValue(preferences?.sectionSpacing);
        themeElement.style.setProperty("--section-spacing", spacingValue ?? "180px");

        /* =========================
           BUTTON STYLE
        ========================= */
        const buttonValue = getButtonstyleValue(preferences?.buttonStyle);
        themeElement.style.setProperty("--button-radius", buttonValue ?? "10px");


        const fontName = preferences?.font?.toLowerCase() || "inter";
        const selectedFont = fonts[fontName];

        if (!selectedFont) return;

        const styleId = "dynamic-font-style";
        let styleTag = document.getElementById(styleId) as HTMLStyleElement;

        if (!styleTag) {
            styleTag = document.createElement("style");
            styleTag.id = styleId;
            document.head.appendChild(styleTag);
        }

        styleTag.innerHTML = fontString(selectedFont);
    }
    function initScrollAnimations() {
        const elements = document.querySelectorAll(".scroll-animation");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("scroll-show");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15
        });

        elements.forEach(el => observer.observe(el));
    }
    function applyContentSettings(config: any) {
        const el = document.querySelector("[data-field='data-site-name']");
        if (el instanceof HTMLElement) {
            el.innerText = config.websiteName;
        }
    }
    useEffect(() => {
        window.addEventListener("message", (event) => {
            if (event.data.type === "UPDATE_WEBSITE") {
                const config = event.data.payload;
                setPreferences({ ...config, page: page })
                applyWebsiteSettings(config)
                applyContentSettings(config)
            }

            if (event.data.type === "SCROLL_TO_SECTION") {
                const el = document.querySelector(
                    `[data-index="${event.data.sectionid}"]`
                );

                if (el) {
                    el.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }
            }
            if (event.data.type === "UPDATE_PAGE_DATA") {
                setWebsiteData(event.data.sections);
            }
        });
    }, []);

    useEffect(() => {
        if (data?.data?.name) {
            var newData = setPreferencesData(data)
            setPreferences({ ...newData, page: page })
            if (data?.data?.config?.pages) {
                var datacheck = data?.data?.config?.pages?.find((p:any) => p.id.toLowerCase() === page?.toLowerCase());
                setWebsiteData(datacheck?.sections)
            }
        }
    }, [data?.data]);

    useEffect(() => {
        if (preferences && preferences?.websiteName != "") {
            initScrollAnimations();
            applyWebsiteSettings(preferences);
        }
    }, [preferences]);

    useEffect(() => {
        if (websiteData) {
            initScrollAnimations();
        }
    }, [websiteData]);

    function useSectionScroll() {
        useEffect(() => {
            const handleScroll = () => {
                const sections = document.querySelectorAll("[data-index]");
                let closestSection = null;
                let closestDistance = Infinity;
                let closestRect = {
                    top: 0,
                    height: 0
                };

                const viewportCenter = window.innerHeight / 2;

                sections.forEach((el) => {
                    const rect = el.getBoundingClientRect();

                    const sectionCenter = rect.top + rect.height / 2;
                    const distance = Math.abs(viewportCenter - sectionCenter);

                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestSection = el.getAttribute("data-index");
                        closestRect = rect;
                    }
                });

                if (closestSection !== null) {
                    window.parent.postMessage(
                        {
                            type: "SECTION_ACTIVE",
                            sectionid: closestSection,
                            rect: {
                                top: closestRect.top,
                                height: closestRect.height,
                            },
                        },
                        "*"
                    );
                }
            };

            window.addEventListener("scroll", handleScroll);

            return () => {
                window.removeEventListener("scroll", handleScroll);
            };
        }, []);
    }

    useSectionScroll()
    return (
        <>
            <Seo url={"/"} />
            {(preferences && preferences?.websiteName != "") ?
                <Canvas
                    preferences={preferences}
                    websiteData={websiteData.filter((section: any) => section?.visible !== false)}
                />
                :
                <GeneratingLoader />
            }
        </>
    );
}
