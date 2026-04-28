import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Target, LineChart, ListChecks, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Startup Model Planner — Find your first e-commerce business" },
      {
        name: "description",
        content:
          "A friendly planner for first-time e-commerce entrepreneurs. Get a personalized business model recommendation in 2 minutes.",
      },
      { property: "og:title", content: "Startup Model Planner" },
      {
        property: "og:description",
        content: "Find the right e-commerce model for you — dropshipping, affiliate, or subscription.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <main className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-6 sm:py-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-primary shadow-[var(--shadow-soft)]" />
          <span className="font-semibold tracking-tight text-foreground">Model Planner</span>
        </div>
        <Link
          to="/plan"
          className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-[var(--shadow-soft)] transition hover:opacity-90 sm:px-5"
        >
          Start free
        </Link>
      </header>

      {/* HERO */}
      <section className="px-4 sm:px-6">
        <div
          className="mx-auto max-w-6xl rounded-3xl px-5 py-14 sm:px-10 sm:py-20"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-card px-3.5 py-1.5 text-xs font-medium text-secondary-foreground shadow-[var(--shadow-card)]">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Built for first-time entrepreneurs
            </span>
            <h1 className="mt-6 text-[2rem] font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Find the right e-commerce model{" "}
              <span className="text-primary">for who you are.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Answer a few simple questions. We'll match you with the best business model and
              show you exactly what to work on next — like a mentor in your pocket.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/plan"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-base font-medium text-primary-foreground shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:opacity-95 sm:w-auto"
              >
                Start the 2-minute quiz
                <ArrowRight className="h-4 w-4" />
              </Link>
              <span className="text-sm text-muted-foreground">No signup. Free forever.</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-14 sm:gap-5 sm:px-6 sm:py-20 md:grid-cols-3">
        {[
          {
            Icon: Target,
            t: "Smart match",
            d: "Weighted scoring across 7 personal factors finds the model that fits you.",
          },
          {
            Icon: LineChart,
            t: "Honest insights",
            d: "Success score, failure risk, and the skill gaps holding you back.",
          },
          {
            Icon: ListChecks,
            t: "Clear next steps",
            d: "Concrete actions to improve your odds — not generic advice.",
          },
        ].map(({ Icon, t, d }) => (
          <div
            key={t}
            className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
          >
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">{t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>

      {/* MODELS */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
        <div className="rounded-3xl bg-secondary p-8 text-center sm:p-12 md:p-14">
          <h2 className="text-2xl font-semibold tracking-tight text-secondary-foreground sm:text-3xl">
            Three models. One that's right for you.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-secondary-foreground/70">
            We compare these so you don't have to guess.
          </p>
          <div className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
            {["Dropshipping", "Affiliate", "Subscription"].map((m) => (
              <div
                key={m}
                className="rounded-2xl bg-card px-4 py-5 text-sm font-medium text-foreground shadow-[var(--shadow-card)]"
              >
                {m}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        Made with care for new founders.
      </footer>
    </main>
  );
}
