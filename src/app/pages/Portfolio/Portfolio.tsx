
import { CreationSection, Footer, Header, } from "../../../components";



export default function PortfolioPage() {


    return (
        <div className="min-h-screen bg-background">
            <Header isWhite={true} />
            <div className="-mt-32">
                <CreationSection varient="hero" showAll={true} />
            </div>
            <Footer />
        </div>
    );
}