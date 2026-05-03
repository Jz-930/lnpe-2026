'use client';

import { useEffect, useRef } from 'react';

interface Vec2 {
  x: number;
  y: number;
}

interface Particle {
  x: number;
  y: number;
  t: number;
  speed: number;
  offset: number;
  radius: number;
  life: number;
  maxLife: number;
  stream: number;
}

interface ParticleFlowProps {
  activeIndex?: number;
  intensity?: number;
  theme?: 'light' | 'dark';
}

const CURVES: [Vec2, Vec2, Vec2, Vec2][] = [
  [
    { x: 0.06, y: 0.60 },
    { x: 0.22, y: 0.18 },
    { x: 0.50, y: 0.78 },
    { x: 0.94, y: 0.48 },
  ],
  [
    { x: 0.06, y: 0.45 },
    { x: 0.28, y: 0.70 },
    { x: 0.55, y: 0.24 },
    { x: 0.94, y: 0.58 },
  ],
];

const NODE_T = [0.07, 0.30, 0.52, 0.74, 0.93];

function bez(p0: Vec2, p1: Vec2, p2: Vec2, p3: Vec2, t: number): Vec2 {
  const u = 1 - t;
  return {
    x: u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x,
    y: u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y,
  };
}

function tan(p0: Vec2, p1: Vec2, p2: Vec2, p3: Vec2, t: number): Vec2 {
  const u = 1 - t;
  return {
    x: 3 * u * u * (p1.x - p0.x) + 6 * u * t * (p2.x - p1.x) + 3 * t * t * (p3.x - p2.x),
    y: 3 * u * u * (p1.y - p0.y) + 6 * u * t * (p2.y - p1.y) + 3 * t * t * (p3.y - p2.y),
  };
}

function normal(v: Vec2, scale: number): Vec2 {
  const length = Math.sqrt(v.x * v.x + v.y * v.y) || 1;
  return {
    x: (-v.y / length) * scale,
    y: (v.x / length) * scale,
  };
}

function drawCurveSegment(
  ctx: CanvasRenderingContext2D,
  curve: [Vec2, Vec2, Vec2, Vec2],
  w: number,
  h: number,
  from: number,
  to: number
) {
  ctx.beginPath();
  for (let i = 0; i <= 24; i++) {
    const t = from + ((to - from) * i) / 24;
    const point = bez(curve[0], curve[1], curve[2], curve[3], t);
    if (i === 0) ctx.moveTo(point.x * w, point.y * h);
    else ctx.lineTo(point.x * w, point.y * h);
  }
  ctx.stroke();
}

function drawStaticPath(ctx: CanvasRenderingContext2D, w: number, h: number, activeIndex: number, theme: 'light' | 'dark') {
  ctx.clearRect(0, 0, w, h);

  ctx.setLineDash([5, 12]);
  ctx.lineWidth = 1.4;
  ctx.strokeStyle = theme === 'dark' ? 'rgba(203, 213, 225, 0.22)' : 'rgba(30, 95, 138, 0.24)';
  CURVES.forEach((curve) => {
    ctx.beginPath();
    ctx.moveTo(curve[0].x * w, curve[0].y * h);
    ctx.bezierCurveTo(
      curve[1].x * w,
      curve[1].y * h,
      curve[2].x * w,
      curve[2].y * h,
      curve[3].x * w,
      curve[3].y * h
    );
    ctx.stroke();
  });

  const segmentStart = NODE_T[Math.max(0, activeIndex - 1)] ?? 0.05;
  const segmentEnd = NODE_T[activeIndex] ?? 0.94;
  ctx.setLineDash([]);
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgba(242, 101, 34, 0.72)';
  drawCurveSegment(ctx, CURVES[0], w, h, segmentStart, segmentEnd);

  const marker = bez(CURVES[0][0], CURVES[0][1], CURVES[0][2], CURVES[0][3], segmentEnd);
  ctx.beginPath();
  ctx.arc(marker.x * w, marker.y * h, 7, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(242, 101, 34, 0.15)';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(marker.x * w, marker.y * h, 3, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(242, 101, 34, 0.9)';
  ctx.fill();
}

export function ParticleFlow({ activeIndex = 1, intensity = 1, theme = 'light' }: ParticleFlowProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const particles: Particle[] = [];
    let frame = 0;
    let width = 0;
    let height = 0;
    let spawn = 0;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      width = rect.width;
      height = rect.height;
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      if (reducedMotion) drawStaticPath(ctx, width, height, activeIndex, theme);
    };

    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    if (reducedMotion) {
      return () => ro.disconnect();
    }

    const spawnParticle = () => {
      const stream = Math.random() > 0.46 ? 0 : 1;
      particles.push({
        x: 0,
        y: 0,
        t: Math.random() * 0.08,
        speed: 0.002 + Math.random() * 0.0016 + intensity * 0.00045,
        offset: (Math.random() - 0.5) * (18 + intensity * 6),
        radius: 0.8 + Math.random() * 1.4 + intensity * 0.12,
        life: 0,
        maxLife: 210 + Math.random() * 150,
        stream,
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      drawStaticPath(ctx, width, height, activeIndex, theme);

      spawn += width < 720 ? 0.28 + intensity * 0.12 : 0.55 + intensity * 0.32;
      const maxParticles = width < 720 ? 26 + intensity * 8 : 52 + intensity * 20;
      while (spawn >= 1 && particles.length < maxParticles) {
        spawnParticle();
        spawn -= 1;
      }

      const activeT = NODE_T[activeIndex] ?? 0.5;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        const curve = CURVES[p.stream];
        p.t += p.speed;
        p.life += 1;

        const point = bez(curve[0], curve[1], curve[2], curve[3], p.t);
        const tangent = tan(curve[0], curve[1], curve[2], curve[3], p.t);
        const n = normal(tangent, p.offset + Math.sin(p.life * 0.05) * 4);

        p.x = point.x * width + n.x;
        p.y = point.y * height + n.y;

        const progress = p.life / p.maxLife;
        let alpha = progress < 0.16 ? progress / 0.16 : 1;
        if (progress > 0.72) alpha *= 1 - (progress - 0.72) / 0.28;

        if (p.t >= 1 || progress >= 1) {
          particles.splice(i, 1);
          continue;
        }

        const nearActive = Math.abs(p.t - activeT) < 0.16;
        const orange = p.stream === 0 || nearActive;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius + 2.4, 0, Math.PI * 2);
        ctx.fillStyle = orange
          ? `rgba(242, 101, 34, ${alpha * (nearActive ? 0.22 : 0.12)})`
          : theme === 'dark'
            ? `rgba(148, 163, 184, ${alpha * 0.11})`
            : `rgba(30, 95, 138, ${alpha * 0.08})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = orange
          ? `rgba(242, 101, 34, ${alpha * (nearActive ? 0.95 : 0.7)})`
          : theme === 'dark'
            ? `rgba(203, 213, 225, ${alpha * 0.46})`
            : `rgba(30, 95, 138, ${alpha * 0.44})`;
        ctx.fill();
      }

      frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, [activeIndex, intensity, theme]);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />;
}
