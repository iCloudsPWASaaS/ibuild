import { useState } from "react";
import { Header, Footer, FAQSection, FeaturesSection, HowItWorksSection } from "../../../components/index";
import Seo from "../../../components/seo/Seo";
import { HOW_IT_WORK_ROUTE } from "../../../helper/routes";

export const Howitwork = () => {
        const [isMinLoading, setIsMinLoading] = useState(false);
    
    return (
        <>
            <Seo url={HOW_IT_WORK_ROUTE} page="howitwork"/>
            <Header isWhite={true} loading={isMinLoading} />
            <div className="-mt-20">
                <HowItWorksSection headerVariant="hero" setIsMinLoading={setIsMinLoading} />
            </div>
            <FeaturesSection />
            <FAQSection />
            <Footer />
        </>
    )
}