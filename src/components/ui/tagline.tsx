import { motion } from 'framer-motion'
import { useTagline } from '../../hooks/useTagline'

const SparkleIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5 md:w-6 md:h-6 text-white"
    >
        <path d="M9 5L11 11L17 13L11 15L9 21L7 15L1 13L7 11L9 5Z M19 2L20 4L22 5L20 6L19 8L18 6L16 5L18 4L19 2Z" />
    </svg>
)

const MarqueeItem = ({ text }: { text: string }) => (
    <div className="mx-4 md:mx-6 py-4">
        <div className="relative flex items-center">
            <div className="relative z-20 flex items-center justify-center w-12 h-12 md:w-11 md:h-11 rounded-full bg-tagline ">
                <div className="w-9 h-9 md:w-8 md:h-8 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full gradient-primary hover-primary flex items-center justify-center">
                        <SparkleIcon />
                    </div>
                </div>
            </div>
            <div className='join-gap'></div>

            <div className="  h-9 md:h-10 pl-6 pr-8 flex items-center rounded-full bg-tagline  relative z-10 " >
                <span className="font-bold text-[10px] md:text-xs tracking-[0.15em] badge-hero-primary   whitespace-nowrap">
                    {text}
                </span>
            </div>
        </div>
    </div>
)

export function Tagline() {
    const { data } = useTagline()

    return (
        <section className="w-full py-6 md:py-8 overflow-hidden flex items-center relative">

            <div className="absolute left-0 top-0 bottom-0 w-24 z-30 bg-gradient-to-r from-[var(--bg-light-gray-50)] dark:from-[var(--bg-deep-dark)] to-transparent pointer-events-none" />

            <div className="absolute right-0 top-0 bottom-0 w-24 z-30 bg-gradient-to-l from-[var(--bg-light-gray-50)] dark:from-[var(--bg-deep-dark)] to-transparent pointer-events-none" />

            <div className="flex w-full">
                <motion.div
                    className="flex flex-nowrap items-center"
                    animate={{ x: "-50%" }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 35,
                    }}
                    style={{ width: "fit-content" }}
                >
                    {data?.map((text: any, index: number) => (
                        <MarqueeItem key={index} text={text} />
                    ))}
                </motion.div>
            </div>
        </section>
    )
}   