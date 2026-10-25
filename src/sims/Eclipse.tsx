import { useEffect, useRef, useState } from "react";
import PlanetSphere from "@/components/PlanetSphere";
import { Btn, Chip, Panel, Slider, Toggle } from "@/components/ui";

type Mode = "matahari" | "bulan";
type Tone = "slate" | "amber" | "sky" | "rose" | "emerald" | "violet";
type Status = {
  kind: "total" | "cincin" | "sebagian" | "penumbra" | "tidak";
  label: string;
  color: Tone;
  explain: string;
};

const SUN = { x: -372, y: 0, r: 132 };
const EARTH_R = 30;
const ORBIT = 138;

export default function Eclipse() {
  const [mode, setMode] = useState<Mode>("matahari");
  const [theta, setTheta] = useState(0);
  const [dist, setDist] = useState(0.5); // 0 = perigee (dekat), 1 = apogee (jauh)
  const [play, setPlay] = useState(false);
  const [labels, setLabels] = useState(true);

  const raf = useRef(0);
  useEffect(() => {
    if (!play) return;
    let last = 0;
    const loop = (t: number) => {
      if (!last) last = t;
      const dt = (t - last) / 1000;
      last = t;
      setTheta((v) => (v + dt * 18) % 360);
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, [play]);

  const rad = (theta * Math.PI) / 180;
  const Rm = 11 + (1 - dist) * 5; // bulan tampak lebih besar saat dekat
  const umbraLen = mode === "matahari" ? 104 + (1 - dist) * 76 : 330;

  const moon = { x: -Math.cos(rad) * ORBIT, y: -Math.sin(rad) * ORBIT };
  const ux = moon.x - SUN.x;
  const uy = moon.y - SUN.y;
  const ul = Math.hypot(ux, uy);
  const u = { x: ux / ul, y: uy / ul };
  const tanPen = 0.12;

  const status: Status = (() => {
    if (mode === "matahari") {
      const rel = { x: -moon.x, y: -moon.y };
      const proj = rel.x * u.x + rel.y * u.y;
      const perp = Math.abs(rel.x * u.y - rel.y * u.x);
      if (proj <= 0) return { kind: "tidak", label: "Tidak terjadi gerhana", color: "slate" as const, explain: "Bulan tidak berada di antara Matahari dan Bumi. Posisi ini bukan waktu gerhana matahari." };
      const pw = Rm + proj * tanPen;
      if (proj <= umbraLen) {
        const uw = Rm * (1 - proj / umbraLen);
        if (perp <= uw)
          return { kind: "total", label: "Gerhana Matahari Total", color: "amber" as const, explain: "Ujung umbra (bayangan inti) Bulan tepat menyentuh permukaan Bumi. Matahari tertutup seluruhnya dan korona Matahari dapat terlihat." };
        if (perp <= pw)
          return { kind: "sebagian", label: "Gerhana Matahari Sebagian", color: "sky" as const, explain: "Hanya daerah penumbra (bayangan kabur) yang melewati Bumi, sehingga Matahari tampak tertutup sebagian." };
      } else {
        const aw = Rm * (proj / umbraLen - 1);
        if (perp <= aw)
          return { kind: "cincin", label: "Gerhana Matahari Cincin", color: "rose" as const, explain: "Bulan sedang jauh dari Bumi (apogee) sehingga bayangan intinya tidak mencapai Bumi. Matahari tampak seperti cincin terang di sekeliling Bulan." };
        if (perp <= pw)
          return { kind: "sebagian", label: "Gerhana Matahari Sebagian", color: "sky" as const, explain: "Hanya penumbra yang melewati Bumi sehingga Matahari tampak tertutup sebagian." };
      }
      return { kind: "tidak", label: "Tidak terjadi gerhana", color: "slate" as const, explain: "Bayangan Bulan tidak jatuh di Bumi. Ingat: bidang orbit Bulan miring 5°, sehingga gerhana tidak terjadi setiap bulan." };
    }
    const rel = { x: moon.x, y: moon.y };
    const proj = rel.x * u.x + rel.y * u.y;
    const perp = Math.abs(rel.x * u.y - rel.y * u.x);
    if (proj <= 0) return { kind: "tidak", label: "Tidak terjadi gerhana", color: "slate" as const, explain: "Bulan tidak berada di sisi berlawanan Matahari. Gerhana bulan hanya terjadi saat bulan purnama." };
    const Le = 320;
    if (perp <= EARTH_R * (1 - proj / Le))
      return { kind: "total", label: "Gerhana Bulan Total", color: "rose" as const, explain: "Seluruh Bulan masuk ke dalam umbra (bayangan inti) Bumi. Bulan tampak kemerahan karena cahaya Matahari dibiaskan atmosfer Bumi (Blood Moon)." };
    if (perp <= EARTH_R * (1 - proj / Le) + Rm)
      return { kind: "sebagian", label: "Gerhana Bulan Sebagian", color: "sky" as const, explain: "Hanya sebagian Bulan yang masuk ke dalam umbra Bumi, sehingga tampak seperti tergigit bayangan gelap." };
    if (perp <= EARTH_R * tanPen * 0 + Rm + proj * tanPen)
      return { kind: "penumbra", label: "Gerhana Bulan Penumbra", color: "violet" as const, explain: "Bulan hanya melewati bayangan kabur (penumbra) sehingga perubahannya sangat samar dan sulit diamati." };
    return { kind: "tidak", label: "Tidak terjadi gerhana", color: "slate" as const, explain: "Bulan tidak melewati bayangan Bumi. Posisi ini adalah bulan purnama biasa." };
  })();

  /* ------- tampilan dari Bumi ------- */
  const EarthView = () => {
    if (status.kind === "tidak") {
      return (
        <svg viewBox="0 0 120 120" className="h-full w-full">
          <circle cx="60" cy="60" r="30" fill="#20232b" stroke="#3a3f4b" />
          <text x="60" y="64" textAnchor="middle" style={{ fontSize: 8 }} className="fill-slate-500">
            tidak ada
          </text>
        </svg>
      );
    }
    if (mode === "matahari") {
      const scale = dist === 0 ? 1 : 1 - dist * 0.32;
      const mr = 34 * (mode === "matahari" ? 0.86 + 0.3 * (1 - dist) : 1);
      const rel = { x: -moon.x, y: -moon.y };
      const perp = Math.abs(rel.x * u.y - rel.y * u.x);
      const off = Math.min(46, (perp / 26) * 46) * (rel.y * u.x - rel.x * u.y > 0 ? 1 : -1);
      const offY = Math.min(46, (perp / 26) * 46);
      const oY = status.kind === "total" || status.kind === "cincin" ? 0 : offY * 0.6;
      const oX = status.kind === "total" || status.kind === "cincin" ? 0 : off * 0.35;
      return (
        <svg viewBox="0 0 120 120" className="h-full w-full">
          <defs>
            <radialGradient id="ev-sun" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fffbe8" />
              <stop offset="70%" stopColor="#ffd166" />
              <stop offset="100%" stopColor="#ff8f1f" />
            </radialGradient>
            <radialGradient id="ev-coro" cx="50%" cy="50%" r="50%">
              <stop offset="55%" stopColor="#ffe9b0" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#ffb347" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="60" cy="60" r="58" fill="url(#ev-coro)" opacity={status.kind === "total" ? 1 : 0.35} />
          <circle cx="60" cy="60" r="30" fill="url(#ev-sun)" />
          <circle cx={60 + oX} cy={60 + oY} r={mr * scale} fill="#0a0c12" />
        </svg>
      );
    }
    const rel = { x: moon.x, y: moon.y };
    const perp = Math.abs(rel.x * u.y - rel.y * u.x);
    const proj = rel.x * u.x + rel.y * u.y;
    const off = Math.min(30, (perp / 40) * 40) * (rel.x * u.y - rel.y * u.x > 0 ? 1 : -1);
    const cov = Math.max(0, Math.min(1, 1.6 - (perp / 40) * 1.4)) * (proj > 0 ? 1 : 0);
    return (
      <svg viewBox="0 0 120 120" className="h-full w-full">
        <defs>
          <radialGradient id="ev-moon" cx="40%" cy="35%" r="80%">
            <stop offset="0%" stopColor="#f7f3e8" />
            <stop offset="60%" stopColor="#d8d2c2" />
            <stop offset="100%" stopColor="#a09a8b" />
          </radialGradient>
          <radialGradient id="ev-sh" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#05060a" stopOpacity="0.97" />
            <stop offset="70%" stopColor="#05060a" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#05060a" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="60" cy="60" r="30" fill="url(#ev-moon)" />
        {status.kind === "total" && <circle cx="60" cy="60" r="30" fill="#7a2a12" opacity="0.72" />}
        {cov > 0 && <circle cx={60 + off} cy={60} r={74} fill="url(#ev-sh)" opacity={Math.min(0.97, cov)} />}
      </svg>
    );
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex rounded-xl border border-white/10 bg-white/5 p-1">
          {(["matahari", "bulan"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setTheta(m === "matahari" ? 0 : 180);
                setPlay(false);
              }}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                mode === m ? "bg-amber-300 text-slate-950" : "text-slate-300 hover:text-white"
              }`}
            >
              {m === "matahari" ? "🌘 Gerhana Matahari" : "🌕 Gerhana Bulan"}
            </button>
          ))}
        </div>
        <Chip tone={status.color}>{status.label}</Chip>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_330px]">
        <Panel className="p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h4 className="font-serif text-lg text-white">
              Posisi {mode === "matahari" ? "Matahari – Bulan – Bumi" : "Matahari – Bumi – Bulan"}
            </h4>
            <div className="flex gap-2">
              <Toggle checked={labels} onChange={setLabels} label="Nama bayangan" />
              <Btn size="sm" variant="outline" onClick={() => setPlay((p) => !p)}>
                {play ? "⏸ Jeda" : "▶ Putar"}
              </Btn>
            </div>
          </div>

          <svg viewBox="-320 -210 640 420" className="w-full">
            <defs>
              <radialGradient id="ec-sun" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fff8e0" />
                <stop offset="55%" stopColor="#ffcf5c" />
                <stop offset="100%" stopColor="#ff7d16" />
              </radialGradient>
              <marker id="ec-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
                <path d="M0,0 L9,4.5 L0,9 Z" fill="rgba(255,255,255,0.45)" />
              </marker>
            </defs>

            {/* Matahari */}
            <circle cx={SUN.x} cy={SUN.y} r={SUN.r + 40} fill="#ff9d2e" opacity="0.12" />
            <circle cx={SUN.x} cy={SUN.y} r={SUN.r} fill="url(#ec-sun)" />
            {labels && (
              <text x={SUN.x + 20} y={SUN.r + 34} style={{ fontSize: 15, fontWeight: 700 }} className="fill-amber-200">
                Matahari
              </text>
            )}

            {/* orbit bulan */}
            <circle cx="0" cy="0" r={ORBIT} fill="none" stroke="rgba(255,255,255,0.13)" strokeDasharray="3 6" />
            <line x1="-ORBIT" y1="0" x2={ORBIT} y2="0" stroke="rgba(255,255,255,0.10)" strokeDasharray="4 6" />

            {/* bayangan */}
            {(() => {
              const px = -u.y;
              const py = u.x;
              if (mode === "matahari") {
                const L = umbraLen;
                const tipX = moon.x + u.x * L;
                const tipY = moon.y + u.y * L;
                const aX = moon.x + u.x * (L + 165);
                const aY = moon.y + u.y * (L + 165);
                const pwEnd = Rm + (L + 165) * tanPen;
                const n1x = moon.x - px * Rm;
                const n1y = moon.y - py * Rm;
                const n2x = moon.x + px * Rm;
                const n2y = moon.y + py * Rm;
                return (
                  <g>
                    {/* penumbra */}
                    <polygon
                      points={`${n1x},${n1y} ${aX - px * pwEnd},${aY - py * pwEnd} ${aX + px * pwEnd},${aY + py * pwEnd} ${n2x},${n2y}`}
                      fill="rgba(148,163,184,0.16)"
                      stroke="rgba(203,213,225,0.3)"
                      strokeWidth="0.8"
                    />
                    {/* umbra */}
                    <polygon
                      points={`${n2x},${n2y} ${tipX},${tipY} ${n1x},${n1y}`}
                      fill="rgba(2,6,23,0.88)"
                      stroke="rgba(148,163,184,0.5)"
                      strokeWidth="0.9"
                    />
                    {/* antumbra */}
                    <polygon
                      points={`${tipX},${tipY} ${aX + px * (Rm * 0.9)},${aY + py * (Rm * 0.9)} ${aX - px * (Rm * 0.9)},${aY - py * (Rm * 0.9)}`}
                      fill="rgba(2,6,23,0.6)"
                      stroke="rgba(148,163,184,0.3)"
                      strokeDasharray="3 3"
                      strokeWidth="0.7"
                    />
                    {labels && (
                      <text
                        x={moon.x + u.x * 42 + px * (Rm + 12)}
                        y={moon.y + u.y * 42 + py * (Rm + 12)}
                        style={{ fontSize: 11 }}
                        className="fill-slate-300"
                      >
                        penumbra
                      </text>
                    )}
                  </g>
                );
              }
              const L = 330;
              const ex = u.x;
              const ey = u.y;
              const pwEnd = EARTH_R + L * tanPen;
              return (
                <g>
                  {/* penumbra Bumi */}
                  <polygon
                    points={`${moon.x * 0 + -px * EARTH_R},${-py * EARTH_R} ${ex * L - px * pwEnd},${ey * L - py * pwEnd} ${ex * L + px * pwEnd},${ey * L + py * pwEnd} ${px * EARTH_R},${py * EARTH_R}`}
                    fill="rgba(148,163,184,0.14)"
                    stroke="rgba(203,213,225,0.28)"
                    strokeWidth="0.8"
                  />
                  {/* umbra Bumi */}
                  <polygon
                    points={`${px * EARTH_R},${py * EARTH_R} ${ex * L + px * (EARTH_R * 0.5)},${ey * L + py * (EARTH_R * 0.5)} ${ex * L - px * (EARTH_R * 0.5)},${ey * L - py * (EARTH_R * 0.5)} ${-px * EARTH_R},${-py * EARTH_R}`}
                    fill="rgba(2,6,23,0.82)"
                    stroke="rgba(148,163,184,0.45)"
                    strokeWidth="0.9"
                  />
                  <text
                    x={ex * L * 0.6}
                    y={ey * L * 0.6 - 10}
                    style={{ fontSize: 11 }}
                    className="fill-slate-400"
                    textAnchor="middle"
                  >
                    bayangan Bumi
                  </text>
                </g>
              );
            })()}

            {/* Bumi */}
            <foreignObject x={-EARTH_R} y={-EARTH_R} width={EARTH_R * 2} height={EARTH_R * 2}>
              <div className="grid h-full w-full place-items-center">
                <PlanetSphere
                  spec={{ kind: "earth", colors: ["#8fd3ff", "#2b7fd4", "#12488f", "#0a2a5e"], freq: 0.02, glow: "#7fc4ff", cap: true }}
                  size={EARTH_R * 2}
                  glow={false}
                />
              </div>
            </foreignObject>
            {labels && (
              <text x="0" y={EARTH_R + 22} textAnchor="middle" style={{ fontSize: 14, fontWeight: 700 }} className="fill-sky-200">
                Bumi
              </text>
            )}

            {/* Bulan */}
            <g transform={`translate(${moon.x},${moon.y})`}>
              <circle cx="0" cy="0" r={Rm} fill="#e8e3d6" />
              <circle cx="0" cy="0" r={Rm} fill="#10131a" opacity="0.45" />
              <circle cx="0" cy="0" r={Rm + 1} fill="none" stroke="#8b8f9a" strokeWidth="0.8" />
              {labels && (
                <text x="0" y={Rm + 16} textAnchor="middle" style={{ fontSize: 12, fontWeight: 700 }} className="fill-slate-200">
                  Bulan
                </text>
              )}
            </g>

            {labels && mode === "matahari" && (
              <g style={{ fontSize: 11 }} className="fill-slate-300">
                <text x={moon.x + u.x * umbraLen * 0.5 + 12} y={moon.y + u.y * umbraLen * 0.5}>
                  umbra
                </text>
                <text x={moon.x + u.x * (umbraLen + 90) + 12} y={moon.y + u.y * (umbraLen + 90)}>
                  antumbra
                </text>
              </g>
            )}
          </svg>

          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            <Slider
              label="Posisi Bulan pada orbit"
              min={0}
              max={360}
              step={1}
              value={theta}
              display={`${theta.toFixed(0)}°`}
              onChange={(v) => {
                setPlay(false);
                setTheta(v);
              }}
            />
            <Slider
              label="Jarak Bulan dari Bumi"
              min={0}
              max={1}
              step={0.01}
              value={dist}
              display={dist < 0.34 ? "perigee (dekat)" : dist > 0.66 ? "apogee (jauh)" : "rata-rata"}
              onChange={(v) => {
                setPlay(false);
                setDist(v);
              }}
            />
          </div>
        </Panel>

        <div className="space-y-4">
          <Panel className="p-5" glow>
            <div className="text-[10px] uppercase tracking-widest text-slate-400">
              Tampilan dari Bumi {mode === "matahari" ? "(siang hari)" : "(malam hari)"}
            </div>
            <div className="mx-auto mt-3 aspect-square w-full max-w-[210px] rounded-2xl border border-white/10 bg-black/50 p-2">
              <EarthView />
            </div>
            <div className={`mt-3 text-center font-serif text-xl ${status.kind === "tidak" ? "text-slate-400" : "text-amber-200"}`}>
              {status.label}
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">{status.explain}</p>
          </Panel>

          <Panel className="p-4">
            <h4 className="mb-2 text-sm font-semibold text-white">Coba percobaan ini</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <span className="text-amber-200">①</span> Gerhana matahari: geser posisi Bulan ke 0°
                dan jarak Bulan ke perigee.
              </li>
              <li>
                <span className="text-amber-200">②</span> Ubah jarak Bulan ke apogee, lihat gerhana
                berubah menjadi gerhana cincin.
              </li>
              <li>
                <span className="text-amber-200">③</span> Geser Bulan sedikit dari garis lurus untuk
                mendapatkan gerhana sebagian.
              </li>
              <li>
                <span className="text-amber-200">④</span> Pindah ke tab Gerhana Bulan, posisi 180°
                (bulan purnama) menghasilkan gerhana bulan total.
              </li>
            </ul>
            <p className="mt-3 rounded-lg border border-rose-400/20 bg-rose-500/10 p-2 text-[11px] leading-relaxed text-rose-100">
              ⚠️ Gerhana matahari tidak boleh dilihat langsung tanpa pelindung mata khusus.
            </p>
          </Panel>
        </div>
      </div>
    </div>
  );
}
