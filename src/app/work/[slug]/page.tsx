"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Lenis from "lenis";

// --- Components from main page.tsx ---

const FadeInBlock = ({ as: Component = "div", children, className, style, threshold = 0.1, margin = "0px 0px -25% 0px", ...props }: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setIsVisible(true); });
    }, { threshold, rootMargin: margin });
    const curr = domRef.current;
    if (curr) observer.observe(curr);
    return () => { if (curr) observer.unobserve(curr); };
  }, [threshold, margin]);
  return (
    <Component ref={domRef} className={className} style={{ ...style, opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(40px)", transition: "opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)" }} {...props}>
      {children}
    </Component>
  );
};

const HoverMenuText = ({ text, hoverColor = "#DA5932" }: { text: string, hoverColor?: string }) => {
  return (
    <div className="group cursor-pointer relative" style={{ display: "inline-flex", overflow: "hidden", verticalAlign: "middle" }}>
      {text.split("").map((char, i) => (
        <span key={i} className="relative inline-flex flex-col group-hover:-translate-y-full transition-transform duration-300 ease-in-out" style={{ transitionDelay: `${i * 15}ms`, willChange: "transform" }}>
          <span style={{ whiteSpace: "pre" }}>{char}</span>
          <span className="absolute top-full left-0" style={{ color: hoverColor, whiteSpace: "pre" }}>{char}</span>
        </span>
      ))}
    </div>
  );
};

const GlobalGridLines = () => {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100vh", display: "flex", justifyContent: "center", pointerEvents: "none", zIndex: 3 }}>
      <div style={{ position: "relative", width: "1440px", height: "100%" }}>
        <div style={{ position: "absolute", left: "5.5px", top: 0, bottom: 0, width: "1px", background: "rgba(82, 82, 82, 0.12)" }} />
        <div style={{ position: "absolute", right: "5.5px", top: 0, bottom: 0, width: "1px", background: "rgba(82, 82, 82, 0.12)" }} />
      </div>
    </div>
  );
};

const HorizontalGridDivider = ({ position = "bottom" }: { position?: "top" | "bottom" }) => (
  <div style={{ position: "absolute", [position]: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: "1429px", height: "1px", background: "rgba(82, 82, 82, 0.12)", pointerEvents: "none", zIndex: 0 }} />
);

// --- Case Study Data ---

const CASE_STUDIES: Record<string, any> = {
  "zyrotech": {
    brand: "Meta Ads - Ecommerce",
    stat: "10.11x ROAS",
    revenue: "₹58k revenue on ₹5.7k spent",
    description: "Maintained elite-level returns on a lean budget with zero underperforming campaigns. Our strategy focused on micro-targeted audiences and automated bidding optimization.",
  },
  "subliminal": {
    brand: "Meta Ads - Ecommerce",
    stat: "6.83x Avg ROAS",
    revenue: "₹4.37L revenue generated",
    description: "Drove high purchase volume on Meta while keeping returns well above target. By leveraging psychological creative direction, we scaled the brand's volume without sacrificing return efficiency.",
  },
  "google-shopping": {
    brand: "Google Shopping - Ecommerce",
    stat: "3.41x Avg ROAS",
    revenue: "₹3.41L Revenue Generated",
    description: "Scaled Google Shopping profitably across multiple campaigns with consistent returns. We focused on high-intent search queries and product feed optimization for maximum conversion velocity.",
  }
};

export default function CaseStudyPage() {
  const params = useParams();
  const slug = params.slug as string;
  const data = CASE_STUDIES[slug] || CASE_STUDIES["zyrotech"];

  const [isScrolled, setIsScrolled] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.07, smoothWheel: true });
    lenisRef.current = lenis;
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    const rafId = requestAnimationFrame(raf);
    const handleScroll = () => { setIsScrolled(window.scrollY > 100); };
    window.addEventListener("scroll", handleScroll);
    return () => { window.removeEventListener("scroll", handleScroll); cancelAnimationFrame(rafId); lenis.destroy(); };
  }, []);

  return (
    <main className="w-full flex flex-col items-center box-border">
      <GlobalGridLines />
      
      {/* Nav */}
      <nav style={{ position: "fixed", top: "32px", left: "50%", transform: "translateX(-50%)", zIndex: 50, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", width: "1144px", height: "52px", background: isScrolled ? "rgba(22, 22, 22, 0.7)" : "transparent", backdropFilter: isScrolled ? "blur(16px)" : "none", WebkitBackdropFilter: isScrolled ? "blur(16px)" : "none", border: isScrolled ? "0.8px solid rgba(39, 39, 39, 0.6)" : "0.8px solid transparent", borderRadius: "4px", transition: "all 0.2s cubic-bezier(0.1, 0.9, 0.2, 1)" }}>
        <a href="/#work" style={{ textDecoration: "none" }}>
          <div style={{ fontFamily: "'BIZ UDGothic', sans-serif", fontWeight: 700, fontSize: "18px", color: "#ddc8c8ff", cursor: "pointer" }}>GRAYFORGE</div>
        </a>
        <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
          <div style={{ display: "flex", gap: "26px", color: "#dfdfdfff", fontSize: "14px", fontFamily: "'SF Pro Rounded', sans-serif" }}>
            <a href="/#strategy" style={{ textDecoration: "none", color: "inherit" }}><HoverMenuText text="Strategy" /></a>
            <a href="/#work" style={{ textDecoration: "none", color: "inherit" }}><HoverMenuText text="Work" /></a>
            <a href="/#about-us" style={{ textDecoration: "none", color: "inherit" }}><HoverMenuText text="About Us" /></a>
          </div>
          <a href="/connect" style={{ textDecoration: "none" }}>
            <div style={{ padding: "2px 12px", background: "#FFFFFF", borderRadius: "1px", boxShadow: "0px 2px 6px rgba(232, 42, 0, 0.25), inset 0px -6px 40px rgba(255, 152, 115, 0.6)" }}>
              <div style={{ fontFamily: "'SF Compact', sans-serif", fontWeight: 556, fontSize: "12px", color: "#ff1500ff" }}><HoverMenuText text="CONNECT" hoverColor="#9F1000" /></div>
            </div>
          </a>
        </div>
      </nav>

      <div className="flex flex-col w-full flex-grow" style={{ position: "relative", zIndex: 2, pointerEvents: "none" }}>
        {/* Top Fold */}
        <section className="w-full min-h-screen flex flex-col items-center justify-center px-[50px] relative overflow-hidden" style={{ background: "#090909", paddingTop: "120px", paddingBottom: "100px", pointerEvents: "auto" }}>
          <div style={{ width: "100%", maxWidth: "1340px", display: "flex", flexDirection: "column", gap: "40px" }}>
            <FadeInBlock style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <a href="/#work" style={{ textDecoration: "none", width: "max-content" }}>
                <div style={{ fontFamily: "'SF Pro', sans-serif", fontSize: "13px", color: "#686868ff", display: "flex", alignItems: "center", gap: "6px" }}>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ transform: "rotate(180deg)" }}>
                    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  BACK TO WORK
                </div>
              </a>
              <div style={{ fontFamily: "'SF Pro', sans-serif", fontWeight: 510, fontSize: "16px", color: "#BCBCBC", opacity: 0.88, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                {data.brand}
              </div>
              <h1 style={{ fontFamily: "'SF Pro', sans-serif", fontWeight: 400, fontSize: "84px", lineHeight: "90px", color: "#DEDCDC", margin: 0 }}>
                {data.stat}
              </h1>
              <p style={{ fontFamily: "'SF Pro', sans-serif", fontWeight: 400, fontSize: "24px", color: "#7C7C7C", margin: 0 }}>
                {data.revenue}
              </p>
            </FadeInBlock>

            <FadeInBlock style={{ maxWidth: "700px" }}>
              <p style={{ fontFamily: "'SF Pro', sans-serif", fontWeight: 300, fontSize: "18px", lineHeight: "28px", color: "#B2B2B2", margin: 0 }}>
                {data.description}
              </p>
            </FadeInBlock>
          </div>
          <HorizontalGridDivider />
        </section>

        {/* Section 4 - Prefooter CTA */}
        <section className="w-full flex justify-center items-center box-border relative" style={{ padding: "0px", background: "#090909", zIndex: 8, pointerEvents: "auto" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "40px 50px", gap: "20px", width: "100%", maxWidth: "1429px", boxSizing: "border-box", background: "url('/Landing/7.png') center/cover no-repeat", overflow: "hidden" }}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", width: "100%" }}>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", gap: "12px" }}>
                <div style={{ fontFamily: "'SF Pro', sans-serif", fontWeight: 400, fontSize: "34px", lineHeight: "38px", color: "#DEDCDC" }}>Ready to Scale ?</div>
                <div style={{ fontFamily: "'SF Pro', sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "22px", color: "#B2B2B2", maxWidth: "506px" }}>
                  <span>We selectively partner with brands where market dominance is the only objective. Inquire for our intake.</span>
                </div>
              </div>
              <a href="/connect" style={{ textDecoration: "none" }}>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "12px 46px", background: "#FFFFFF", boxShadow: "0px 2px 6px rgba(232, 42, 0, 0.25), inset 0px -6px 40px rgba(255, 152, 115, 0.6)", borderRadius: "1px", transform: "matrix(1, 0, 0, -1, 0, 0)", cursor: "pointer" }}>
                  <div style={{ fontFamily: "'SF Compact', sans-serif", fontWeight: 556, fontSize: "16px", color: "#F24C1A", transform: "matrix(1, 0, 0, -1, 0, 0)" }}><HoverMenuText text="PARTNER WITH US" hoverColor="#F24C1A" /></div>
                </div>
              </a>
            </div>
          </div>
          <HorizontalGridDivider />
        </section>

        {/* Reveal Spacer */}
        <div style={{ height: "683px", width: "100%", pointerEvents: "none" }} />
      </div>

      {/* FIXED FOOTER */}
      <footer className="w-full flex justify-center items-center box-border" style={{ position: "fixed", bottom: 0, left: 0, height: "683px", background: "radial-gradient(163.57% 163.57% at 65.42% -28.18%, #090909 29.12%, #090909 50.37%, #0A0A0A 59.95%, #262626 100%)", zIndex: 1, pointerEvents: "auto" }}>
        <div style={{ width: "100%", maxWidth: "1440px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", padding: "70px 52px 60px", boxSizing: "border-box", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", width: "100%", maxWidth: "1340px", margin: "0 auto" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "13px" }}>
              <div style={{ fontFamily: "'SF Pro', sans-serif", fontSize: "18px", lineHeight: "21px", color: "#B2B2B2", fontWeight: 400 }}>SOCIALS</div>
              <div style={{ display: "flex", gap: "16px" }}>{[0, 1, 2].map((i) => <div key={i} style={{ width: "44px", height: "44px", background: "#1717176d", border: "0.6px solid #221b19ff", borderRadius: "4px" }} />)}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "14px" }}>
              {["HOME", "WORK", "ABOUT US", "OUR STRATEGY", "PARTNERSHIP"].map((page) => (
                <a key={page} href={page === "HOME" || page === "WORK" ? "/#work" : `/#${page.toLowerCase().replace(" ", "-")}`} className="text-[#B2B2B2]" style={{ fontFamily: "'SF Pro', sans-serif", fontSize: "18px", lineHeight: "21px", textAlign: "right", fontWeight: 400, textDecoration: "none" }}>
                  <HoverMenuText text={page} hoverColor="#DA5932" />
                </a>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", width: "100%", maxWidth: "1340px", height: "201px", margin: "0 auto" }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", width: "100%", height: "32px" }}>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", height: "22px" }}>
                <div style={{ fontFamily: "'SF Compact', sans-serif", fontWeight: 457, fontSize: "14px", lineHeight: "22px", textAlign: "left", color: "#999999", whiteSpace: "nowrap" }}>Architecture of growth. Elite performance for dominant brands.</div>
                <div style={{ fontFamily: "'SF Compact', sans-serif", fontWeight: 457, fontSize: "14px", lineHeight: "22px", textTransform: "uppercase", textAlign: "right", opacity: 0.6 }}><HoverMenuText text="PRIVACY POLICY" hoverColor="#DA5932" /></div>
              </div>
              <div style={{ width: "100%", height: "0px", border: "1px solid rgba(40, 33, 31, 0.3)", alignSelf: "stretch" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", width: "100%", height: "64px" }}>
              <div style={{ fontFamily: "'SF Compact', sans-serif", fontWeight: 457, fontSize: "10px", lineHeight: "14px", color: "#5A5350", whiteSpace: "nowrap" }}>©2024 Greyforge. ALL RIGHTS RESERVED.</div>
              <div style={{ fontFamily: "'BIZ UDGothic', sans-serif", fontWeight: 700, fontSize: "60px", lineHeight: "64px", color: "#E1E1E1", textAlign: "center", width: "270px" }}>GRAYFORGE</div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
