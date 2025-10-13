import React, { useState, useEffect } from 'react';

const CursorAnimation = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [previousPosition, setPreviousPosition] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState([]); // ephemeral click ripples
  const [isHovering, setIsHovering] = useState(false);
  const [trail, setTrail] = useState([]); // fading trail points
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Component mount effect
  useEffect(() => {
    setMounted(true);
    setIsVisible(true);
  }, []);

  // Mouse event handlers
  useEffect(() => {
    if (!mounted) return;

    const handleMouseMove = (e) => {
      setPreviousPosition(position);
      setPosition({ x: e.clientX, y: e.clientY });
      // append point to trail
      setTrail((prev) => {
        const point = { id: crypto.randomUUID ? crypto.randomUUID() : Date.now() + Math.random(), x: e.clientX, y: e.clientY, age: 0 };
        const next = [...prev, point];
        // cap number of points to avoid buildup
        return next.slice(-80); // longer trail
      });
    };

    const handleMouseDown = (e) => {
      setIsClicking(true);
      // create a ripple at click location
      const id = Date.now();
      const x = e.clientX;
      const y = e.clientY;
      setRipples((prev) => [...prev, { id, x, y, createdAt: performance.now() }]);
      // ensure cleanup after animation duration
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 700);
    };
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('hover-cursor')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mounted]);

  // Decay loop for trail points (fade out even when mouse stops)
  useEffect(() => {
    if (!mounted) return;
    let rafId;
    const tick = () => {
      setTrail((prev) =>
        prev
          .map((p) => ({ ...p, age: p.age + 1 }))
          .filter((p) => p.age < 60) // longer fade
      );
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [mounted]);

  // Add styles to document head
  useEffect(() => {
    if (!mounted) return;

    const styleId = 'cursor-animation-styles';
    
    // Remove existing style if it exists
    const existingStyle = document.getElementById(styleId);
    if (existingStyle) {
      existingStyle.remove();
    }

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      body {
        cursor: none !important;
      }
      
      * {
        cursor: none !important;
      }
      
      @keyframes ripple {
        0% {
          transform: translate(-50%, -50%) scale(1);
          opacity: 0.8;
        }
        100% {
          transform: translate(-50%, -50%) scale(3);
          opacity: 0;
        }
      }
      
      .ripple-effect {
        animation: ripple 0.6s ease-out;
      }
    `;
    document.head.appendChild(style);

    return () => {
      const styleElement = document.getElementById(styleId);
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, [mounted]);

  // Don't render on server side
  if (!mounted || !isVisible) {
    return null;
  }

  return (
    <div className="cursor-animation-container">
      {/* Fading blue trail */}
      {trail.map((p, i) => {
        const life = 60; // frames
        const t = p.age / life;
        const opacity = Math.max(0, 0.6 * (1 - t));
        const size = Math.max(1, 8 * (1 - t)); // slightly larger dots
        return (
          <div
            key={p.id}
            style={{
              position: 'fixed',
              left: p.x - size / 2,
              top: p.y - size / 2,
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: '50%',
              background: `rgba(59, 130, 246, ${opacity})`,
              pointerEvents: 'none',
              zIndex: 9996,
              filter: `blur(${Math.min(3, p.age * 0.07)}px)`,
            }}
          />
        );
      })}
      {/* Click ripples (auto-cleaned, no stain) */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="ripple-effect"
          onAnimationEnd={() => setRipples((prev) => prev.filter((rp) => rp.id !== ripple.id))}
          style={{
            position: 'fixed',
            left: ripple.x,
            top: ripple.y,
            width: '40px',
            height: '40px',
            border: '2px solid rgba(37, 99, 235, 0.7)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 9998,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
      {/* Water droplet trail effect removed */}

      {/* Leading pointer/arrow */}
      {(() => {
        // Calculate direction of movement
        const deltaX = position.x - previousPosition.x;
        const deltaY = position.y - previousPosition.y;
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        const speed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        // Only show pointer if moving
        if (speed > 1) {
          return (
            <div
              style={{
                position: 'fixed',
                left: position.x - 18,
                top: position.y - 18,
                width: '36px',
                height: '36px',
                pointerEvents: 'none',
                zIndex: 10000,
                transform: `rotate(${angle}deg)`,
                transition: 'transform 0.1s ease-out',
              }}
            >
              <div
                style={{
                  width: '0',
                  height: '0',
                  borderLeft: '18px solid transparent',
                  borderRight: '18px solid transparent',
                  borderBottom: '28px solid rgba(37, 99, 235, 0.85)',
                  transform: 'rotate(-90deg)',
                  filter: 'drop-shadow(0 0 6px rgba(37, 99, 235, 0.3))',
                }}
              />
            </div>
          );
        }
        return null;
      })()}

      {/* Small cursor indicator removed */}


    </div>
  );
};

export default CursorAnimation;