import { useMemo, useState } from "react";
import PlanetSphere from "@/components/PlanetSphere";
import { Chip, Panel, SectionTitle } from "@/components/ui";
import { allBodies, bendaLain, bulan, matahari, planets, type CelestialBody } from "@/data/bodies";
import { topics, type Block, type Topic } from "@/data/materi";

/* ----------------------- perender blok materi ----------------------- */
function BlockView({ b }: { b: Block }) {
  switch (b.t) {
    case "p":
      return <p className="text-[13.5px] leading-relaxed text-slate-300">{b.text}</p>;
    case "h":
      return (
        <h4 className="mt-2 flex items-center gap-2 font-serif text-lg text-white">
          <span className="h-4 w-1 rounded-full bg-amber-300" />
          {b.text}
        </h4>
      );
    case "list":
      return (
        <ul className="space-y-1.5">
          {b.items.map((it, i) => (
            <li key={i} className="flex gap-2 text-[13px] leading-relaxed text-slate-300">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300/70" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      );
    case "num":
      return (
        <ol className="space-y-1.5">
          {b.items.map((it, i) => (
            <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-slate-300">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-amber-300/15 text-[11px] font-bold text-amber-200">
                {i + 1}
              </span>
              <span>{it}</span>
            </li>
          ))}
        </ol>
      );
    case "facts":
      return (
        <div className="grid gap-2 sm:grid-cols-3">
          {b.items.map((f) => (
            <div key={f.label} className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-amber-200/80">
                {f.label}
              </div>
              <div className="mt-1 text-[12.5px] leading-relaxed text-slate-300">{f.value}</div>
            </div>
          ))}
        </div>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[520px] text-left text-[12.5px]">
            <thead>
              <tr className="bg-white/[0.07]">
                {b.head.map((h) => (
                  <th key={h} className="px-3 py-2 font-semibold text-amber-100">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r, i) => (
                <tr key={i} className={i % 2 ? "bg-white/[0.02]" : ""}>
                  {r.map((c, j) => (
                    <td key={j} className={`px-3 py-2 align-top ${j === 0 ? "font-medium text-slate-200" : "text-slate-300"}`}>
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "note": {
      const map = {
        info: "border-sky-400/25 bg-sky-500/10 text-sky-100",
        tips: "border-emerald-400/25 bg-emerald-500/10 text-emerald-50",
        warn: "border-rose-400/25 bg-rose-500/10 text-rose-50",
      };
      const icon = { info: "ℹ️", tips: "💡", warn: "⚠️" };
      return (
        <div className={`rounded-xl border p-3 ${map[b.kind]}`}>
          <div className="mb-1 flex items-center gap-2 text-[12.5px] font-semibold">
            <span>{icon[b.kind]}</span>
            {b.title}
          </div>
          <p className="text-[12.5px] leading-relaxed opacity-90">{b.text}</p>
        </div>
      );
    }
  }
}

/* ------------------------- kartu benda langit ------------------------ */
function BodyCard({ b, onClick }: { b: CelestialBody; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left transition hover:-translate-y-0.5 hover:border-amber-300/35 hover:bg-white/[0.07]"
    >
      <div className="flex items-center gap-3">
        <div className="shrink-0">
          <PlanetSphere spec={b.visual} size={62} />
        </div>
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-widest text-amber-300/70">{b.type}</div>
          <div className="truncate font-serif text-lg leading-tight text-white">{b.name}</div>
        </div>
      </div>
      <p className="mt-2 line-clamp-2 text-[11.5px] leading-relaxed text-slate-400">{b.tagline}</p>
      <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-amber-200 opacity-0 transition group-hover:opacity-100">
        Pelajari selengkapnya →
      </div>
    </button>
  );
}

function BodyDetail({ b, onBack }: { b: CelestialBody; onBack: () => void }) {
  return (
    <Panel className="overflow-hidden">
      <div className="relative border-b border-white/10 bg-[radial-gradient(120%_120%_at_20%_0%,rgba(251,191,36,0.14),transparent_60%)] p-6">
        <button onClick={onBack} className="mb-3 text-[11px] font-semibold text-slate-400 hover:text-white">
          ← kembali ke daftar benda langit
        </button>
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <PlanetSphere spec={b.visual} size={130} />
          <div className="min-w-0">
            <div className="text-[11px] uppercase tracking-[0.2em] text-amber-300/80">{b.type}</div>
            <h3 className="font-serif text-3xl leading-tight text-white">{b.name}</h3>
            {b.latin && <div className="text-xs italic text-slate-400">({b.latin})</div>}
            <p className="mt-2 max-w-xl text-sm text-slate-300">{b.tagline}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 p-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <div className="space-y-4">
          <h4 className="flex items-center gap-2 font-serif text-lg text-white">
            <span className="h-4 w-1 rounded-full bg-amber-300" /> Data Penting
          </h4>
          <div className="divide-y divide-white/5 overflow-hidden rounded-xl border border-white/10">
            {b.facts.map((f) => (
              <div key={f.label} className="flex flex-col gap-0.5 px-3 py-2 sm:flex-row sm:gap-3">
                <div className="w-44 shrink-0 text-[11.5px] font-medium text-slate-400">{f.label}</div>
                <div className="text-[12.5px] text-slate-100">{f.value}</div>
              </div>
            ))}
          </div>
          <div>
            <h4 className="mb-2 flex items-center gap-2 font-serif text-lg text-white">
              <span className="h-4 w-1 rounded-full bg-sky-300" /> Fakta Menarik
            </h4>
            <ul className="space-y-1.5">
              {b.highlights.map((h, i) => (
                <li key={i} className="flex gap-2 text-[13px] leading-relaxed text-slate-300">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-sky-300/70" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="space-y-3">
          <h4 className="flex items-center gap-2 font-serif text-lg text-white">
            <span className="h-4 w-1 rounded-full bg-amber-300" /> Penjelasan Materi
          </h4>
          {b.desc.map((p, i) => (
            <p key={i} className="text-[13.5px] leading-relaxed text-slate-300">
              {p}
            </p>
          ))}
        </div>
      </div>
    </Panel>
  );
}

/* ---------------------------- halaman utama ---------------------------- */
export default function Materi() {
  const [tab, setTab] = useState<"benda" | "materi" | "tabel">("benda");
  const [sel, setSel] = useState<CelestialBody | null>(null);
  const [topic, setTopic] = useState<Topic>(topics[0]);
  const [q, setQ] = useState("");

  const bodies = useMemo(() => {
    const list = [matahari, ...planets, bulan, ...bendaLain];
    if (!q.trim()) return list;
    return list.filter((b) => (b.name + b.type + b.tagline).toLowerCase().includes(q.toLowerCase()));
  }, [q]);

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow="Bagian 1"
        title="Materi Pembelajaran IPAS"
        desc="Kumpulan materi lengkap tentang Matahari, delapan planet, Bulan, benda angkasa lainnya, fase Bulan, gerhana, serta rotasi dan revolusi Bumi beserta akibatnya."
      />

      <div className="flex flex-wrap gap-2">
        {([
          { k: "benda", l: "🪐 Benda Langit" },
          { k: "materi", l: "📖 Materi Pokok" },
          { k: "tabel", l: "📊 Tabel Data Planet" },
        ] as const).map((t) => (
          <button
            key={t.k}
            onClick={() => setTab(t.k)}
            className={`rounded-xl border px-4 py-2 text-xs font-semibold transition ${
              tab === t.k
                ? "border-amber-300/50 bg-amber-300/15 text-amber-100"
                : "border-white/10 bg-white/5 text-slate-300 hover:text-white"
            }`}
          >
            {t.l}
          </button>
        ))}
      </div>

      {tab === "benda" &&
        (sel ? (
          <BodyDetail b={sel} onBack={() => setSel(null)} />
        ) : (
          <div className="space-y-5">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari benda langit… (mis. Jupiter, komet, Bulan)"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-amber-300/40 focus:outline-none"
            />
            <div>
              <h4 className="mb-3 font-serif text-lg text-white">Matahari &amp; 8 Planet</h4>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {bodies
                  .filter((b) => b.group === "bintang" || b.group === "planet-dalam" || b.group === "planet-luar")
                  .map((b) => (
                    <BodyCard key={b.id} b={b} onClick={() => setSel(b)} />
                  ))}
              </div>
            </div>
            <div>
              <h4 className="mb-3 font-serif text-lg text-white">Bulan &amp; Benda Angkasa Lainnya</h4>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {bodies
                  .filter((b) => b.group === "satelit" || b.group === "katai" || b.group === "kecil")
                  .map((b) => (
                    <BodyCard key={b.id} b={b} onClick={() => setSel(b)} />
                  ))}
              </div>
            </div>
            {bodies.length === 0 && (
              <Panel className="p-8 text-center text-sm text-slate-400">
                Benda langit dengan nama “{q}” tidak ditemukan. Coba kata lain, misalnya{" "}
                <em>Jupiter</em>, <em>komet</em>, atau <em>Bulan</em>.
              </Panel>
            )}
          </div>
        ))}

      {tab === "materi" && (
        <div className="grid gap-5 lg:grid-cols-[240px_minmax(0,1fr)]">
          <div className="space-y-1.5">
            {topics.map((t) => (
              <button
                key={t.id}
                onClick={() => setTopic(t)}
                className={`flex w-full items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left text-xs font-semibold transition ${
                  topic.id === t.id
                    ? "border-amber-300/45 bg-amber-300/12 text-amber-100"
                    : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25 hover:text-white"
                }`}
              >
                <span className="text-base">{t.icon}</span>
                <span className="min-w-0">
                  <span className="block truncate">{t.short}</span>
                  <span className="block truncate text-[10px] font-normal text-slate-500">{t.blurb}</span>
                </span>
              </button>
            ))}
          </div>

          <Panel className="p-6">
            <div className="mb-5 border-b border-white/10 pb-4">
              <div className="text-[11px] uppercase tracking-[0.2em] text-amber-300/80">
                Materi {topics.findIndex((t) => t.id === topic.id) + 1}
              </div>
              <h3 className="font-serif text-2xl text-white">{topic.title}</h3>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {topic.keywords.map((k) => (
                  <Chip key={k} tone="slate">
                    #{k}
                  </Chip>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {topic.blocks.map((b, i) => (
                <BlockView key={i} b={b} />
              ))}
            </div>
          </Panel>
        </div>
      )}

      {tab === "tabel" && (
        <Panel className="p-5">
          <h4 className="mb-3 font-serif text-lg text-white">Perbandingan Data Planet</h4>
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full min-w-[760px] text-left text-[12.5px]">
              <thead className="bg-white/[0.07]">
                <tr>
                  {["Planet", "Diameter", "Jarak dari Matahari", "Revolusi", "Rotasi", "Suhu", "Satelit"].map((h) => (
                    <th key={h} className="px-3 py-2 font-semibold text-amber-100">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {planets.map((p, i) => {
                  const g = (rx: RegExp) => p.facts.find((f) => rx.test(f.label))?.value ?? "-";
                  return (
                    <tr key={p.id} className={i % 2 ? "bg-white/[0.02]" : ""}>
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-2">
                          <PlanetSphere spec={p.visual} size={26} glow={false} />
                          <span className="font-semibold text-slate-100">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2 text-slate-300">{g(/diameter/i)}</td>
                      <td className="px-3 py-2 text-slate-300">{g(/jarak/i)}</td>
                      <td className="px-3 py-2 text-slate-300">{g(/revolusi/i)}</td>
                      <td className="px-3 py-2 text-slate-300">{g(/rotasi/i)}</td>
                      <td className="px-3 py-2 text-slate-300">{g(/suhu/i)}</td>
                      <td className="px-3 py-2 text-slate-300">{g(/satelit/i)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[11.5px] leading-relaxed text-slate-400">
            Catatan: {allBodies.length} benda langit utama dijelaskan pada tab Benda Langit. Data
            bersifat rata-rata dan dibulatkan agar mudah dipelajari.
          </p>
        </Panel>
      )}
    </div>
  );
}
