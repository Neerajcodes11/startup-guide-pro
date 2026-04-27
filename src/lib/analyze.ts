export type AnswerKey =
  | "budget"
  | "time"
  | "techSkill"
  | "marketingSkill"
  | "contentSkill"
  | "patience"
  | "goal";

export type Answers = Record<AnswerKey, number>; // 1-5 scale

export type ModelId = "dropshipping" | "affiliate" | "subscription";

export interface ModelResult {
  id: ModelId;
  name: string;
  tagline: string;
  successScore: number; // 0-100
  failureRisk: number; // 0-100
  skillGaps: string[];
  monthlyProfit: { low: number; high: number };
  breakEvenMonths: number;
  whyItFits: string;
  howToImprove: string[];
}

export interface AnalyzeResponse {
  best: ModelResult;
  others: ModelResult[];
}

interface ModelDef {
  id: ModelId;
  name: string;
  tagline: string;
  weights: Partial<Record<AnswerKey, number>>; // higher = needed more
  baseProfit: [number, number];
  baseBreakEven: number;
  skillMap: Partial<Record<AnswerKey, string>>;
  whyTemplate: (a: Answers) => string;
  improvements: string[];
}

const MODELS: ModelDef[] = [
  {
    id: "dropshipping",
    name: "Dropshipping",
    tagline: "Sell trending products without holding inventory.",
    weights: { budget: 0.8, marketingSkill: 1.4, time: 1.0, patience: 0.9, techSkill: 0.7 },
    baseProfit: [800, 4500],
    baseBreakEven: 4,
    skillMap: {
      marketingSkill: "Paid ads & funnel basics",
      techSkill: "Setting up a Shopify store",
      budget: "Ad-testing budget ($300+)",
    },
    whyTemplate: (a) =>
      a.marketingSkill >= 3
        ? "You're comfortable with marketing — the #1 lever in dropshipping."
        : "Dropshipping rewards fast iteration; your time commitment helps you test products quickly.",
    improvements: [
      "Learn Facebook & TikTok ads fundamentals",
      "Pick one winning product before scaling",
      "Use Shopify + DSers to launch in a weekend",
    ],
  },
  {
    id: "affiliate",
    name: "Affiliate Marketing",
    tagline: "Earn commissions by recommending products you love.",
    weights: { contentSkill: 1.5, patience: 1.3, time: 1.0, marketingSkill: 0.8, budget: 0.3 },
    baseProfit: [200, 3000],
    baseBreakEven: 6,
    skillMap: {
      contentSkill: "Writing or video content",
      patience: "Sticking with it for 6+ months",
      marketingSkill: "SEO or audience building",
    },
    whyTemplate: (a) =>
      a.budget <= 2
        ? "Low startup cost matches your budget — you can begin today."
        : "Your content skills give you a real edge in building trust with an audience.",
    improvements: [
      "Pick a niche you genuinely care about",
      "Publish weekly for at least 3 months",
      "Join Amazon Associates or Impact to start",
    ],
  },
  {
    id: "subscription",
    name: "Subscription Box",
    tagline: "Recurring revenue from a curated monthly experience.",
    weights: { budget: 1.3, patience: 1.1, contentSkill: 0.8, marketingSkill: 1.0, techSkill: 0.6 },
    baseProfit: [1200, 8000],
    baseBreakEven: 7,
    skillMap: {
      budget: "Inventory & packaging upfront",
      marketingSkill: "Acquiring loyal subscribers",
      patience: "Reducing churn over time",
    },
    whyTemplate: (a) =>
      a.patience >= 4
        ? "Subscriptions reward patience — and yours is high."
        : "A focused niche box can compound into strong recurring revenue.",
    improvements: [
      "Validate with 20 pre-orders before launching",
      "Use Cratejoy or Subbly to skip custom dev",
      "Design unboxing for social shareability",
    ],
  },
];

function score(model: ModelDef, a: Answers): ModelResult {
  let total = 0;
  let max = 0;
  const gaps: string[] = [];
  for (const [k, w] of Object.entries(model.weights) as [AnswerKey, number][]) {
    const v = a[k] ?? 3;
    total += v * w;
    max += 5 * w;
    if (v <= 2 && model.skillMap[k]) gaps.push(model.skillMap[k]!);
  }
  const successScore = Math.round((total / max) * 100);
  const failureRisk = Math.max(5, Math.min(90, 100 - successScore - 5));
  const fit = successScore / 100;
  const [lo, hi] = model.baseProfit;
  return {
    id: model.id,
    name: model.name,
    tagline: model.tagline,
    successScore,
    failureRisk,
    skillGaps: gaps,
    monthlyProfit: {
      low: Math.round(lo * (0.6 + fit * 0.6)),
      high: Math.round(hi * (0.5 + fit * 0.8)),
    },
    breakEvenMonths: Math.max(2, Math.round(model.baseBreakEven * (1.4 - fit))),
    whyItFits: model.whyTemplate(a),
    howToImprove: model.improvements,
  };
}

export function analyze(answers: Answers): AnalyzeResponse {
  const results = MODELS.map((m) => score(m, answers)).sort(
    (a, b) => b.successScore - a.successScore,
  );
  return { best: results[0], others: results.slice(1) };
}
