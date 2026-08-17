'use client';

import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

export function GlobalNetworkGlobe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    let width = 0;

    const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth);
    window.addEventListener('resize', onResize);
    onResize();

    if (!canvasRef.current) return;

    // We use actual width; devicePixelRatio handles the retina resolution
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width,
      height: width,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 12000,
      mapBrightness: 6,
      baseColor: [0.05, 0.05, 0.05], // Very dark
      markerColor: [0.13, 0.77, 0.36], // Crelligent Green (#22c55e -> ~ rgb(34, 197, 94) -> mapped to [0-1])
      glowColor: [0.05, 0.05, 0.05], // Subtle glow
      markers: [
        // Nodes representing enterprise installations
        { location: [6.5244, 3.3792], size: 0.07 },   // Lagos, Nigeria
        { location: [-26.2041, 28.0473], size: 0.06 }, // Johannesburg, SA
        { location: [-1.2921, 36.8219], size: 0.05 },  // Nairobi, Kenya
        { location: [51.5074, -0.1278], size: 0.04 },  // London, UK
        { location: [40.7128, -74.0060], size: 0.05 }, // New York, USA
        { location: [25.2048, 55.2708], size: 0.06 },  // Dubai, UAE
        { location: [1.3521, 103.8198], size: 0.05 },  // Singapore
        { location: [48.8566, 2.3522], size: 0.04 },   // Paris, France
      ]
    });

    let animationFrameId: number;

    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0 }
    );
    if (canvasRef.current) observer.observe(canvasRef.current);

    const render = () => {
      if (isVisible) {
        // Auto-rotate the globe slowly if not dragging.
        if (!pointerInteracting.current) {
          phi += 0.003;
        }
        
        const newPhi = phi + pointerInteractionMovement.current;
        
        globe.update({
          phi: newPhi,
          width: width,
          height: width,
        });
      }
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      globe.destroy();
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);

  return (
    <div className={`flex items-center justify-center ${className || ''}`} style={{ width: '100%', maxWidth: '800px', aspectRatio: 1 }}>
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
          if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta * 0.005;
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta * 0.005;
          }
        }}
        style={{
          width: '100%',
          height: '100%',
          contain: 'layout paint size',
          cursor: 'grab',
          opacity: 1,
          transition: 'opacity 1s ease-in',
        }}
      />
    </div>
  );
}
