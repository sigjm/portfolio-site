import { useEffect, useRef } from 'react';

type Point = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

export function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    let width = 0;
    let height = 0;
    let points: Point[] = [];
    let frameId = 0;

    const resizeCanvas = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      points = Array.from({ length: Math.max(26, Math.floor(width / 42)) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.36,
        vy: (Math.random() - 0.5) * 0.36,
      }));
    };

    const drawCanvas = () => {
      context.clearRect(0, 0, width, height);
      context.lineWidth = 1;

      for (const point of points) {
        point.x += point.vx;
        point.y += point.vy;
        if (point.x < 0 || point.x > width) point.vx *= -1;
        if (point.y < 0 || point.y > height) point.vy *= -1;
      }

      for (let i = 0; i < points.length; i += 1) {
        for (let j = i + 1; j < points.length; j += 1) {
          const a = points[i];
          const b = points[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            context.strokeStyle = `rgba(217, 249, 157, ${0.12 * (1 - distance / 150)})`;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.stroke();
          }
        }
      }

      context.fillStyle = 'rgba(94, 234, 212, 0.55)';
      for (const point of points) {
        context.fillRect(point.x - 1.5, point.y - 1.5, 3, 3);
      }

      frameId = window.requestAnimationFrame(drawCanvas);
    };

    resizeCanvas();
    drawCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas id="signal-canvas" ref={canvasRef} aria-hidden="true" />;
}
