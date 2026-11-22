
import { FAQSection, Footer, Header } from "../../../components"
import Seo from "../../../components/seo/Seo"
import { FAQ_ROUTE } from "../../../helper/routes"
export function FaqPage() {

    return (
        <>
            <Seo url={FAQ_ROUTE}/>
            <Header />
            <FAQSection variant="hero" />
            <Footer />
        </>
    )

}