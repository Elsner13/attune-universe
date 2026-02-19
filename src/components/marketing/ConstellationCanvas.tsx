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

const STAR_COUNT = 90;
const CONNECTION_DISTANCE = 160;
const SPEED = 0.12;
const PARALLAX_STRENGTH = 30;
const PULSE_SPEED = 0.0008;

export function ConstellationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const smoothMouseRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = {
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;

    function resize() {
      dpr = window.devicePixelRatio || 1;
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      canvas!.style.width = `${window.innerWidth}px`;
      canvas!.style.height = `${window.innerHeight}px`;
      ctx!.scale(dpr, dpr);
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    const w = () => canvas!.width / dpr;
    const h = () => canvas!.height / dpr;

    starsRef.current = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * w(),
      y: Math.random() * h(),
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
      radius: Math.random() * 1.8 + 0.5,
      opacity: Math.random() * 0.5 + 0.3,
    }));

    function draw(time: number) {
      if (!ctx || !canvas) return;

      const cw = w();
      const ch = h();

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cw, ch);

      const lerp = 0.05;
      smoothMouseRef.current.x +=
        (mouseRef.current.x - smoothMouseRef.current.x) * lerp;
      smoothMouseRef.current.y +=
        (mouseRef.current.y - smoothMouseRef.current.y) * lerp;

      const offsetX = smoothMouseRef.current.x * PARALLAX_STRENGTH;
      const offsetY = smoothMouseRef.current.y * PARALLAX_STRENGTH;

      const stars = starsRef.current;
      const pulse = Math.sin(time * PULSE_SPEED) * 0.5 + 0.5;

      for (const star of stars) {
        star.x += star.vx;
        star.y += star.vy;
        if (star.x < 0) star.x = cw;
        if (star.x > cw) star.x = 0;
        if (star.y < 0) star.y = ch;
        if (star.y > ch) star.y = 0;
      }

      for (let i = 0; i < stars.length; i++) {
        const ax = stars[i].x + offsetX;
        const ay = stars[i].y + offsetY;
        for (let j = i + 1; j < stars.length; j++) {
          const bx = stars[j].x + offsetX;
          const by = stars[j].y + offsetY;
          const dx = ax - bx;
          const dy = ay - by;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DISTANCE) {
            const base = (1 - dist / CONNECTION_DISTANCE) * 0.12;
            const alpha = base * (0.6 + pulse * 0.4);
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.strokeStyle = `rgba(0, 255, 148, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      for (const star of stars) {
        const sx = star.x + offsetX;
        const sy = star.y + offsetY;

        ctx.beginPath();
        ctx.arc(sx, sy, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 148, ${star.opacity})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(sx, sy, star.radius * 4, 0, Math.PI * 2);
        const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, star.radius * 4);
        glow.addColorStop(0, `rgba(0, 255, 148, ${star.opacity * 0.25})`);
        glow.addColorStop(1, "rgba(0, 255, 148, 0)");
        ctx.fillStyle = glow;
        ctx.fill();
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
      className="pointer-events-none absolute inset-0 z-0"
    />
  );
}
