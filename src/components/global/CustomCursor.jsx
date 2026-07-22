"use client";

import React, { useEffect, useRef } from "react";

const ALL_MODES = ["default", "creativity", "engineering", "intelligence"];

const CustomCursor = () => {
  const canvasRef = useRef(null);
  const modeRef = useRef("default");

  const mouseRef = useRef({
    x: -100,
    y: -100,
    lastX: -100,
    lastY: -100,
    active: false,
  });
  const smoothRef = useRef({ x: -100, y: -100 });
  const particlesRef = useRef([]);

  useEffect(() => {
    // Hide default cursor globally
    document.body.style.cursor = "none";

    // Prevent default cursors on interactive tags
    const style = document.createElement("style");
    style.innerHTML = `
      a, button, [role="button"], select, input, textarea {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    let animationFrameId;
    const mouse = mouseRef.current;
    const smooth = smoothRef.current;
    const particles = particlesRef.current;

    const handleMouseMove = (e) => {
      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;

      // Spawn particles based on mode on mouse move
      const dx = mouse.x - mouse.lastX;
      const dy = mouse.y - mouse.lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 1.5 && mouse.lastX !== -100) {
        const mode = modeRef.current;

        if (mode === "creativity") {
          // Brush paint stroke interpolation
          const steps = Math.max(Math.floor(dist / 1.2), 1); // Spawn particles every 1.2px for a solid line
          for (let s = 0; s < steps; s++) {
            const t = s / steps;
            const px = mouse.lastX + dx * t;
            const py = mouse.lastY + dy * t;
            
            // Randomly shift between primary blue and secondary indigo/bright blue
            const isSecondary = Math.random() < 0.35;
            const r = isSecondary ? 59 : 29;
            const g = isSecondary ? 130 : 78;
            const b = isSecondary ? 246 : 216;

            particles.push({
              x: px,
              y: py,
              vx: 0, // completely static, rigid paint stroke
              vy: 0,
              size: (Math.random() * 3 + 9) * Math.max(0.4, 1 - dist * 0.008), // less thinning
              r,
              g,
              b,
              alpha: Math.random() * 0.15 + 0.45, // more solid opacity
              life: 0,
              maxLife: 16 + Math.random() * 10, // shorter trail for high responsiveness
              type: "creativity",
              isSplatter: false,
            });

            // Occasional bristle splatters for texture (also rigid)
            if (Math.random() < 0.08) {
              const angle = Math.random() * Math.PI * 2;
              const offset = Math.random() * 6 + 3;
              particles.push({
                x: px + Math.cos(angle) * offset,
                y: py + Math.sin(angle) * offset,
                vx: 0, // static splatter
                vy: 0,
                size: Math.random() * 1.5 + 0.6,
                r,
                g,
                b,
                alpha: Math.random() * 0.3 + 0.3,
                life: 0,
                maxLife: 12 + Math.random() * 8,
                type: "creativity",
                isSplatter: true,
              });
            }
          }
        } else if (mode === "engineering") {
          // Code symbols floating up
          if (Math.random() < 0.35) {
            const symbols = [
              "{",
              "}",
              "</>",
              "=>",
              "[]",
              "const",
              "&&",
              "||",
              "++",
              "=>",
            ];
            particles.push({
              x: mouse.x + (Math.random() - 0.5) * 10,
              y: mouse.y + (Math.random() - 0.5) * 10,
              vx: (Math.random() - 0.5) * 1.2,
              vy: -Math.random() * 1.5 - 0.6, // float upwards
              size: Math.random() * 3 + 9, // font size
              char: symbols[Math.floor(Math.random() * symbols.length)],
              r: 15,
              g: 23,
              b: 42,
              alpha: Math.random() * 0.4 + 0.3,
              life: 0,
              maxLife: 35 + Math.random() * 20,
              type: "engineering",
            });
          }
        } else if (mode === "intelligence") {
          // Pixel block falling down - increased count for more pixels
          const count = Math.random() < 0.4 ? 6 : 4;
          for (let i = 0; i < count; i++) {
            // Vary between high-tech blue and dark slate to feel like digital code
            const isBlue = Math.random() < 0.75;
            const r = isBlue ? 29 : 15;
            const g = isBlue ? 78 : 23;
            const b = isBlue ? 216 : 42;

            particles.push({
              x: mouse.x + (Math.random() - 0.5) * 14,
              y: mouse.y + (Math.random() - 0.5) * 14,
              vx: (Math.random() - 0.5) * 1.8,
              vy: Math.random() * 2.4 + 1.2, // fall down
              size: Math.random() * 5 + 3, // larger blocks: 3px to 8px
              r,
              g,
              b,
              alpha: Math.random() * 0.4 + 0.45, // more solid opacity
              life: 0,
              maxLife: 20 + Math.random() * 15,
              type: "intelligence",
            });
          }
        }
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest("[data-cursor]");
      if (target) {
        const mode = target.getAttribute("data-cursor");
        if (ALL_MODES.includes(mode)) {
          modeRef.current = mode;
        }
      } else {
        modeRef.current = "default";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const scale = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * scale;
      canvas.height = window.innerHeight * scale;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(scale, scale);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const loop = () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        animationFrameId = requestAnimationFrame(loop);
        return;
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        animationFrameId = requestAnimationFrame(loop);
        return;
      }

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const mode = modeRef.current;

      // 1. Follow smooth easing
      if (smooth.x === -100) {
        smooth.x = mouse.x;
        smooth.y = mouse.y;
      } else {
        smooth.x += (mouse.x - smooth.x) * 0.22;
        smooth.y += (mouse.y - smooth.y) * 0.22;
      }

      // 2. Draw active particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        const progress = p.life / p.maxLife;
        const opacity = 1 - progress;

        // Apply velocities
        p.x += p.vx;
        p.y += p.vy;

        if (p.type === "creativity") {
          ctx.beginPath();
          if (p.isSplatter) {
            // Splatters: draw sharp solid dots
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.alpha * opacity})`;
          } else {
            // Brush stroke: draw soft textured dabs that shrink slightly
            ctx.arc(p.x, p.y, p.size * (1 - progress * 0.2), 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.alpha * opacity * 0.65})`;
          }
          ctx.fill();
        } else if (p.type === "engineering") {
          // Code: float and fade text symbols
          ctx.save();
          ctx.font = `600 ${p.size}px ui-monospace, SFMono-Regular, monospace`;
          ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.alpha * opacity * 0.85})`;
          ctx.fillText(p.char, p.x, p.y);
          ctx.restore();
        } else if (p.type === "intelligence") {
          // Pixels: draw grid-snapped digital pixel blocks
          const snapX = Math.round(p.x / 3) * 3;
          const snapY = Math.round(p.y / 3) * 3;
          const snapSize = Math.max(Math.round(p.size / 2) * 2, 2); // ensure size is at least 2px and even
          
          ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.alpha * opacity * 0.8})`;
          ctx.fillRect(snapX - snapSize / 2, snapY - snapSize / 2, snapSize, snapSize);
        }
      }

      // 3. Draw cursor head (only if mouse is on viewport)
      if (mouse.x !== -100 && mouse.y !== -100) {
        ctx.save();

        if (mode === "default") {
          // Outer circle
          ctx.beginPath();
          ctx.arc(smooth.x, smooth.y, 16, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(29, 78, 216, 0.45)"; // Blue-700 based
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Inner dot
          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = "#1d4ed8";
          ctx.fill();
        } else if (mode === "creativity") {
          // Big soft glowing brush
          const grad = ctx.createRadialGradient(
            smooth.x,
            smooth.y,
            2,
            smooth.x,
            smooth.y,
            24,
          );
          grad.addColorStop(0, "rgba(29, 78, 216, 0.55)");
          grad.addColorStop(0.3, "rgba(29, 78, 216, 0.25)");
          grad.addColorStop(1, "rgba(29, 78, 216, 0)");
          ctx.beginPath();
          ctx.arc(smooth.x, smooth.y, 24, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();

          // Core brush tip
          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = "#1d4ed8";
          ctx.fill();
        } else if (mode === "engineering") {
          // Square coding cursor
          ctx.beginPath();
          ctx.rect(smooth.x - 12, smooth.y - 12, 24, 24);
          ctx.strokeStyle = "rgba(15, 23, 42, 0.65)"; // Slate-900 based
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Small tag symbol next to the cursor
          ctx.font = "bold 9px ui-monospace, SFMono-Regular, monospace";
          ctx.fillStyle = "#0f172a";
          ctx.fillText("</>", smooth.x + 2, smooth.y + 3);

          // Core dot
          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = "#0f172a";
          ctx.fill();
        } else if (mode === "intelligence") {
          // Pixel crosshair
          ctx.strokeStyle = "#1d4ed8";
          ctx.lineWidth = 1.5;

          // Outer square box
          ctx.beginPath();
          ctx.rect(smooth.x - 8, smooth.y - 8, 16, 16);
          ctx.stroke();

          // Center crosshair lines
          ctx.beginPath();
          ctx.moveTo(smooth.x - 4, smooth.y);
          ctx.lineTo(smooth.x - 1, smooth.y);
          ctx.moveTo(smooth.x + 1, smooth.y);
          ctx.lineTo(smooth.x + 4, smooth.y);
          ctx.moveTo(smooth.x, smooth.y - 4);
          ctx.lineTo(smooth.x, smooth.y - 1);
          ctx.moveTo(smooth.x, smooth.y + 1);
          ctx.lineTo(smooth.x, smooth.y + 4);
          ctx.stroke();

          // Central tiny pixel
          ctx.beginPath();
          ctx.rect(mouse.x - 1.5, mouse.y - 1.5, 3, 3);
          ctx.fillStyle = "#1d4ed8";
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      document.body.style.cursor = "default";
      style.remove();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 999999,
        display: "block",
      }}
    />
  );
};

export default CustomCursor;
