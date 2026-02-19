"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

const STAR_COUNT = 80;
const CONNECTION_DISTANCE = 150;
const SPEED = 0.15;

export function ConstellationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    starsRef.current = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
      radius: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.3,
    }));

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const stars = starsRef.current;

      for (const star of stars) {
        star.x += star.vx;
        star.y += star.vy;

        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
      }

      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.15;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = `rgba(0, 255, 148, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      for (const star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 148, ${star.opacity})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
        const glow = ctx.createRadialGradient(
          star.x,
          star.y,
          0,
          star.x,
          star.y,
          star.radius * 3
        );
        glow.addColorStop(0, `rgba(0, 255, 148, ${star.opacity * 0.3})`);
        glow.addColorStop(1, "rgba(0, 255, 148, 0)");
        ctx.fillStyle = glow;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, ease: "easeOut" }}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
