'use client';

import { useEffect, useRef } from 'react';

/* ─── Vec2 ─── */
interface Vec2 { x: number; y: number }

function bez(p0: Vec2, p1: Vec2, p2: Vec2, p3: Vec2, t: number): Vec2 {
  const u = 1 - t;
  return {
    x: u*u*u*p0.x + 3*u*u*t*p1.x + 3*u*t*t*p2.x + t*t*t*p3.x,
    y: u*u*u*p0.y + 3*u*u*t*p1.y + 3*u*t*t*p2.y + t*t*t*p3.y,
  };
}
function bezTan(p0: Vec2, p1: Vec2, p2: Vec2, p3: Vec2, t: number): Vec2 {
  const u = 1 - t;
  return {
    x: 3*u*u*(p1.x-p0.x) + 6*u*t*(p2.x-p1.x) + 3*t*t*(p3.x-p2.x),
    y: 3*u*u*(p1.y-p0.y) + 6*u*t*(p2.y-p1.y) + 3*t*t*(p3.y-p2.y),
  };
}
function norm(v: Vec2, s = 1): Vec2 {
  const l = Math.sqrt(v.x*v.x + v.y*v.y) || 1;
  return { x: (v.x/l)*s, y: (v.y/l)*s };
}

/* ─── Stream config ─── */
interface StreamCfg {
  base: [Vec2, Vec2, Vec2, Vec2];
  // Wobble: amplitude (normalised coords), separate x/y per control point
  wobbleAmp: [Vec2, Vec2, Vec2, Vec2];
  // Each CP gets two wobble speeds (layered for organic feel)
  wobbleSpeeds: [number, number, number, number];
  hueBase: number; hueEnd: number;
  satBase: number; satEnd: number;
  litBase: number; litEnd: number;
}

const STREAMS: StreamCfg[] = [
  {
    // A: bottom-left → upper-right
    base: [
      { x: -0.05, y: 1.05 },
      { x: 0.15,  y: 0.38 },
      { x: 0.50,  y: 0.12 },
      { x: 1.10,  y: 0.08 },
    ],
    wobbleAmp: [
      { x: 0.02, y: 0.03 },
      { x: 0.08, y: 0.10 },   // inner CPs wobble most
      { x: 0.09, y: 0.08 },
      { x: 0.03, y: 0.04 },
    ],
    wobbleSpeeds: [0.4, 0.55, 0.45, 0.35],
    hueBase: 16, hueEnd: 20,
    satBase: 78, satEnd: 12,
    litBase: 56, litEnd: 72,
  },
  {
    // B: upper-left → lower-right
    base: [
      { x: -0.05, y: -0.05 },
      { x: 0.25,  y: 0.30 },
      { x: 0.60,  y: 0.65 },
      { x: 1.10,  y: 1.05 },
    ],
    wobbleAmp: [
      { x: 0.03, y: 0.02 },
      { x: 0.09, y: 0.08 },
      { x: 0.07, y: 0.10 },
      { x: 0.03, y: 0.03 },
    ],
    wobbleSpeeds: [0.35, 0.50, 0.60, 0.40],
    hueBase: 26, hueEnd: 30,
    satBase: 55, satEnd: 10,
    litBase: 62, litEnd: 74,
  },
];

/* Animate control points — uses real seconds for visible wobble */
function animCP(s: StreamCfg, t: number): [Vec2, Vec2, Vec2, Vec2] {
  return s.base.map((bp, i) => {
    const a = s.wobbleAmp[i];
    const f = s.wobbleSpeeds[i];
    return {
      x: bp.x + Math.sin(t * f) * a.x + Math.sin(t * f * 0.6 + 2.5) * a.x * 0.5,
      y: bp.y + Math.cos(t * f * 0.8 + 1.3) * a.y + Math.cos(t * f * 0.5 + 4.0) * a.y * 0.4,
    };
  }) as [Vec2, Vec2, Vec2, Vec2];
}

function streamColor(s: StreamCfg, ct: number, alpha: number): string {
  const h = s.hueBase + ct * (s.hueEnd - s.hueBase);
  const sat = s.satBase + ct * (s.satEnd - s.satBase);
  const l = s.litBase + ct * (s.litEnd - s.litBase);
  return `hsla(${h}, ${sat}%, ${l}%, ${alpha})`;
}

/* ─── Particle types ─── */
type PType = 'stream' | 'ambient';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  life: number; maxLife: number;
  radius: number;
  type: PType;
  // Stream particles
  streamIdx: number;
  streamT: number;
  streamSpeed: number;
  perpOffset: number;
  detached: boolean;
  detachAngle: number;
  detachSpeed: number;
  // Ambient particles
  driftAngle: number;
  driftSpeed: number;
  // Color
  colorT: number;
}

const MAX_STREAM = 110;
const MAX_AMBIENT = 60;
const STREAM_SPAWN_RATE = 1.2;
const AMBIENT_SPAWN_RATE = 0.45;

/* ─── Component ─── */
export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0, h = 0;
    const particles: Particle[] = [];
    let streamSpawnAcc = 0;
    let ambientSpawnAcc = 0;
    const startTime = performance.now();

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas!.width = w * devicePixelRatio;
      canvas!.height = h * devicePixelRatio;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    const toC = (v: Vec2): Vec2 => ({ x: v.x * w, y: v.y * h });

    function countType(t: PType) {
      let n = 0;
      for (const p of particles) if (p.type === t) n++;
      return n;
    }

    function spawnStream(now: number) {
      const si = Math.random() < 0.55 ? 0 : 1;
      const s = STREAMS[si];
      const cp = animCP(s, now);
      const st = Math.pow(Math.random(), 1.2) * 0.55;
      const po = (Math.random() - 0.5) * 2 * (22 + Math.random() * 40);

      const pos = toC(bez(cp[0], cp[1], cp[2], cp[3], st));
      const tan = bezTan(cp[0], cp[1], cp[2], cp[3], st);
      const perp = norm({ x: -tan.y, y: tan.x }, po);

      particles.push({
        x: pos.x + perp.x, y: pos.y + perp.y,
        vx: 0, vy: 0,
        life: 0, maxLife: 180 + Math.random() * 220,
        radius: 0.7 + Math.random() * 2.0,
        type: 'stream',
        streamIdx: si, streamT: st,
        streamSpeed: 0.0008 + Math.random() * 0.0012,
        perpOffset: po,
        detached: false,
        detachAngle: Math.random() * Math.PI * 2,
        detachSpeed: 0.15 + Math.random() * 0.4,
        driftAngle: 0, driftSpeed: 0,
        colorT: Math.random() * 0.15,
      });
    }

    function spawnAmbient() {
      const angle = Math.random() * Math.PI * 2;
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: 0, vy: 0,
        life: 0, maxLife: 300 + Math.random() * 300,
        radius: 0.5 + Math.random() * 1.2,
        type: 'ambient',
        streamIdx: 0, streamT: 0, streamSpeed: 0, perpOffset: 0,
        detached: false, detachAngle: 0, detachSpeed: 0,
        driftAngle: angle,
        driftSpeed: 0.08 + Math.random() * 0.18,
        colorT: 0.4 + Math.random() * 0.6, // start already desaturated
      });
    }

    function update(now: number) {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        const prog = p.life / p.maxLife;

        if (p.type === 'ambient') {
          // Gentle drift with slow direction change
          p.driftAngle += (Math.sin(p.life * 0.01) * 0.005);
          p.x += Math.cos(p.driftAngle) * p.driftSpeed;
          p.y += Math.sin(p.driftAngle) * p.driftSpeed;
        } else {
          // Stream particle
          const s = STREAMS[p.streamIdx];
          const cp = animCP(s, now);

          if (!p.detached) {
            p.streamT += p.streamSpeed;
            if (p.streamT > 0.65 + Math.random() * 0.001 || prog > 0.55) {
              p.detached = true;
              const tan = bezTan(cp[0], cp[1], cp[2], cp[3], Math.min(p.streamT, 1));
              const nt = norm(tan, 0.5 + Math.random() * 0.5);
              p.vx = nt.x; p.vy = nt.y;
            } else {
              const pos = toC(bez(cp[0], cp[1], cp[2], cp[3], p.streamT));
              const tan = bezTan(cp[0], cp[1], cp[2], cp[3], p.streamT);
              const perp = norm({ x: -tan.y, y: tan.x }, p.perpOffset);
              const n1 = Math.sin(p.life * 0.06 + p.streamT * 20) * 8;
              const n2 = Math.cos(p.life * 0.04 + p.streamT * 15) * 5;
              p.x += (pos.x + perp.x + n1 - p.x) * 0.08;
              p.y += (pos.y + perp.y + n2 - p.y) * 0.08;
            }
          } else {
            const da = Math.max(0, prog - 0.55);
            const str = da * 1.8 + 0.3;
            p.x += p.vx * str + Math.cos(p.detachAngle) * p.detachSpeed * str;
            p.y += p.vy * str + Math.sin(p.detachAngle) * p.detachSpeed * str;
            p.vx *= 0.997; p.vy *= 0.997;
          }
        }

        p.colorT = Math.min(1, p.colorT + 0.002);

        if (prog >= 1 || p.x < -50 || p.x > w + 50 || p.y < -50 || p.y > h + 50) {
          particles.splice(i, 1);
        }
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);

      for (const p of particles) {
        const prog = p.life / p.maxLife;

        let alpha: number;
        if (prog < 0.10) alpha = prog / 0.10;
        else if (prog > 0.60) alpha = 1 - (prog - 0.60) / 0.40;
        else alpha = 1;

        // Text zone fade — stream particles fade hard, ambient particles stay visible
        const ts = w * 0.55;
        if (p.x > ts) {
          const f = 1 - (p.x - ts) / (w * 0.45);
          if (p.type === 'ambient') {
            alpha *= Math.max(0.15, f);          // ambient: gentle linear fade, still visible
          } else {
            alpha *= Math.max(0, f * f);          // stream: hard quadratic fade
          }
        }
        // Nav fade
        if (p.y < h * 0.10) alpha *= p.y / (h * 0.10);

        // Ambient particles are even more subtle
        alpha *= p.type === 'ambient' ? 0.22 : 0.40;
        if (alpha < 0.006) continue;

        const r = p.type === 'stream' && p.detached
          ? p.radius * Math.max(0.15, 1 - (prog - 0.5) * 0.9)
          : p.radius;
        if (r < 0.25) continue;

        // Stream particles use their stream's color; ambient uses stream-A color
        const s = STREAMS[p.type === 'stream' ? p.streamIdx : 0];
        const glow = streamColor(s, p.colorT, alpha * 0.2);
        const core = streamColor(s, p.colorT, alpha);

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, r + 1.5, 0, Math.PI * 2);
        ctx!.fillStyle = glow;
        ctx!.fill();

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx!.fillStyle = core;
        ctx!.fill();
      }
    }

    function loop() {
      const now = (performance.now() - startTime) / 1000; // seconds

      // Spawn stream particles
      streamSpawnAcc += STREAM_SPAWN_RATE;
      while (streamSpawnAcc >= 1 && countType('stream') < MAX_STREAM) {
        spawnStream(now);
        streamSpawnAcc -= 1;
      }
      if (countType('stream') >= MAX_STREAM) streamSpawnAcc = 0;

      // Spawn ambient particles
      ambientSpawnAcc += AMBIENT_SPAWN_RATE;
      while (ambientSpawnAcc >= 1 && countType('ambient') < MAX_AMBIENT) {
        spawnAmbient();
        ambientSpawnAcc -= 1;
      }
      if (countType('ambient') >= MAX_AMBIENT) ambientSpawnAcc = 0;

      update(now);
      draw();
      animRef.current = requestAnimationFrame(loop);
    }

    animRef.current = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(animRef.current); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-5 pointer-events-none"
      aria-hidden="true"
    />
  );
}
