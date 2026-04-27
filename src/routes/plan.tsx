import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { QUESTIONS } from "@/lib/questions";
import type { Answers } from "@/lib/analyze";

export const Route = createFileRoute("/plan")({
  head: () => ({
    meta: [
      { title: "Your plan — Startup Model Planner" },
      { name: "description", content: "Answer 7 quick questions to get your matched e-commerce business model." },
    ],
  }),
  component: Plan,
});

function Plan() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const q = QUESTIONS[step];
  const progress = ((step + 1) / QUESTIONS.length) * 100;
  const isLast = step === QUESTIONS.length - 1;
  const current = answers[q.key];

  const pick = (value: number) => {
    setAnswers((p) => ({ ...p, [q.key]: value }));
  };

  const next = async () => {
    if (current === undefined) return;
    if (!isLast) {
      setStep((s) => s + 1);
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      sessionStorage.setItem("smp:result", JSON.stringify(data));
      navigate({ to: "/results" });
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-primary" />
          <span className="font-semibold tracking-tight">Model Planner</span>
        </Link>
        <span className="text-xs text-muted-foreground">
          Step {step + 1} of {QUESTIONS.length}
        </span>
      </header>

      <div className="mx-auto max-w-3xl px-6">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div
          key={step}
          className="mt-12 rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-card)] md:p-10"
          style={{ animation: "fadeInUp 0.4s ease both" }}
        >
          <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            {q.title}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">{q.subtitle}</p>

          <div className="mt-8 grid gap-3">
            {q.options.map((o) => {
              const active = current === o.value;
              return (
                <button
                  key={o.label}
                  onClick={() => pick(o.value)}
                  className={`group flex items-center justify-between rounded-2xl border px-5 py-4 text-left transition-all ${
                    active
                      ? "border-primary bg-accent shadow-[var(--shadow-soft)]"
                      : "border-border bg-card hover:border-primary/40 hover:bg-muted/50"
                  }`}
                >
                  <span className="text-sm font-medium text-foreground md:text-base">
                    {o.label}
                  </span>
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition ${
                      active ? "border-primary bg-primary" : "border-border"
                    }`}
                  >
                    {active && <span className="h-2 w-2 rounded-full bg-primary-foreground" />}
                  </span>
                </button>
              );
            })}
          </div>

          {error && <p className="mt-6 text-sm text-destructive">{error}</p>}

          <div className="mt-10 flex items-center justify-between">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="text-sm font-medium text-muted-foreground transition hover:text-foreground disabled:opacity-40"
            >
              ← Back
            </button>
            <button
              onClick={next}
              disabled={current === undefined || submitting}
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-soft)] transition hover:opacity-95 disabled:opacity-40"
            >
              {submitting ? "Analyzing…" : isLast ? "See my plan" : "Continue"}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
