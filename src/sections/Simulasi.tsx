import { useState } from "react";
import SolarSystem from "@/sims/SolarSystem";
import MoonPhases from "@/sims/MoonPhases";
import Eclipse from "@/sims/Eclipse";
import RotasiRevolusi from "@/sims/RotasiRevolusi";
import { Panel, SectionTitle } from "@/components/ui";

const TABS = [
  { k: "surya", l: "🌞 Tata Surya", d: "Perhatikan peredaran 8 planet mengelilingi Matahari." },
  { k: "fase", l: "🌙 Fase Bulan", d: "Lihat perubahan bentuk Bulan selama 29,5 hari." },
  { k: "gerhana", l: "🌘 Gerhana", d: "Buat gerhana matahari dan gerhana bulan sendiri." },
  { k: "rotasi", l: "🔄 Rotasi & Revolusi", d: "Amati akibat perputaran dan peredaran Bumi." },
] as const;

type Key = (typeof TABS)[number]["k"];

export default function Simulasi() {
  const [tab, setTab] = useState<Key>("surya");
  const cur = TABS.find((t) => t.k === tab)!;

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow="Bagian 2"
        title="Simulasi Interaktif"
        desc="Geser, putar, dan atur kecepatan untuk mengamati sendiri bagaimana tata surya, fase Bulan, gerhana, serta rotasi dan revolusi Bumi bekerja."
      />

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {TABS.map((t) => (
          <button
            key={t.k}
            onClick={() => setTab(t.k)}
            className={`rounded-xl border p-3 text-left transition ${
              tab === t.k
                ? "border-amber-300/50 bg-amber-300/12"
                : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]"
            }`}
          >
            <div className={`text-[13px] font-semibold ${tab === t.k ? "text-amber-100" : "text-slate-200"}`}>
              {t.l}
            </div>
            <div className="mt-0.5 text-[11px] leading-snug text-slate-500">{t.d}</div>
          </button>
        ))}
      </div>

      <Panel className="p-4">
        <div className="flex flex-wrap items-center gap-2 text-[12px] text-slate-400">
          <span className="font-semibold text-amber-200">{cur.l}</span>
          <span>·</span>
          <span>{cur.d}</span>
        </div>
      </Panel>

      {tab === "surya" && <SolarSystem />}
      {tab === "fase" && <MoonPhases />}
      {tab === "gerhana" && <Eclipse />}
      {tab === "rotasi" && <RotasiRevolusi />}
    </div>
  );
}
