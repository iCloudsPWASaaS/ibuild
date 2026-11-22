import type { Dispatch, SetStateAction, RefObject } from "react";

interface AnimationParams {
    data: any;
    startLoop: boolean;
    sectionRef: RefObject<HTMLElement>;
    particlesContainerRef: RefObject<HTMLDivElement>;
    setWaveIndex: Dispatch<SetStateAction<number>>;
    setTrendingIndex: Dispatch<SetStateAction<number>>;
}

export const initHeroAnimations = ({
    data,
    startLoop,
    sectionRef,
    particlesContainerRef,
    setWaveIndex,
    setTrendingIndex,
}: AnimationParams) => {

    // Init intervals
    let loopInterval: number | undefined;

    if (startLoop) {
        loopInterval = window.setInterval(() => {
        }, 3500);
    }

    const waveInterval = window.setInterval(() => {
        setWaveIndex((prev) => (prev + 1) % data.stats.length);
    }, 1000);

    const trendingInterval = window.setInterval(() => {
        setTrendingIndex((prev) => (prev + 1) % data.stats.length);
    }, 3000);

    // Particle logic
    const particlesContainer = particlesContainerRef.current;
    const section = sectionRef.current;

    if (particlesContainer && section) {
        const particleCount = window.innerWidth < 768 ? 60 : 150;

        const animateParticle = (particle: HTMLElement) => {
            if (!particle.isConnected) return;

            const duration = Math.random() * 2 + 1;
            const currentLeft = parseFloat(particle.style.left);
            const currentTop = parseFloat(particle.style.top);

            const moveX = currentLeft + (Math.random() * 100 - 50);
            const moveY = currentTop - (Math.random() * 80 + 20);

            requestAnimationFrame(() => {
                particle.style.transition = `all ${duration}s linear`;
                particle.style.opacity = String(Math.random() * 0.4 + 0.2);
                particle.style.left = `${moveX}px`;
                particle.style.top = `${moveY}px`;
            });

            setTimeout(() => {
                if (!particle.isConnected) return;
                const rect = section.getBoundingClientRect();
                particle.style.transition = "none";
                particle.style.opacity = "0";
                particle.style.left = `${Math.random() * rect.width}px`;
                particle.style.top = `${Math.random() * rect.height}px`;
                requestAnimationFrame(() => animateParticle(particle));
            }, duration * 1000);
        };

        const createParticle = () => {
            const particle = document.createElement("div");
            particle.className = "particle text-gray-400 dark:text-white";
            const size = Math.random() * 3 + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            const rect = section.getBoundingClientRect();
            if (!rect.width) return;

            particle.style.left = `${Math.random() * rect.width}px`;
            particle.style.top = `${Math.random() * rect.height}px`;
            particle.style.opacity = "0";

            particlesContainer.appendChild(particle);
            setTimeout(() => animateParticle(particle), Math.random() * 2000);
        };

        for (let i = 0; i < particleCount; i++) {
            createParticle();
        }
    }

    // Mouse handler
    const handleMouseMove = (e: MouseEvent) => {
        if (window.innerWidth < 768 || !section || !particlesContainer) return;

        const rect = section.getBoundingClientRect();
        if (
            e.clientX < rect.left || e.clientX > rect.right ||
            e.clientY < rect.top || e.clientY > rect.bottom
        ) return;

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const particle = document.createElement("div");
        particle.className = "particle text-gray-500 dark:text-white";
        const size = Math.random() * 4 + 2;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x - size / 2}px`;
        particle.style.top = `${y - size / 2}px`;
        particle.style.opacity = "0.8";

        particlesContainer.appendChild(particle);

        requestAnimationFrame(() => {
            particle.style.transition = "all 1s ease-out";
            particle.style.left = `${x + (Math.random() * 50 - 25)}px`;
            particle.style.top = `${y + (Math.random() * 50 - 25)}px`;
            particle.style.opacity = "0";
        });

        setTimeout(() => particle.remove(), 1000);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup function
    return () => {
        if (loopInterval) clearInterval(loopInterval);
        clearInterval(waveInterval);
        clearInterval(trendingInterval);
        window.removeEventListener("mousemove", handleMouseMove);
        if (particlesContainer) particlesContainer.innerHTML = "";
    };
};


export const typingContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
};
export const typingLetterVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0 },
};
export const minutesContainerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
    exit: { transition: { staggerChildren: 0.08, staggerDirection: 1 } },
};
export const minutesLetterVariants = {
    hidden: { y: -50, opacity: 0, filter: "blur(8px)" },
    visible: { y: 0, opacity: 1, filter: "blur(0px)", transition: { type: "spring", damping: 12, stiffness: 120 } },
    exit: { x: 80, opacity: 0, filter: "blur(15px)", scale: 1.2, transition: { duration: 0.8, ease: "easeInOut" } }
};

export function getBrowserAndOS() {
    const ua = navigator.userAgent;

    let browserName = "Unknown";
    let browserVersion = "0.0.0";
    let osName = "Unknown";
    let osVersion = "0.0.0";

    // -------- Browser --------
    const chromeMatch = ua.match(/Chrome\/([\d.]+)/);
    const firefoxMatch = ua.match(/Firefox\/([\d.]+)/);
    const safariMatch = ua.match(/Version\/([\d.]+).*Safari/);

    if (chromeMatch) {
        browserName = ua.includes("Mobile") ? "Chrome Mobile" : "Chrome";
        browserVersion = chromeMatch[1];
    } else if (firefoxMatch) {
        browserName = ua.includes("Mobile") ? "Firefox Mobile" : "Firefox";
        browserVersion = firefoxMatch[1];
    } else if (safariMatch) {
        browserName = "Safari";
        browserVersion = safariMatch[1];
    }

    // -------- OS --------
    const androidMatch = ua.match(/Android\s([\d.]+)/);
    const iosMatch = ua.match(/OS\s([\d_]+)/);
    const windowsMatch = ua.match(/Windows NT\s([\d.]+)/);
    const macMatch = ua.match(/Mac OS X\s([\d_]+)/);

    if (androidMatch) {
        osName = "Android";
        osVersion = androidMatch[1];
    } else if (iosMatch) {
        osName = "iOS";
        osVersion = iosMatch[1].replace(/_/g, ".");
    } else if (windowsMatch) {
        osName = "Windows";
        osVersion = windowsMatch[1];
    } else if (macMatch) {
        osName = "macOS";
        osVersion = macMatch[1].replace(/_/g, ".");
    }

    return {
        browser: `${browserName} ${browserVersion}`,
        os: `${osName} ${osVersion}`,
    };
}


