import { memo, useEffect, useMemo, useRef, useState } from "react";
import PlanetSphere from "@/components/PlanetSphere";
import { Btn, Chip, Panel, Slider, Toggle } from "@/components/ui";
import { planets, matahari, type CelestialBody } from "@/data/bodies";

const PlanetSprite = memo(function PlanetSprite({ id }: { id: string }) {
  const all: Record<string, CelestialBody> = Object.fromEntries(
    [matahari, ...planets].map((b) => [b.id, b]),
  );
  const b = all[id];
  if (!b) return null;
  return (
    <svg viewBox="0 0 200 200" width={200} height={200} style={{ overflow: "visible" }}>
      <PlanetSphere spec={b.visual} size={200} glow={b.group !== "planet-luar"} />
    </svg>
  );
});

const START = [0, 1.9, 3.7, 5.4, 0.8, 2.6, 4.4, 5.9];

export default function SolarSystem() {
  const [days, setDays] = useState(0);
  const [speed, setSpeed] = useState(3);
  const [play, setPlay] = useState(true);
  const [showOrbit, setShowOrbit] = useState(true);
  const [showLabel, setShowLabel] = useState(true);
  const [selected, setSelected] = useState<CelestialBody>(matahari);

  const raf = useRef(0);
  const last = useRef(0);
  const acc = useRef(0);

  useEffect(() => {
    const loop = (t: number) => {
      if (!last.current) last.current = t;
      const dt = Math.min(0.05, (t - last.current) / 1000);
      last.current = t;
      if (play) acc.current += dt * speed * 6;
      setDays(acc.current);
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, [play, speed]);

  const positions = useMemo(() => {
    return planets.map((p, i) => {
      const a = START[i] + (days / p.orbit!.period) * Math.PI * 2;
      return { p, x: Math.cos(a) * p.orbit!.a, y: Math.sin(a) * p.orbit!.a * 0.62 };
    });
  }, [days]);

  const years = days / 365.25;
  const fmt = (n: number, d = 1) =>
    n.toLocaleString("id-ID", { maximumFractionDigits: d, minimumFractionDigits: d });

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
      <Panel className="overflow-hidden p-2">
        {/* Fixed aspect ratio keeps the simulator viewport from changing height while animating. */}
        <div className="relative aspect-[13/10] w-full overflow-hidden">
          <svg
            viewBox="-390 -300 780 600"
            preserveAspectRatio="xMidYMid meet"
            className="block h-full w-full overflow-hidden"
          >
            <defs>
              <radialGradient id="ss-halo" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffb340" stopOpacity="0.45" />
                <stop offset="45%" stopColor="#ff8a2a" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#ff7a18" stopOpacity="0" />
              </radialGradient>
            </defs>

            {showOrbit && (
              <g fill="none" stroke="rgba(255,255,255,0.16)" strokeDasharray="2 5">
                {planets.map((p) => (
                  <ellipse
                    key={p.id}
                    cx="0"
                    cy="0"
                    rx={p.orbit!.a}
                    ry={p.orbit!.a * 0.62}
                    strokeWidth="1"
                  />
                ))}
                <ellipse cx="0" cy="0" rx="166" ry="103" strokeWidth="14" stroke="rgba(255,255,255,0.035)" />
              </g>
            )}

            <circle cx="0" cy="0" r="150" fill="url(#ss-halo)" />

            {/* Matahari */}
            <g
              transform={`translate(0,0) scale(${matahari.simSize / 100}) translate(-100,-100)`}
              className="cursor-pointer"
              onClick={() => setSelected(matahari)}
            >
              <PlanetSprite id="matahari" />
            </g>

            {positions.map(({ p, x, y }) => (
              <g
                key={p.id}
                transform={`translate(${x},${y}) scale(${p.simSize / 100}) translate(-100,-100)`}
                className="cursor-pointer"
                onClick={() => setSelected(p)}
              >
                <PlanetSprite id={p.id} />
              </g>
            ))}

            {showLabel &&
              positions.map(({ p, x, y }) => (
                <text
                  key={`l-${p.id}`}
                  x={x}
                  y={y + p.simSize + 12}
                  textAnchor="middle"
                  className="fill-slate-300"
                  style={{ fontSize: 13, fontWeight: 600 }}
                >
                  {p.name}
                </text>
              ))}
            {showLabel && (
              <text x={0} y={matahari.simSize + 16} textAnchor="middle" style={{ fontSize: 13, fontWeight: 700 }} className="fill-amber-200">
                Matahari
              </text>
            )}
          </svg>

          <div className="pointer-events-none absolute left-3 top-3 rounded-lg border border-white/10 bg-black/40 px-2.5 py-1.5 backdrop-blur">
            <div className="text-[10px] uppercase tracking-widest text-slate-400">Waktu simulasi</div>
            <div className="font-mono text-sm text-amber-200">
              {fmt(days, 0)} hari = {fmt(years, 2)} tahun Bumi
            </div>
          </div>
        </div>
      </Panel>

      <div className="space-y-4">
        <Panel className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="font-serif text-lg text-white">Kontrol Simulasi</h4>
            <Btn size="sm" variant="outline" onClick={() => setPlay((p) => !p)}>
              {play ? "⏸ Jeda" : "▶ Putar"}
            </Btn>
          </div>
          <div className="space-y-4">
            <Slider
              label="Kecepatan"
              min={0.5}
              max={12}
              step={0.5}
              value={speed}
              display={`${fmt(speed)} ×`}
              onChange={setSpeed}
            />
            <div className="flex flex-wrap gap-2">
              <Toggle checked={showOrbit} onChange={setShowOrbit} label="Garis orbit" />
              <Toggle checked={showLabel} onChange={setShowLabel} label="Nama planet" />
            </div>
            <p className="text-[11px] leading-relaxed text-slate-400">
              Klik salah satu planet pada gambar untuk melihat data lengkapnya. Perhatikan bahwa planet
              yang paling dekat Matahari bergerak paling cepat, karena periode revolusinya paling
              singkat.
            </p>
          </div>
        </Panel>

        <Panel className="overflow-hidden p-4" glow>
          <div className="flex items-start gap-4">
            <div className="shrink-0">
              <PlanetSphere spec={selected.visual} size={84} />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-widest text-amber-300/80">
                {selected.type}
              </div>
              <h4 className="font-serif text-xl leading-tight text-white">{selected.name}</h4>
              <p className="mt-1 text-xs leading-relaxed text-slate-300">{selected.tagline}</p>
            </div>
          </div>
          <div className="mt-3 grid gap-1.5">
            {selected.facts.slice(0, 5).map((f) => (
              <div key={f.label} className="flex gap-2 border-b border-white/5 pb-1.5 text-xs">
                <span className="w-28 shrink-0 text-slate-400">{f.label}</span>
                <span className="text-slate-100">{f.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <Chip tone="amber">periode {selected.facts.find((f) => /revolusi/.test(f.label))?.value ?? "-"}</Chip>
          </div>
        </Panel>
      </div>
    </div>
  );
}
