import { useRef } from "react";
import type { WebsitePreferences } from "../app/types/website";
import SectionRenderer from "../engine/SectionRenderer"

interface CanvasProps {
    preferences: WebsitePreferences;
    websiteData: any;
}

export function Canvas({
    preferences,
    websiteData
}: CanvasProps) {

    function SectionWrapper({ id, children, type }: any) {
        const ref = useRef<HTMLIFrameElement | null>(null);

        // 🔥 Hover detect
        const handleMouseEnter = () => {
            if (!ref.current) return;

            const rect = ref?.current?.getBoundingClientRect();

            window?.parent?.postMessage(
                {
                    type: "SECTION_HOVER",
                    sectionid: id,
                    rect: {
                        top: rect.top,
                        height: rect.height,
                    },
                },
                "*"
            );
        };

        return (
            <div
            key={id}
                ref={ref}
                data-index={id}
                onMouseEnter={handleMouseEnter}
                id={type ?? id}
            >
                {children}
            </div>
        );
    }
    return (

        <div className={`mx-auto transition-all duration-300`}>
            <div className="background-color website-theme">
                {
                    websiteData?.map((section: any, i: number) => (
                        <SectionWrapper id={section?.id} key={i} type={section?.type}  >
                            <SectionRenderer
                                key={i}
                                section={section}
                                preferences={preferences}
                            />
                        </SectionWrapper>
                    ))}
            </div>
        </div>

    );
}