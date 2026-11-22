import { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ArrowUp, User, LogOut, LayoutDashboard, ChevronDown, Globe, User2, Ticket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { APIURL } from "../../api/apiurl";
import Loader from "../loader/loader";
import {
    HOME_ROUTE,
    USER_DASHBOARD_ROUTE, LOGIN_ROUTE,
    PROFILE_SETTING_ROUTE,
    WEBSITE_HISTORY_ROUTE,
    SUPPORT_TICKETS_ROUTE
} from "../../helper/routes";
import { useGeneraldata } from "../../hooks/useGeneral";
import { getuserdata } from "../../api/baseapi";

function getSubdomain(): string | null {
    const hostname = window.location.hostname;

    if (hostname.includes("localhost")) {
        const parts = hostname.split(".");
        return parts.length > 1 ? parts[0] : null;
    }

    const parts = hostname.split(".");
    return parts.length > 2 ? parts[0] : null;
}




type HeaderUser = {
    firstName?: string;
    lastName?: string;
    email?: string;
    avatar?: string;
    image?: string;
};

export function Header({ isWhite = false, loading = false, brandName }: { isWhite?: boolean; loading?: boolean; brandName?: string }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const { data } = useGeneraldata()
    const subdomain = getSubdomain();

    const [user, setUser] = useState<HeaderUser | null>(() => {
        try {
            const storedUser = localStorage.getItem("userData");
            return storedUser ? (JSON.parse(storedUser) as HeaderUser) : null;
        } catch {
            return null;
        }
    });
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);
    const baseurl = APIURL.BASE_URL;

    useEffect(() => {
        if (data?.Currency) {
            localStorage.setItem("currency", data?.Currency)
        }
        if (data?.currencysymbol) {
            localStorage.setItem("currencySymbol", data?.currencysymbol)
        }
    }, [data]);

    useEffect(() => {
        // Route change par latest data lao
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) return;
        getuserdata(accessToken).then((res) => {
            const user = res?.user;
            if (user && (user.emailVerified == 0 || user.status == 0)) {
                //  handleLogout()
                localStorage.removeItem("userData",);
                localStorage.removeItem("accessToken");
                setUser(null);
                setIsProfileOpen(false);
                setIsOpen(false);
                setUser(null);
                setIsProfileOpen(false);
                setIsOpen(false);
                localStorage.clear();
                navigate(LOGIN_ROUTE);

            }
        }).catch(() => {
            localStorage.removeItem("userData",);
            localStorage.removeItem("accessToken");
            setUser(null);
            setIsProfileOpen(false);
            setIsOpen(false);
            setUser(null);
            setIsProfileOpen(false);
            setIsOpen(false);
            localStorage.clear();
            navigate(LOGIN_ROUTE);
        });
    }, [location.pathname, navigate]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
            setShowScrollTop(window.scrollY > 300);
        };
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleLogout = () => {
        localStorage.removeItem("userData",);
        localStorage.removeItem("accessToken");
        setUser(null);
        setIsProfileOpen(false);
        setIsOpen(false);
        setUser(null);
        setIsProfileOpen(false);
        setIsOpen(false);
        navigate(LOGIN_ROUTE);
        localStorage.clear();

    };

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    const useLightBannerHeader = isWhite && !isScrolled;

    return (
        <>
            {/* Update: Passed the loading prop to Loader */}
            {loading && <Loader show={loading} />}

            <header className={`fixed top-0 left-0 w-full z-50 py-2 backdrop-blur-md transition-all duration-300 border-b ${isScrolled ? "bg-white/85 dark:bg-black/50 border-gray-200 dark:border-white/5" : useLightBannerHeader ? "bg-white/55 border-black/5" : "bg-transparent border-transparent"}`}>
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link to={HOME_ROUTE} className="flex items-center gap-2" onClick={closeMenu}>
                        {brandName ? (
                            <div className="flex items-center gap-3">
                                <img src="/logo.png" alt="IClouds AI logo" className="h-12 w-12 object-contain" />
                                <div className="flex flex-col leading-none gap-1">
                                    <span className="agi-display text-2xl tracking-[0.16em] uppercase text-primary">
                                        {brandName}
                                    </span>
                                    <span className="text-[10px] font-semibold tracking-[0.16em] uppercase text-muted-foreground">
                                        AI services made simple
                                    </span>
                                </div>
                            </div>
                        ) : subdomain === "ipro" ? (
                            <div className="flex flex-col leading-none gap-0.5">
                                <span className="text-2xl font-black tracking-[0.2em] uppercase text-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
                                    IPRO
                                </span>
                                <span className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground">
                                    Property Rent Manager
                                </span>
                            </div>
                        ) : subdomain === "iflow" ? (
                            <div className="flex flex-col leading-none gap-0.5">
                                <span className="text-2xl font-black tracking-[0.2em] uppercase text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                    RestFlow
                                </span>
                                <span className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground">
                                    Restaurant Technology
                                </span>
                            </div>
                        ) : subdomain === "imax" ? (
                            <div className="flex flex-col leading-none gap-0.5">
                                <span className="text-2xl font-black tracking-[0.04em] text-foreground" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                                    iClouds <span className="text-red-500">Retail</span>Max
                                </span>
                                <span className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground">
                                    PC On. Retail Business On.
                                </span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <img src="/logo.png" alt="IClouds AI logo" className="h-12 w-12 object-contain" />
                                <div className="flex flex-col leading-none gap-1">
                                    <span className="agi-display text-2xl tracking-[0.16em] uppercase text-primary">
                                        IClouds AI
                                    </span>
                                    <span className="text-[10px] font-semibold tracking-[0.16em] uppercase text-muted-foreground">
                                        AI services made simple
                                    </span>
                                </div>
                            </div>
                        )}
                    </Link>

                    <nav className="hidden md:flex items-center gap-1">
                        {/* {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                end={link.path === HOME_ROUTE}
                                className="relative px-4 py-1 text-sm font-medium transition-colors rounded-full group"
                            >
                                {({ isActive }) => (
                                    <>
                                        {isActive && (
                                            <motion.div
                                                layoutId="active-nav-pill"
                                                className="absolute inset-0 bg-blue-soft rounded-full"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                        <span
                                            className={`relative z-10 transition-colors ${isActive
                                                ? "badge-hero-primary font-semibold"
                                                : useWhiteText
                                                    ? "text-white hover:text-white/80"
                                                    : "text-primary2 group-hover:text-primary"
                                                }`}
                                        >
                                            {link.label}
                                        </span>
                                        {isActive && (
                                            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 gradient-primary rounded-full shadow-[0_0_8px_2px_rgba(var(--primary),0.5)]"></span>
                                        )}
                                    </>
                                )}
                            </NavLink>
                        ))} */}

                        {user ? (
                            <div className="relative pl-2" ref={profileRef}>
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none"
                                >
                                    <div className="h-9 w-9 rounded-full overflow-hidden border border-black/10 bg-white/70 flex items-center justify-center">
                                        {user?.avatar && user?.avatar != "" ? (
                                            <img src={baseurl + user?.avatar} alt={user?.firstName} className="h-full w-full object-cover" />
                                        ) : (
                                            <User className="h-5 w-5 text-primary2" />
                                        )}
                                    </div>
                                    <span className="text-sm font-medium hidden lg:block text-primary2">
                                        {user.firstName}
                                    </span>
                                    <ChevronDown className={`w-4 h-4 text-primary2 transition-transform ${isProfileOpen ? "rotate-180" : ""}`} />
                                </button>

                                <AnimatePresence>
                                    {isProfileOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute right-0 mt-2 w-56 bg-white dark:bg-[var(--bg-dark)] rounded-xl shadow-xl border border-gray-100 dark:border-white/10 overflow-hidden py-1 z-50"
                                        >
                                            <div className="px-4 py-3 border-b border-gray-100 dark:border-white/5">
                                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                    {user?.firstName} {user?.lastName}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                    {user?.email}
                                                </p>
                                            </div>

                                            <div className="py-1">
                                                <Link
                                                    to={USER_DASHBOARD_ROUTE}
                                                    onClick={() => setIsProfileOpen(false)}
                                                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5"
                                                >
                                                    <LayoutDashboard className="w-4 h-4" />
                                                    Dashboard
                                                </Link>
                                                  <Link
                                                    to={PROFILE_SETTING_ROUTE}
                                                    onClick={() => setIsProfileOpen(false)}
                                                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5"
                                                >
                                                    <User2 className="w-4 h-4" />
                                                    My Profile
                                                </Link>
                                                 <Link
                                                    to={WEBSITE_HISTORY_ROUTE}
                                                    onClick={() => setIsProfileOpen(false)}
                                                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5"
                                                >
                                                    <Globe className="w-4 h-4" />
                                                    Website History
                                                </Link>
                                                 <Link
                                                    to={SUPPORT_TICKETS_ROUTE}
                                                    onClick={() => setIsProfileOpen(false)}
                                                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5"
                                                >
                                                    <Ticket className="w-4 h-4" />
                                                    Support
                                                </Link>
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10"
                                                >
                                                    <LogOut className="w-4 h-4" />
                                                    Logout
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link to={LOGIN_ROUTE}>
                                <Button size="sm" className="gradient-primary shadow-lg shadow-primary/20">Sign In</Button>
                            </Link>
                        )}
                    </nav>

                    <div className="md:hidden flex items-center gap-4">
                        <button
                            className="p-2 focus:outline-none text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                            onClick={toggleMenu}
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-[var(--bg-dark)] border-b border-gray-200 dark:border-white/5 shadow-xl p-4 flex flex-col gap-2"
                    >
                        {user && (
                            <div className="flex flex-col gap-2 px-4 py-3 border-b border-gray-100 dark:border-white/5 mb-2 bg-gray-50 dark:bg-white/5 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200 dark:bg-white/10 flex items-center justify-center">
                                        {user.image ? (
                                            <img src={user.image} alt={user.firstName} className="h-full w-full object-cover" />
                                        ) : (
                                            <User className="h-6 w-6 text-gray-500 dark:text-gray-300" />
                                        )}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-gray-900 dark:text-white">{user.firstName} {user.lastName}</span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">{user.email}</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                    <Link
                                        to={USER_DASHBOARD_ROUTE}
                                        onClick={closeMenu}
                                        className="flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md bg-white dark:bg-black border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white"
                                    >
                                        <LayoutDashboard className="w-4 h-4" />
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                end={link.path === HOME_ROUTE}
                                onClick={closeMenu}
                                className={({ isActive }) =>
                                    `block px-4 py-3 text-base font-medium rounded-lg transition-all ${isActive
                                        ? "bg-primary/10 text-primary border border-primary/20"
                                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-primary"
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))} */}
                        <div className="h-px bg-gray-200 dark:bg-white/5 my-2"></div>

                        {!user && (
                            <Link to={LOGIN_ROUTE} onClick={closeMenu} className="w-full">
                                <Button className="w-full gradient-primary">Sign In</Button>
                            </Link>
                        )}
                    </motion.div>
                )}
            </header>

            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        onClick={scrollToTop}
                        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 p-3 rounded-full gradient-primary text-white shadow-md shadow-blue-800 hover:shadow-xl hover-primary hover:-translate-y-1 transition-all duration-300"
                        aria-label="Back to Top"
                    >
                        <ArrowUp className="w-6 h-6" />
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    );
}