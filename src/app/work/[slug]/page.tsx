"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Lenis from "lenis";
import { CASE_STUDIES } from "@/data/case-studies";

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

const MeterDigit = ({ digit, isVisible, delayIndex }: { digit: string, isVisible: boolean, delayIndex: number }) => {
  const isNumber = !isNaN(parseInt(digit)) && digit !== " ";
  if (!isNumber) return <span style={{ display: "inline-flex" }}>{digit}</span>;
  const targetNum = parseInt(digit);
  const spinTarget = targetNum + 10;
  return (
    <span style={{ display: "inline-flex", flexDirection: "column", height: "1em", overflow: "hidden", position: "relative", verticalAlign: "bottom", maskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)" }}>
      <span style={{ display: "flex", flexDirection: "column", transform: isVisible ? `translateY(-${spinTarget}em)` : "translateY(0)", transition: `transform 2s cubic-bezier(0.16, 1, 0.3, 1) ${delayIndex * 0.15}s` }}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n, idx) => (
          <span key={idx} style={{ height: "1em", lineHeight: "1em" }}>{n}</span>
        ))}
      </span>
    </span>
  );
};

const MeterText = ({ text }: { text: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0 });
    const curr = domRef.current;
    if (curr) observer.observe(curr);
    return () => { if (curr) observer.unobserve(curr); };
  }, []);
  let digitCount = 0;
  return (
    <span ref={domRef} style={{ display: "inline-flex", alignItems: "baseline" }}>
      {text.split("").map((char, i) => {
        const isNum = !isNaN(parseInt(char)) && char !== " ";
        if (isNum) digitCount++;
        return <MeterDigit key={i} digit={char} isVisible={isVisible} delayIndex={isNum ? digitCount : 0} />;
      })}
    </span>
  );
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
            <a href="/#work" style={{ textDecoration: "none", color: "inherit" }}><HoverMenuText text="Work" /></a>
            <a href="/#process" style={{ textDecoration: "none", color: "inherit" }}><HoverMenuText text="Process" /></a>
            <a href="/#strategy" style={{ textDecoration: "none", color: "inherit" }}><HoverMenuText text="Strategy" /></a>
            <a href="/#about" style={{ textDecoration: "none", color: "inherit" }}><HoverMenuText text="About Us" /></a>
          </div>
          <a href="/connect" style={{ textDecoration: "none" }}>
            <div style={{ padding: "2px 12px", background: "#FFFFFF", borderRadius: "1px", boxShadow: "0px 2px 6px rgba(232, 42, 0, 0.25), inset 0px -6px 40px rgba(255, 152, 115, 0.6)" }}>
              <div style={{ fontFamily: "'SF Compact', sans-serif", fontWeight: 556, fontSize: "12px", color: "#ff1500ff" }}><HoverMenuText text="CONNECT" hoverColor="#9F1000" /></div>
            </div>
          </a>
        </div>
      </nav>

      <div className="flex flex-col w-full flex-grow" style={{ position: "relative", zIndex: 2, pointerEvents: "none" }}>
        {/* Main Case Study Section */}
        <section className="w-full min-h-screen flex justify-center px-[50px] relative overflow-hidden" style={{ paddingTop: "120px", paddingBottom: "100px", pointerEvents: "auto", background: "#090909" }}>
          <div style={{ width: "100%", maxWidth: "880px", display: "flex", flexDirection: "column", gap: "80px" }}>

            <FadeInBlock style={{ display: "flex", flexDirection: "column", gap: "130px" }}>
              {/* Header Section (Left Aligned) */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignSelf: "flex-start", textAlign: "left" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                  <div style={{ fontFamily: "'SF Pro', sans-serif", fontWeight: 510, fontSize: "16px", lineHeight: "20px", color: "#FF8C42", opacity: 0.6 }}>
                    {data.category}
                  </div>
                </div>
                <h1 style={{ fontFamily: "'SF Pro', sans-serif", fontWeight: 400, fontSize: "30px", lineHeight: "52px", color: "#DEDCDC", margin: 0, maxWidth: "540px" }}>
                  {data.title}
                </h1>
                <div style={{ width: "100%", maxWidth: "540px" }}>
                  <p style={{ fontFamily: "'SF Pro', sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "1.4", color: "#B2B2B2", margin: 0, whiteSpace: "pre-wrap" }}>
                    {data.description}
                  </p>
                </div>
              </div>

              {/* Metrics Grid (Full Width, Left Aligned) */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, min-content)", width: "100%", justifyContent: "space-between", alignItems: "center", alignSelf: "flex-start", paddingRight: "18px" }}>
                {data.gridStats.slice(0, 3).map((stat: any, idx: number) => (
                  <div key={idx} className="stat-box" style={{ whiteSpace: "nowrap", textAlign: "left", display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{ fontFamily: "'SF Pro', sans-serif", fontWeight: 510, fontSize: "15px", lineHeight: "19px", color: "#7C7C7C" }}>
                      {stat.label}
                    </div>
                    <div style={{ fontFamily: "'SF Pro', sans-serif", fontWeight: 274, fontSize: "50px", lineHeight: "1.0", color: "#DEDCDC", letterSpacing: "-0.04em", marginLeft: "-4px" }}>
                      <MeterText text={stat.value} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Callout Section (Full Width, Left Aligned) */}
              {data.callout && (
                <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%", alignSelf: "flex-start", textAlign: "left" }}>
                  <div style={{ width: "100%", height: "1px", background: "rgba(82, 82, 82, 0.12)", marginBottom: "40px" }} />
                  <div style={{ fontFamily: "'SF Pro Display', sans-serif", fontWeight: 457, fontSize: "60px", lineHeight: "1.05", color: "#DEDCDC", letterSpacing: "-0.03em", whiteSpace: "pre-wrap" }}>
                    {data.callout}
                  </div>
                </div>
              )}

              {/* Insights Section (Full Width, Left Aligned) */}
              {data.insights && (
                <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%", alignSelf: "flex-start", textAlign: "left" }}>
                  <div style={{ width: "100%", height: "1px", background: "rgba(82, 82, 82, 0.12)", marginBottom: "40px" }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div style={{ fontFamily: "'SF Pro', sans-serif", fontWeight: 510, fontSize: "15px", color: "#7C7C7C" }}>
                      {data.insights.title}
                    </div>
                    <div style={{ fontFamily: "'SF Pro', sans-serif", fontWeight: 400, fontSize: "20px", lineHeight: "30px", color: "#DEDCDC" }}>
                      {data.insights.description}
                    </div>
                  </div>
                </div>
              )}

              {/* Campaigns Data Table */}
              {data.campaignData && (
                <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%", alignSelf: "flex-start", textAlign: "left", marginTop: "0px", paddingBottom: "52px" }}>
                  <div style={{ width: "100%", height: "1px", background: "rgba(82, 82, 82, 0.12)", marginBottom: "20px" }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{ fontFamily: "'SF Pro', sans-serif", fontWeight: 510, fontSize: "15px", color: "#7C7C7C" }}>
                      Campaigns Data
                    </div>

                    <div style={{ width: "100%", overflowX: "auto" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", border: "none", tableLayout: "fixed" }}>
                        <thead>
                          <tr>
                            {data.campaignData.headers.map((header: string, i: number) => (
                              <th
                                key={i}
                                style={{
                                  padding: "16px 20px",
                                  textAlign: "left",
                                  fontFamily: "'SF Pro', sans-serif",
                                  fontWeight: 500,
                                  fontSize: "13px",
                                  color: "#7C7C7C",
                                  borderBottom: "1px solid rgba(82, 82, 82, 0.12)",
                                  borderRight: i === data.campaignData!.headers.length - 1 ? "none" : "1px solid rgba(82, 82, 82, 0.12)",
                                  letterSpacing: "0.02em",
                                  width: `${100 / data.campaignData!.headers.length}%`
                                }}
                              >
                                {header.charAt(0).toUpperCase() + header.slice(1).toLowerCase()}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {data.campaignData.rows.map((row: string[], rowIndex: number) => {
                            return (
                              <tr key={rowIndex}>
                                {row.map((val: string, colIndex: number) => (
                                  <td
                                    key={colIndex}
                                    style={{
                                      padding: "20px",
                                      fontFamily: "'SF Pro', sans-serif",
                                      fontWeight: 400,
                                      fontSize: "15px",
                                      color: "#DEDCDC",
                                      borderBottom: rowIndex === data.campaignData!.rows.length - 1 ? "none" : "1px solid rgba(82, 82, 82, 0.12)",
                                      borderRight: colIndex === row.length - 1 ? "none" : "1px solid rgba(82, 82, 82, 0.12)",
                                      whiteSpace: "pre-wrap"
                                    }}
                                  >
                                    {val}
                                  </td>
                                ))}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
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
              {["WORK", "PROCESS", "STRATEGY", "ABOUT US", "PARTNERSHIP"].map((page) => {
                const href = page === "WORK" ? "/#work" :
                  page === "PROCESS" ? "/#process" :
                  page === "STRATEGY" ? "/#strategy" :
                  page === "ABOUT US" ? "/#about" :
                  "/connect";

                return (
                  <a
                    key={page}
                    href={href}
                    className="text-[#B2B2B2]"
                    style={{
                      fontFamily: "'SF Pro', sans-serif",
                      fontSize: "18px",
                      lineHeight: "21px",
                      textAlign: "right",
                      fontWeight: 400,
                      textDecoration: "none"
                    }}
                  >
                    <HoverMenuText text={page} hoverColor="#DA5932" />
                  </a>
                );
              })}
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
