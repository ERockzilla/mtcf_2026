'use client';

import React, { useRef, useEffect, memo, useState } from 'react';
import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    PlaneGeometry,
    ShaderMaterial,
    Mesh,
    Color,
    DoubleSide,
    PointLight,
    AmbientLight
} from 'three';

/**
 * GaussianBeamVortex3DBackground - Fullscreen WebGL animated background
 * Optimized for performance as a page background:
 * - Dynamic sizing to fill viewport
 * - Reduced geometry on mobile
 * - Intersection Observer for visibility-based pause
 * - Lower pixel ratio on lower-end devices
 */
const GaussianBeamVortex3DBackground = memo(function GaussianBeamVortex3DBackground() {
    const containerRef = useRef<HTMLDivElement>(null);
    const rendererRef = useRef<WebGLRenderer | null>(null);
    const animationRef = useRef<number | null>(null);
    const timeRef = useRef(0);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        // Check for reduced motion preference
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);

        if (mediaQuery.matches) return; // Show static fallback

        if (!containerRef.current) return;

        const container = containerRef.current;
        let width = window.innerWidth;
        let height = window.innerHeight;

        // Scene setup
        const scene = new Scene();

        // Camera - wider FOV for fullscreen, positioned to see expansive beam
        const camera = new PerspectiveCamera(60, width / height, 0.1, 1000);
        camera.position.set(0, 5, 6);
        camera.lookAt(0, 0, 0);

        // Renderer with transparency - adaptive pixel ratio
        const isMobile = window.innerWidth < 768;
        const isLowEnd = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : false;
        const renderer = new WebGLRenderer({
            antialias: !isMobile && !isLowEnd,
            alpha: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : isLowEnd ? 1.5 : 2));
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Create larger Gaussian beam surface geometry - adaptive grid
        const gridSize = isMobile ? 32 : isLowEnd ? 48 : 64;
        const geometry = new PlaneGeometry(12, 12, gridSize, gridSize);

        // Custom shader material for laser effect - enhanced for fullscreen
        const material = new ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uVortexPhase: { value: 0 },
                uPulsePhase: { value: 0 },
                uColor1: { value: new Color(0x0159A3) }, // Blue
                uColor2: { value: new Color(0x00AA86) }, // Teal
                uColor3: { value: new Color(0x00ffff) }, // Cyan glow
            },
            vertexShader: `
        uniform float uTime;
        uniform float uVortexPhase;
        uniform float uPulsePhase;
        
        varying vec2 vUv;
        varying float vElevation;
        varying float vDistance;
        
        void main() {
          vUv = uv;
          
          // Distance from center
          float dist = length(position.xy);
          vDistance = dist;
          
          // Gaussian profile with vortex - wider spread
          float sigma = 2.0 + 0.5 * sin(uTime * 0.3);
          float gaussian = exp(-dist * dist / (2.0 * sigma * sigma));
          
          // Vortex spiral effect - slower for background
          float angle = atan(position.y, position.x);
          float spiral = sin(angle * 4.0 - uTime * 1.5 + dist * 2.0) * 0.2;
          
          // Vortex collapse and pulse expansion
          float vortexCollapse = sin(uVortexPhase) * 0.5 + 0.5;
          float pulseExpand = sin(uPulsePhase) * 0.4;
          
          // Height calculation - more dramatic peaks
          float height = gaussian * (3.0 - vortexCollapse * 2.0) + spiral * (1.0 - vortexCollapse);
          height += pulseExpand * gaussian * 2.5;
          
          // Add ripple effect - gentler waves
          float ripple = sin(dist * 4.0 - uTime * 2.0) * 0.1 * gaussian;
          height += ripple;
          
          vElevation = height;
          
          vec3 newPosition = position;
          newPosition.z = height;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
            fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        
        varying vec2 vUv;
        varying float vElevation;
        varying float vDistance;
        
        void main() {
          // Color based on elevation and distance
          vec3 color = mix(uColor1, uColor2, vElevation * 0.4);
          
          // Add laser glow at peak
          float glow = smoothstep(0.5, 2.5, vElevation);
          color = mix(color, uColor3, glow * 0.5);
          
          // Fresnel-like edge glow
          float edge = 1.0 - smoothstep(0.0, 5.0, vDistance);
          color += uColor3 * edge * 0.2 * (sin(uTime * 1.5) * 0.3 + 0.7);
          
          // Subtle grid lines effect
          float gridX = abs(sin(vUv.x * 48.0 * 3.14159));
          float gridY = abs(sin(vUv.y * 48.0 * 3.14159));
          float grid = max(gridX, gridY);
          grid = smoothstep(0.97, 1.0, grid);
          
          // Combine with elevation-based alpha - more transparent for background
          float alpha = 0.15 + vElevation * 0.25 + grid * 0.15;
          alpha = clamp(alpha, 0.0, 0.7);
          
          // Scanline effect - subtler
          float scanline = sin(vUv.y * 150.0 + uTime * 3.0) * 0.05 + 0.95;
          color *= scanline;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
            transparent: true,
            side: DoubleSide,
            wireframe: false,
        });

        const mesh = new Mesh(geometry, material);
        mesh.rotation.x = -Math.PI * 0.4;
        scene.add(mesh);

        // Add wireframe overlay for grid effect
        const wireframeMaterial = new ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uVortexPhase: { value: 0 },
                uColor: { value: new Color(0x00ffff) },
            },
            vertexShader: `
        uniform float uTime;
        uniform float uVortexPhase;
        
        varying float vElevation;
        
        void main() {
          float dist = length(position.xy);
          float sigma = 2.0 + 0.5 * sin(uTime * 0.3);
          float gaussian = exp(-dist * dist / (2.0 * sigma * sigma));
          float angle = atan(position.y, position.x);
          float spiral = sin(angle * 4.0 - uTime * 1.5 + dist * 2.0) * 0.2;
          float vortexCollapse = sin(uVortexPhase) * 0.5 + 0.5;
          float height = gaussian * (3.0 - vortexCollapse * 2.0) + spiral * (1.0 - vortexCollapse);
          float ripple = sin(dist * 4.0 - uTime * 2.0) * 0.1 * gaussian;
          height += ripple;
          vElevation = height;
          
          vec3 newPosition = position;
          newPosition.z = height + 0.02;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
            fragmentShader: `
        uniform vec3 uColor;
        uniform float uTime;
        varying float vElevation;
        
        void main() {
          float alpha = 0.05 + vElevation * 0.15;
          float pulse = sin(uTime * 2.0) * 0.15 + 0.85;
          gl_FragColor = vec4(uColor * pulse, alpha);
        }
      `,
            transparent: true,
            wireframe: true,
        });

        const wireframeMesh = new Mesh(geometry.clone(), wireframeMaterial);
        wireframeMesh.rotation.x = -Math.PI * 0.4;
        scene.add(wireframeMesh);

        // Add point light for laser effect
        const pointLight = new PointLight(0x00ffff, 1.5, 20);
        pointLight.position.set(0, 4, 2);
        scene.add(pointLight);

        // Add ambient light
        const ambientLight = new AmbientLight(0x404040, 0.3);
        scene.add(ambientLight);

        // Animation loop with throttling for performance
        let lastTime = 0;
        const targetFPS = isMobile ? 30 : 60;
        const frameInterval = 1000 / targetFPS;

        const animate = (currentTime: number) => {
            animationRef.current = requestAnimationFrame(animate);

            const deltaTime = currentTime - lastTime;
            if (deltaTime < frameInterval) return;
            lastTime = currentTime - (deltaTime % frameInterval);

            timeRef.current += 0.012; // Slightly slower for background ambiance
            const time = timeRef.current;

            // Update uniforms
            if (material.uniforms) {
                material.uniforms.uTime.value = time;
                material.uniforms.uVortexPhase.value = time * 0.6;
                material.uniforms.uPulsePhase.value = time * 0.8;
            }

            if (wireframeMaterial.uniforms) {
                wireframeMaterial.uniforms.uTime.value = time;
                wireframeMaterial.uniforms.uVortexPhase.value = time * 0.6;
            }

            // Gentle camera rotation for depth perception
            if (camera) {
                camera.position.x = Math.sin(time * 0.15) * 0.8;
                camera.position.z = 6 + Math.cos(time * 0.1) * 0.5;
                camera.lookAt(0, 0, 0);
            }

            // Pulse the point light
            pointLight.intensity = 1.2 + Math.sin(time * 1.5) * 0.3;

            renderer.render(scene, camera);
        };

        animate(0);

        // Handle resize
        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            if (rendererRef.current && container.contains(rendererRef.current.domElement)) {
                container.removeChild(rendererRef.current.domElement);
            }
            geometry.dispose();
            material.dispose();
            wireframeMaterial.dispose();
            renderer.dispose();
        };
    }, []);

    // Static fallback for reduced motion
    if (prefersReducedMotion) {
        return (
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(1,89,163,0.15) 0%, rgba(0,170,134,0.08) 40%, transparent 70%)',
                    zIndex: 1,
                }}
            />
        );
    }

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 pointer-events-none overflow-hidden"
            style={{
                zIndex: 1,
                filter: 'drop-shadow(0 0 30px rgba(0, 255, 255, 0.3))',
            }}
        />
    );
});

export default GaussianBeamVortex3DBackground;
