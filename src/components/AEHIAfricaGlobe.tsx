'use client';

import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

export function AEHIAfricaGlobe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = -0.2; // roughly centers on Africa
    let width = 0;

    const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth);
    window.addEventListener('resize', onResize);
    onResize();

    if (!canvasRef.current) return;

    // Convert hex to rgb format [0-1] for Cobe
    // #3b82f6 (blue) -> [59/255, 130/255, 246/255] = [0.23, 0.51, 0.96]
    // #ec4899 (pink) -> [236/255, 72/255, 153/255] = [0.92, 0.28, 0.60]
    
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width,
      height: width,
      phi: phi,
      theta: 0.1, // slightly tilted
      dark: 1,
      diffuse: 1.2,
      mapSamples: 25000, // Very dense for detailed digital look
      mapBrightness: 8,
      baseColor: [0.02, 0.02, 0.02], // Pitch black base
      markerColor: [0.92, 0.28, 0.60], // Crelligent Pink
      glowColor: [0.23, 0.51, 0.96], // Crelligent Blue glow
      markers: [
        // Major African Economic Hubs
        { location: [6.5244, 3.3792], size: 0.08 },   // Lagos, Nigeria
        { location: [9.0820, 8.6753], size: 0.06 },   // Abuja, Nigeria
        { location: [-26.2041, 28.0473], size: 0.07 }, // Johannesburg, SA
        { location: [-33.9249, 18.4241], size: 0.05 }, // Cape Town, SA
        { location: [-1.2921, 36.8219], size: 0.07 },  // Nairobi, Kenya
        { location: [5.6037, -0.1870], size: 0.06 },   // Accra, Ghana
        { location: [30.0444, 31.2357], size: 0.06 },  // Cairo, Egypt
        { location: [-8.8390, 13.2894], size: 0.05 },  // Luanda, Angola
        { location: [14.6928, -17.4467], size: 0.05 }, // Dakar, Senegal
        { location: [-6.1659, 39.2026], size: 0.05 },  // Dar es Salaam, Tanzania
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
        // Very slow rotation just to keep it alive
        phi += 0.001;
        
        globe.update({
          phi: phi,
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

  return (
    <div className={`relative flex items-center justify-center ${className || ''}`} style={{ width: '100%', maxWidth: '600px', aspectRatio: 1 }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          contain: 'layout paint size',
          opacity: 1,
          transition: 'opacity 1s ease-in',
        }}
      />
      {/* Decorative gradient overlay to enforce the Crelligent brand colors even more */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#3b82f6]/20 to-[#ec4899]/20 mix-blend-overlay rounded-full pointer-events-none blur-xl" />
    </div>
  );
}
