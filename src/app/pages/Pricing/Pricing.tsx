import { useState } from "react";
import { Header, Footer, CTASection, PricingSection, ReviewsSection } from "../../../components/index";
import Seo from "../../../components/seo/Seo";
import { PRICING_ROUTE } from "../../../helper/routes";

export const Pricing = () => {
    const [isMinLoading, setIsMinLoading] = useState(false);

    return (
        <>
            <Seo url={PRICING_ROUTE} page="pricing"/>
            <Header isWhite={true} loading={isMinLoading} />
            <div className="-mt-20">
                <PricingSection headerVariant="hero" setIsMinLoading={setIsMinLoading} />
            </div>
            <ReviewsSection />
            <CTASection />
            <Footer />
        </>

    )
}