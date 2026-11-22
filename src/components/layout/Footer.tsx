import { useState, useRef, useEffect, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, ArrowRight } from "lucide-react";
import { FaYoutube } from "react-icons/fa";
import { useGeneraldata } from "../../hooks/useGeneral";
import { useNewsletter } from "../../hooks/useNewsletter";
import { toast } from "react-toastify";
import { BLOG_ROUTE, CONTACT_US_ROUTE, HOME_ROUTE, HOW_IT_WORK_ROUTE, LOGIN_ROUTE, PRICING_ROUTE, PRIVACY_POLICY_ROUTE, REGISTER_ROUTE, SECURITY_POLICY_ROUTE, TERMS_OF_SERVICE_ROUTE, WEBSITE_TYPE_ROUTE,PORTFOLIO_ROUTE } from "../../helper/routes";
import { validateEmail } from "../../helper/function";

export function Footer({ brandName }: { brandName?: string }) {
    const { data } = useGeneraldata()
    const displayBrandName = brandName || data?.companyname || "IClouds AI"

    const [email, setEmail] = useState("")
    const { mutate } = useNewsletter()
    const haldlesubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email")
    } else {
        const payload = {
            email: email
        }
        mutate(payload, {
            onSuccess: (data) => {
                toast.success(data?.message || "Subscribed successfully!")
                setEmail("")
            },
            onError: (error) => {
                toast.error(error?.message || "Subscribed Failed!")
            }
        })
    }
    }

  const containerRef = useRef<HTMLIFrameElement | null>(null);
  const textRef = useRef<SVGTextElement | null>(null);
  useEffect(() => {

    const container = containerRef.current;
    const textEl = textRef.current;

    if (!container || !textEl) return;
       const isDesktop = window.innerWidth >= 1024;
    let size = isDesktop ? 350 : container.offsetWidth * 0.9;

    textEl.style.fontSize = size + "px";
   const containerWidth = container.offsetWidth;
  const minSize = 40;
    // Reduce font size until text fits
    while (textEl.scrollWidth > containerWidth && size > minSize) {
      size -= 2;
      textEl.style.fontSize = size + "px";
    }
  }, [displayBrandName]);

    return (
        <footer ref={containerRef} className="relative bg-[var(--footer-bg)] text-[var(--footer-text)] pt-20 px-6 overflow-hidden font-sans border-t border-black/5">
            <div className="container px-4 mx-auto max-w-7xl relative z-10 mb-20 flex flex-col h-full">

                <div className="grid lg:grid-cols-5 gap-12 mb-5 md:mb-24">
                    <div className="lg:col-span-2 flex flex-col items-start">
                        <Link to="/" className="inline-block mb-6">
                           <div className="flex flex-col gap-1">
                                <span className="agi-display text-2xl tracking-[0.16em] uppercase text-primary">{displayBrandName}</span>
                               <span className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[var(--footer-text-muted)]">AI services made simple</span>
                           </div>
                        </Link>
                        <p className="text-sm text-[var(--footer-text-muted)] max-w-sm leading-relaxed">
                            {brandName ? "IClouds AI helps anyone turn a plain-English request into a clear plan, the right AI helpers and a service that is ready to run." : data?.aboutcompany}
                        </p>
                    </div>

                    <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8 w-full">
                        <div className="flex flex-col gap-4">
                            <h4 className="font-bold text-[var(--footer-text)] text-base">Explore</h4>
                            <ul className="space-y-3 text-sm text-[var(--footer-text-muted)]">
                                <li><Link to={HOME_ROUTE} className="hover:text-[var(--footer-text)] transition-colors">Home</Link></li>
                                <li><Link to={PRICING_ROUTE} className="hover:text-[var(--footer-text)] transition-colors">Pricing</Link></li>
                                <li><Link to={HOW_IT_WORK_ROUTE} className="hover:text-[var(--footer-text)] transition-colors">How it works</Link></li>
                                <li><Link to={BLOG_ROUTE} className="hover:text-[var(--footer-text)] transition-colors">Blog</Link></li>
                                <li><Link to={CONTACT_US_ROUTE} className="hover:text-[var(--footer-text)] transition-colors">Contact Us</Link></li>
                                <li><Link to={PORTFOLIO_ROUTE} className="hover:text-[var(--footer-text)] transition-colors">Portfolio</Link></li>
                            </ul>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h4 className="font-bold text-[var(--footer-text)] text-base">Policy Links</h4>
                            <ul className="space-y-3 text-sm text-[var(--footer-text-muted)]">
                                <li>
                                    <Link to={PRIVACY_POLICY_ROUTE} className="hover:text-[var(--footer-text)] transition-colors">Privacy Policy</Link>
                                </li>
                                <li>
                                    <Link to={SECURITY_POLICY_ROUTE} className="hover:text-[var(--footer-text)] transition-colors">Security Policy</Link>
                                </li>
                                <li>
                                    <Link to={TERMS_OF_SERVICE_ROUTE} className="hover:text-[var(--footer-text)] transition-colors">Terms of Service</Link>
                                </li>

                            </ul>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h4 className="font-bold text-[var(--footer-text)] text-base">Quick Link</h4>
                            <ul className="space-y-3 text-sm text-[var(--footer-text-muted)]">
                                <li><Link to={LOGIN_ROUTE} className="hover:text-[var(--footer-text)] transition-colors">Login</Link></li>
                                <li><Link to={REGISTER_ROUTE} className="hover:text-[var(--footer-text)] transition-colors">Sign Up</Link></li>
                                <li><Link to={WEBSITE_TYPE_ROUTE} className="hover:text-[var(--footer-text)] transition-colors">Describe an idea</Link></li>
                                <li><Link to={WEBSITE_TYPE_ROUTE} className="hover:text-[var(--footer-text)] transition-colors">Browse AI services</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12 border-b border-black/5 pb-10">
                    <h3 className="text-xl font-bold text-[var(--footer-text)] tracking-tight">
                        Get the latest updates from {displayBrandName}
                    </h3>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full md:w-auto">
                        <div className="relative w-full sm:w-95">
                            <form onSubmit={haldlesubmit} action="">
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email address"
                                    className="w-full h-12 pl-4 pr-32 bg-white rounded-lg text-sm text-[var(--footer-text)] placeholder:text-[var(--footer-text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-all border border-[var(--border)]"
                                />
                                <button type="submit" className="absolute right-2 top-1 bottom-1 px-4 flex items-center gap-2 rounded-md text-sm font-medium text-primary hover-primary transition-colors">
                                    Subscribe <ArrowRight className="w-4 h-4" />
                                </button>
                            </form>
                        </div>

                        <div className="flex gap-3">
                            {data?.linkedin && (
                                <a href={data?.linkedin ? data?.linkedin : "#"} target="_blank" className="gradient-primary hover-primary text-white p-2.5 rounded-full transition-transform hover:scale-105 flex items-center justify-center">
                                    <Linkedin className="w-5 h-5" />
                                </a>)}
                            {data?.twiter && (
                                <a href={data?.twiter ? data?.twiter : "#"} target="_blank" className="gradient-primary hover-primary text-white p-2.5 rounded-full transition-transform hover:scale-105 flex items-center justify-center">
                                    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current text-white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                                </a>)}
                            {data?.youtube && (
                                <a href={data?.youtube ? data?.youtube : "#"} target="_blank" className="gradient-primary hover-primary text-white p-2.5 rounded-full transition-transform hover:scale-105 flex items-center justify-center">
                                    <FaYoutube className="w-5 h-5" />
                                </a>
                            )}
                            {data?.facebook && (
                                <a href={data?.facebook ? data?.facebook : "#"} target="_blank" className="gradient-primary hover-primary text-white p-2.5 rounded-full transition-transform hover:scale-105 flex items-center justify-center">
                                    <Facebook className="w-5 h-5" />
                                </a>
                            )}
                            {data?.instagram && (
                                <a href={data?.instagram ? data?.instagram : "#"} target="_blank" className="gradient-primary hover-primary text-white p-2.5 rounded-full transition-transform hover:scale-105 flex items-center justify-center">
                                    <Instagram className="w-5 h-5" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6 pt-8 text-[var(--footer-text-muted)] text-sm pb-2">
                 
                    <p className="leading-relaxed">Copyright © <span className="text-primary">{displayBrandName}</span> {new Date().getFullYear()} All rights reserved.</p>
                    <div className="flex gap-8">
                        <Link to={PRIVACY_POLICY_ROUTE} className="hover:text-[var(--footer-text)] transition-colors">Privacy Policy</Link>
                        <Link to={SECURITY_POLICY_ROUTE} className="hover:text-[var(--footer-text)] transition-colors">Security Policy</Link>
                        <Link to={TERMS_OF_SERVICE_ROUTE} className="hover:text-[var(--footer-text)] transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>

         {/* {displayBrandName && <div className="absolute bottom-[-1%] left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-none select-none z-0">
                <svg
                    viewBox={"0 0 "+windowWidth+" 220"}
                    className="w-full h-auto max-h-[300px]"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <text
                        x="50%"
                        y="80%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="font-bold fill-[var(--watermark)]"
                        style={{ fontFamily: 'inherit' }}
                        ref={textRef}
                        fontSize={fontSize}
                    >
                        {displayBrandName}
                    </text>
                    <motion.text
                        x="50%"
                        y="80%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="font-bold fill-transparent stroke-[var(--primary-color2)]"
                        style={{
                            fontFamily: 'inherit',
                            strokeWidth: '2px',
                            strokeLinecap: 'round'
                        }}
                        initial={{ strokeDasharray: "20 600", strokeDashoffset: 0 }}
                        animate={{ strokeDashoffset: -2000 }}
                        transition={{
                            duration: 18,
                            ease: "linear",
                            repeat: Infinity
                        }}
                        fontSize={fontSize}
                    >
                        {displayBrandName}
                    </motion.text>
                </svg>
            </div>} */}
        </footer>
    );
}