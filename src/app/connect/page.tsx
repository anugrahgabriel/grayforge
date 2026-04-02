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

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const isFormComplete = formData.name.trim() !== "" && formData.email.trim() !== "" && formData.message.trim() !== "";

  const handleSend = () => {
    if (isFormComplete) {
      console.log("Form submitted:", formData);
      // Logic for submission
    }
  };

  const inputStyle = (isUnderlined: boolean = false) => ({
    width: "100%",
    background: "transparent",
    border: isUnderlined ? "none" : "0.8px solid rgba(39, 39, 39, 0.6)",
    borderBottom: isUnderlined ? "0.8px solid rgba(39, 39, 39, 0.6)" : "none",
    borderRadius: isUnderlined ? "0px" : "1px",
    padding: isUnderlined ? "12px 0px" : "12px 16px",
    color: "rgba(222, 220, 220, 0.8)",
    fontFamily: "'SF Pro', sans-serif",
    fontSize: "14px",
    lineHeight: "22px",
    outline: "none",
    transition: "border-color 0.3s ease",
  });

  return (
    <div style={{
      position: "relative",
      zIndex: 10,
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      width: "483px",
      padding: "24px 20px 40px 36px",
      background: "linear-gradient(to right, rgba(9, 9, 9, 0) 0%, rgba(9, 9, 9, 1) 20%, rgba(9, 9, 9, 1) 80%, rgba(9, 9, 9, 0) 100%)",
      borderRadius: "1px",
      opacity: 1
    }}>
      {/* Form Header */}
      <div style={{ width: "100%", marginBottom: "16px" }}>
        <div style={{ fontFamily: "'SF Pro', sans-serif", fontSize: "20px", color: "#B2B2B2", lineHeight: "26px" }}>
          Write to us and we’ll get back to you !
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px", position: "relative" }}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          style={inputStyle(true)}
          className="placeholder:opacity-[0.38] placeholder:text-[#8A8A8A]"
        />
        {formData.name.trim() === "" && (
          <span style={{ position: "absolute", left: "40px", top: "12px", color: "#F24C1A", fontSize: "14px", fontFamily: "'SF Pro', sans-serif" }}>*</span>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", position: "relative" }}>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          style={inputStyle(true)}
          className="placeholder:opacity-[0.38] placeholder:text-[#8A8A8A]"
        />
        {formData.email.trim() === "" && (
          <span style={{ position: "absolute", left: "38px", top: "12px", color: "#F24C1A", fontSize: "14px", fontFamily: "'SF Pro', sans-serif" }}>*</span>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px", position: "relative" }}>
        <textarea
          placeholder="Message"
          value={formData.message}
          rows={1}
          onChange={(e) => {
            const el = e.target;
            el.style.height = "auto";
            const newHeight = Math.min(el.scrollHeight, 120);
            el.style.height = `${newHeight}px`;
            setFormData({ ...formData, message: el.value });
          }}
          style={{
            ...inputStyle(true),
            resize: "none",
            minHeight: "46px",
            maxHeight: "120px",
            height: "46px",
            overflow: "hidden",
            boxSizing: "border-box"
          }}
          className="placeholder:opacity-[0.38] placeholder:text-[#8A8A8A]"
        />
        {formData.message.trim() === "" && (
          <span style={{ position: "absolute", left: "60px", top: "12px", color: "#F24C1A", fontSize: "14px", fontFamily: "'SF Pro', sans-serif" }}>*</span>
        )}
      </div>

      <div
        onClick={handleSend}
        style={{
          textDecoration: "none",
          cursor: isFormComplete ? "pointer" : "default",
          width: "100%",
          marginTop: "72px",
          transition: "all 0.3s ease"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "40px",
            background: isFormComplete ? "#FFFFFF" : "#161616",
            boxShadow: isFormComplete ? "0px 2px 6px rgba(232, 42, 0, 0.25), inset 0px -6px 40px rgba(255, 152, 115, 0.6)" : "none",
            border: isFormComplete ? "none" : "0.8px solid rgba(39, 39, 39, 0.6)",
            borderRadius: "1px",
            transform: "matrix(1, 0, 0, -1, 0, 0)",
            opacity: isFormComplete ? 1 : 0.2,
            transition: "all 0.4s cubic-bezier(0.1, 0.9, 0.2, 1)",
          }}
        >
          <div
            style={{
              fontFamily: "'SF Compact', sans-serif",
              fontWeight: 556,
              fontSize: "14px",
              color: isFormComplete ? "#F24C1A" : "#8A8A8A",
              letterSpacing: "-0.04em",
              textShadow: isFormComplete ? "0px 2px 8px rgba(255, 255, 255, 0.93)" : "none",
              transform: "matrix(1, 0, 0, -1, 0, 0)",
              transition: "color 0.4s ease",
            }}
          >
            {isFormComplete ? (
              <HoverMenuText text="SEND" hoverColor="#F24C1A" />
            ) : (
              "SEND"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StepIcon = () => (
  <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
    <circle cx="7" cy="2" r="1.5" fill="#9B462C" />
    <circle cx="7" cy="12" r="1.5" fill="#9B462C" />
    <circle cx="12" cy="7" r="1.5" fill="#9B462C" />
    <circle cx="2" cy="7" r="1.5" fill="#9B462C" />
    <circle cx="7" cy="7" r="1.5" fill="#9B462C" />
  </svg>
);

const PrefooterBackground = ({ align = "center", isStartHovered = false }: { align?: "top" | "center" | "bottom", isStartHovered?: boolean }) => {
  const heights = [154, 163, 173, 183, 199, 211, 224, 243, 263, 271, 274, 272, 268, 263, 256, 249, 243, 236, 232, 230, 231, 234, 238, 242, 247, 247, 248, 244, 237, 235, 244, 251, 260, 271, 282, 279, 280, 288, 295, 304, 313, 322, 334, 347, 355, 359, 359, 361, 373, 382, 397, 415, 425, 435, 453, 470, 486, 493, 499, 502, 499, 495, 506, 513, 526, 535, 545, 553, 571, 585, 616, 645, 673, 694, 706, 710, 714, 716, 716, 720, 726, 728, 735, 746, 753, 756, 753, 744, 741, 747, 765, 782, 799, 817, 833, 848, 861, 875, 886, 896, 907, 911, 912, 908, 906, 904, 908, 915, 915, 910, 904, 897, 894, 887, 896, 905, 914, 924, 938, 953];

  const verticalStyles = {
    top: { top: 0, transform: "none" },
    center: { top: "50%", transform: "translateY(-50%)" },
    bottom: { bottom: 0, transform: "none" }
  };

  const { top, transform, bottom } = verticalStyles[align] as any;
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
      maskImage: "linear-gradient(to right, transparent, black 15%, black 40%, transparent 70%)",
      WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 40%, transparent 70%)"
    }}>
      {[false, true].map((isFlipped, idx) => {
        const topOffset = isFlipped ? "auto" : "300px";
        const bottomOffset = isFlipped ? "200px" : "auto";
        return (
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
              <svg width="1440" height="350" viewBox="0 0 1440 350" style={{ position: "absolute", top: topOffset, bottom: bottomOffset, left: 0, transform: `scaleX(${isFlipped ? "-1" : "1"})`, width: "100%", height: "auto", overflow: "visible" }}>
                <defs>
                  <linearGradient id={`prefooterFade-${idx}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset={idx === 0 ? "75%" : "60%"} stopColor="#272323ff" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#9a9a9aff" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                {heights.map((h, i) => {
                  const x = 6 + i * 12;
                  const hAdjusted = h * 0.35;
                  return <rect key={i} x={x - 0.5} y={(350 - hAdjusted) / 2} width="1" height={hAdjusted} fill={`url(#prefooterFade-${idx})`} />;
                })}
                {(() => {
                  const pts = heights.map((h, i) => ({ x: 6 + i * 12, y: (350 - h * 0.35) / 2 + (h * 0.35) }));
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
                  return (
                    <>
                      <path d={d} fill="none" stroke="#2d2d2dff" strokeOpacity="1" strokeWidth="1" />
                      <path d={d} fill="none" stroke="#d04715c7" strokeWidth="4" strokeLinecap="round" style={{ opacity: isStartHovered ? 1 : 0, strokeDasharray: "158 2500", strokeDashoffset: isStartHovered ? "158" : "-2000", transition: isStartHovered ? "stroke-dashoffset 2.5s cubic-bezier(0.2, 0.8, 0.2, 0.4), opacity 0.3s" : "stroke-dashoffset 0s, opacity 0.3s", filter: "blur(0.8px)" }} />
                    </>
                  );
                })()}
              </svg>
            </div>
          </div>
        )
      })}
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

export default function Connect() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isInitialGlow, setIsInitialGlow] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.07, smoothWheel: true });
    lenisRef.current = lenis;
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    const rafId = requestAnimationFrame(raf);

    // Initial glow sequence
    const triggerTimeout = setTimeout(() => setIsInitialGlow(true), 400);
    const stopTimeout = setTimeout(() => setIsInitialGlow(false), 3800);

    if ("scrollRestoration" in window.history) { window.history.scrollRestoration = "manual"; }
    window.scrollTo(0, 0);

    const handleScroll = () => { setIsScrolled(window.scrollY > 100); };
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
    <main className="w-full flex flex-col items-center box-border" style={{ background: "#090909" }}>
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
        }}
      >
        {/* Left */}
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <a href="/" style={{ textDecoration: "none" }}>
            <div
              style={{
                fontFamily: "'BIZ UDGothic', sans-serif",
                fontWeight: 700,
                fontSize: "18px",
                color: "#ddc8c8ff",
                cursor: "pointer",
              }}
            >
              GRAYFORGE
            </div>
          </a>
        </div>

        {/* Right */}
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "30px" }}>
          {/* Menus */}
          <div style={{ display: "flex", flexDirection: "row", gap: "26px", alignItems: "center" }}>
            <a href="/#strategy" style={{ textDecoration: "none", color: "#dfdfdfff", fontSize: "14px", fontFamily: "'SF Pro Rounded', sans-serif" }}>
              <HoverMenuText text="Strategy" />
            </a>
            <a href="/#work" style={{ textDecoration: "none", color: "#dfdfdfff", fontSize: "14px", fontFamily: "'SF Pro Rounded', sans-serif" }}>
              <HoverMenuText text="Work" />
            </a>
            <a href="/#about-us" style={{ textDecoration: "none", color: "#dfdfdfff", fontSize: "14px", fontFamily: "'SF Pro Rounded', sans-serif" }}>
              <HoverMenuText text="About Us" />
            </a>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="flex flex-col w-full flex-grow" style={{ position: "relative", zIndex: 2, pointerEvents: "none" }}>

        {/* Top Fold (Fold 3 Specs) */}
        <section
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            height: "100vh",
            minHeight: "960px",
            background: "#090909",
            position: "relative",
            pointerEvents: "auto",
          }}
        >
          <PrefooterBackground align="bottom" isStartHovered={isInitialGlow} />
          {/* Centered Content Container */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "58px 50px",
              width: "100%",
              maxWidth: "1440px",
              height: "100%",
              boxSizing: "border-box",
            }}
          >
            {/* Header Block */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "0px",
                gap: "16px",
                width: "100%",
                maxWidth: "1340px",
                height: "max-content",
                marginTop: "200px",
              }}
            >
              {/* Header / Q4 Slot */}
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", width: "100%" }}>
                <div style={{ fontFamily: "'SF Pro', sans-serif", fontSize: "14px", color: "#DA5932" }}>
                  Q4 slot available
                </div>
              </div>

              {/* Process Row */}
              <FadeInBlock
                as="div"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  padding: "0px",
                  gap: "174px",
                  width: "100%",
                  height: "422px",
                }}
              >
                {/* Left Column */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: "max-content", gap: "54px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <h1 style={{ fontFamily: "'SF Pro', sans-serif", fontSize: "42px", color: "#DEDCDC", fontWeight: 400, lineHeight: "52px", whiteSpace: "nowrap" }}>
                      Connect for performance
                    </h1>
                    <p style={{ fontFamily: "'SF Pro', sans-serif", fontSize: "18px", color: "#727272ff", lineHeight: "26px", maxWidth: "493px", marginTop: "-4px" }}>
                      We don’t manage accounts. We engineer growth. Partner with us to deploy high-conviction capital into the meta ecosystem.
                    </p>
                  </div>
                </div>

                {/* Contact Form Column */}
                <div style={{ marginTop: "-8px" }}>
                  <ContactForm />
                </div>
              </FadeInBlock>
            </div>
          </div>
          <HorizontalGridDivider position="bottom" />
        </section>

        {/* Spacer for footer reveal */}
        <div style={{ height: "683px", width: "100%", pointerEvents: "none" }} />
      </div>

      {/* Footer */}
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
                    href="/"
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
                    <HoverMenuText text="HOME" hoverColor="#DA5932" />
                  </a>
                ) : (
                  <a
                    key={page}
                    href={
                      page === "WORK" ? "/#work" :
                        page === "ABOUT US" ? "/#about-us" :
                          page === "OUR STRATEGY" ? "/#strategy" :
                            page === "PARTNERSHIP" ? "/connect" : "/"
                    }
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
