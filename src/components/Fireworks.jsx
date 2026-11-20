import { useEffect, useRef } from "react";

const COLORS = [
  "#FFD700", "#F5E6A8", "#FF4444", "#FF8C00",
  "#FFFFFF", "#FFB347", "#FF6347", "#FFC200", "#FFDD00",
];

/**
 * Fireworks canvas rendered INSIDE the InvitationHero section
 * (position: absolute; inset: 0).
 *
 * `origin` = {x, y} in SECTION-RELATIVE coordinates (not viewport).
 * `containerRef` = ref to the section element (used to size the canvas).
 *
 * This avoids all devicePixelRatio / viewport coordinate mismatches.
 */
export function Fireworks({ active, origin, containerRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active || !origin || !containerRef?.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const container = containerRef.current;

    // Size canvas to match the section exactly
    const setSize = () => {
      canvas.width  = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };
    setSize();

    const ro = new ResizeObserver(setSize);
    ro.observe(container);

    // Origin = center of date card, section-relative (passed from InvitationHero)
    const { x: ox, y: oy } = origin;

    // ── Spark ──────────────────────────────────────────────────────────────
    class Spark {
      constructor() {
        this.x = ox + (Math.random() - 0.5) * 12;
        this.y = oy + (Math.random() - 0.5) * 12;

        const angle = Math.random() * Math.PI * 2; // full 360°
        const speed = Math.random() * 11 + 4;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;

        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.alpha = 1;
        this.decay = Math.random() * 0.016 + 0.009;
        this.size  = Math.random() * 3.5 + 1.2;
        this.gravity = 0.09;
        this.trail = [];
      }

      update() {
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > 7) this.trail.shift();
        this.x  += this.vx;
        this.y  += this.vy;
        this.vy += this.gravity;
        this.vx *= 0.98;
        this.alpha -= this.decay;
      }

      draw() {
        // Fading trail
        this.trail.forEach((p, i) => {
          const a = (i / this.trail.length) * this.alpha * 0.4;
          if (a <= 0) return;
          ctx.save();
          ctx.globalAlpha = a;
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, this.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });
        // Glowing head
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // ── Burst: fires N sparks from card center in all 360° directions ──────
    const sparks = [];

    function burst(count = 100) {
      for (let i = 0; i < count; i++) {
        sparks.push(new Spark());
      }
    }

    // ── Main loop ──────────────────────────────────────────────────────────
    const DURATION = 5000;
    const startTime = Date.now();
    let animId;

    // Initial big burst
    burst(130);

    const burstInterval = setInterval(() => {
      if (Date.now() - startTime > DURATION - 400) {
        clearInterval(burstInterval);
        return;
      }
      burst(90);
    }, 650);

    function animate() {
      // Transparent clear — section background shows through
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = sparks.length - 1; i >= 0; i--) {
        sparks[i].update();
        if (sparks[i].alpha <= 0) {
          sparks.splice(i, 1);
        } else {
          sparks[i].draw();
        }
      }

      const elapsed = Date.now() - startTime;
      if (elapsed < DURATION || sparks.length > 0) {
        animId = requestAnimationFrame(animate);
      }
    }

    animate();

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(burstInterval);
      ro.disconnect();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [active, origin, containerRef]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 50,
        pointerEvents: "none",
      }}
    />
  );
}
