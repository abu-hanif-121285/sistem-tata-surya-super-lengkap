import { useEffect, useRef, useState } from "react";
import PlanetSphere from "@/components/PlanetSphere";
import { Btn, Chip, Panel, Slider, Toggle } from "@/components/ui";

const EARTH_SPEC = {
  kind: "earth" as const,
  colors: ["#8fd3ff", "#2b7fd4", "#12488f", "#0a2a5e"],
  freq: 0.02,
  glow: "#7fc4ff",
  cap: true,
};

/* ============================ ROTASI ============================ */
function Rotasi() {
  const [hour, setHour] = useState(7);
  const [play, setPlay] = useState(true);
  const [showTerminator, setShowTerminator] = useState(true);
  const [showCities, setShowCities] = useState(true);

  const raf = useRef(0);
  useEffect(() => {
    if (!play) return;
    let last = 0;
    const loop = (t: number) => {
      if (!last) last = t;
      const dt = (t - last) / 1000;
      last = t;
      setHour((h) => (h + dt * 3) % 24);
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, [play]);

  const R = 120;
  const lambda = ((hour - 12) / 24) * 360; // 0 = tepat menghadap Matahari (pukul 12.00)
  const a = (lambda * Math.PI) / 180;
  const mx = -Math.cos(a) * R * 0.62;
  const my = -Math.sin(a) * R * 0.62;
  const isDay = Math.abs(((lambda + 540) % 360) - 180) < 90;

  const wib = `${String(Math.floor(hour)).padStart(2, "0")}.${String(Math.round((hour % 1) * 60)).padStart(2, "0")}`;
  const add = (h: number) => (h + 24) % 24;
  const fmt = (h: number) =>
    `${String(Math.floor(h)).padStart(2, "0")}.${String(Math.round((h % 1) * 60)).padStart(2, "0")}`;

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_330px]">
      <Panel className="p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h4 className="font-serif text-lg text-white">Rotasi Bumi — tampak dari Kutub Utara</h4>
          <div className="flex flex-wrap gap-2">
            <Toggle checked={showTerminator} onChange={setShowTerminator} label="Siang/malam" />
            <Toggle checked={showCities} onChange={setShowCities} label="Keterangan" />
            <Btn size="sm" variant="outline" onClick={() => setPlay((p) => !p)}>
              {play ? "⏸ Jeda" : "▶ Putar"}
            </Btn>
          </div>
        </div>

        <svg viewBox="-230 -190 460 380" className="w-full">
          <defs>
            <radialGradient id="rt-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffd075" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ff8a1f" stopOpacity="0" />
            </radialGradient>
            <marker id="rt-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
              <path d="M0,0 L9,4.5 L0,9 Z" fill="rgba(255,214,120,0.8)" />
            </marker>
          </defs>

          {/* Matahari */}
          <circle cx="-235" cy="0" r="110" fill="#ff9c30" opacity="0.18" />
          <circle cx="-235" cy="0" r="86" fill="url(#rt-sun)" />
          <defs>
            <radialGradient id="rt-sun" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff9e6" />
              <stop offset="60%" stopColor="#ffcf5c" />
              <stop offset="100%" stopColor="#ff7d16" />
            </radialGradient>
          </defs>
          <text x="-190" y="150" style={{ fontSize: 14, fontWeight: 700 }} className="fill-amber-200">
            Matahari
          </text>

          {/* sinar */}
          {[-90, -45, 0, 45, 90].map((y) => (
            <line key={y} x1="-120" y1={y} x2={-R - 26} y2={y} stroke="rgba(255,214,120,0.6)" strokeWidth="1.6" markerEnd="url(#rt-arrow)" />
          ))}
          <circle cx="-70" cy="0" r="150" fill="url(#rt-glow)" opacity="0.35" />

          {/* Bumi */}
          <circle cx="0" cy="0" r={R} fill="#070a14" />
          <foreignObject x={-R} y={-R} width={R * 2} height={R * 2}>
            <div className="grid h-full w-full place-items-center">
              <PlanetSphere spec={EARTH_SPEC} size={R * 2} glow={false} litFrom="left" shadow={0.92} />
            </div>
          </foreignObject>

          {showTerminator && (
            <>
              <path d={`M 0,${-R} A ${R},${R} 0 0 0 0,${R} Z`} fill="rgba(253,224,71,0.07)" />
              <line x1="0" y1={-R} x2="0" y2={R} stroke="rgba(255,255,255,0.35)" strokeDasharray="5 5" />
              <text x="-58" y="-128" style={{ fontSize: 12 }} className="fill-amber-200/90">
                SIANG
              </text>
              <text x="20" y="-128" style={{ fontSize: 12 }} className="fill-slate-400">
                MALAM
              </text>
            </>
          )}

          {/* penanda Indonesia */}
          <g transform={`translate(${mx},${my})`}>
            <circle cx="0" cy="0" r="8" fill={isDay ? "#fbbf24" : "#94a3b8"} stroke="#0b1220" strokeWidth="1.5" />
            <text x="0" y="-14" textAnchor="middle" style={{ fontSize: 11, fontWeight: 700 }} className="fill-white">
              Indonesia
            </text>
          </g>

          {/* arah rotasi */}
          <path
            d="M 0,-155 A 155,155 0 0 1 130,-80"
            fill="none"
            stroke="rgba(96,165,250,0.8)"
            strokeWidth="2.5"
            markerEnd="url(#rt-arrow)"
          />
          <text x="76" y="-140" style={{ fontSize: 12, fontWeight: 600 }} className="fill-sky-300">
            arah rotasi
          </text>
          <text x="76" y="-126" style={{ fontSize: 11 }} className="fill-slate-400">
            barat → timur
          </text>

          {showCities && (
            <g style={{ fontSize: 11 }} className="fill-slate-400">
              <text x="-150" y="170">Sinar Matahari datang dari kiri, sehingga belahan Bumi yang menghadap kiri mengalami siang.</text>
            </g>
          )}
        </svg>

        <div className="mt-2">
          <Slider
            label="Waktu (jam)"
            min={0}
            max={24}
            step={0.1}
            value={hour}
            display={`${wib} WIB`}
            onChange={(v) => {
              setPlay(false);
              setHour(v);
            }}
          />
        </div>
      </Panel>

      <div className="space-y-4">
        <Panel className="p-5" glow>
          <div className="text-[10px] uppercase tracking-widest text-slate-400">Kondisi saat ini</div>
          <div className="mt-1 font-serif text-2xl text-white">
            {isDay ? "☀️ Indonesia sedang siang" : "🌙 Indonesia sedang malam"}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              { z: "WIB", t: fmt(hour), k: "UTC+7" },
              { z: "WITA", t: fmt(add(hour + 1)), k: "UTC+8" },
              { z: "WIT", t: fmt(add(hour + 2)), k: "UTC+9" },
            ].map((x) => (
              <div key={x.z} className="rounded-xl border border-white/10 bg-white/[0.05] p-2 text-center">
                <div className="text-[10px] tracking-widest text-slate-400">{x.z}</div>
                <div className="font-mono text-lg text-amber-200">{x.t}</div>
                <div className="text-[10px] text-slate-500">{x.k}</div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs leading-relaxed text-slate-300">
            Satu putaran penuh Bumi = 24 jam. Setiap perbedaan 15° bujur menghasilkan selisih waktu 1
            jam. Ke arah timur waktu lebih cepat, ke arah barat lebih lambat.
          </p>
        </Panel>

        <Panel className="p-4">
          <h4 className="mb-2 text-sm font-semibold text-white">Akibat Rotasi Bumi</h4>
          <ol className="space-y-2 text-xs text-slate-300">
            {[
              "Pergantian siang dan malam setiap 24 jam.",
              "Gerak semu harian Matahari (tampak terbit di timur, terbenam di barat).",
              "Perbedaan waktu antarwilayah di Bumi (WIB, WITA, WIT).",
              "Pembelokan arah angin dan arus laut (efek Coriolis).",
              "Perbedaan percepatan gravitasi antara ekuator dan kutub.",
            ].map((s, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-amber-300/20 text-[10px] font-bold text-amber-200">
                  {i + 1}
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </Panel>
      </div>
    </div>
  );
}

/* =========================== REVOLUSI =========================== */
const MONTHS = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

function Revolusi() {
  const [month, setMonth] = useState(6.4);
  const [play, setPlay] = useState(true);
  const [showAxis, setShowAxis] = useState(true);

  const raf = useRef(0);
  useEffect(() => {
    if (!play) return;
    let last = 0;
    const loop = (t: number) => {
      if (!last) last = t;
      const dt = (t - last) / 1000;
      last = t;
      setMonth((m) => (m + dt * 1.6) % 12);
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, [play]);

  const theta = ((month - 2.7) / 12) * 360; // 0° = 21 Maret
  const rad = (theta * Math.PI) / 180;
  const ORB = 150;
  const ex = Math.cos(rad) * ORB;
  const ey = -Math.sin(rad) * ORB;
  const delta = 23.5 * Math.sin(rad);

  const north = delta > 6 ? "Musim Panas" : delta < -6 ? "Musim Dingin" : theta > 0 && theta < 180 ? "Musim Semi" : "Musim Gugur";
  const south = delta > 6 ? "Musim Dingin" : delta < -6 ? "Musim Panas" : theta > 0 && theta < 180 ? "Musim Gugur" : "Musim Semi";
  const indo = delta > 2 ? "Musim Kemarau" : delta < -2 ? "Musim Hujan" : "Peralihan musim";

  const keyDates = [
    { m: 2.7, label: "21 Mar", sub: "Ekuinoks" },
    { m: 5.7, label: "21 Jun", sub: "Solstis" },
    { m: 8.8, label: "23 Sep", sub: "Ekuinoks" },
    { m: 11.7, label: "22 Des", sub: "Solstis" },
  ];

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_330px]">
      <Panel className="p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h4 className="font-serif text-lg text-white">Revolusi Bumi &amp; Pergantian Musim</h4>
          <Btn size="sm" variant="outline" onClick={() => setPlay((p) => !p)}>
            {play ? "⏸ Jeda" : "▶ Putar"}
          </Btn>
        </div>

        <svg viewBox="-230 -210 460 420" className="w-full">
          <defs>
            <radialGradient id="rv-sun" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fffbe8" />
              <stop offset="55%" stopColor="#ffcf5c" />
              <stop offset="100%" stopColor="#ff7d16" />
            </radialGradient>
            <marker id="rv-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
              <path d="M0,0 L9,4.5 L0,9 Z" fill="rgba(255,255,255,0.5)" />
            </marker>
          </defs>

          <circle cx="0" cy="0" r="90" fill="url(#rv-sun)" />
          <circle cx="0" cy="0" r="118" fill="#ff9d2e" opacity="0.14" />
          <text x="0" y="6" textAnchor="middle" style={{ fontSize: 13, fontWeight: 700 }} className="fill-amber-100">
            Matahari
          </text>

          <ellipse cx="0" cy="0" rx={ORB} ry={ORB} fill="none" stroke="rgba(255,255,255,0.15)" strokeDasharray="3 6" />

          {keyDates.map((k) => {
            const t = ((k.m - 2.7) / 12) * Math.PI * 2;
            const x = Math.cos(t) * ORB;
            const y = -Math.sin(t) * ORB;
            return (
              <g key={k.label}>
                <circle cx={x} cy={y} r="4" fill="rgba(252,211,77,0.9)" />
                <text x={x * 1.14} y={y * 1.14 + 4} textAnchor="middle" style={{ fontSize: 10, fontWeight: 700 }} className="fill-amber-200/90">
                  {k.label}
                </text>
                <text x={x * 1.14} y={y * 1.14 + 16} textAnchor="middle" style={{ fontSize: 9 }} className="fill-slate-500">
                  {k.sub}
                </text>
              </g>
            );
          })}

          {/* Bumi pada orbit */}
          <g transform={`translate(${ex},${ey})`}>
            <circle cx="0" cy="0" r="30" fill="none" stroke="rgba(255,255,255,0.25)" strokeDasharray="3 3" />
            <foreignObject x="-26" y="-26" width="52" height="52">
              <div className="grid h-full w-full place-items-center">
                <PlanetSphere spec={EARTH_SPEC} size={52} glow={false} litFrom="none" shadow={0.85} />
              </div>
            </foreignObject>
            {showAxis && (
              <>
                <line x1="-9" y1="28" x2="9" y2="-28" stroke="#fca5a5" strokeWidth="2" />
                <text x="12" y="-26" style={{ fontSize: 9 }} className="fill-rose-300">
                  poros 23,5°
                </text>
              </>
            )}
            {/* belahan gelap (menghadap menjauhi Matahari) */}
            <path
              d="M 0,-30 A 30,30 0 0 0 0,30 Z"
              transform={`rotate(${(Math.atan2(ey, ex) * 180) / Math.PI - 180})`}
              fill="rgba(0,0,0,0.6)"
            />
          </g>
          <text x={ex} y={ey + 46} textAnchor="middle" style={{ fontSize: 12, fontWeight: 700 }} className="fill-sky-200">
            Bumi
          </text>
        </svg>

        <div className="mt-2">
          <Slider
            label="Waktu dalam satu tahun"
            min={0}
            max={12}
            step={0.05}
            value={month}
            display={MONTHS[Math.min(11, Math.floor(month))]}
            onChange={(v) => {
              setPlay(false);
              setMonth(v);
            }}
          />
        </div>
      </Panel>

      <div className="space-y-4">
        <Panel className="p-5" glow>
          <div className="text-[10px] uppercase tracking-widest text-slate-400">
            Deklinasi Matahari
          </div>
          <div className="mt-1 font-mono text-2xl text-amber-200">
            {delta >= 0 ? "+" : ""}
            {delta.toFixed(1)}°
          </div>
          <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
            Posisi tegak Matahari. {delta > 0 ? "Matahari tepat di atas belahan Bumi utara." : delta < 0 ? "Matahari tepat di atas belahan Bumi selatan." : "Matahari tepat di atas garis khatulistiwa (siang = malam)."}
          </p>
          <div className="mt-3 space-y-2">
            {[
              { l: "Belahan Bumi Utara", v: north, tone: "sky" as const },
              { l: "Belahan Bumi Selatan", v: south, tone: "rose" as const },
              { l: "Indonesia (iklim tropis)", v: indo, tone: "emerald" as const },
            ].map((x) => (
              <div key={x.l} className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2">
                <span className="text-[11px] text-slate-400">{x.l}</span>
                <Chip tone={x.tone}>{x.v}</Chip>
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <h4 className="text-sm font-semibold text-white">Akibat Revolusi Bumi</h4>
            <Toggle checked={showAxis} onChange={setShowAxis} label="Poros" />
          </div>
          <ol className="space-y-2 text-xs text-slate-300">
            {[
              "Pergantian musim (4 musim di luar tropis, 2 musim di Indonesia).",
              "Perbedaan lamanya siang dan malam di berbagai lintang.",
              "Perbedaan rupa bintang (rupa langit) tiap musim.",
              "Gerak semu tahunan Matahari.",
              "Terjadinya ekuinoks dan solstis.",
            ].map((s, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-sky-300/20 text-[10px] font-bold text-sky-200">
                  {i + 1}
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
          <p className="mt-3 rounded-lg border border-amber-300/20 bg-amber-300/10 p-2 text-[11px] leading-relaxed text-amber-100">
            Pergantian musim tidak disebabkan oleh jarak Bumi–Matahari, melainkan oleh kemiringan
            poros Bumi 23,5°.
          </p>
        </Panel>
      </div>
    </div>
  );
}

export default function RotasiRevolusi() {
  const [tab, setTab] = useState<"rotasi" | "revolusi">("rotasi");
  return (
    <div className="space-y-5">
      <div className="flex rounded-xl border border-white/10 bg-white/5 p-1 sm:w-fit">
        {([
          { k: "rotasi", l: "🔄 Simulasi Rotasi" },
          { k: "revolusi", l: "🌍 Simulasi Revolusi" },
        ] as const).map((t) => (
          <button
            key={t.k}
            onClick={() => setTab(t.k)}
            className={`flex-1 rounded-lg px-4 py-2 text-xs font-semibold transition sm:flex-none ${
              tab === t.k ? "bg-amber-300 text-slate-950" : "text-slate-300 hover:text-white"
            }`}
          >
            {t.l}
          </button>
        ))}
      </div>
      {tab === "rotasi" ? <Rotasi /> : <Revolusi />}
    </div>
  );
}
