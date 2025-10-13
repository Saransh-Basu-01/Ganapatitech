// ParticleBackground.jsx
import React, { useEffect, useRef } from "react";
import "./ParticleBackground.css";

const ParticlesBackground = ({
  particleCount = 80, // increase for more bubbles
  repelRadius = 100,
  maxRepelSpeed = 2,
}) => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    function setSize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    setSize();

    const colors = ["#FF4C4C", "#007BFF", "#FFD700"]; // red, blue, yellow
    const particles = [];
    const mouse = { x: null, y: null };

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 4 + 2,
        dx: (Math.random() - 0.5) * 1.5,
        dy: (Math.random() - 0.5) * 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };
    const handleResize = () => {
      setSize();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    function connect() {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 250;
          if (dist < maxDist) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - dist / maxDist})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // move
        p.x += p.dx;
        p.y += p.dy;

        // bounds bounce
        if (p.x < 0) {
          p.x = 0;
          p.dx *= -1;
        }
        if (p.x > canvas.width) {
          p.x = canvas.width;
          p.dx *= -1;
        }
        if (p.y < 0) {
          p.y = 0;
          p.dy *= -1;
        }
        if (p.y > canvas.height) {
          p.y = canvas.height;
          p.dy *= -1;
        }

        // repel if mouse present
        if (mouse.x !== null && mouse.y !== null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < repelRadius && dist > 0.001) {
            const angle = Math.atan2(dy, dx);
            const force = (repelRadius - dist) / repelRadius;
            p.dx = Math.cos(angle) * force * maxRepelSpeed;
            p.dy = Math.sin(angle) * force * maxRepelSpeed;
          }
        }

        // draw bubble (circle)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      // connecting lines
      connect();

      animRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, [particleCount, repelRadius, maxRepelSpeed]);

  return <canvas ref={canvasRef} className="particles-canvas" />;
};

export default ParticlesBackground;
