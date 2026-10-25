import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  a: number;
  tw: number;
  sp: number;
  hue: number;
};

export default function Starfield() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let stars: Star[] = [];
    let raf = 0;

    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(420, Math.round((w * h) / 4200));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.25 + 0.25,
        a: Math.random(),
        tw: Math.random() * Math.PI * 2,
        sp: 0.4 + Math.random() * 1.6,
        hue: Math.random() < 0.16 ? 205 + Math.random() * 40 : 45 + Math.random() * 10,
      }));
    };

    let t = 0;
    const draw = () => {
      t += 0.016;
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const alpha = 0.35 + 0.65 * Math.abs(Math.sin(s.tw + t * s.sp * 0.6));
        const rr = s.r;
        ctx.beginPath();
        ctx.fillStyle = `hsla(${s.hue}, 90%, ${88 - s.r * 6}%, ${alpha * s.a})`;
        ctx.arc(s.x, s.y, rr, 0, Math.PI * 2);
        ctx.fill();
        if (s.r > 1.05) {
          ctx.beginPath();
          ctx.fillStyle = `hsla(${s.hue}, 90%, 80%, ${alpha * 0.12})`;
          ctx.arc(s.x, s.y, rr * 4.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#05070f]">
      <canvas ref={ref} className="h-full w-full" />
      <div className="absolute -left-40 -top-40 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(76,29,149,0.42),transparent_65%)] blur-2xl" />
      <div className="absolute -right-52 top-24 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgba(12,74,110,0.40),transparent_65%)] blur-2xl" />
      <div className="absolute bottom-[-18rem] left-1/3 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(157,23,77,0.24),transparent_68%)] blur-2xl" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,4,12,0.35)_0%,rgba(2,4,12,0.15)_40%,rgba(2,4,12,0.65)_100%)]" />
    </div>
  );
}
