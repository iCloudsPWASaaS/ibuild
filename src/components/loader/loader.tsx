import Weblifyloader from '../../../public/assets/Animations/weblifyloader.json'
import Lottie from 'lottie-react'

interface LoaderProps {
    show: boolean;
}

const Loader = ({ show }: LoaderProps) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-9999">
            <div className="w-55 md:w-100">
                <Lottie
                    animationData={Weblifyloader}
                    loop={true}
                />
            </div>
        </div>
    )
}

export default Loader