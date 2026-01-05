"use client";

import React, { useEffect, useRef } from "react";

const MatrixRain = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        const getCenterFactor = (w: number) => {
            if (w >= 1024) return 0.45; // lg: 15vh + 30vh
            if (w >= 640) return 0.35;  // sm: 15vh + 20vh
            return 0.27;                // mobile: 12vh + 15vh
        };

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        let centerX = width / 2;
        let centerY = height * getCenterFactor(width);

        // Characters
        const chars = "MTCF01アイウエオカキクケコサシスセソ◆◇○●□■△▽";
        const charArray = chars.split("");

        // Spiral particles
        interface Particle {
            angle: number;
            radius: number;
            speed: number;
            rotationSpeed: number;
            char: string;
            opacity: number;
            size: number;
            trail: { x: number; y: number; opacity: number }[];
        }

        const particles: Particle[] = [];
        const particleCount = 80;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                angle: Math.random() * Math.PI * 2,
                radius: 50 + Math.random() * 100,
                speed: 0.3 + Math.random() * 0.5,
                rotationSpeed: 0.005 + Math.random() * 0.015,
                char: charArray[Math.floor(Math.random() * charArray.length)],
                opacity: 0.2 + Math.random() * 0.5,
                size: 12 + Math.random() * 8,
                trail: [],
            });
        }

        const draw = () => {
            // Fade effect
            ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
            ctx.fillRect(0, 0, width, height);

            for (const particle of particles) {
                // Calculate position on spiral
                const x = centerX + Math.cos(particle.angle) * particle.radius;
                const y = centerY + Math.sin(particle.angle) * particle.radius;

                // Store trail position
                particle.trail.push({ x, y, opacity: particle.opacity });
                if (particle.trail.length > 12) {
                    particle.trail.shift();
                }

                // Draw trail
                for (let i = 0; i < particle.trail.length; i++) {
                    const t = particle.trail[i];
                    const trailOpacity = (i / particle.trail.length) * t.opacity * 0.5;
                    ctx.globalAlpha = trailOpacity;
                    ctx.fillStyle = `rgba(6, 182, 212, 1)`;
                    ctx.font = `${particle.size * 0.7}px monospace`;
                    const trailChar = charArray[Math.floor(Math.random() * charArray.length)];
                    ctx.fillText(trailChar, t.x, t.y);
                }

                // Draw main character (brightest)
                ctx.globalAlpha = particle.opacity;
                ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
                ctx.font = `${particle.size}px monospace`;
                ctx.fillText(particle.char, x, y);

                // Update position - spiral outward while rotating
                particle.angle += particle.rotationSpeed;
                particle.radius += particle.speed;

                // Change character occasionally
                if (Math.random() > 0.97) {
                    particle.char = charArray[Math.floor(Math.random() * charArray.length)];
                }

                // Reset when too far from center
                const maxRadius = Math.max(width, height) * 0.8;
                if (particle.radius > maxRadius) {
                    particle.radius = 30 + Math.random() * 50;
                    particle.angle = Math.random() * Math.PI * 2;
                    particle.speed = 0.3 + Math.random() * 0.5;
                    particle.rotationSpeed = 0.005 + Math.random() * 0.015;
                    particle.opacity = 0.2 + Math.random() * 0.5;
                    particle.trail = [];
                }
            }

            ctx.globalAlpha = 1;
            animationId = requestAnimationFrame(draw);
        };

        draw();

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            centerX = width / 2;
            centerY = height * getCenterFactor(width);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: 1 }}
        />
    );
};

export default MatrixRain;
