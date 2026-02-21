"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

const STAR_COUNT = 180;
const CONNECTION_DISTANCE = 160;
const CONNECTION_DIST_SQ = CONNECTION_DISTANCE * CONNECTION_DISTANCE;
const PARALLAX_STRENGTH = 30;
const PULSE_SPEED = 0.0008;
const MOUSE_LERP = 0.05;

function createGlowSprite(): HTMLCanvasElement {
  const size = 64;
  const sprite = document.createElement("canvas");
  sprite.width = size;
  sprite.height = size;
  const ctx = sprite.getContext("2d")!;
  const half = size / 2;
  const grad = ctx.createRadialGradient(half, half, 0, half, half, half);
  grad.addColorStop(0, "rgba(56, 189, 248, 0.25)");
  grad.addColorStop(1, "rgba(56, 189, 248, 0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  return sprite;
}

export function ConstellationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const smoothMouseRef = useRef({ x: 0, y: 0 });
  const glowRef = useRef<HTMLCanvasElement | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = {
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    if (!glowRef.current) glowRef.current = createGlowSprite();
    const glow = glowRef.current;

    let dpr = window.devicePixelRatio || 1;

    function resize() {
      dpr = window.devicePixelRatio || 1;
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      canvas!.style.width = `${window.innerWidth}px`;
      canvas!.style.height = `${window.innerHeight}px`;
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const w = () => canvas!.width / dpr;
    const h = () => canvas!.height / dpr;

    starsRef.current = Array.from({ length: STAR_COUNT }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 0.17 + 0.08;
      return {
        x: Math.random() * w(),
        y: Math.random() * h(),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 1.5 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      };
    });

    function draw(time: number) {
      if (!ctx || !canvas) return;

      const cw = w();
      const ch = h();

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cw, ch);

      smoothMouseRef.current.x +=
        (mouseRef.current.x - smoothMouseRef.current.x) * MOUSE_LERP;
      smoothMouseRef.current.y +=
        (mouseRef.current.y - smoothMouseRef.current.y) * MOUSE_LERP;

      const offsetX = smoothMouseRef.current.x * PARALLAX_STRENGTH;
      const offsetY = smoothMouseRef.current.y * PARALLAX_STRENGTH;

      const stars = starsRef.current;
      const len = stars.length;
      const pulse = Math.sin(time * PULSE_SPEED) * 0.5 + 0.5;

      for (let i = 0; i < len; i++) {
        const s = stars[i];
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = cw;
        else if (s.x > cw) s.x = 0;
        if (s.y < 0) s.y = ch;
        else if (s.y > ch) s.y = 0;
      }

      ctx.lineWidth = 0.5;
      for (let i = 0; i < len; i++) {
        const ax = stars[i].x + offsetX;
        const ay = stars[i].y + offsetY;
        for (let j = i + 1; j < len; j++) {
          const dx = ax - (stars[j].x + offsetX);
          const dy = ay - (stars[j].y + offsetY);
          const distSq = dx * dx + dy * dy;
          if (distSq < CONNECTION_DIST_SQ) {
            const dist = Math.sqrt(distSq);
            const base = (1 - dist / CONNECTION_DISTANCE) * 0.08;
            const alpha = base * (0.6 + pulse * 0.4);
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(stars[j].x + offsetX, stars[j].y + offsetY);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < len; i++) {
        const s = stars[i];
        const sx = s.x + offsetX;
        const sy = s.y + offsetY;

        ctx.beginPath();
        ctx.arc(sx, sy, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${s.opacity})`;
        ctx.fill();

        const glowDiam = s.radius * 8;
        ctx.globalAlpha = s.opacity;
        ctx.drawImage(
          glow,
          sx - glowDiam * 0.5,
          sy - glowDiam * 0.5,
          glowDiam,
          glowDiam
        );
        ctx.globalAlpha = 1;
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove]);

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2.5, ease: "easeOut" }}
      className="pointer-events-none absolute inset-0 z-0 will-change-transform"
    />
  );
}
