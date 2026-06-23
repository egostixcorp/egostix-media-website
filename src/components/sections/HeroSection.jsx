"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React, { useRef, useEffect } from "react";

const HeroSection = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;

    const mouse = { x: -1000, y: -1000, active: false };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Grid properties
    const fontSize = 13;
    const charWidth = 10;
    const charHeight = 20;
    const chars = [
      ".",
      "+",
      "*",
      "x",
      "o",
      "a",
      "i",
      "e",
      "g",
      "o",
      "s",
      "t",
      "i",
      "x",
    ];

    let cells = [];

    const initGrid = () => {
      cells = [];
      const cols = Math.floor(width / charWidth);
      const rows = Math.floor(height / charHeight);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x0 = c * charWidth + charWidth / 2;
          const y0 = r * charHeight + charHeight;
          const char = chars[Math.floor(Math.random() * chars.length)];
          cells.push({
            x: x0,
            y: y0,
            x0: x0,
            y0: y0,
            vx: 0,
            vy: 0,
            char: char,
          });
        }
      }
    };

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const scale = window.devicePixelRatio || 1;
      canvas.width = rect.width * scale;
      canvas.height = rect.height * scale;

      width = rect.width;
      height = rect.height;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(scale, scale);

      initGrid();
    };

    window.addEventListener("resize", handleResize);
    // Initial size configuration
    handleResize();

    // Physics parameters
    const repelRadius = 120;
    const repelForce = 3.5;
    const springK = 0.04;
    const friction = 0.82;

    const loop = () => {
      // Guard to auto-initialize grid if mounted with 0 dimensions
      if (cells.length === 0 && width === 0) {
        const rect = canvas.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          handleResize();
        }
      }

      ctx.clearRect(0, 0, width, height);
      ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
      ctx.textAlign = "center";

      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];

        // Repulsion from mouse
        if (mouse.active) {
          const dx = cell.x - mouse.x;
          const dy = cell.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < repelRadius) {
            const force = (repelRadius - dist) / repelRadius; // 0 to 1
            const angle = Math.atan2(dy, dx);
            const targetVx = Math.cos(angle) * force * repelForce;
            const targetVy = Math.sin(angle) * force * repelForce;
            cell.vx += targetVx;
            cell.vy += targetVy;
          }
        }

        // Spring force to home anchor
        const ax = (cell.x0 - cell.x) * springK;
        const ay = (cell.y0 - cell.y) * springK;
        cell.vx += ax;
        cell.vy += ay;

        // Apply friction and update pos
        cell.vx *= friction;
        cell.vy *= friction;
        cell.x += cell.vx;
        cell.y += cell.vy;

        // Calculate opacity and color based on mouse distance or deflection
        const dx = cell.x - cell.x0;
        const dy = cell.y - cell.y0;
        const offset = Math.sqrt(dx * dx + dy * dy);

        if (offset > 1.2) {
          const factor = Math.min(offset / 8, 1);
          ctx.fillStyle = `rgba(29, 78, 216, ${0.12 + factor * 0.38})`;
        } else {
          ctx.fillStyle = "rgba(148, 163, 184, 0.16)";
        }

        ctx.fillText(cell.char, cell.x, cell.y);
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative flex min-h-[680px] w-full items-center justify-center px-6 py-24 overflow-hidden bg-white">
      {/* Inline Styles for Orbiting Animations */}
      <style>{`
        @keyframes orbit {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes counter-orbit {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        .orbiting-container {
          animation: orbit 35s linear infinite;
        }
        .counter-orbiting-item {
          animation: counter-orbit 35s linear infinite;
        }
        .orbiting-system:hover .orbiting-container,
        .orbiting-system:hover .counter-orbiting-item {
          animation-play-state: paused;
        }
      `}</style>

      <div className="grid grid-cols-1 gap-12 items-center justify-items-center w-full max-w-7xl z-10 px-4 py-8">
        {/* Left Column: Center-aligned content */}
        <div className="space-y-6 flex flex-col items-center text-center">
          <h1 className="text-3xl font-mono tracking-tight tablet:text-4xl laptop:text-6xl text-slate-900 leading-tight">
            We Engineer{" "}
            <span className="font-bold text-blue-700">Software</span>
            <br /> & Modern{" "}
            <span className="font-bold text-blue-700 font-serif italic">
              Media
            </span>{" "}
            technology
          </h1>

          <p className="max-w-xl text-sm font-inter leading-relaxed text-slate-700 tablet:text-base">
            Creativity, engineering, and intelligence merged into one system
            that transforms ideas into measurable outcomes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link
              href="#contact"
              className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded bg-blue-700 px-6 py-3 font-mono text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-800 hover:scale-[1.02] hover:-translate-y-0.5 active:translate-y-0 active:scale-100 shadow-sm"
            >
              Contact us to begin
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/service"
              className="inline-flex w-full sm:w-auto items-center justify-center rounded border border-neutral-300 bg-white px-6 py-3 font-mono text-sm font-semibold text-slate-800 transition-all duration-200 hover:border-blue-700 hover:text-blue-700 hover:bg-neutral-50 hover:scale-[1.02] hover:-translate-y-0.5 active:translate-y-0 active:scale-100"
            >
              Explore offerings
            </Link>
          </div>
        </div>

        {/* Right Column: Orbiting system around central logo */}
        {/* <div className="flex items-center justify-center relative py-12 md:py-0 orbiting-system">
          <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
           
            <div className="relative z-20 w-24 h-24 md:w-28 md:h-28 rounded-full border border-neutral-200 bg-white flex items-center justify-center p-3 shadow-md transition-all duration-300 hover:scale-[1.03]">
              <Image
                src="/egostix-media-trans.png"
                width={120}
                height={40}
                alt="Egostix Media Center"
                className="object-contain"
              />
            </div>

            <div className="absolute w-52 h-52 md:w-68 md:h-68 rounded-full border-2 border-dashed border-neutral-200/80 -z-10" />

        
            <div className="absolute w-52 h-52 md:w-68 md:h-68 orbiting-container">
           
              <div
                className="absolute w-16 h-16 md:w-20 md:h-20 group"
                data-cursor="creativity"
                style={{
                  left: "50%",
                  top: "0%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="absolute inset-0 counter-orbiting-item">
                  <div className="w-full h-full rounded-full border border-neutral-200 bg-white overflow-hidden shadow-md p-1 flex items-center justify-center transition-all duration-300 hover:border-blue-700 hover:scale-[1.05]">
                    <Image
                      src="/c.png"
                      width={100}
                      height={100}
                      alt="Creativity"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                
                  <div className="absolute bottom-[115%] left-1/2 -translate-x-1/2 bg-slate-900 text-white font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-sm z-30">
                    Creativity
                  </div>
                </div>
              </div>

            
              <div
                className="absolute w-16 h-16 md:w-20 md:h-20 group"
                data-cursor="engineering"
                style={{
                  left: "93.3%",
                  top: "75%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="absolute inset-0 counter-orbiting-item">
                  <div className="w-full h-full rounded-full border border-neutral-200 bg-white overflow-hidden shadow-md p-1 flex items-center justify-center transition-all duration-300 hover:border-blue-700 hover:scale-[1.05]">
                    <Image
                      src="/e.png"
                      width={100}
                      height={100}
                      alt="Engineering"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                 
                  <div className="absolute top-[115%] left-1/2 -translate-x-1/2 bg-slate-900 text-white font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-sm z-30">
                    Engineering
                  </div>
                </div>
              </div>


              <div
                className="absolute w-16 h-16 md:w-20 md:h-20 group"
                data-cursor="intelligence"
                style={{
                  left: "6.7%",
                  top: "75%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="absolute inset-0 counter-orbiting-item">
                  <div className="w-full h-full rounded-full border border-neutral-200 bg-white overflow-hidden shadow-md p-1 flex items-center justify-center transition-all duration-300 hover:border-blue-700 hover:scale-[1.05]">
                    <Image
                      src="/i.png"
                      width={100}
                      height={100}
                      alt="Intelligence"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                 
                  <div className="absolute top-[115%] left-1/2 -translate-x-1/2 bg-slate-900 text-white font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-sm z-30">
                    Intelligence
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>

      {/* Dynamic ASCII Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute  inset-0 z-0 pointer-events-none w-full h-full"
        style={{
          maskImage:
            "radial-gradient(ellipse 60% 60% at 50% 50%, #000 70%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 60% at 50% 50%, #000 70%, transparent 100%)",
        }}
      />
    </section>
  );
};

export default HeroSection;
