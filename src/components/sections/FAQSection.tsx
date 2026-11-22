import { motion } from "motion/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Button } from "../ui/button";
import { SectionHeader } from "../ui/sectionheader";
import { useFaq } from "../../hooks/useFaq";
import { CONTACT_US_ROUTE } from "../../helper/routes";


export function FAQSection(varient: any) {

    const { data } = useFaq()

    return (
        <section id="faq" className="py-20  md:border-b relative overflow-hidden">
            <div className="faq-gradient-left" />
            <div className="faq-gradient-right" />

            <SectionHeader variant={varient?.variant} badge={data?.badge} special="" title={data?.title} description={data?.description} />
            <div className="mx-auto max-w-3xl relative px-4 z-10">

                <Accordion type="single" collapsible className="space-y-4" defaultValue="item-0">
                    {data?.items.map((faq:any, index:number) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            <AccordionItem value={`item-${index}`} className="border rounded-lg px-6 bg-white shadow-sm">
                                <AccordionTrigger className="hover:no-underline">
                                    <span className="font-medium text-left text-black text-[16px]">{faq.question}</span>
                                </AccordionTrigger>
                                <AccordionContent className="text-primary2 text-[16px]">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        </motion.div>
                    ))}
                </Accordion>

                <div className="mt-12 text-center p-8 rounded-xl border backdrop-blur-sm shadow-sm">
                    <h3 className="font-bold text-xl mb-2 text-black">Still have questions?</h3>
                    <p className="text-primary2 mb-4">Can't find the answer you're looking for? Our team is here to help.</p>
                    <Button path={CONTACT_US_ROUTE} className="gradient-primary text-white hover-primary">
                        Contact Support
                    </Button>
                </div>
            </div>
        </section>
    );
}