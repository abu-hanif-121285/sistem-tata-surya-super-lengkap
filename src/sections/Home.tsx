import PlanetSphere from "@/components/PlanetSphere";
import { Chip, Panel } from "@/components/ui";
import { bendaLain, bulan, matahari, planets } from "@/data/bodies";
import spaceHero from "@/assets/space-hero.jpg";

export default function Home({ go }: { go: (v: "materi" | "simulasi" | "kuis" | "latihan") => void }) {
  const features = [
    {
      k: "materi" as const,
      icon: "📖",
      title: "Materi",
      desc: "Penjelasan lengkap Matahari, 8 planet, Bulan, asteroid, komet, planet katai, hingga galaksi.",
      tone: "from-amber-400/20",
    },
    {
      k: "simulasi" as const,
      icon: "🛰️",
      title: "Simulasi",
      desc: "4 simulasi interaktif: tata surya, fase bulan, gerhana, serta rotasi & revolusi Bumi.",
      tone: "from-sky-400/20",
    },
    {
      k: "kuis" as const,
      icon: "🎯",
      title: "Kuis",
      desc: "Soal pilihan ganda acak dengan pembahasan otomatis dan skor akhir.",
      tone: "from-rose-400/20",
    },
    {
      k: "latihan" as const,
      icon: "✏️",
      title: "Latihan",
      desc: "Latihan pilihan ganda, benar–salah, isian singkat, dan menjodohkan.",
      tone: "from-emerald-400/20",
    },
  ];

  return (
    <div className="space-y-8">
      {/* HERO */}
      <Panel className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-45"
          style={{ backgroundImage: `url(${spaceHero})` }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,rgba(5,7,15,0.94)_0%,rgba(5,7,15,0.72)_45%,rgba(5,7,15,0.35)_100%)]" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.22),transparent_65%)] blur-2xl" />
        <div className="relative grid items-center gap-8 p-7 sm:p-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div>
            <div className="flex flex-wrap gap-2">
              <Chip tone="amber">IPAS · Kelas 6 SD</Chip>
              <Chip tone="sky">Kurikulum Merdeka</Chip>
            </div>
            <h1 className="mt-4 font-serif text-4xl leading-[1.08] text-white sm:text-5xl">
              Menjelajah{" "}
              <span className="bg-gradient-to-r from-amber-200 via-orange-300 to-rose-300 bg-clip-text text-transparent">
                Tata Surya
              </span>
              <br />
              dan Benda Angkasa
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-[15px]">
              Belajar tentang karakteristik Matahari, delapan planet, Bulan beserta fase-fasenya,
              gerhana matahari dan gerhana bulan, rotasi &amp; revolusi Bumi, serta benda angkasa
              lainnya. Lengkap dengan materi, simulasi interaktif, kuis, dan latihan soal.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <button
                onClick={() => go("materi")}
                className="rounded-xl bg-gradient-to-b from-amber-300 to-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_12px_30px_-12px_rgba(251,191,36,0.75)] transition hover:from-amber-200 active:scale-[0.98]"
              >
                📖 Mulai Belajar
              </button>
              <button
                onClick={() => go("simulasi")}
                className="rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10 active:scale-[0.98]"
              >
                🛰️ Coba Simulasi
              </button>
            </div>
          </div>

          {/* tampilan matahari + bumi + bulan */}
          <div className="relative grid place-items-center">
            <div className="relative h-[240px] w-full max-w-[320px]">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <PlanetSphere spec={matahari.visual} size={150} />
              </div>
              <div className="absolute bottom-2 right-2 animate-[float_6s_ease-in-out_infinite]">
                <PlanetSphere spec={planets[2].visual} size={78} />
              </div>
              <div className="absolute left-2 top-6 animate-[float_7.5s_ease-in-out_infinite]">
                <PlanetSphere spec={planets[5].visual} size={62} />
              </div>
              <div className="absolute bottom-14 left-0 animate-[float_9s_ease-in-out_infinite]">
                <PlanetSphere spec={bulan.visual} size={38} />
              </div>
            </div>
          </div>
        </div>

        <div className="relative grid grid-cols-2 divide-x divide-white/8 border-t border-white/8 sm:grid-cols-4">
          {[
            { v: "8", l: "Planet di Tata Surya" },
            { v: "24 jam", l: "Rotasi Bumi" },
            { v: "365¼ hari", l: "Revolusi Bumi" },
            { v: "29,5 hari", l: "Siklus fase Bulan" },
          ].map((s) => (
            <div key={s.l} className="px-4 py-4 text-center">
              <div className="font-serif text-xl text-amber-200">{s.v}</div>
              <div className="mt-0.5 text-[11px] text-slate-400">{s.l}</div>
            </div>
          ))}
        </div>
      </Panel>

      {/* FITUR */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <button
            key={f.k}
            onClick={() => go(f.k)}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-left transition hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.07]"
          >
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${f.tone} to-transparent opacity-0 transition group-hover:opacity-100`}
            />
            <div className="relative">
              <div className="text-3xl">{f.icon}</div>
              <h3 className="mt-3 font-serif text-xl text-white">{f.title}</h3>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-400">{f.desc}</p>
              <div className="mt-3 text-[12px] font-semibold text-amber-200 opacity-0 transition group-hover:opacity-100">
                Buka →
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* URUTAN PLANET */}
      <Panel className="p-6">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-300/80">
              Peta cepat
            </div>
            <h3 className="font-serif text-2xl text-white">Urutan Planet dari Matahari</h3>
          </div>
          <p className="max-w-md text-[12.5px] leading-relaxed text-slate-400">
            Empat planet terdekat disebut <span className="text-slate-200">planet dalam</span>{" "}
            (batuan), sedangkan empat planet terjauh disebut{" "}
            <span className="text-slate-200">planet luar</span> (raksasa gas dan es). Di antara Mars
            dan Jupiter terbentang sabuk asteroid.
          </p>
        </div>

        <div className="overflow-x-auto pb-2">
          <div className="flex min-w-[720px] items-end gap-3">
            <div className="shrink-0">
              <PlanetSphere spec={matahari.visual} size={104} />
              <div className="mt-2 text-center text-[11px] font-semibold text-amber-200">Matahari</div>
              <div className="text-center text-[10px] text-slate-500">bintang</div>
            </div>
            <div className="mb-10 h-px flex-1 bg-gradient-to-r from-amber-300/40 to-transparent" />
            {planets.map((p) => (
              <div key={p.id} className="flex shrink-0 flex-col items-center">
                <PlanetSphere spec={p.visual} size={Math.max(34, p.simSize * 2.4)} />
                <div className="mt-2 text-[11px] font-semibold text-slate-100">{p.name}</div>
                <div className="text-[10px] text-slate-500">
                  {p.orbit ? `${(p.orbit.a / 114).toFixed(2)} SA` : "-"}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {bendaLain.map((b) => (
            <div key={b.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <div className="flex items-center gap-2">
                <PlanetSphere spec={b.visual} size={28} glow={false} />
                <span className="text-[12.5px] font-semibold text-slate-100">{b.name}</span>
              </div>
              <p className="mt-1.5 line-clamp-2 text-[11.5px] leading-relaxed text-slate-400">
                {b.tagline}
              </p>
            </div>
          ))}
        </div>
      </Panel>

      {/* TUJUAN PEMBELAJARAN */}
      <Panel className="p-6">
        <h3 className="font-serif text-2xl text-white">Tujuan Pembelajaran</h3>
        <p className="mt-1 text-[13px] text-slate-400">
          Setelah mempelajari aplikasi ini, kamu diharapkan mampu:
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            "Mengidentifikasi karakteristik Matahari sebagai bintang dan pusat Tata Surya.",
            "Membedakan ciri-ciri planet dalam dan planet luar beserta data pentingnya.",
            "Menjelaskan urutan terjadinya fase Bulan dan manfaatnya bagi kehidupan.",
            "Membandingkan proses terjadinya gerhana matahari dan gerhana bulan.",
            "Menjelaskan akibat rotasi dan revolusi Bumi bagi kehidupan sehari-hari.",
            "Mengelompokkan benda angkasa lainnya: asteroid, meteoroid, komet, dan planet katai.",
          ].map((t, i) => (
            <div key={i} className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-amber-300/15 text-[11px] font-bold text-amber-200">
                {i + 1}
              </span>
              <span className="text-[13px] leading-relaxed text-slate-300">{t}</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
