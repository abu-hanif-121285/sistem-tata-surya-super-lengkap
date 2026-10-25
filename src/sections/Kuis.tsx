import { useMemo, useState } from "react";
import { Btn, Chip, Panel, SectionTitle } from "@/components/ui";
import { quizBank, type QuizQ } from "@/data/quiz";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const LETTERS = ["A", "B", "C", "D", "E"];

export default function Kuis() {
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(10);
  const [qs, setQs] = useState<QuizQ[]>([]);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ q: QuizQ; pick: number }[]>([]);
  const [done, setDone] = useState(false);

  const score = useMemo(() => answers.filter((a) => a.pick === a.q.answer).length, [answers]);

  const start = () => {
    const selected = shuffle(quizBank).slice(0, count);
    setQs(selected);
    setIdx(0);
    setAnswers([]);
    setPicked(null);
    setDone(false);
    setStarted(true);
  };

  const pick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    setAnswers((a) => [...a, { q: qs[idx], pick: i }]);
  };

  const next = () => {
    if (idx + 1 >= qs.length) setDone(true);
    else {
      setIdx((i) => i + 1);
      setPicked(null);
    }
  };

  const pct = qs.length ? Math.round((score / qs.length) * 100) : 0;
  const predikat = pct >= 90 ? "Sangat Baik ⭐" : pct >= 75 ? "Baik 👍" : pct >= 60 ? "Cukup 🙂" : "Perlu Belajar Lagi 📚";

  /* ------------------------- layar awal ------------------------- */
  if (!started) {
    return (
      <div className="space-y-6">
        <SectionTitle
          eyebrow="Bagian 3"
          title="Kuis Pilihan Ganda"
          desc="Uji pemahamanmu dengan soal pilihan ganda tentang Matahari, planet, Bulan, gerhana, serta rotasi dan revolusi Bumi. Setiap jawaban langsung diberi pembahasan."
        />
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
          <Panel className="p-6">
            <h3 className="font-serif text-2xl text-white">Siap menguji pengetahuanmu?</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              Terdapat <span className="font-semibold text-amber-200">{quizBank.length} soal</span>{" "}
              dalam bank soal. Soal akan diacak setiap kali kamu memulai kuis. Pilih jumlah soal yang
              ingin kamu kerjakan, lalu tekan tombol Mulai.
            </p>

            <div className="mt-5">
              <div className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                Jumlah soal
              </div>
              <div className="flex flex-wrap gap-2">
                {[5, 10, 15, quizBank.length].map((n) => (
                  <button
                    key={n}
                    onClick={() => setCount(n)}
                    className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                      count === n
                        ? "border-amber-300/50 bg-amber-300/15 text-amber-100"
                        : "border-white/10 bg-white/5 text-slate-300 hover:text-white"
                    }`}
                  >
                    {n === quizBank.length ? "Semua" : n}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {["Matahari", "Planet", "Fase Bulan", "Gerhana", "Rotasi", "Revolusi", "Benda Angkasa"].map((t) => (
                <Chip key={t} tone="slate">
                  {t}
                </Chip>
              ))}
            </div>

            <div className="mt-6">
              <Btn onClick={start}>🚀 Mulai Kuis</Btn>
            </div>
          </Panel>

          <Panel className="p-5">
            <h4 className="mb-2 text-sm font-semibold text-white">Tips mengerjakan</h4>
            <ul className="space-y-2 text-xs leading-relaxed text-slate-300">
              <li>• Baca soal sampai selesai sebelum memilih jawaban.</li>
              <li>• Perhatikan kata kunci seperti <em>tidak</em>, <em>kecuali</em>, dan <em>paling</em>.</li>
              <li>• Setiap soal dilengkapi pembahasan, pelajari agar tidak mengulangi kesalahan.</li>
              <li>• Nilai 75 ke atas dinyatakan tuntas.</li>
            </ul>
          </Panel>
        </div>
      </div>
    );
  }

  /* ------------------------- layar hasil ------------------------- */
  if (done) {
    return (
      <div className="space-y-6">
        <SectionTitle eyebrow="Bagian 3" title="Hasil Kuis" />
        <Panel className="p-6" glow>
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <div className="relative grid h-40 w-40 shrink-0 place-items-center">
              <svg viewBox="0 0 120 120" className="absolute inset-0 -rotate-90">
                <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="12" />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="url(#kq-g)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${(pct / 100) * 327} 327`}
                />
                <defs>
                  <linearGradient id="kq-g" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#fcd34d" />
                    <stop offset="100%" stopColor="#f97316" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="text-center">
                <div className="font-serif text-4xl text-white">{pct}</div>
                <div className="text-[10px] uppercase tracking-widest text-slate-400">nilai</div>
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-serif text-2xl text-white">{predikat}</div>
              <p className="mt-1 text-sm text-slate-300">
                Kamu menjawab benar <span className="font-semibold text-amber-200">{score}</span> dari{" "}
                {qs.length} soal.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Btn onClick={start}>🔁 Ulangi Kuis</Btn>
                <Btn variant="outline" onClick={() => setStarted(false)}>
                  Kembali ke Menu
                </Btn>
              </div>
            </div>
          </div>
        </Panel>

        <Panel className="p-5">
          <h4 className="mb-3 font-serif text-lg text-white">Review Jawaban</h4>
          <div className="space-y-3">
            {answers.map((a, i) => {
              const ok = a.pick === a.q.answer;
              return (
                <div
                  key={i}
                  className={`rounded-xl border p-3 ${ok ? "border-emerald-400/25 bg-emerald-500/[0.07]" : "border-rose-400/25 bg-rose-500/[0.07]"}`}
                >
                  <div className="flex gap-2 text-[13px] font-semibold text-slate-100">
                    <span>{ok ? "✅" : "❌"}</span>
                    <span>
                      {i + 1}. {a.q.q}
                    </span>
                  </div>
                  <div className="mt-1.5 pl-6 text-[12px] text-slate-300">
                    Jawabanmu: <span className={ok ? "text-emerald-200" : "text-rose-200"}>{a.q.options[a.pick]}</span>
                    {!ok && (
                      <>
                        {" "}• Jawaban benar:{" "}
                        <span className="text-emerald-200">{a.q.options[a.q.answer]}</span>
                      </>
                    )}
                  </div>
                  <p className="mt-1 pl-6 text-[12px] leading-relaxed text-slate-400">{a.q.explain}</p>
                </div>
              );
            })}
          </div>
        </Panel>
      </div>
    );
  }

  /* ------------------------- layar soal ------------------------- */
  const q = qs[idx];
  return (
    <div className="space-y-5">
      <SectionTitle eyebrow="Bagian 3" title="Kuis Pilihan Ganda" />
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_260px]">
        <Panel className="p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <Chip tone="amber">{q.topic}</Chip>
            <span className="text-[11px] text-slate-400">
              Soal {idx + 1} dari {qs.length}
            </span>
          </div>
          <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-300 to-orange-400 transition-all duration-500"
              style={{ width: `${((idx + (picked !== null ? 1 : 0)) / qs.length) * 100}%` }}
            />
          </div>

          <h3 className="font-serif text-xl leading-snug text-white">{q.q}</h3>

          <div className="mt-4 space-y-2">
            {q.options.map((opt, i) => {
              const isAnswer = i === q.answer;
              const isPicked = picked === i;
              const show = picked !== null;
              return (
                <button
                  key={i}
                  onClick={() => pick(i)}
                  disabled={show}
                  className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-[13px] transition ${
                    show
                      ? isAnswer
                        ? "border-emerald-400/50 bg-emerald-500/15 text-emerald-50"
                        : isPicked
                          ? "border-rose-400/50 bg-rose-500/15 text-rose-50"
                          : "border-white/10 bg-white/[0.03] text-slate-400"
                      : "border-white/10 bg-white/[0.04] text-slate-200 hover:border-amber-300/40 hover:bg-white/[0.08]"
                  }`}
                >
                  <span
                    className={`grid h-6 w-6 shrink-0 place-items-center rounded-lg text-[11px] font-bold ${
                      show && isAnswer
                        ? "bg-emerald-400 text-slate-900"
                        : show && isPicked
                          ? "bg-rose-400 text-slate-900"
                          : "bg-white/10 text-slate-300"
                    }`}
                  >
                    {LETTERS[i]}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {picked !== null && (
            <div
              className={`mt-4 rounded-xl border p-3 ${
                picked === q.answer
                  ? "border-emerald-400/30 bg-emerald-500/10"
                  : "border-rose-400/30 bg-rose-500/10"
              }`}
            >
              <div className="text-[12.5px] font-semibold text-white">
                {picked === q.answer ? "✅ Jawabanmu benar!" : "❌ Belum tepat"}
              </div>
              <p className="mt-1 text-[12.5px] leading-relaxed text-slate-200">{q.explain}</p>
              <div className="mt-3">
                <Btn onClick={next}>{idx + 1 >= qs.length ? "Lihat Hasil" : "Soal Berikutnya →"}</Btn>
              </div>
            </div>
          )}
        </Panel>

        <div className="space-y-4">
          <Panel className="p-4">
            <div className="text-[10px] uppercase tracking-widest text-slate-400">Skor sementara</div>
            <div className="font-serif text-3xl text-amber-200">{score}</div>
            <div className="mt-3 space-y-1 text-[11px] text-slate-400">
              <div>Terjawab: {answers.length}</div>
              <div>Sisa soal: {qs.length - answers.length}</div>
            </div>
          </Panel>
          <Panel className="p-4">
            <h4 className="mb-2 text-sm font-semibold text-white">Peta soal</h4>
            <div className="grid grid-cols-5 gap-1.5">
              {qs.map((_, i) => {
                const a = answers[i];
                return (
                  <div
                    key={i}
                    className={`grid h-7 place-items-center rounded-lg text-[10px] font-bold ${
                      a
                        ? a.pick === a.q.answer
                          ? "bg-emerald-400/25 text-emerald-100"
                          : "bg-rose-400/25 text-rose-100"
                        : i === idx
                          ? "bg-amber-300 text-slate-900"
                          : "bg-white/8 text-slate-500"
                    }`}
                  >
                    {i + 1}
                  </div>
                );
              })}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
