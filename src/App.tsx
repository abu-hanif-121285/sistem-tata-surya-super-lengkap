import { useEffect, useState } from "react";
import Starfield from "@/components/Starfield";
import Home from "@/sections/Home";
import Materi from "@/sections/Materi";
import Simulasi from "@/sections/Simulasi";
import Kuis from "@/sections/Kuis";
import Latihan from "@/sections/Latihan";
import PlanetSphere from "@/components/PlanetSphere";
import { bendaLain, bulan, matahari, planets } from "@/data/bodies";

type View = "beranda" | "materi" | "simulasi" | "kuis" | "latihan";

const NAV: { k: View; l: string; icon: string }[] = [
  { k: "beranda", l: "Beranda", icon: "🏠" },
  { k: "materi", l: "Materi", icon: "📖" },
  { k: "simulasi", l: "Simulasi", icon: "🛰️" },
  { k: "kuis", l: "Kuis", icon: "🎯" },
  { k: "latihan", l: "Latihan", icon: "✏️" },
];

export default function App() {
  const [view, setView] = useState<View>("beranda");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [view]);

  return (
    <div className="min-h-screen text-slate-200">
      <Starfield />

      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#05070f]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="shrink-0">
              <PlanetSphere spec={matahari.visual} size={38} glow />
            </div>
            <div className="min-w-0">
              <div className="truncate font-serif text-[15px] font-semibold leading-tight text-white">
                Jelajah Tata Surya
              </div>
              <div className="truncate text-[10.5px] uppercase tracking-[0.16em] text-amber-300/70">
                IPAS Kelas 6 SD
              </div>
            </div>
          </div>

          <nav className="ml-auto hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <button
                key={n.k}
                onClick={() => setView(n.k)}
                className={`rounded-xl px-3.5 py-2 text-[13px] font-semibold transition ${
                  view === n.k
                    ? "bg-white/10 text-white ring-1 ring-amber-300/30"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="mr-1.5">{n.icon}</span>
                {n.l}
              </button>
            ))}
          </nav>

          <div className="ml-auto hidden items-center gap-1.5 md:ml-3 lg:flex">
            {[planets[2], bulan].map((b, i) => (
              <PlanetSphere key={i} spec={b.visual} size={i === 0 ? 26 : 18} glow={false} />
            ))}
          </div>
        </div>

        {/* nav mobile */}
        <div className="flex gap-1 overflow-x-auto border-t border-white/8 px-3 py-2 md:hidden">
          {NAV.map((n) => (
            <button
              key={n.k}
              onClick={() => setView(n.k)}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-[12px] font-semibold transition ${
                view === n.k
                  ? "bg-amber-300/15 text-amber-100 ring-1 ring-amber-300/30"
                  : "text-slate-400"
              }`}
            >
              <span className="mr-1">{n.icon}</span>
              {n.l}
            </button>
          ))}
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        {view === "beranda" && <Home go={(v) => setView(v)} />}
        {view === "materi" && <Materi />}
        {view === "simulasi" && <Simulasi />}
        {view === "kuis" && <Kuis />}
        {view === "latihan" && <Latihan />}
      </main>

      {/* FOOTER */}
      <footer className="mt-8 border-t border-white/10 bg-black/30">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <div className="flex flex-wrap items-end gap-4">
            {planets.map((p) => (
              <PlanetSphere key={p.id} spec={p.visual} size={Math.max(22, p.simSize * 1.6)} glow={false} />
            ))}
            {bendaLain.slice(0, 3).map((b) => (
              <PlanetSphere key={b.id} spec={b.visual} size={22} glow={false} />
            ))}
          </div>
          <p className="mt-5 max-w-3xl text-[12px] leading-relaxed text-slate-500">
            <span className="font-semibold text-slate-300">Jelajah Tata Surya</span> — media
            pembelajaran IPAS Kelas 6 SD tentang Matahari, Bulan, planet-planet, dan benda angkasa
            lainnya. Materi disusun sesuai capaian pembelajaran IPAS Kurikulum Merdeka. Data
            astronomi menggunakan nilai rata-rata yang dibulatkan untuk keperluan pembelajaran.
          </p>
          <p className="mt-3 text-[11px] text-slate-600">
            © 2026 · Created by <span className="font-semibold text-slate-400">Wiyanto Abu Hanif</span>
            · Dibuat untuk pembelajaran. Selamat belajar, calon astronom!
          </p>
        </div>
      </footer>
    </div>
  );
}
