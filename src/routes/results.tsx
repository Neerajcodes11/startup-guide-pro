import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { AnalyzeResponse, ModelResult } from "@/lib/analyze";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: "Your matched model — Startup Model Planner" },
      { name: "description", content: "Your personalized e-commerce business model recommendation and next steps." },
    ],
  }),
  component: Results,
});

function Results() {
  const [data, setData] = useState<AnalyzeResponse | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("smp:result");
    if (raw) setData(JSON.parse(raw));
  }, []);

  if (!data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-semibold text-foreground">No results yet</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Take the quick quiz to get your personalized recommendation.
          </p>
          <Link
            to="/plan"
            className="mt-6 inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Start the quiz
          </Link>
        </div>
      </main>
    );
  }

  const { best, others } = data;

  return (
    <main className="min-h-screen bg-background pb-20">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-primary" />
          <span className="font-semibold tracking-tight">Model Planner</span>
        </Link>
        <Link to="/plan" className="text-sm font-medium text-muted-foreground hover:text-foreground">
          Retake quiz
        </Link>
      </header>

      <section className="mx-auto max-w-5xl px-6 pt-6">
        <p className="text-sm font-medium uppercase tracking-wider text-primary">Best model for you</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          {best.name}
        </h1>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground md:text-lg">{best.tagline}</p>
      </section>

      <section className="mx-auto mt-10 grid max-w-5xl gap-5 px-6 md:grid-cols-3">
        <ScoreCard label="Success score" value={best.successScore} suffix="%" tone="success" />
        <ScoreCard label="Failure risk" value={best.failureRisk} suffix="%" tone="warning" />
        <StatCard
          label="Break-even"
          value={`${best.breakEvenMonths} mo`}
          sub={`Profit ~$${best.monthlyProfit.low.toLocaleString()} – $${best.monthlyProfit.high.toLocaleString()}/mo`}
        />
      </section>

      <section className="mx-auto mt-6 grid max-w-5xl gap-5 px-6 md:grid-cols-2">
        <Card title="Why this fits you">
          <p className="text-sm leading-relaxed text-muted-foreground">{best.whyItFits}</p>
        </Card>
        <Card title="What you're missing">
          {best.skillGaps.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No major gaps — you're ready to start. ✨
            </p>
          ) : (
            <ul className="space-y-2">
              {best.skillGaps.map((s) => (
                <li key={s} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                  {s}
                </li>
              ))}
            </ul>
          )}
        </Card>
      </section>

      <section className="mx-auto mt-5 max-w-5xl px-6">
        <Card title="How to improve your chances">
          <ol className="space-y-3">
            {best.howToImprove.map((step, i) => (
              <li key={step} className="flex gap-3 text-sm text-foreground">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
                  {i + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </Card>
      </section>

      <section className="mx-auto mt-12 max-w-5xl px-6">
        <h2 className="text-lg font-semibold text-foreground">Other models compared</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {others.map((m) => (
            <OtherCard key={m.id} m={m} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-5xl px-6 text-center">
        <Link
          to="/plan"
          className="inline-block rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-soft)] transition hover:opacity-95"
        >
          Try different answers
        </Link>
      </section>
    </main>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h3>
      {children}
    </div>
  );
}

function ScoreCard({
  label,
  value,
  suffix,
  tone,
}: {
  label: string;
  value: number;
  suffix?: string;
  tone: "success" | "warning";
}) {
  const color = tone === "success" ? "var(--success)" : "var(--warning)";
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-foreground">
        {value}
        {suffix}
      </p>
      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

function StatCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-foreground">{value}</p>
      <p className="mt-2 text-xs text-muted-foreground">{sub}</p>
    </div>
  );
}

function OtherCard({ m }: { m: ModelResult }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <div className="flex items-baseline justify-between">
        <h3 className="text-lg font-semibold text-foreground">{m.name}</h3>
        <span className="text-sm font-medium text-muted-foreground">{m.successScore}%</span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{m.tagline}</p>
      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary/70"
          style={{ width: `${m.successScore}%` }}
        />
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Break-even ~{m.breakEvenMonths} mo · ${m.monthlyProfit.low.toLocaleString()}–$
        {m.monthlyProfit.high.toLocaleString()}/mo
      </p>
    </div>
  );
}
