import { motion } from "motion/react";
import { Header, Footer, SectionHeader } from "../../../components/index";
import Seo from "../../../components/seo/Seo";
import { PRIVACY_POLICY_ROUTE } from "../../../helper/routes";
import { usePagedetails } from "../../../hooks/usePagedetails";

export function PrivacyPolicyPage() {

    const { data } = usePagedetails('privacy');

    return (
        <>
            <Seo url={PRIVACY_POLICY_ROUTE} />
            <div className="min-h-screen bg-white dark:bg-zinc-950">
                <Header isWhite={true} />
                <SectionHeader
                    variant="hero"
                    badge="Legal"
                    title="Privacy Policy"
                    description="Your privacy is our priority. Learn how we handle your data."
                />

                <main className="container mx-auto px-4 max-w-4xl py-16">
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="text-black ">
                            <div dangerouslySetInnerHTML={{ __html: data?.content || "" }} />
                        </div>
                    </motion.section>
                </main>
                <Footer />
            </div>
        </>
    );
}