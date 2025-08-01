import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create floating particles
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'absolute w-2 h-2 bg-primary/20 rounded-full animate-particle-float pointer-events-none';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 15 + 's';
      particle.style.animationDuration = (10 + Math.random() * 10) + 's';
      
      container.appendChild(particle);
      
      // Remove particle after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 20000);
    };

    // Create particles periodically
    const particleInterval = setInterval(createParticle, 3000);
    
    // Create initial particles
    for (let i = 0; i < 5; i++) {
      setTimeout(createParticle, i * 1000);
    }

    return () => {
      clearInterval(particleInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-dark opacity-90" />
      
      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 border-2 border-primary/30 rounded-lg animate-float" />
      <div className="absolute top-40 right-20 w-16 h-16 border-2 border-secondary/30 rounded-full animate-bounce-gentle" />
      <div className="absolute bottom-32 left-1/4 w-12 h-12 border-2 border-hero-red/30 rotate-45 animate-float" />
      <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-villain-purple/20 rounded-full animate-pulse-glow" />
      <div className="absolute bottom-20 right-10 w-14 h-14 border-2 border-secondary/40 rounded-lg animate-bounce-gentle" />
      
      {/* Comic book style rays */}
      <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-primary/20 to-transparent transform -skew-x-12" />
      <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-secondary/20 to-transparent transform skew-x-12" />
      <div className="absolute top-0 left-2/3 w-1 h-full bg-gradient-to-b from-hero-red/20 to-transparent transform -skew-x-6" />
      
      {/* Particle container */}
      <div ref={containerRef} className="absolute inset-0" />
      
      {/* Corner accent elements */}
      <div className="absolute top-0 left-0 w-32 h-32 border-r-2 border-b-2 border-primary/20" />
      <div className="absolute top-0 right-0 w-32 h-32 border-l-2 border-b-2 border-secondary/20" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-r-2 border-t-2 border-hero-red/20" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-l-2 border-t-2 border-villain-purple/20" />
    </div>
  );
};

export default AnimatedBackground;