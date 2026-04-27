import type { AnswerKey } from "./analyze";

export interface Question {
  key: AnswerKey;
  title: string;
  subtitle: string;
  options: { label: string; value: number }[];
}

export const QUESTIONS: Question[] = [
  {
    key: "budget",
    title: "What's your starting budget?",
    subtitle: "Money you can comfortably risk in the first 3 months.",
    options: [
      { label: "Under $100", value: 1 },
      { label: "$100 – $500", value: 2 },
      { label: "$500 – $2,000", value: 3 },
      { label: "$2,000 – $5,000", value: 4 },
      { label: "$5,000+", value: 5 },
    ],
  },
  {
    key: "time",
    title: "How much time can you commit weekly?",
    subtitle: "Be honest — consistency beats intensity.",
    options: [
      { label: "Under 5 hours", value: 1 },
      { label: "5 – 10 hours", value: 2 },
      { label: "10 – 20 hours", value: 3 },
      { label: "20 – 30 hours", value: 4 },
      { label: "Full-time", value: 5 },
    ],
  },
  {
    key: "techSkill",
    title: "How comfortable are you with tech tools?",
    subtitle: "Setting up websites, plugins, integrations.",
    options: [
      { label: "Total beginner", value: 1 },
      { label: "I can follow tutorials", value: 2 },
      { label: "Comfortable", value: 3 },
      { label: "Pretty skilled", value: 4 },
      { label: "Expert", value: 5 },
    ],
  },
  {
    key: "marketingSkill",
    title: "How are your marketing skills?",
    subtitle: "Ads, social media, growth tactics.",
    options: [
      { label: "Never tried", value: 1 },
      { label: "A little", value: 2 },
      { label: "Some experience", value: 3 },
      { label: "Confident", value: 4 },
      { label: "Very experienced", value: 5 },
    ],
  },
  {
    key: "contentSkill",
    title: "Do you enjoy creating content?",
    subtitle: "Writing, video, photos, social posts.",
    options: [
      { label: "Not at all", value: 1 },
      { label: "Occasionally", value: 2 },
      { label: "Sometimes", value: 3 },
      { label: "Often", value: 4 },
      { label: "I love it", value: 5 },
    ],
  },
  {
    key: "patience",
    title: "How patient are you with slow growth?",
    subtitle: "Some models take months to take off.",
    options: [
      { label: "I want results fast", value: 1 },
      { label: "A few weeks", value: 2 },
      { label: "A few months", value: 3 },
      { label: "Half a year", value: 4 },
      { label: "A year or more", value: 5 },
    ],
  },
  {
    key: "goal",
    title: "What's your main goal?",
    subtitle: "There's no wrong answer.",
    options: [
      { label: "Side income", value: 2 },
      { label: "Replace my salary", value: 3 },
      { label: "Build a real brand", value: 4 },
      { label: "Long-term wealth", value: 5 },
      { label: "Just exploring", value: 1 },
    ],
  },
];
