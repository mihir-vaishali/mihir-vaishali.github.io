import { useCallback, useEffect, useRef } from "react";

const FOIL = "#d4af37";
const FOIL_TEXT = "#7d4f00";
const BRUSH_RADIUS = 25;

/**
 * Canvas scratch-to-reveal. Uses pointer events so mouse, pen and touch all run
 * through one code path, and renders at device-pixel-ratio so the foil label
 * stays crisp on phones.
 */
export function useScratchCard({ label = "Scratch To Reveal Date" } = {}) {
  const canvasRef = useRef(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef(null);

  const paintFoil = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { width, height } = canvas.getBoundingClientRect();
    if (!width || !height) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = FOIL;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = FOIL_TEXT;
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, width / 2, height / 2);
  }, [label]);

  const scratchTo = useCallback((x, y) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = BRUSH_RADIUS * 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const last = lastPointRef.current;
    if (last) {
      ctx.beginPath();
      ctx.moveTo(last.x, last.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(x, y, BRUSH_RADIUS, 0, Math.PI * 2);
    ctx.fill();

    lastPointRef.current = { x, y };
  }, []);

  useEffect(() => {
    paintFoil();

    const canvas = canvasRef.current;
    if (!canvas || typeof ResizeObserver === "undefined") return undefined;

    const observer = new ResizeObserver(paintFoil);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [paintFoil]);

  const pointFrom = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const handlers = {
    onPointerDown: (event) => {
      event.currentTarget.setPointerCapture?.(event.pointerId);
      drawingRef.current = true;
      lastPointRef.current = null;
      const { x, y } = pointFrom(event);
      scratchTo(x, y);
    },
    onPointerMove: (event) => {
      if (!drawingRef.current) return;
      event.preventDefault();
      const { x, y } = pointFrom(event);
      scratchTo(x, y);
    },
    onPointerUp: (event) => {
      drawingRef.current = false;
      lastPointRef.current = null;
      event.currentTarget.releasePointerCapture?.(event.pointerId);
    },
    onPointerLeave: () => {
      drawingRef.current = false;
      lastPointRef.current = null;
    },
  };

  return { canvasRef, handlers };
}
