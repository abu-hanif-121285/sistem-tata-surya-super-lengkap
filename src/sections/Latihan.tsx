import { useMemo, useState } from "react";
import { Btn, Chip, Panel, SectionTitle } from "@/components/ui";
import { exercises, matchingPairs, type Fill, type Mcq, type TF } from "@/data/quiz";

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();

export default function Latihan() {
  const [mcq, setMcq] = useState<Record<string, number>>({});
  const [tf, setTf] = useState<Record<string, boolean>>({});
  const [fill, setFill] = useState<Record<string, string>>({});
  const [match, setMatch] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [reveal, setReveal] = useState(false);

  const pgList = exercises.filter((e) => e.kind === "pg") as Mcq[];
  const bsList = exercises.filter((e) => e.kind === "bs") as TF[];
  const isList = exercises.filter((e) => e.kind === "isian") as Fill[];

  const shuffledRights = useMemo(
    () => [...matchingPairs.map((p) => p.right)].sort((a, b) => a.localeCompare(b)),
    [],
  );

  const results = useMemo(() => {
    const r: Record<string, boolean> = {};
    pgList.forEach((q) => {
      if (mcq[q.q] !== undefined) r[`pg${q.q}`] = mcq[q.q] === q.answer;
    });
    bsList.forEach((q) => {
      if (tf[q.q] !== undefined) r[`bs${q.q}`] = tf[q.q] === q.answer;
    });
    isList.forEach((q) => {
      const v = fill[q.q];
      if (v && v.trim())
        r[`is${q.q}`] = q.accept.some((a) => norm(v).includes(norm(a)) || norm(a).includes(norm(v)));
    });
    matchingPairs.forEach((p, i) => {
      if (match[i]) r[`mt${i}`] = match[i] === p.right;
    });
    return r;
  }, [mcq, tf, fill, match, pgList, bsList, isList]);

  const totalItems = pgList.length + bsList.length + isList.length + matchingPairs.length;
  const answered = Object.keys(results).length;
  const correct = Object.values(results).filter(Boolean).length;

  const resetAll = () => {
    setMcq({});
    setTf({});
    setFill({});
    setMatch({});
    setChecked({});
    setReveal(false);
  };

  const optClass = (selected: boolean, show: boolean, isRight: boolean) =>
    `flex w-full items-start gap-3 rounded-xl border px-3.5 py-2.5 text-left text-[13px] transition ${
      show && isRight
        ? "border-emerald-400/50 bg-emerald-500/15 text-emerald-50"
        : selected && show
          ? "border-rose-400/50 bg-rose-500/15 text-rose-50"
          : selected
            ? "border-amber-300/45 bg-amber-300/12 text-amber-50"
            : "border-white/10 bg-white/[0.04] text-slate-200 hover:border-white/25"
    }`;

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow="Bagian 4"
        title="Latihan Soal"
        desc="Latihan dengan format beragam: pilihan ganda, benar–salah, isian singkat, dan menjodohkan. Kerjakan semampumu, lalu periksa setiap nomor untuk melihat pembahasannya."
      />

      <Panel className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1">
            <div className="mb-1.5 flex items-center justify-between text-[11px] text-slate-400">
              <span>
                Terjawab {answered} dari {totalItems} soal
              </span>
              <span>
                Benar <span className="font-semibold text-emerald-300">{correct}</span>
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-sky-400 transition-all"
                style={{ width: `${(answered / totalItems) * 100}%` }}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Btn size="sm" variant="outline" onClick={() => setReveal((v) => !v)}>
              {reveal ? "🙈 Sembunyikan Kunci" : "🔑 Lihat Kunci"}
            </Btn>
            <Btn size="sm" variant="ghost" onClick={resetAll}>
              ♻️ Reset
            </Btn>
          </div>
        </div>
      </Panel>

      {/* ---------------------- A. PILIHAN GANDA ---------------------- */}
      <Panel className="p-5">
        <div className="mb-4 flex items-center gap-2">
          <Chip tone="amber">Bagian A</Chip>
          <h4 className="font-serif text-lg text-white">Pilihan Ganda</h4>
        </div>
        <div className="space-y-5">
          {pgList.map((q, qi) => {
            const sel = mcq[q.q];
            const show = sel !== undefined || reveal;
            return (
              <div key={q.q} className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
                <div className="mb-2.5 flex gap-2 text-[13.5px] font-medium text-slate-100">
                  <span className="text-amber-300">{qi + 1}.</span>
                  <span>{q.q}</span>
                </div>
                <div className="space-y-1.5">
                  {q.options.map((o, i) => {
                    const isRight = i === q.answer;
                    return (
                      <button
                        key={i}
                        onClick={() => setMcq((m) => ({ ...m, [q.q]: i }))}
                        className={optClass(sel === i, show, isRight)}
                      >
                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-white/10 text-[10px] font-bold">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{o}</span>
                      </button>
                    );
                  })}
                </div>
                {(show || checked[`pg${q.q}`]) && (
                  <p className="mt-2.5 rounded-lg bg-white/[0.05] p-2.5 text-[12px] leading-relaxed text-slate-300">
                    <span className="font-semibold text-amber-200">Pembahasan: </span>
                    {q.explain}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </Panel>

      {/* ---------------------- B. BENAR / SALAH ---------------------- */}
      <Panel className="p-5">
        <div className="mb-4 flex items-center gap-2">
          <Chip tone="sky">Bagian B</Chip>
          <h4 className="font-serif text-lg text-white">Benar atau Salah</h4>
        </div>
        <div className="space-y-3">
          {bsList.map((q, qi) => {
            const sel = tf[q.q];
            const show = sel !== undefined || reveal;
            return (
              <div key={q.q} className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                  <div className="flex flex-1 gap-2 text-[13.5px] text-slate-100">
                    <span className="text-sky-300">{qi + 1}.</span>
                    <span>{q.q}</span>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    {[true, false].map((v) => (
                      <button
                        key={String(v)}
                        onClick={() => setTf((t) => ({ ...t, [q.q]: v }))}
                        className={`rounded-lg border px-4 py-1.5 text-xs font-semibold transition ${
                          sel === v
                            ? show && v === q.answer
                              ? "border-emerald-400/60 bg-emerald-500/20 text-emerald-100"
                              : show
                                ? "border-rose-400/60 bg-rose-500/20 text-rose-100"
                                : "border-amber-300/50 bg-amber-300/15 text-amber-100"
                            : show && v === q.answer
                              ? "border-emerald-400/60 bg-emerald-500/15 text-emerald-100"
                              : "border-white/10 bg-white/5 text-slate-300 hover:border-white/25"
                        }`}
                      >
                        {v ? "✔ Benar" : "✘ Salah"}
                      </button>
                    ))}
                  </div>
                </div>
                {(show || checked[`bs${q.q}`]) && (
                  <p className="mt-2.5 rounded-lg bg-white/[0.05] p-2.5 text-[12px] leading-relaxed text-slate-300">
                    <span className="font-semibold text-amber-200">Pembahasan: </span>
                    {q.explain}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </Panel>

      {/* ------------------------ C. ISIAN ------------------------ */}
      <Panel className="p-5">
        <div className="mb-4 flex items-center gap-2">
          <Chip tone="emerald">Bagian C</Chip>
          <h4 className="font-serif text-lg text-white">Isian Singkat</h4>
        </div>
        <div className="space-y-3">
          {isList.map((q, qi) => {
            const val = fill[q.q] ?? "";
            const show = reveal || checked[`is${q.q}`] || (results[`is${q.q}`] !== undefined && !!val);
            const ok = results[`is${q.q}`];
            return (
              <div key={q.q} className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
                <div className="mb-2.5 flex gap-2 text-[13.5px] text-slate-100">
                  <span className="text-emerald-300">{qi + 1}.</span>
                  <span>{q.q}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <input
                    value={val}
                    onChange={(e) => setFill((f) => ({ ...f, [q.q]: e.target.value }))}
                    placeholder="Tulis jawabanmu…"
                    className="min-w-[200px] flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-emerald-300/40 focus:outline-none"
                  />
                  <Btn
                    size="sm"
                    onClick={() => setChecked((c) => ({ ...c, [`is${q.q}`]: true }))}
                    disabled={!val.trim()}
                  >
                    Periksa
                  </Btn>
                </div>
                {show && (
                  <div className="mt-2.5 flex flex-wrap items-center gap-2">
                    <Chip tone={ok ? "emerald" : "rose"}>{ok ? "✔ Benar" : "✘ Belum tepat"}</Chip>
                    <span className="text-[12px] text-slate-400">
                      Jawaban: <span className="font-semibold text-emerald-200">{q.accept[0]}</span>
                    </span>
                  </div>
                )}
                {show && (
                  <p className="mt-2 rounded-lg bg-white/[0.05] p-2.5 text-[12px] leading-relaxed text-slate-300">
                    {q.explain}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </Panel>

      {/* ---------------------- D. MENJODOHKAN ---------------------- */}
      <Panel className="p-5">
        <div className="mb-4 flex items-center gap-2">
          <Chip tone="violet">Bagian D</Chip>
          <h4 className="font-serif text-lg text-white">Menjodohkan</h4>
        </div>
        <p className="mb-3 text-[12.5px] text-slate-400">
          Pasangkan pernyataan di sebelah kiri dengan jawaban yang tepat di menu sebelah kanan.
        </p>
        <div className="space-y-2">
          {matchingPairs.map((p, i) => {
            const show = reveal || match[i] !== undefined;
            const ok = results[`mt${i}`];
            return (
              <div
                key={p.left}
                className="flex flex-col gap-2 rounded-xl border border-white/8 bg-white/[0.02] p-3 sm:flex-row sm:items-center"
              >
                <div className="flex-1 text-[13px] text-slate-100">
                  <span className="text-violet-300">{i + 1}.</span> {p.left}
                </div>
                <select
                  value={match[i] ?? ""}
                  onChange={(e) => setMatch((m) => ({ ...m, [i]: e.target.value }))}
                  className={`flex-1 rounded-lg border bg-slate-900/70 px-3 py-2 text-[13px] text-white focus:outline-none ${
                    show ? (ok ? "border-emerald-400/50" : "border-rose-400/50") : "border-white/10"
                  }`}
                >
                  <option value="">— pilih pasangan —</option>
                  {shuffledRights.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                {show && <span className="text-[11px]">{ok ? "✅" : `➡️ ${p.right}`}</span>}
              </div>
            );
          })}
        </div>
      </Panel>

      <Panel className="p-5" glow>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-slate-400">Skor latihan</div>
            <div className="font-serif text-3xl text-white">
              {correct}
              <span className="text-base text-slate-400"> / {totalItems}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[11px] uppercase tracking-widest text-slate-400">Persentase</div>
            <div className="font-serif text-3xl text-amber-200">
              {totalItems ? Math.round((correct / totalItems) * 100) : 0}%
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}
