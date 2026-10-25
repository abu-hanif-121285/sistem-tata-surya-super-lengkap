import { useEffect, useRef, useState } from "react";
import PlanetSphere from "@/components/PlanetSphere";
import { Btn, Chip, Panel, Slider, Toggle } from "@/components/ui";
import { bulan } from "@/data/bodies";

const PHASES = [
  { name: "Bulan Baru", short: "Bulan baru", day: 1, desc: "Bulan berada di antara Matahari dan Bumi. Sisi Bulan yang menghadap Bumi tidak disinari, sehingga Bulan tidak terlihat sama sekali." },
  { name: "Sabit Muda", short: "Sabit muda", day: 3.5, desc: "Sebagian kecil sisi terang mulai terlihat. Bulan tampak sabit tipis pada sore hari di sisi barat, lalu terbenam tidak lama setelah Matahari." },
  { name: "Kuartal Pertama", short: "Setengah awal", day: 7.5, desc: "Separuh sisi Bulan terlihat terang. Bulan terbit sekitar pukul 12.00 dan terbenam sekitar pukul 24.00." },
  { name: "Gibbous Awal", short: "Gibbous awal", day: 11, desc: "Bagian yang terang lebih dari setengah dan terus membesar mendekati bulan purnama." },
  { name: "Bulan Purnama", short: "Purnama", day: 15, desc: "Bumi berada di antara Matahari dan Bulan sehingga seluruh sisi Bulan yang menghadap Bumi tampak terang. Bulan terbit saat Matahari terbenam." },
  { name: "Gibbous Akhir", short: "Gibbous akhir", day: 19, desc: "Bagian terang mulai menyusut dari sebelah kanan. Bulan terbit lebih malam daripada sebelumnya." },
  { name: "Kuartal Ketiga", short: "Setengah akhir", day: 22.5, desc: "Separuh sisi Bulan terlihat terang lagi, tetapi sisi terangnya berpindah. Bulan terbit sekitar pukul 24.00 dan terlihat pada dini hari." },
  { name: "Sabit Tua", short: "Sabit tua", day: 26.5, desc: "Sabit tipis terlihat pada subuh hari di sisi timur sebelum Matahari terbit, lalu kembali ke fase bulan baru." },
];

/** Tampilan Bulan dari Bumi (0 = bulan baru, 0.5 = purnama) */
function MoonFace({ phase, r = 78, size = 200 }: { phase: number; r?: number; size?: number }) {
  const a = ((phase % 1) + 1) % 1;
  const alpha = a * Math.PI * 2;
  const cos = Math.cos(alpha);
  const litRight = a < 0.5;
  const rx = Math.abs(cos) * r;
  const crescent = (a < 0.25 || a > 0.75) && a !== 0 && a !== 1;
  const id = `mf${Math.round(a * 10000)}`;

  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className="overflow-visible">
      <defs>
        <clipPath id={`c${id}`}>
          <circle cx="100" cy="100" r={r} />
        </clipPath>
        <radialGradient id={`g${id}`} cx="38%" cy="32%" r="80%">
          <stop offset="0%" stopColor="#8f9298" />
          <stop offset="60%" stopColor="#4a4c52" />
          <stop offset="100%" stopColor="#232428" />
        </radialGradient>
        <radialGradient id={`l${id}`} cx="40%" cy="34%" r="82%">
          <stop offset="0%" stopColor="#fffdf5" />
          <stop offset="55%" stopColor="#ece7da" />
          <stop offset="100%" stopColor="#b9b3a4" />
        </radialGradient>
      </defs>

      <circle cx="100" cy="100" r={r} fill={`url(#g${id})`} />

      <g clipPath={`url(#c${id})`}>
        {/* sisi terang separuh */}
        <rect x={litRight ? 100 - r : 100 - r} y={100 - r} width={r} height={2 * r} fill={`url(#l${id})`} />
        {/* ellipse terminator */}
        <ellipse
          cx="100"
          cy="100"
          rx={rx}
          ry={r}
          fill={crescent ? `url(#g${id})` : `url(#l${id})`}
        />
        {/* tekstur kawah samar pada bagian terang */}
        <g opacity="0.16">
          {bulan.visual.craters!.map((c, i) => (
            <circle key={i} cx={c.x} cy={c.y} r={c.r} fill="#6b665c" />
          ))}
        </g>
      </g>
      <circle cx="100" cy="100" r={r} fill="none" stroke="#0b1220" strokeWidth="1" opacity="0.6" />
    </svg>
  );
}

export default function MoonPhases() {
  const [day, setDay] = useState(1);
  const [play, setPlay] = useState(false);
  const [showRays, setShowRays] = useState(true);

  const raf = useRef(0);
  useEffect(() => {
    if (!play) return;
    let last = 0;
    const loop = (t: number) => {
      if (!last) last = t;
      const dt = (t - last) / 1000;
      last = t;
      setDay((d) => (d + dt * 2.4) % 29.5);
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, [play]);

  const phase = ((day - 1) / 29.5 + 1) % 1; // 0 di bulan baru (hari ke-1)
  const alpha = phase * Math.PI * 2;
  const d = 132;
  const mx = -d * Math.cos(alpha);
  const my = -d * Math.sin(alpha);
  const illum = ((1 - Math.cos(alpha)) / 2) * 100;

  const nearest = PHASES.reduce((best, p, i) => {
    const dist = Math.min(Math.abs(day - p.day), 29.5 - Math.abs(day - p.day));
    const bd = Math.min(Math.abs(day - PHASES[best].day), 29.5 - Math.abs(day - PHASES[best].day));
    return dist < bd ? i : best;
  }, 0);
  const cur = PHASES[nearest];

  return (
    <div className="space-y-5">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
        <Panel className="p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h4 className="font-serif text-lg text-white">Tampak Atas: Matahari – Bumi – Bulan</h4>
            <div className="flex gap-2">
              <Toggle checked={showRays} onChange={setShowRays} label="Sinar Matahari" />
              <Btn size="sm" variant="outline" onClick={() => setPlay((p) => !p)}>
                {play ? "⏸ Jeda" : "▶ Putar"}
              </Btn>
            </div>
          </div>

          <svg viewBox="-320 -170 480 340" className="w-full">
            <defs>
              <linearGradient id="mp-sun" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ffe27a" />
                <stop offset="100%" stopColor="#ff8b1f" />
              </linearGradient>
              <marker id="mp-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="rgba(255,214,120,0.75)" />
              </marker>
            </defs>

            {/* Matahari (kiri) */}
            <circle cx="-292" cy="0" r="120" fill="url(#mp-sun)" opacity="0.95" />
            <circle cx="-292" cy="0" r="150" fill="#ff9d2e" opacity="0.16" />
            <text x="-292" y="150" textAnchor="middle" style={{ fontSize: 15, fontWeight: 700 }} className="fill-amber-200">
              Matahari
            </text>

            {showRays && (
              <g stroke="rgba(255,214,120,0.7)" strokeWidth="1.6" markerEnd="url(#mp-arrow)">
                {[-120, -80, -40, 0, 40, 80, 120].map((y) => (
                  <line key={y} x1="-160" y1={y} x2="-40" y2={y} />
                ))}
              </g>
            )}

            {/* orbit bulan */}
            <ellipse cx="0" cy="0" rx={d} ry={d} fill="none" stroke="rgba(255,255,255,0.14)" strokeDasharray="3 6" />
            <line x1="-150" y1="0" x2="150" y2="0" stroke="rgba(255,255,255,0.16)" strokeDasharray="4 6" />

            {/* Bumi */}
            <foreignObject x="-32" y="-32" width="64" height="64">
              <div className="grid h-full w-full place-items-center">
                <PlanetSphere
                  spec={{ kind: "earth", colors: ["#8fd3ff", "#2b7fd4", "#12488f", "#0a2a5e"], freq: 0.02, glow: "#7fc4ff", cap: true }}
                  size={64}
                  shadow={0.1}
                />
              </div>
            </foreignObject>
            <text x="0" y="58" textAnchor="middle" style={{ fontSize: 14, fontWeight: 700 }} className="fill-sky-200">
              Bumi
            </text>

            {/* Bulan */}
            <g transform={`translate(${mx},${my})`}>
              <circle cx="0" cy="0" r="22" fill="#1b1d24" />
              <circle cx="0" cy="0" r="22" fill="none" stroke="#5b6070" strokeWidth="1" />
              <path d="M 0,-22 A 22,22 0 0 0 0,22 Z" fill="#efeade" />
              <text x="0" y="42" textAnchor="middle" style={{ fontSize: 13, fontWeight: 700 }} className="fill-slate-200">
                Bulan
              </text>
            </g>

            {/* garis bantu */}
            <line x1={mx} y1={my} x2="0" y2="0" stroke="rgba(255,255,255,0.28)" strokeWidth="1" strokeDasharray="4 4" />
            <text x={mx * 0.55} y={my * 0.55 - 8} textAnchor="middle" style={{ fontSize: 11 }} className="fill-slate-400">
              ± 384.400 km
            </text>
          </svg>

          <div className="mt-2 space-y-3">
            <Slider
              label="Waktu dalam satu periode sinodis"
              min={1}
              max={29.5}
              step={0.1}
              value={day}
              display={`hari ke-${day.toFixed(1)}`}
              onChange={(v) => {
                setPlay(false);
                setDay(v);
              }}
            />
          </div>
        </Panel>

        <div className="space-y-4">
          <Panel className="p-5 text-center" glow>
            <div className="text-[10px] uppercase tracking-widest text-slate-400">Tampilan dari Bumi</div>
            <div className="mx-auto mt-3 grid place-items-center">
              <MoonFace phase={phase} size={190} />
            </div>
            <div className="mt-3 font-serif text-2xl text-white">{cur.name}</div>
            <div className="mt-1 flex justify-center gap-2">
              <Chip tone="sky">Illuminasi {illum.toFixed(0)}%</Chip>
              <Chip tone="amber">Hari ke-{day.toFixed(1)}</Chip>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-300">{cur.desc}</p>
          </Panel>

          <Panel className="p-4">
            <h4 className="mb-2 text-sm font-semibold text-white">Periode Bulan</h4>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-slate-400">Periode sideris (1 kali revolusi)</span>
                <span className="font-semibold text-slate-100">27,3 hari</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-slate-400">Periode sinodis (1 kali fase)</span>
                <span className="font-semibold text-amber-200">29,5 hari</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-slate-400">Rotasi Bulan</span>
                <span className="font-semibold text-slate-100">27,3 hari</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Dasar penanggalan</span>
                <span className="font-semibold text-slate-100">Hijriah</span>
              </div>
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-slate-400">
              Rotasi dan revolusi Bulan sama-sama 27,3 hari, sehingga Bumi selalu melihat sisi Bulan
              yang sama (rotasi tersinkron).
            </p>
          </Panel>
        </div>
      </div>

      <Panel className="p-4">
        <h4 className="mb-3 font-serif text-lg text-white">Delapan Fase Bulan — klik untuk memilih</h4>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {PHASES.map((p, i) => {
            const pPhase = ((p.day - 1) / 29.5) % 1;
            const active = nearest === i;
            return (
              <button
                key={p.name}
                onClick={() => {
                  setPlay(false);
                  setDay(p.day);
                }}
                className={`group rounded-xl border p-2 text-center transition ${
                  active
                    ? "border-amber-300/50 bg-amber-300/10"
                    : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.07]"
                }`}
              >
                <div className="mx-auto grid place-items-center">
                  <MoonFace phase={pPhase} size={62} />
                </div>
                <div className={`mt-1.5 text-[11px] font-semibold ${active ? "text-amber-200" : "text-slate-200"}`}>
                  {p.short}
                </div>
                <div className="text-[10px] text-slate-500">hari ke-{p.day}</div>
              </button>
            );
          })}
        </div>
      </Panel>
    </div>
  );
}
