"use client";

import React, { useState, useEffect, useRef } from "react";
import Lenis from "lenis";

const FadeInBlock = ({ as: Component = "div", children, className, style, threshold = 0.1, margin = "0px 0px -25% 0px", ...props }: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold, rootMargin: margin }
    );
    const curr = domRef.current;
    if (curr) observer.observe(curr);
    return () => {
      if (curr) observer.unobserve(curr);
    };
  }, [threshold, margin]);

  return (
    <Component
      ref={domRef}
      className={className}
      style={{
        ...style,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      {...props}
    >
      {children}
    </Component>
  );
};

const MeterDigit = ({ digit, isVisible, delayIndex }: { digit: string, isVisible: boolean, delayIndex: number }) => {
  const isNumber = !isNaN(parseInt(digit)) && digit !== " ";
  if (!isNumber) return <span style={{ display: "inline-flex" }}>{digit}</span>;

  const targetNum = parseInt(digit);
  const spinTarget = targetNum + 10;

  return (
    <span style={{ display: "inline-flex", flexDirection: "column", height: "1em", overflow: "hidden", position: "relative", verticalAlign: "bottom", maskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)" }}>
      <span
        style={{
          display: "flex",
          flexDirection: "column",
          transform: isVisible ? `translateY(-${spinTarget}em)` : "translateY(0)",
          transition: `transform 2s cubic-bezier(0.16, 1, 0.3, 1) ${delayIndex * 0.15}s`,
        }}
      >
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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0, rootMargin: "0px 0px 0px 0px" }
    );
    const curr = domRef.current;
    if (curr) observer.observe(curr);
    return () => {
      if (curr) observer.unobserve(curr);
    };
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

const HoverMenuText = ({ text, hoverColor = "#DA5932" }: { text: string, hoverColor?: string }) => {
  return (
    <div className="group cursor-pointer relative" style={{ display: "inline-flex", overflow: "hidden", verticalAlign: "middle" }}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="relative inline-flex flex-col group-hover:-translate-y-full transition-transform duration-300 ease-in-out"
          style={{ transitionDelay: `${i * 15}ms`, willChange: "transform" }}
        >
          <span style={{ whiteSpace: "pre" }}>{char}</span>
          <span className="absolute top-full left-0" style={{ color: hoverColor, whiteSpace: "pre" }}>{char}</span>
        </span>
      ))}
    </div>
  );
};

const FoldOneBackground = ({ isStartHovered = false }: { isStartHovered?: boolean }) => {
  const heights = [154, 163, 173, 183, 199, 211, 224, 243, 263, 271, 274, 272, 268, 263, 256, 249, 243, 236, 232, 230, 231, 234, 238, 242, 247, 247, 248, 244, 237, 235, 244, 251, 260, 271, 282, 279, 280, 288, 295, 304, 313, 322, 334, 347, 355, 359, 359, 361, 373, 382, 397, 415, 425, 435, 453, 470, 486, 493, 499, 502, 499, 495, 506, 513, 526, 535, 545, 553, 571, 585, 616, 645, 673, 694, 706, 710, 714, 716, 716, 720, 726, 728, 735, 746, 753, 756, 753, 744, 741, 747, 765, 782, 799, 817, 833, 848, 861, 875, 886, 896, 907, 911, 912, 908, 906, 904, 908, 915, 915, 910, 904, 897, 894, 887, 896, 905, 914, 924, 938, 953];
  return (
    <>
      {[false, true].map((isFlipped, idx) => (
        <div key={idx} style={{
          position: "absolute",
          bottom: "4px",
          left: 0, width: "100%", height: "953px",
          display: "flex", justifyContent: "center", pointerEvents: "none", zIndex: 0, overflow: "visible",
          maskImage: "linear-gradient(to right, transparent, black 35%, black 65%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 35%, black 65%, transparent)"
        }}>
          <div
            style={{
              position: "relative",
              width: "1440px",
              height: "100%",
            }}
          >
            <svg width="1440" height="953" viewBox="0 0 1440 953" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "visible", transform: `scaleX(${isFlipped ? "1" : "-1"}) ${isFlipped ? "scaleY(-1)" : ""}` }}>
              <defs>
                <linearGradient id={`fadeGradient-${idx}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset={idx === 0 ? "35%" : "60%"} stopColor="#35180F" stopOpacity="0" />
                  <stop offset="100%" stopColor="#505050" stopOpacity="1" />
                </linearGradient>
              </defs>
              {heights.map((h, i) => {
                const x = 6 + i * 12;
                const isEdge = i === 0 || i === heights.length - 1;
                return <rect key={i} x={x - 0.5} y="0" width="1" height={h} fill={`url(#fadeGradient-${idx})`} style={{ opacity: isEdge ? 0 : 1 }} />;
              })}
              {(() => {
                const pts = heights.map((h, i) => ({ x: 6 + i * 12, y: h }));
                let d = `M ${pts[0].x},${pts[0].y} `;
                for (let i = 0; i < pts.length - 1; i++) {
                  const p0 = i === 0 ? pts[0] : pts[i - 1];
                  const p1 = pts[i];
                  const p2 = pts[i + 1];
                  const p3 = i === pts.length - 2 ? pts[i + 1] : pts[i + 2];
                  const cp1x = p1.x + (p2.x - p0.x) / 6;
                  const cp1y = p1.y + (p2.y - p0.y) / 6;
                  const cp2x = p2.x - (p3.x - p1.x) / 6;
                  const cp2y = p2.y - (p3.y - p1.y) / 6;
                  d += `C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y} `;
                }
                return !isFlipped ? (
                  <>
                    <path d={d} fill="none" stroke="#2d2d2dff" strokeOpacity="1" strokeWidth="1.5" />
                    <path d={d} fill="none" stroke="#d04715c7" strokeWidth="4" strokeLinecap="round" style={{ opacity: isStartHovered ? 1 : 0, strokeDasharray: "158 2500", strokeDashoffset: isStartHovered ? "158" : "-2000", transition: isStartHovered ? "stroke-dashoffset 2.5s cubic-bezier(0.2, 0.8, 0.2, 0.4), opacity 0.3s" : "stroke-dashoffset 0s, opacity 0.3s", filter: "blur(0.8px)" }} />
                  </>
                ) : null;
              })()}
            </svg>
          </div>
        </div>
      ))}
    </>
  );
};

const PrefooterBackground = () => {
  const heights = [154, 163, 173, 183, 199, 211, 224, 243, 263, 271, 274, 272, 268, 263, 256, 249, 243, 236, 232, 230, 231, 234, 238, 242, 247, 247, 248, 244, 237, 235, 244, 251, 260, 271, 282, 279, 280, 288, 295, 304, 313, 322, 334, 347, 355, 359, 359, 361, 373, 382, 397, 415, 425, 435, 453, 470, 486, 493, 499, 502, 499, 495, 506, 513, 526, 535, 545, 553, 571, 585, 616, 645, 673, 694, 706, 710, 714, 716, 716, 720, 726, 728, 735, 746, 753, 756, 753, 744, 741, 747, 765, 782, 799, 817, 833, 848, 861, 875, 886, 896, 907, 911, 912, 908, 906, 904, 908, 915, 915, 910, 904, 897, 894, 887, 896, 905, 914, 924, 938, 953];
  return (
    <div style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      pointerEvents: "none",
      zIndex: 0,
      overflow: "hidden",
      opacity: 0.45,
      maskImage: "linear-gradient(to right, transparent, black 35%, black 65%, transparent)",
      WebkitMaskImage: "linear-gradient(to right, transparent, black 35%, black 65%, transparent)"
    }}>
      {[false, true].map((isFlipped, idx) => (
        <div key={idx} style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          overflow: "visible",
          transform: isFlipped ? "scaleY(-1)" : "none"
        }}>
          <div style={{ position: "relative", width: "1440px", height: "100%" }}>
            <svg width="1440" height="350" viewBox="0 0 1440 350" style={{ position: "absolute", top: "50%", left: 0, transform: `translateY(-50%) scaleX(${isFlipped ? "-1" : "1"})`, width: "100%", height: "auto", overflow: "visible" }}>
              <defs>
                <linearGradient id={`prefooterFade-${idx}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset={idx === 0 ? "45%" : "9%"} stopColor="#090909" stopOpacity="0" />
                  <stop offset="100%" stopColor="#090909" stopOpacity="1" />
                </linearGradient>
              </defs>
              {heights.map((h, i) => {
                const x = 6 + i * 12;
                const hAdjusted = h * 0.35;
                return <rect key={i} x={x - 0.5} y={(350 - hAdjusted) / 2} width="1" height={hAdjusted} fill={`url(#prefooterFade-${idx})`} />;
              })}
              {(() => {
                const pts = heights.map((h, i) => ({ x: 6 + i * 12, y: (350 - h * 0.35) / 2 + (h * 0.35) }));
                let d = `M ${pts[0].x},${pts[pts.length - 1].y} `; // dummy start to avoid jumping if needed, but pts are better
                d = `M ${pts[0].x},${pts[0].y} `;
                for (let i = 0; i < pts.length - 1; i++) {
                  const p0 = i === 0 ? pts[0] : pts[i - 1];
                  const p1 = pts[i];
                  const p2 = pts[i + 1];
                  const p3 = i === pts.length - 2 ? pts[i + 1] : pts[i + 2];
                  const cp1x = p1.x + (p2.x - p0.x) / 6;
                  const cp1y = p1.y + (p2.y - p0.y) / 6;
                  const cp2x = p2.x - (p3.x - p1.x) / 6;
                  const cp2y = p2.y - (p3.y - p1.y) / 6;
                  d += `C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y} `;
                }
                return <path d={d} fill="none" stroke="#525252" strokeOpacity="0.68" strokeWidth="1" />;
              })()}
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};

const GlobalGridLines = () => {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100vh", display: "flex", justifyContent: "center", pointerEvents: "none", zIndex: 3 }}>
      {/* 1440px Wrapper matching the fixed maximum widths natively */}
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

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isInitialGlow, setIsInitialGlow] = useState(false);

  const lenisRef = useRef<Lenis | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const updateScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollPrev(scrollLeft > 10);
      setCanScrollNext(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  const scrollNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 692, behavior: "smooth" });
      setTimeout(updateScrollButtons, 500);
    }
  };

  const scrollPrev = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -692, behavior: "smooth" });
      setTimeout(updateScrollButtons, 500);
    }
  };

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      lerp: 0.07,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    // Run exactly one optical glow sequence organically dropped slightly after the page fully mounts!
    const triggerTimeout = setTimeout(() => setIsInitialGlow(true), 400);
    const stopTimeout = setTimeout(() => setIsInitialGlow(false), 3800);
    // Ensure page loads exactly at top
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(triggerTimeout);
      clearTimeout(stopTimeout);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="w-full flex flex-col items-center box-border">
      <GlobalGridLines />
      {/* Nav */}
      <nav
        style={{
          position: "fixed",
          top: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 50,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "14px 20px",
          width: "1144px",
          height: "52px",
          background: isScrolled ? "rgba(22, 22, 22, 0.7)" : "transparent",
          backdropFilter: isScrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: isScrolled ? "blur(16px)" : "none",
          border: isScrolled ? "0.8px solid rgba(39, 39, 39, 0.6)" : "0.8px solid transparent",
          borderRadius: "4px",
          transition: "all 0.2s cubic-bezier(0.1, 0.9, 0.2, 1)",
          flex: "none",
          order: 0,
          flexGrow: 0,
        }}
      >
        {/* Left */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "0px",
            margin: "0",
            width: "max-content",
            height: "max-content",
            flex: "none",
            order: 0,
            flexGrow: 0,
          }}
        >
          {/* Brand */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: "0px",
              gap: "10px",
              width: "max-content",
              height: "max-content",
              flex: "none",
              order: 0,
              flexGrow: 0,
            }}
          >
            {/* GRAYFORGE */}
            <a
              href="#top"
              onClick={(e) => { e.preventDefault(); lenisRef.current?.scrollTo(0); }}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  width: "max-content",
                  height: "max-content",
                  fontFamily: "'BIZ UDGothic', sans-serif",
                  fontStyle: "normal",
                  fontWeight: 700,
                  fontSize: "18px",
                  lineHeight: "23px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  letterSpacing: "0%",
                  color: "#ddc8c8ff",
                  flex: "none",
                  order: 0,
                  flexGrow: 0,
                  cursor: "pointer",
                }}
              >
                GRAYFORGE
              </div>
            </a>
          </div>
        </div>

        {/* Right */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "0px",
            gap: "30px",
            margin: "0",
            width: "max-content",
            height: "max-content",
            flex: "none",
            order: 1,
            flexGrow: 0,
          }}
        >
          {/* Menus */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: "0px",
              gap: "26px",
              width: "max-content",
              height: "max-content",
              flex: "none",
              order: 0,
              flexGrow: 0,
            }}
          >
            {/* Strategy */}
            <a
              href="#strategy"
              onClick={(e) => { e.preventDefault(); lenisRef.current?.scrollTo("#strategy"); }}
              style={{
                width: "max-content",
                height: "max-content",
                fontFamily: "'SF Pro Rounded', sans-serif",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "23px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                color: "#dfdfdfff",
                flex: "none",
                order: 0,
                flexGrow: 0,
                whiteSpace: "nowrap",
                textDecoration: "none",
              }}
            >
              <HoverMenuText text="Strategy" />
            </a>

            {/* Work */}
            <a
              href="#work"
              onClick={(e) => { e.preventDefault(); lenisRef.current?.scrollTo("#work"); }}
              style={{
                width: "max-content",
                height: "max-content",
                fontFamily: "'SF Pro Rounded', sans-serif",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "23px",
                display: "flex",
                alignItems: "center",
                color: "#dfdfdfff",
                flex: "none",
                order: 1,
                flexGrow: 0,
                textDecoration: "none",
              }}
            >
              <HoverMenuText text="Work" />
            </a>

            {/* About Us */}
            <a
              href="#about-us"
              onClick={(e) => { e.preventDefault(); lenisRef.current?.scrollTo("#about-us"); }}
              style={{
                width: "max-content",
                height: "max-content",
                fontFamily: "'SF Pro Rounded', sans-serif",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "23px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                color: "#dfdfdfff",
                flex: "none",
                order: 2,
                flexGrow: 0,
                whiteSpace: "nowrap",
                textDecoration: "none",
              }}
            >
              <HoverMenuText text="About Us" />
            </a>
          </div>

          {/* CONNECT Button */}
          <a href="/connect" style={{ textDecoration: "none" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: "2px 12px",
                gap: "8px",
                margin: "0",
                width: "max-content",
                height: "max-content",
                background: "#FFFFFF",
                boxShadow: "0px 2px 6px rgba(232, 42, 0, 0.25), inset 0px -6px 40px rgba(255, 152, 115, 0.6)",
                borderRadius: "1px",
                flex: "none",
                order: 1,
                flexGrow: 0,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: "max-content",
                  height: "max-content",
                  fontFamily: "'SF Compact', sans-serif",
                  fontStyle: "normal",
                  fontWeight: 556,
                  fontSize: "12px",
                  lineHeight: "22px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  letterSpacing: "-0.04em",
                  color: "#ff1500ff",
                  textShadow: "0px 2px 8px rgba(255, 255, 255, 0.96)",
                  flex: "none",
                  order: 0,
                  flexGrow: 0,
                }}
              >
                <HoverMenuText text="CONNECT" hoverColor="#9F1000" />
              </div>
            </div>
          </a>
        </div>
      </nav>

      {/* The rest of the landing page content will go below */}
      <div className="flex flex-col w-full flex-grow" style={{ position: "relative", zIndex: 2, pointerEvents: "none" }}>
        {/* Section 1 */}
        <section className="w-full min-h-screen flex flex-col justify-end px-0 py-[32px] box-border relative" style={{ background: "#090909", pointerEvents: "auto" }}>
          <FoldOneBackground isStartHovered={isInitialGlow} />

          {/* X-Axis Data Month Tracker */}
          <div style={{ position: "absolute", bottom: "24px", left: 0, width: "100%", display: "flex", justifyContent: "center", pointerEvents: "none", zIndex: 1 }}>
            <div style={{ width: "1440px", display: "flex", justifyContent: "space-between", padding: "0 20px", color: "#151515ff", fontSize: "8px", fontWeight: "600", fontFamily: "'SF Pro', sans-serif" }}>
              {["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"].map((m, i) => (
                <div key={i} style={{ width: "20px", textAlign: "center" }}>{m}</div>
              ))}
            </div>
          </div>

          {/* Headings Container */}
          <FadeInBlock as="div"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              padding: "42px 0px 49px 50px",
              gap: "50px",
              maxWidth: "1440px",
              width: "100%",
              height: "max-content",
              margin: "0 auto",
              flex: "none",
              order: 0,
              alignSelf: "stretch",
              flexGrow: 0,
              zIndex: 0,
              background: "linear-gradient(to bottom, rgba(9, 9, 9, 0) 0%, #090909aa 60%, rgba(9, 9, 9, 0) 80%)",
            }}
          >
            {/* Text */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "0px",
                gap: "12px",
                maxWidth: "1440px",
                width: "100%",
                height: "max-content",
                flex: "none",
                order: 0,
                alignSelf: "stretch",
                flexGrow: 0,
              }}
            >
              {/* h1 */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: "0px",
                  gap: "10px",
                  maxWidth: "1340px",
                  width: "100%",
                  height: "max-content",
                  flex: "none",
                  order: 0,
                  alignSelf: "stretch",
                  flexGrow: 0,
                }}
              >
                <div
                  style={{
                    maxWidth: "800px",
                    height: "max-content",
                    fontFamily: "'SF Pro', sans-serif",
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "58px",
                    lineHeight: "64px",
                    display: "flex",
                    alignItems: "center",
                    color: "#DEDCDC",
                    flex: "none",
                    order: 0,
                    flexGrow: 0,
                  }}
                >
                  <span>
                    Precision Engineered<br />Meta Ad Strategies
                  </span>
                </div>
              </div>

              {/* h2 */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: "0px 2px",
                  gap: "10px",
                  maxWidth: "1340px",
                  width: "100%",
                  height: "max-content",
                  flex: "none",
                  order: 1,
                  alignSelf: "stretch",
                  flexGrow: 0,
                }}
              >
                <div
                  style={{
                    maxWidth: "590px",
                    height: "max-content",
                    fontFamily: "'SF Pro', sans-serif",
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "18px",
                    lineHeight: "24px",
                    display: "flex",
                    alignItems: "center",
                    color: "#828282ff",
                    flex: "none",
                    order: 0,
                    flexGrow: 0,
                  }}
                >
                  We scale high-growth brands through algorithmic mastery <br />
                  and high intent creative optimised pure performance
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: "0px 0px 0px 2px",
                gap: "12px",
                maxWidth: "1340px",
                width: "100%",
                height: "max-content",
                flex: "none",
                order: 1,
                alignSelf: "stretch",
                flexGrow: 0,
              }}
            >
              <a href="/connect" style={{ textDecoration: "none" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "14px 84px",
                    gap: "10px",
                    width: "max-content",
                    height: "max-content",
                    background: "#FFFFFF",
                    boxShadow: "0px 2px 6px rgba(232, 42, 0, 0.25), inset 0px -6px 40px rgba(255, 152, 115, 0.6)",
                    borderRadius: "1px",
                    transform: "matrix(1, 0, 0, -1, 0, 0)",
                    flex: "none",
                    order: 0,
                    flexGrow: 0,
                    cursor: "pointer",
                  }}
                >
                  {/* START SCALING */}
                  <div
                    style={{
                      width: "max-content",
                      height: "max-content",
                      fontFamily: "'SF Compact', sans-serif",
                      fontStyle: "normal",
                      fontWeight: 556,
                      fontSize: "16px",
                      lineHeight: "22px",
                      display: "flex",
                      alignItems: "center",
                      textAlign: "center",
                      letterSpacing: "-0.04em",
                      color: "#F24C1A",
                      textShadow: "0px 2px 8px rgba(255, 255, 255, 0.93)",
                      flex: "none",
                      order: 0,
                      flexGrow: 0,
                      transform: "matrix(1, 0, 0, -1, 0, 0)", // Flip text back
                    }}
                  >
                    <HoverMenuText text="START SCALING" hoverColor="#F24C1A" />
                  </div>
                </div>
              </a>

              {/* View Performance Data Button */}
              <div
                className="group cursor-pointer transition-all duration-300"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "12px 16px",
                  gap: "7px",
                  width: "237px",
                  height: "55px",
                  borderRadius: "1px",
                  flex: "none",
                  order: 1,
                  flexGrow: 0,
                }}
              >
                {/* View Performance Data */}
                <div
                  style={{
                    width: "max-content",
                    height: "max-content",
                    fontFamily: "'SF Compact', sans-serif",
                    fontStyle: "normal",
                    fontWeight: 457,
                    fontSize: "18px",
                    lineHeight: "15px",
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                    letterSpacing: "-0.03em",
                    color: "#DA5932",
                    flex: "none",
                    order: 0,
                    flexGrow: 0,
                  }}
                >
                  <HoverMenuText text="View Performance Data" hoverColor="#FF4F19" />
                </div>

                {/* Arrow Icon */}
                <div
                  className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "0px",
                    gap: "10px",
                    width: "15px",
                    height: "15px",
                    flex: "none",
                    order: 1,
                    flexGrow: 0,
                  }}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 10.5H17M11 4.5L17 10.5M11 16.5L17 10.5"
                      stroke="#932C0D"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </FadeInBlock>
        </section>

        {/* Client Banner wrapped in full-width background */}
        <div className="w-full" style={{ background: "#090909", zIndex: 2, pointerEvents: "auto" }}>
          <FadeInBlock as="div"
            margin="0px 0px 100px 0px"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0px 0px 16px 0px",
              margin: "8px auto 0",
              gap: "50px",
              width: "100%",
              maxWidth: "1340px",
              height: "40px",
              background: "#090909",
              flex: "none",
              alignSelf: "stretch",
              flexGrow: 0,
              zIndex: 2,
              boxSizing: "border-box",
            }}
          >
            {/* Static Title */}
            <div style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
              fontFamily: "'SF Pro', sans-serif",
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: "12px",
              lineHeight: "20px",
              color: "#8A8A8A",
              flexShrink: 0,
            }}>
              <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
                <circle cx="7" cy="2" r="1.5" fill="#9B462C" />
                <circle cx="7" cy="12" r="1.5" fill="#9B462C" />
                <circle cx="12" cy="7" r="1.5" fill="#9B462C" />
                <circle cx="2" cy="7" r="1.5" fill="#9B462C" />
                <circle cx="7" cy="7" r="1.5" fill="#9B462C" />
              </svg>
              <span>LOVED BY</span>
            </div>

            {/* Marquee Wrapper */}
            <div
              style={{
                display: "flex",
                flex: 1,
                overflow: "hidden",
                maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
              }}
            >
              {/* Inner Scrolling Track */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  whiteSpace: "nowrap",
                  width: "max-content",
                  flexShrink: 0,
                  willChange: "transform",
                  animation: "marquee 20s linear infinite",
                }}
              >
                <style>{`
                  @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                  }
                `}</style>
                {[...Array(2)].map((_, groupIdx) => (
                  <div key={groupIdx} style={{ display: "flex", flexDirection: "row", gap: "60px", paddingRight: "60px", alignItems: "center" }}>
                    {["Client 1", "Client 2", "Client 3", "Client 4", "Client 5", "Client 6", "Client 7", "Client 8"].map((client, idx) => (
                      <div
                        key={idx}
                        style={{
                          fontFamily: "'SF Pro', sans-serif",
                          fontWeight: 400,
                          fontSize: "16px",
                          lineHeight: "20px",
                          color: "#C7C7C7",
                        }}
                      >
                        {client}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </FadeInBlock>
        </div>

        {/* Section 2 */}
        <section id="strategy" className="w-full min-h-screen flex flex-col px-[50px] pt-[16px] pb-[32px] box-border relative" style={{ background: "#090909", pointerEvents: "auto" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "58px 0px",
              width: "100%",
              flexGrow: 1,
              height: "100%",
            }}
          >
            {/* Block */}
            <FadeInBlock as="div"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "0px",
                gap: "16px",
                margin: "0 auto",
                maxWidth: "1340px",
                width: "100%",
                height: "max-content",
                flex: "none",
                order: 0,
                flexGrow: 0,
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: "0px",
                  gap: "10px",
                  width: "100%",
                  height: "24px",
                  flex: "none",
                  order: 0,
                }}
              >
                <div
                  style={{
                    fontFamily: "'SF Pro', sans-serif",
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "20px",
                    display: "flex",
                    alignItems: "center",
                    color: "#8A8A8A",
                  }}
                >
                  STRATEGY
                </div>
              </div>

              {/* Process */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  padding: "0px",
                  gap: "174px",
                  width: "100%",
                  flex: "none",
                  order: 1,
                }}
              >
                {/* Left */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    padding: "0px",
                    gap: "54px",
                    maxWidth: "603px",
                    width: "100%",
                    flex: "none",
                    order: 0,
                  }}
                >
                  {/* Text */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      padding: "0px",
                      gap: "12px",
                      width: "100%",
                      flex: "none",
                      order: 0,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'SF Pro', sans-serif",
                        fontStyle: "normal",
                        fontWeight: 400,
                        fontSize: "42px",
                        lineHeight: "52px",
                        display: "flex",
                        alignItems: "center",
                        color: "#DEDCDC",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Less guesswork. More dominance.
                    </div>
                    <div
                      style={{
                        fontFamily: "'SF Pro', sans-serif",
                        fontStyle: "normal",
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: "22px",
                        display: "flex",
                        alignItems: "center",
                        color: "#B2B2B2",
                      }}
                    >
                      <span>
                        We bypass standard marketing practices. Grayforge operates<br />
                        at the intersection of quantitative data analysis and psychological<br />
                        creative direction.
                      </span>
                    </div>
                  </div>

                  {/* Connect */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      padding: "0px 0px 0px 2px",
                      gap: "12px",
                      width: "max-content",
                      flex: "none",
                      order: 1,
                    }}
                  >
                    {/* MARK YOUR DOMINANCE Button */}
                    <a href="/connect" style={{ textDecoration: "none" }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "8px 24px",
                          gap: "10px",
                          background: "#FFFFFF",
                          boxShadow: "0px 2px 6px rgba(232, 42, 0, 0.25), inset 0px -6px 40px rgba(255, 152, 115, 0.6)",
                          borderRadius: "1px",
                          flex: "none",
                          order: 0,
                          cursor: "pointer",
                        }}
                      >
                        <div
                          style={{
                            fontFamily: "'SF Compact', sans-serif",
                            fontStyle: "normal",
                            fontWeight: 556,
                            fontSize: "14px",
                            lineHeight: "24px",
                            display: "flex",
                            alignItems: "center",
                            textAlign: "center",
                            letterSpacing: "0px",
                            color: "#F24C1A",
                            textShadow: "0px 2px 8px rgba(255, 255, 255, 0.93)",
                          }}
                        >
                          <HoverMenuText text="MARK YOUR DOMINANCE" hoverColor="#9F1000" />
                        </div>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Process (Right steps list) */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    padding: "15px 0px 18px",
                    gap: "40px",
                    width: "max-content",
                    flex: "none",
                    order: 1,
                  }}
                >
                  {/* 01 */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "10px", width: "100%" }}>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "8px", width: "100%" }}>
                      <div className="flex flex-wrap items-center justify-center gap-[2px] w-[14px]">
                        <svg width="16" height="14" viewBox="0 0 16 14" fill="none"><circle cx="7" cy="2" r="1.5" fill="#9B462C" /><circle cx="7" cy="12" r="1.5" fill="#9B462C" /><circle cx="12" cy="7" r="1.5" fill="#9B462C" /><circle cx="2" cy="7" r="1.5" fill="#9B462C" /><circle cx="7" cy="7" r="1.5" fill="#9B462C" /></svg>
                      </div>
                      <div style={{ fontFamily: "'SF Pro', sans-serif", fontWeight: 510, fontSize: "16px", lineHeight: "22px", color: "#979797ff", paddingLeft: "4px" }}>
                        Meta Ecosystem
                      </div>
                    </div>
                    <div style={{ fontFamily: "'SF Pro', sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "22px", color: "#4f4f4fff" }}>
                      <span>
                        Systematic scaling through machine learning<br />
                        optimisation and granular audience segmentation.
                      </span>
                    </div>
                  </div>

                  {/* 02 */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "10px", width: "100%" }}>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "8px", width: "100%" }}>
                      <div className="flex flex-wrap items-center justify-center w-[14px]">
                        <svg width="16" height="14" viewBox="0 0 16 14" fill="none"><circle cx="7" cy="2" r="1.5" fill="#9B462C" /><circle cx="7" cy="12" r="1.5" fill="#9B462C" /><circle cx="12" cy="7" r="1.5" fill="#9B462C" /><circle cx="2" cy="7" r="1.5" fill="#9B462C" /><circle cx="7" cy="7" r="1.5" fill="#9B462C" /></svg>
                      </div>
                      <div style={{ fontFamily: "'SF Pro', sans-serif", fontWeight: 510, fontSize: "16px", lineHeight: "22px", color: "#979797ff", paddingLeft: "4px" }}>
                        Tiktok Ads
                      </div>
                    </div>
                    <div style={{ fontFamily: "'SF Pro', sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "22px", color: "#4f4f4fff" }}>
                      <span>
                        Native short-form strategy designed to capture<br />
                        attention and drive immediate conversion at volume.
                      </span>
                    </div>
                  </div>

                  {/* 03 */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "10px", width: "100%" }}>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "8px", width: "100%" }}>
                      <div className="flex flex-wrap items-center justify-center w-[14px]">
                        <svg width="16" height="14" viewBox="0 0 16 14" fill="none"><circle cx="7" cy="2" r="1.5" fill="#9B462C" /><circle cx="7" cy="12" r="1.5" fill="#9B462C" /><circle cx="12" cy="7" r="1.5" fill="#9B462C" /><circle cx="2" cy="7" r="1.5" fill="#9B462C" /><circle cx="7" cy="7" r="1.5" fill="#9B462C" /></svg>
                      </div>
                      <div style={{ fontFamily: "'SF Pro', sans-serif", fontWeight: 510, fontSize: "16px", lineHeight: "22px", color: "#979797ff", paddingLeft: "4px" }}>
                        Performance Art
                      </div>
                    </div>
                    <div style={{ fontFamily: "'SF Pro', sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "22px", color: "#4f4f4fff" }}>
                      <span>
                        UGC and high-fidelity creative built on direct-<br />
                        response principles and visual storytelling.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInBlock>

            {/* Growth */}
            <FadeInBlock as="div" margin="0px 0px 0px 0px"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0px 12px 0px 0px",
                maxWidth: "1340px",
                width: "100%",
                flex: "none",
                order: 1,
              }}
            >
              {/* 01 Metrics */}
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", gap: "8px" }}>
                <div style={{ fontFamily: "'SF Pro', sans-serif", fontWeight: 510, fontSize: "18px", lineHeight: "24px", color: "#7C7C7C" }}>
                  Brands scaled
                </div>
                <div style={{ fontFamily: "'SF Pro', sans-serif", fontWeight: 274, fontSize: "90px", lineHeight: "96px", color: "#D3D3D3", opacity: 0.88, letterSpacing: "-0.04em", marginLeft: "-10px" }}>
                  <MeterText text="100 +" />
                </div>
              </div>

              {/* 02 Metrics */}
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", gap: "8px" }}>
                <div style={{ fontFamily: "'SF Pro', sans-serif", fontWeight: 510, fontSize: "18px", lineHeight: "24px", color: "#7C7C7C" }}>
                  Campaigns Executed
                </div>
                <div style={{ fontFamily: "'SF Pro', sans-serif", fontWeight: 274, fontSize: "90px", lineHeight: "96px", color: "#D3D3D3", opacity: 0.88, letterSpacing: "-0.04em", marginLeft: "-4px" }}>
                  <MeterText text="2.4k" />
                </div>
              </div>

              {/* 03 Metrics */}
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", gap: "8px" }}>
                <div style={{ fontFamily: "'SF Pro', sans-serif", fontWeight: 510, fontSize: "18px", lineHeight: "24px", color: "#7C7C7C" }}>
                  Revenues Generated
                </div>
                <div style={{ fontFamily: "'SF Pro', sans-serif", fontWeight: 274, fontSize: "90px", lineHeight: "96px", color: "#D3D3D3", opacity: 0.88, letterSpacing: "-0.04em", marginLeft: "-4px" }}>
                  <MeterText text="$7.5m +" />
                </div>
              </div>
            </FadeInBlock>
          </div>
          <HorizontalGridDivider />
        </section>

        {/* Section 3 - PROCESS */}
        <section
          id="about-us"
          className="w-full flex justify-center box-border relative"
          style={{
            background: "#090909",
            height: "962px",
            zIndex: 7,
            pointerEvents: "auto"
          }}
        >
          {/* Inner Wrapper (Grid Alignment) */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "1440px",
              width: "100%",
              padding: "90px 50px",
              gap: "120px",
              margin: "0 auto",
            }}
          >
            {/* Block */}
            <FadeInBlock as="div"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "0px",
                gap: "16px",
                maxWidth: "1340px",
                width: "100%",
                height: "176px",
                flex: "none",
                order: 0,
              }}
            >
              {/* Header */}
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", width: "1340px", height: "24px" }}>
                <div style={{ fontFamily: "'SF Pro', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "24px", display: "flex", alignItems: "center", color: "#8A8A8A" }}>
                  PROCESS
                </div>
              </div>

              {/* Case studies (How it works header part) */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  padding: "0px",
                  gap: "174px",
                  width: "1340px",
                  height: "136px",
                  flex: "none",
                  order: 1,
                }}
              >
                {/* Left (H) */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    padding: "0px",
                    gap: "12px",
                    width: "603px",
                    height: "136px",
                    flex: "none",
                    order: 0,
                  }}
                >
                  <div style={{ width: "603px", height: "52px", fontFamily: "'SF Pro', sans-serif", fontWeight: 400, fontSize: "42px", lineHeight: "52px", display: "flex", alignItems: "center", color: "#DEDCDC" }}>
                    How it works
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "0px",
                      gap: "10px",
                      width: "563px",
                      height: "72px",
                      flex: "none",
                      order: 1,
                    }}
                  >
                    <div style={{ width: "563px", height: "72px", fontFamily: "'SF Pro', sans-serif", fontWeight: 400, fontSize: "18px", lineHeight: "24px", display: "flex", alignItems: "center", color: "#B2B2B2" }}>
                      We bypass standard marketing practices. Grayforge operates at the intersection of quantitative data analysis and psychological creative direction.
                    </div>
                  </div>
                </div>
              </div>
            </FadeInBlock>

            {/* Case study carousal (3 Cards) */}
            <FadeInBlock as="div"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0px",
                width: "1340px",
                height: "486px",
                flex: "none",
                order: 1,
              }}
            >
              {[
                { brand: "Zyrotech", roas: "3.8x ROAS", revenue: "Revenue : $0 to $58k / month" },
                { brand: "Zyrotech", roas: "3.8x ROAS", revenue: "Revenue : $0 to $58k / month" },
                { brand: "Zyrotech", roas: "3.8x ROAS", revenue: "Revenue : $0 to $58k / month" }
              ].map((card, i) => (
                <div
                  key={i}
                  style={{
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "20px",
                    gap: "20px",
                    width: "400px",
                    height: "486px",
                    background: "#101010ce",
                    border: "0.8px solid #1F1F1Fcf",
                    flex: "none",
                    order: i,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      padding: "0px",
                      gap: "12px",
                      width: "360px",
                      height: "446px",
                      flex: "none",
                      flexGrow: 1,
                    }}
                  >
                    {/* Brand */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px", margin: "0 auto", width: "70px", height: "16px", flex: "none", order: 0 }}>
                      <div style={{ width: "70px", height: "16px", fontFamily: "'SF Pro', sans-serif", fontWeight: 510, fontSize: "16px", lineHeight: "16px", display: "flex", alignItems: "center", textAlign: "right", color: "#BCBCBC", opacity: 0.88 }}>
                        {card.brand}
                      </div>
                    </div>

                    {/* Metrics */}
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", padding: "0px", gap: "10px", margin: "0 auto", width: "360px", height: "52px", flex: "none", order: 1 }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px", margin: "0 auto", width: "124px", height: "28px", flex: "none" }}>
                        <div style={{ width: "124px", height: "28px", fontFamily: "'SF Pro', sans-serif", fontWeight: 510, fontSize: "22px", lineHeight: "28px", display: "flex", alignItems: "center", textAlign: "right", color: "#D3D3D3", opacity: 0.88 }}>
                          {card.roas}
                        </div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "0px", margin: "0 auto", width: "360px", height: "22px", flex: "none" }}>
                        <div style={{ width: "224px", height: "22px", fontFamily: "'SF Pro', sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "22px", display: "flex", alignItems: "center", color: "#7C7C7C" }}>
                          {card.revenue}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </FadeInBlock>
          </div>
          <HorizontalGridDivider />
        </section>

        {/* Section 4 - OUR WORK (Previously Process) */}
        <section
          id="work"
          className="w-full flex flex-col box-border relative"
          style={{ padding: "90px 50px 106px", gap: "120px", background: "#090909", pointerEvents: "auto" }}
        >
          {/* Block */}
          <FadeInBlock as="div"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              padding: "0px",
              gap: "16px",
              margin: "0 auto",
              maxWidth: "1340px",
              width: "100%",
              flex: "none",
              order: 0,
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", width: "100%", height: "24px" }}>
              <div style={{ fontFamily: "'SF Pro', sans-serif", fontWeight: 400, fontSize: "12px", lineHeight: "20px", display: "flex", alignItems: "center", color: "#8A8A8A" }}>
                OUR WORK
              </div>
            </div>

            {/* Case studies */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
                padding: "0px",
                gap: "174px",
                width: "100%",
                flex: "none",
                order: 1,
              }}
            >
              {/* Left (H) */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "0px",
                  gap: "12px",
                  maxWidth: "603px",
                  width: "100%",
                  flex: "none",
                  order: 0,
                }}
              >
                <div style={{ fontFamily: "'SF Pro', sans-serif", fontWeight: 400, fontSize: "42px", lineHeight: "52px", display: "flex", alignItems: "center", color: "#DEDCDC", whiteSpace: "nowrap" }}>
                  Why Us?
                </div>
                <div style={{ fontFamily: "'SF Pro', sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "22px", display: "flex", alignItems: "center", color: "#B2B2B2" }}>
                  <span>
                    We bypass standard marketing practices. Grayforge operates<br />
                    at the intersection of quantitative data analysis and psychological<br />
                    creative direction.
                  </span>
                </div>
              </div>

              {/* Right (Process) */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  padding: "18px 0px",
                  gap: "40px",
                  maxWidth: "509px",
                  width: "100%",
                  flex: "none",
                  order: 1,
                }}
              >
                {/* 01 Metrics */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "8px", width: "218px" }}>
                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "8px", width: "100%" }}>
                    <div className="flex flex-wrap items-center justify-center gap-[2px] w-[14px]">
                      <svg width="16" height="14" viewBox="0 0 16 14" fill="none"><circle cx="7" cy="2" r="1.5" fill="#9B462C" /><circle cx="7" cy="12" r="1.5" fill="#9B462C" /><circle cx="12" cy="7" r="1.5" fill="#9B462C" /><circle cx="2" cy="7" r="1.5" fill="#9B462C" /><circle cx="7" cy="7" r="1.5" fill="#9B462C" /></svg>
                    </div>
                    <div style={{ fontFamily: "'SF Pro', sans-serif", fontWeight: 510, fontSize: "14px", lineHeight: "20px", color: "#686868ff", paddingLeft: "4px" }}>
                      Average ROAS
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%" }}>
                    <div style={{ fontFamily: "'SF Pro', sans-serif", fontWeight: 400, fontSize: "34px", lineHeight: "40px", color: "#a5a4a4ff", marginLeft: "-2px" }}>
                      <MeterText text="5.2x" />
                    </div>
                  </div>
                </div>

                {/* Divider Line */}
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", padding: "0px 10px", gap: "10px", height: "82px" }}>
                  <div style={{ width: "0px", height: "82px", border: "0.8px dashed #2E2E2E", opacity: 0.68 }}></div>
                </div>

                {/* 02 Metrics */}
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", padding: "0px 0px 0px 10px", gap: "8px", width: "232px" }}>
                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "8px", width: "100%" }}>
                    <div className="flex flex-wrap items-center justify-center gap-[2px] w-[14px]">
                      <svg width="16" height="14" viewBox="0 0 16 14" fill="none"><circle cx="7" cy="2" r="1.5" fill="#9B462C" /><circle cx="7" cy="12" r="1.5" fill="#9B462C" /><circle cx="12" cy="7" r="1.5" fill="#9B462C" /><circle cx="2" cy="7" r="1.5" fill="#9B462C" /><circle cx="7" cy="7" r="1.5" fill="#9B462C" /></svg>
                    </div>
                    <div style={{ fontFamily: "'SF Pro', sans-serif", fontWeight: 510, fontSize: "14px", lineHeight: "20px", color: "#686868ff", paddingLeft: "4px" }}>
                      Portfolio Growth
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%" }}>
                    <div style={{ fontFamily: "'SF Pro', sans-serif", fontWeight: 400, fontSize: "38px", lineHeight: "40px", color: "#a5a4a4ff", marginLeft: "-2px" }}>
                      <MeterText text="+142%" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeInBlock>

          {/* Case study carousal */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%", maxWidth: "1340px", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
              {/* Previous Button */}
              <div
                onClick={scrollPrev}
                style={{ boxSizing: "border-box", display: "flex", justifyContent: "center", alignItems: "center", width: "32px", height: "32px", border: "1px solid #1F1F1F", borderRadius: "2px", cursor: canScrollPrev ? "pointer" : "default", opacity: canScrollPrev ? 1 : 0.3, transition: "opacity 0.3s ease" }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8L10 12" stroke="#8A8A8A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              {/* Next Button */}
              <div
                onClick={scrollNext}
                style={{ boxSizing: "border-box", display: "flex", justifyContent: "center", alignItems: "center", width: "32px", height: "32px", border: "1px solid #1F1F1F", borderRadius: "2px", cursor: canScrollNext ? "pointer" : "default", opacity: canScrollNext ? 1 : 0.3, transition: "opacity 0.3s ease" }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="#8A8A8A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
            </div>

            <FadeInBlock as="div" style={{ width: "100%", flex: "none", order: 1 }}>
              <div
                ref={carouselRef}
                onScroll={updateScrollButtons}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: "0px",
                  gap: "44px",
                  width: "100%",
                  overflowX: "hidden",
                  scrollBehavior: "smooth",
                }}
              >
                {/* Zyrotech Card */}
                <a href="/work/zyrotech" style={{ textDecoration: "none", color: "inherit" }}>
                  <div
                    style={{
                      boxSizing: "border-box",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "stretch",
                      padding: "20px",
                      gap: "8px",
                      width: "648px",
                      height: "270px",
                      background: "#101010ce",
                      border: "0.8px solid #1f1f1fcf",
                      borderRadius: "4px",
                      flex: "none",
                      order: 0,
                      cursor: "pointer",
                    }}
                  >
                  {/* Details */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      padding: "0px",
                      gap: "12px",
                      width: "240px",
                      height: "100%",
                    }}
                  >
                    {/* Brand */}
                    <div style={{ fontFamily: "'SF Pro', sans-serif", fontWeight: 510, fontSize: "16px", lineHeight: "20px", display: "flex", alignItems: "center", textAlign: "right", color: "#BCBCBC", opacity: 0.88 }}>
                      Meta Ads - Ecommerce
                    </div>

                    {/* Metrics */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "4px" }}>
                      <div style={{ fontFamily: "'SF Pro', sans-serif", fontWeight: 510, fontSize: "22px", lineHeight: "28px", display: "flex", alignItems: "center", color: "#D3D3D3", opacity: 0.88 }}>
                        10.11x ROAS
                      </div>
                      <div style={{ fontFamily: "'SF Pro', sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "22px", display: "flex", alignItems: "center", color: "#7C7C7C" }}>
                        ₹58k revenue on ₹5.7k spent
                      </div>
                    </div>
                  </div>

                  {/* Right Content Group (Divider + Insight) */}
                  <div style={{ display: "flex", flexDirection: "row", alignItems: "stretch", gap: "24px", height: "100%" }}>
                    {/* Divider */}
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", padding: "0px", gap: "10px", width: "0px", height: "100%" }}>
                      <div style={{ width: "0px", height: "100%", border: "0.8px dashed #202020e2", opacity: 0.68 }}></div>
                    </div>

                    {/* Praise */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        padding: "0px 2px",
                        width: "264px",
                        height: "100%",
                      }}
                    >
                      <p style={{ fontFamily: "'SF Pro', sans-serif", fontWeight: 300, fontSize: "15px", lineHeight: "22px", letterSpacing: 0, color: "#686868ff", margin: 0 }}>
                        Maintained elite-level returns on a lean budget with zero underperforming campaigns.
                      </p>
                    </div>
                  </div>
                </div>
              </a>

                {/* Subliminal Card */}
                <a href="/work/subliminal" style={{ textDecoration: "none", color: "inherit" }}>
                  <div
                    style={{
                      boxSizing: "border-box",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "stretch",
                      padding: "20px",
                      gap: "8px",
                      width: "648px",
                      height: "270px",
                      background: "#101010ce",
                      border: "0.8px solid #1F1F1Fcf",
                      borderRadius: "4px",
                      flex: "none",
                      order: 1,
                      cursor: "pointer",
                    }}
                  >
                  {/* Details */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      padding: "0px",
                      gap: "12px",
                      width: "240px",
                      height: "100%",
                    }}
                  >
                    {/* Brand */}
                    <div style={{ fontFamily: "'SF Pro', sans-serif", fontWeight: 510, fontSize: "16px", lineHeight: "20px", display: "flex", alignItems: "center", textAlign: "right", color: "#BCBCBC", opacity: 0.88 }}>
                      Meta Ads - Ecommerce
                    </div>

                    {/* Metrics */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "4px" }}>
                      <div style={{ fontFamily: "'SF Pro', sans-serif", fontWeight: 510, fontSize: "22px", lineHeight: "28px", display: "flex", alignItems: "center", color: "#D3D3D3", opacity: 0.88 }}>
                        6.83x Avg ROAS
                      </div>
                      <div style={{ fontFamily: "'SF Pro', sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "22px", display: "flex", alignItems: "center", color: "#7C7C7C" }}>
                        ₹4.37L revenue generated
                      </div>
                    </div>
                  </div>

                  {/* Right Content Group (Divider + Insight) */}
                  <div style={{ display: "flex", flexDirection: "row", alignItems: "stretch", gap: "24px", height: "100%" }}>
                    {/* Divider */}
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", padding: "0px", gap: "10px", width: "0px", height: "100%" }}>
                      <div style={{ width: "0px", height: "100%", border: "0.8px dashed #202020e2", opacity: 0.68 }}></div>
                    </div>

                    {/* Praise */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        padding: "0px 2px",
                        width: "264px",
                        height: "100%",
                      }}
                    >
                      <p style={{ fontFamily: "'SF Pro', sans-serif", fontWeight: 300, fontSize: "15px", lineHeight: "22px", letterSpacing: 0, color: "#686868ff", margin: 0 }}>
                        Drove high purchase volume on Meta while keeping returns well above target.
                      </p>
                    </div>
                  </div>
                </div>
              </a>

                {/* 3rd Card - Google Shopping */}
                <a href="/work/google-shopping" style={{ textDecoration: "none", color: "inherit" }}>
                  <div
                    style={{
                      boxSizing: "border-box",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "stretch",
                      padding: "20px",
                      gap: "8px",
                      width: "648px",
                      height: "270px",
                      background: "#101010ce",
                      border: "0.8px solid #1F1F1Fcf",
                      borderRadius: "4px",
                      flex: "none",
                      order: 2,
                      cursor: "pointer",
                    }}
                  >
                  {/* Details */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      padding: "0px",
                      gap: "12px",
                      width: "240px",
                      height: "100%",
                    }}
                  >
                    {/* Brand */}
                    <div style={{ fontFamily: "'SF Pro', sans-serif", fontWeight: 510, fontSize: "16px", lineHeight: "20px", display: "flex", alignItems: "center", textAlign: "right", color: "#BCBCBC", opacity: 0.88 }}>
                      Google Shopping - Ecommerce
                    </div>

                    {/* Metrics */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "4px" }}>
                      <div style={{ fontFamily: "'SF Pro', sans-serif", fontWeight: 510, fontSize: "22px", lineHeight: "28px", display: "flex", alignItems: "center", color: "#D3D3D3", opacity: 0.88 }}>
                        3.41x Avg ROAS
                      </div>
                      <div style={{ fontFamily: "'SF Pro', sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "22px", display: "flex", alignItems: "center", color: "#7C7C7C" }}>
                        ₹3.41L Revenue Generated
                      </div>
                    </div>
                  </div>

                  {/* Right Content Group (Divider + Insight) */}
                  <div style={{ display: "flex", flexDirection: "row", alignItems: "stretch", gap: "24px", height: "100%" }}>
                    {/* Divider */}
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", padding: "0px", gap: "10px", width: "0px", height: "100%" }}>
                      <div style={{ width: "0px", height: "100%", border: "0.8px dashed #202020e2", opacity: 0.68 }}></div>
                    </div>

                    {/* Praise */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        padding: "0px 2px",
                        width: "264px",
                        height: "100%",
                      }}
                    >
                      <p style={{ fontFamily: "'SF Pro', sans-serif", fontWeight: 300, fontSize: "15px", lineHeight: "22px", letterSpacing: 0, color: "#686868ff", margin: 0 }}>
                        Scaled Google Shopping profitably across multiple campaigns with consistent returns.
                      </p>
                    </div>
                  </div>
                </div>
              </a>
              </div>
            </FadeInBlock>
          </div>
          <HorizontalGridDivider />
        </section>

        {/* Section 4 - Prefooter CTA */}
        <section
          className="w-full flex justify-center items-center box-border relative"
          style={{ padding: "0px", background: "#090909", zIndex: 8, pointerEvents: "auto" }}
        >
          {/* Block */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              padding: "40px 50px",
              gap: "20px",
              width: "100%",
              maxWidth: "1429px",
              boxSizing: "border-box",
              background: "url('/Landing/7.png') center/cover no-repeat",
              flex: "none",
              order: 0,
              overflow: "hidden"
            }}
          >
            {/* Bottom content row */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
                padding: "0px",
                width: "100%",
              }}
            >
              {/* Left text */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    fontFamily: "'SF Pro', sans-serif",
                    fontWeight: 400,
                    fontSize: "34px",
                    lineHeight: "38px",
                    color: "#DEDCDC",
                  }}
                >
                  Ready to Scale ?
                </div>
                <div
                  style={{
                    fontFamily: "'SF Pro', sans-serif",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "22px",
                    display: "flex",
                    alignItems: "center",
                    color: "#B2B2B2",
                    maxWidth: "506px",
                  }}
                >
                  <span>
                    We selectively partner with brands where market dominance<br />
                    is the only objective. Inquire for our intake.
                  </span>
                </div>
              </div>

              <a href="/connect" style={{ textDecoration: "none" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "12px 46px",
                    gap: "10px",
                    width: "max-content",
                    height: "max-content",
                    background: "#FFFFFF",
                    boxShadow: "0px 2px 6px rgba(232, 42, 0, 0.25), inset 0px -6px 40px rgba(255, 152, 115, 0.6)",
                    borderRadius: "1px",
                    transform: "matrix(1, 0, 0, -1, 0, 0)",
                    flex: "none",
                    order: 1,
                    flexGrow: 0,
                    cursor: "pointer",
                  }}
                >
                  {/* PARTNER WITH US */}
                  <div
                    style={{
                      width: "max-content",
                      height: "max-content",
                      fontFamily: "'SF Compact', sans-serif",
                      fontStyle: "normal",
                      fontWeight: 556,
                      fontSize: "16px",
                      lineHeight: "21px",
                      display: "flex",
                      alignItems: "center",
                      textAlign: "center",
                      letterSpacing: "-0.04em",
                      color: "#F24C1A",
                      textShadow: "0px 2px 8px rgba(255, 255, 255, 0.93)",
                      flex: "none",
                      order: 0,
                      flexGrow: 0,
                      transform: "matrix(1, 0, 0, -1, 0, 0)", // Flip text back
                    }}
                  >
                    <HoverMenuText text="PARTNER WITH US" hoverColor="#F24C1A" />
                  </div>
                </div>
              </a>
            </div>
          </div>
          <HorizontalGridDivider />
        </section>

        {/* Spacer to allow scrolling to reveal the fixed footer hideen beneath */}
        <div style={{ height: "683px", width: "100%", pointerEvents: "none" }} />

      </div>

      <footer
        className="w-full flex justify-center items-center box-border"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          height: "683px",
          background: "radial-gradient(163.57% 163.57% at 65.42% -28.18%, #090909 29.12%, #090909 50.37%, #0A0A0A 59.95%, #262626 100%)",
          zIndex: 1,
          pointerEvents: "auto",
        }}
      >
        {/* Main Footer Container (1440px) */}
        <div
          style={{
            width: "100%",
            maxWidth: "1440px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
            padding: "70px 52px 60px",
            boxSizing: "border-box",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Top Row (Socials + Pages) */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              width: "100%",
              maxWidth: "1340px",
              margin: "0 auto",
              flex: "none",
            }}
          >
            {/* Left: Socials */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "13px" }}>
              <div style={{ fontFamily: "'SF Pro', sans-serif", fontSize: "18px", lineHeight: "21px", color: "#B2B2B2", fontWeight: 400 }}>
                SOCIALS
              </div>
              <div style={{ display: "flex", flexDirection: "row", gap: "16px" }}>
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: "44px",
                      height: "44px",
                      background: "#1717176d",
                      border: "0.6px solid #221b19ff",
                      borderRadius: "4px",
                      boxSizing: "border-box"
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Right: Pages */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "14px" }}>
              {["HOME", "WORK", "ABOUT US", "OUR STRATEGY", "PARTNERSHIP"].map((page) => (
                page === "HOME" ? (
                  <a
                    key={page}
                    href="#top"
                    onClick={(e) => { e.preventDefault(); lenisRef.current?.scrollTo(0); }}
                    className="text-[#B2B2B2]"
                    style={{
                      fontFamily: "'SF Pro', sans-serif",
                      fontSize: "18px",
                      lineHeight: "21px",
                      textAlign: "right",
                      fontWeight: 400,
                      textDecoration: "none",
                    }}
                  >
                    <HoverMenuText text={page} hoverColor="#DA5932" />
                  </a>
                ) : (
                  <div
                    key={page}
                    className="text-[#B2B2B2]"
                    style={{
                      fontFamily: "'SF Pro', sans-serif",
                      fontSize: "18px",
                      lineHeight: "21px",
                      textAlign: "right",
                      fontWeight: 400
                    }}
                  >
                    <HoverMenuText text={page} hoverColor="#DA5932" />
                  </div>
                )
              ))}
            </div>
          </div>

          {/* Frame 1022 (Mid Section + Bottom Section) */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "flex-start",
              width: "100%",
              maxWidth: "1340px",
              height: "201px", // Frame 1022 height
              margin: "0 auto",
              flex: "none",
            }}
          >
            {/* Frame 1021 (Tagline Row + Vector) */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-start",
                width: "100%",
                height: "32px", // Frame 1021 height
                padding: "0px",
                flex: "none",
              }}
            >
              {/* Frame 1023 (Tagline + Privacy) */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  height: "22px", // Frame 1023 height
                  padding: "0px",
                }}
              >
                <div
                  style={{
                    fontFamily: "'SF Compact', sans-serif",
                    fontWeight: 457,
                    fontSize: "14px",
                    lineHeight: "22px",
                    textAlign: "left",
                    color: "#999999",
                    whiteSpace: "nowrap",
                  }}
                >
                  Architecture of growth. Elite performance for dominant brands.
                </div>
                <div
                  className="text-[#999999]"
                  style={{
                    fontFamily: "'SF Compact', sans-serif",
                    fontWeight: 457,
                    fontSize: "14px",
                    lineHeight: "22px",
                    textTransform: "uppercase",
                    textAlign: "right",
                    opacity: 0.6,
                  }}
                >
                  <HoverMenuText text="PRIVACY POLICY" hoverColor="#DA5932" />
                </div>
              </div>
              {/* Vector 416 */}
              <div style={{ width: "100%", height: "0px", border: "1px solid rgba(40, 33, 31, 0.3)", alignSelf: "stretch" }} />
            </div>

            {/* Bottom Row (Info + Branding) - 64px height */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
                width: "100%",
                height: "64px",
                margin: "0 auto",
              }}
            >
              {/* Copyright */}
              <div
                style={{
                  fontFamily: "'SF Compact', sans-serif",
                  fontWeight: 457,
                  fontSize: "10px",
                  lineHeight: "14px",
                  color: "#5A5350",
                  whiteSpace: "nowrap",
                }}
              >
                ©2024 Greyforge. ALL RIGHTS RESERVED.
              </div>
              {/* GRAYFORGE branding */}
              <div
                style={{
                  fontFamily: "'BIZ UDGothic', sans-serif",
                  fontWeight: 700,
                  fontSize: "60px",
                  lineHeight: "64px",
                  color: "#E1E1E1",
                  textAlign: "center",
                  width: "270px"
                }}
              >
                GRAYFORGE
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

