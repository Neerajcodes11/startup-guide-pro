import { createFileRoute, Link } from "@tanstack/react-router";

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
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-primary" />
          <span className="font-semibold tracking-tight text-foreground">Model Planner</span>
        </div>
        <Link
          to="/plan"
          className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow-[var(--shadow-soft)] transition hover:opacity-90"
        >
          Start free
        </Link>
      </header>

      <section
        className="mx-auto max-w-6xl px-6 pb-20 pt-12 md:pt-20"
        style={{ background: "var(--gradient-hero)", borderRadius: "2rem", margin: "0 1.5rem" }}
      >
        <div className="mx-auto max-w-3xl px-2 text-center md:px-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-1.5 text-xs font-medium text-secondary-foreground shadow-[var(--shadow-card)]">
            ✨ Built for first-time entrepreneurs
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            Find the right e-commerce model{" "}
            <span className="text-primary">for who you are.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Answer a few simple questions. We'll match you with the best business model and show
            you exactly what to work on next — like a mentor in your pocket.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/plan"
              className="rounded-full bg-primary px-7 py-3 text-base font-medium text-primary-foreground shadow-[var(--shadow-soft)] transition hover:translate-y-[-1px] hover:opacity-95"
            >
              Start the 2-minute quiz
            </Link>
            <span className="text-sm text-muted-foreground">No signup. Free forever.</span>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-6 py-16 md:grid-cols-3">
        {[
          {
            t: "Smart match",
            d: "Weighted scoring across 7 personal factors finds the model that fits you.",
          },
          {
            t: "Honest insights",
            d: "Success score, failure risk, and the skill gaps holding you back.",
          },
          {
            t: "Clear next steps",
            d: "Concrete actions to improve your odds — not generic advice.",
          },
        ].map((f) => (
          <div
            key={f.t}
            className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
          >
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              ◆
            </div>
            <h3 className="text-lg font-semibold text-foreground">{f.t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.d}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-3xl bg-secondary p-10 text-center md:p-14">
          <h2 className="text-2xl font-semibold text-secondary-foreground md:text-3xl">
            Three models. One that's right for you.
          </h2>
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
