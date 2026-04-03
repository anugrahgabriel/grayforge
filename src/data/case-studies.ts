export interface Stat {
  label: string;
  value: string;
}

export interface CaseStudy {
  id: string;
  category: string;
  title: string;
  description: string;
  cardImage: string;
  cardTitle: string;
  cardSubtitle: string;
  cardTag: string;
  mainStat: Stat;
  gridStats: Stat[];
  insights?: {
    title: string;
    description: string;
  };
  callout?: string;
  themeColor?: string;
}

export const CASE_STUDIES: Record<string, CaseStudy> = {
  "zyrotech": {
    id: "zyrotech",
    category: "Meta Ads - Ecommerce",
    title: "4 Campaigns. All at 10x ROAS.",
    description: "An ecommerce brand running Meta ad campaigns with a lean monthly budget. The goal - maximum return on every rupee spent, with no room for underperforming campaigns.",
    cardImage: "/work/zyrotech-card.png",
    cardTitle: "Performance Marketing Strategy",
    cardSubtitle: "Ecommerce & Direct-to-Consumer",
    cardTag: "Strategy",
    mainStat: {
      label: "Average Return on Ad Spend",
      value: "10.11x"
    },
    gridStats: [
      { label: "Aggregate ROAS", value: "10.11x" },
      { label: "Revenue Generated", value: "₹58,196" },
      { label: "Total Ad Spend", value: "₹5,755" }
    ],
    insights: {
      title: "What we did",
      description: "Built and managed four simultaneous Meta ad campaigns for an ecommerce brand on a lean budget. Structured each campaign independently to perform at target ROAS rather than relying on one strong campaign to carry the account. All four campaigns are active and maintaining 10x+ returns."
    },
    callout: "\"Every campaign running at 10x. \nNot an average - a standard.\"",
    themeColor: "#eae9e7ff"
  },
  "subliminal": {
    id: "subliminal",
    category: "Meta Ads · Ecommerce",
    title: "71 Purchases. ₹4,37,345 Revenue.",
    description: "An ecommerce brand looking to drive real purchase volume through Meta. Campaigns built to generate consistent sales, not just traffic.",
    cardImage: "/work/subliminal-card.png",
    cardTitle: "Full-Funnel Paid Social",
    cardSubtitle: "Performance Marketing",
    cardTag: "Strategy",
    mainStat: {
      label: "Revenue Generated",
      value: "₹4,37,345"
    },
    gridStats: [
      { label: "Aggregate ROAS", value: "6.83x" },
      { label: "Revenue Generated", value: "₹4,37,345" },
      { label: "Purchases Driven", value: "71" }
    ],
    insights: {
      title: "What we did",
      description: "Ran multiple Meta campaigns simultaneously for an ecommerce brand, structured around purchase conversion objectives. Scaled the top-performing campaign to ₹35K in spend while maintaining 8.75x ROAS. Across all active campaigns, drove 71 purchases at a 6.83x aggregate return."
    },
    callout: "\"The top campaign alone returned 8.75x on ₹35,000 spent - 50 purchases in a single ad set.\"",
    themeColor: "#eae9e7ff"
  },
  "google-shopping": {
    id: "google-shopping",
    category: "Google Shopping - Ecommerce",
    title: "₹3,41,575 in Revenue. ₹1.14L Spent.",
    description: "An ecommerce brand running Google Shopping campaigns across multiple product categories. The challenge - maintaining profitable ROAS while scaling ad spend significantly.",
    cardImage: "/work/google-shopping-card.png",
    cardTitle: "Search & Shopping Strategy",
    cardSubtitle: "Ecommerce Scaling",
    cardTag: "Growth",
    mainStat: {
      label: "Revenue Generated",
      value: "₹3,41,575"
    },
    gridStats: [
      { label: "ROAS at Peak Scale", value: "3.41x" },
      { label: "Revenue Generated", value: "₹3,41,575" },
      { label: "Total Ad Spend Managed", value: "₹1,14,923" }
    ],
    insights: {
      title: "What we did",
      description: "Structured and managed Google Shopping campaigns across multiple product segments. Scaled the primary campaign to ₹1.17L in spend while maintaining 3.41x ROAS. Continuously tested smaller campaigns to identify top performers, reaching up to 4.58x returns on optimised ad sets."
    },
    callout: "\"Scaled the top-performing campaign to ₹1.17L in spend - without sacrificing returns.\"",
    themeColor: "#DEDCDC"
  }
};
