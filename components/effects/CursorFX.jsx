'use client';

import { useEffect, useRef } from 'react';
import { hasFinePointer, prefersReducedMotion } from '@/hooks/media';

const COLOURS = ['#34f5a6', '#38d9ff', '#8b7bff'];
const LINK = 120; // particles closer than this are joined by a line
const REACH = 180; // how far the cursor's influence extends
const pickColour = () => COLOURS[Math.floor(Math.random() * COLOURS.length)];

/**
 * Mouse-driven effects: a particle network that reacts to the cursor, a trailing ring,
 * click bursts, tilting cards and depth movement on elements marked with `.depth`.
 * Does nothing on touch screens or when the visitor prefers reduced motion.
 */
export default function CursorFX() {
  const canvasRef = useRef(null);
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return undefined;
    const canvas = canvasRef.current;
    const ring = ringRef.current;
    const dot = dotRef.current;
    const page = canvas.parentElement;
    const context = canvas.getContext('2d');
    if (!context) return undefined;

    const mouse = { x: -999, y: -999, seen: false };
    const trail = { x: -999, y: -999 };
    const depth = { x: 0, y: 0 };
    let particles = [];
    let sparks = [];
    let tilted = null;
    let frame;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.min(90, Math.round((window.innerWidth * window.innerHeight) / 17000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
        colour: pickColour(),
      }));
    };

    const line = (a, b, colour, alpha) => {
      context.globalAlpha = alpha;
      context.strokeStyle = colour;
      context.beginPath();
      context.moveTo(a.x, a.y);
      context.lineTo(b.x, b.y);
      context.stroke();
    };
    const circle = (x, y, r, colour, alpha) => {
      context.globalAlpha = alpha;
      context.fillStyle = colour;
      context.beginPath();
      context.arc(x, y, r, 0, Math.PI * 2);
      context.fill();
    };

    const draw = () => {
      const { innerWidth: width, innerHeight: height } = window;
      const strength = document.documentElement.dataset.theme === 'light' ? 0.65 : 1;
      context.clearRect(0, 0, width, height);
      context.lineWidth = 1;

      particles.forEach((p, i) => {
        // Drift, wrap round the edges and step aside from the cursor.
        p.x = (p.x + p.vx + width) % width;
        p.y = (p.y + p.vy + height) % height;
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distance = Math.hypot(dx, dy);
        if (distance < REACH && distance > 0) {
          if (distance < 90) {
            p.x += (dx / distance) * 1.4;
            p.y += (dy / distance) * 1.4;
          }
          line(p, mouse, p.colour, (1 - distance / REACH) * 0.7 * strength);
        }
        for (let j = i + 1; j < particles.length; j += 1) {
          const gap = Math.hypot(p.x - particles[j].x, p.y - particles[j].y);
          if (gap < LINK) line(p, particles[j], p.colour, (1 - gap / LINK) * 0.22 * strength);
        }
        circle(p.x, p.y, p.r, p.colour, 0.7 * strength);
      });

      sparks = sparks.filter((s) => s.life > 0);
      sparks.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.95;
        s.vy = s.vy * 0.95 + 0.06;
        s.life -= 0.02;
        circle(s.x, s.y, Math.max(s.life * 3.2, 0), s.colour, Math.max(s.life, 0));
      });
      context.globalAlpha = 1;

      if (mouse.seen) {
        trail.x += (mouse.x - trail.x) * 0.16;
        trail.y += (mouse.y - trail.y) * 0.16;
        ring.style.transform = `translate(${trail.x}px, ${trail.y}px)`;
        depth.x += ((mouse.x / width - 0.5) - depth.x) * 0.06;
        depth.y += ((mouse.y / height - 0.5) - depth.y) * 0.06;
        page.style.setProperty('--px', depth.x.toFixed(4));
        page.style.setProperty('--py', depth.y.toFixed(4));
      }
      frame = requestAnimationFrame(draw);
    };

    const untilt = () => {
      tilted?.style.removeProperty('--tx');
      tilted?.style.removeProperty('--ty');
      tilted = null;
    };

    // Updates the ring and card tilt for whatever is under the cursor.
    const hover = (element) => {
      const target = element instanceof Element ? element : null;
      const labelled = target?.closest('[data-cursor]');
      ring.dataset.label = labelled?.dataset.cursor || '';
      ring.classList.toggle('on-label', Boolean(labelled));
      ring.classList.toggle('on-link', !labelled && Boolean(target?.closest('a, button, summary, input, textarea')));
      dot.classList.toggle('hide', Boolean(labelled));

      const card = target?.closest('.card:not(.case):not(.banner)');
      if (card !== tilted) untilt();
      if (card) {
        const box = card.getBoundingClientRect();
        // Wide cards tilt less so their edges do not swing too far.
        const amount = Math.min(10, 2600 / box.width);
        card.style.setProperty('--ty', `${((mouse.x - box.left) / box.width - 0.5) * amount}deg`);
        card.style.setProperty('--tx', `${(0.5 - (mouse.y - box.top) / box.height) * amount}deg`);
        tilted = card;
      }
    };
    // Scrolling moves content under a still mouse.
    const scroll = () => { if (mouse.seen) hover(document.elementFromPoint(mouse.x, mouse.y)); };

    const move = (event) => {
      if (!mouse.seen) {
        mouse.seen = true;
        trail.x = event.clientX;
        trail.y = event.clientY;
        page.classList.add('cursor-on');
      }
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      dot.style.transform = `translate(${mouse.x}px, ${mouse.y}px)`;

      hover(event.target);
    };

    const burst = (event) => {
      for (let i = 0; i < 18; i += 1) {
        const angle = (Math.PI * 2 * i) / 18;
        const speed = 2 + Math.random() * 3.5;
        sparks.push({ x: event.clientX, y: event.clientY, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1, colour: pickColour() });
      }
      ring.classList.add('pressed');
    };
    const release = () => ring.classList.remove('pressed');
    const leave = () => {
      mouse.x = -999;
      mouse.y = -999;
      mouse.seen = false;
      page.classList.remove('cursor-on');
      untilt();
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('pointerdown', burst);
    window.addEventListener('pointerup', release);
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(frame);
      leave();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('scroll', scroll);
      window.removeEventListener('pointerdown', burst);
      window.removeEventListener('pointerup', release);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="particles" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
