import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

export function Panel({
  children,
  className,
  glow,
}: {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-white/10 bg-white/[0.045] backdrop-blur-xl",
        "shadow-[0_18px_50px_-24px_rgba(0,0,0,0.9)]",
        glow && "ring-1 ring-amber-300/20",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Chip({
  children,
  tone = "slate",
  className,
}: {
  children: ReactNode;
  tone?: "slate" | "amber" | "sky" | "rose" | "emerald" | "violet";
  className?: string;
}) {
  const tones: Record<string, string> = {
    slate: "bg-slate-400/10 text-slate-200 border-slate-300/20",
    amber: "bg-amber-400/12 text-amber-200 border-amber-300/25",
    sky: "bg-sky-400/12 text-sky-200 border-sky-300/25",
    rose: "bg-rose-400/12 text-rose-200 border-rose-300/25",
    emerald: "bg-emerald-400/12 text-emerald-200 border-emerald-300/25",
    violet: "bg-violet-400/12 text-violet-200 border-violet-300/25",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  desc,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="mb-6">
      {eyebrow && (
        <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-300/80">
          {eyebrow}
        </div>
      )}
      <h2 className="font-serif text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
      {desc && <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-300/90">{desc}</p>}
    </div>
  );
}

export function Btn({
  children,
  onClick,
  variant = "solid",
  size = "md",
  className,
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "solid" | "ghost" | "outline";
  size?: "sm" | "md";
  className?: string;
  disabled?: boolean;
}) {
  const variants = {
    solid:
      "bg-gradient-to-b from-amber-300 to-amber-500 text-slate-950 hover:from-amber-200 hover:to-amber-400 shadow-[0_10px_28px_-12px_rgba(251,191,36,0.7)]",
    outline: "border border-white/20 text-slate-100 hover:bg-white/10",
    ghost: "text-slate-300 hover:bg-white/10 hover:text-white",
  };
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40",
        size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2.5 text-sm",
        variants[variant],
        className,
      )}
    >
      {children}
    </button>
  );
}

export function Slider({
  value,
  min,
  max,
  step = 1,
  onChange,
  label,
  display,
}: {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  label: string;
  display?: string;
}) {
  return (
    <label className="block select-none">
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
          {label}
        </span>
        {display && <span className="font-mono text-xs text-amber-200">{display}</span>}
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-amber-400
          [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-300
          [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(252,211,77,0.18)]"
      />
    </label>
  );
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        "flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-[11px] font-medium transition",
        checked
          ? "border-amber-300/40 bg-amber-300/15 text-amber-100"
          : "border-white/10 bg-white/5 text-slate-400 hover:text-slate-200",
      )}
    >
      <span
        className={cn(
          "h-3 w-3 rounded-full border",
          checked ? "border-amber-200 bg-amber-300" : "border-white/30",
        )}
      />
      {label}
    </button>
  );
}

export function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2">
      <div className="text-[10px] uppercase tracking-widest text-slate-400">{label}</div>
      <div className="mt-0.5 text-sm font-semibold text-white">{value}</div>
    </div>
  );
}
