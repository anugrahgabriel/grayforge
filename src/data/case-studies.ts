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
  campaignData?: {
    headers: string[];
    rows: string[][];
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
    campaignData: {
      headers: ["Amount spent", "Ends", "Purchase ROAS (return on ad spend)", "Website purchase ROAS (return on ad...)", "Mobile app purchase ROAS (return on ad...)", "Purchases conversion value"],
      rows: [
        ["₹1,219.00", "Ongoing", "10.12", "10.12", "—", "₹12,333.00"],
        ["₹659.00", "Ongoing", "10.11", "10.11", "—", "₹6,662.10"],
        ["₹932.00", "Ongoing", "10.11", "10.11", "—", "₹9,427.20"],
        ["₹2,945.00", "Ongoing", "10.11", "10.11", "—", "₹29,774.10"],
        ["₹5,755.00\nTotal spent", "—", "10.11\nAverage", "10.11\nAverage", "—", "₹58,196.40\nTotal"],
      ]
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
    campaignData: {
      headers: ["Amount spent", "Purchase ROAS (return on ad spend)", "Purchases conversion value", "Results", "Cost per result"],
      rows: [
        ["₹1,700.00", "—", "₹0.00", "0 Website Purchase", "₹141.67 Per Purchase"],
        ["₹18,000.00", "5.20", "₹93,600.00", "15 Website Purchase(s)", "₹1,200.00 Per Purchase"],
        ["₹35,000.00", "8.75", "₹306,250.00", "50 Website Purchase(s)", "₹700.00 Per Purchase"],
        ["₹4,200.00", "3.10", "₹13,020.00", "2 Website Purchase(s)", "₹2,100.00 Per Purchase"],
        ["₹5,500.00", "4.45", "₹24,475.00", "4 Website Purchase(s)", "₹1,375.00 Per Purchase"],
        ["₹64,400.00\nTotal spent", "6.83\nAverage", "₹437,345.00\nTotal", "71\nWebsite Purchase(s)", "₹907.04\nPer Purchase"],
      ]
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
    campaignData: {
      headers: ["Amount of money spent", "End Date", "Return on Advertising Spend (ROAS)", "Return on Advertising Spend (ROAS)", "Return on Advertising Spend (ROAS)", "Shopping conversion value"],
      rows: [
        ["₹2.10", "long", "—", "—", "—", "₹0.00"],
        ["₹2,623.63", "long", "1.25", "0.89", "—", "₹8,534.52"],
        ["₹6,234.45", "long", "2.26", "0.89", "—", "₹14,067.25"],
        ["₹6,367.21", "long", "3.03", "3.00", "—", "₹19,305.36"],
        ["₹117,267.32", "long", "3.41", "3.36", "—", "₹399,300.60"],
        ["₹846.98", "long", "2.10", "2.05", "—", "₹1,777.48"],
        ["₹667.09", "long", "4.58", "4.50", "—", "₹3,055.78"],
        ["₹754.24", "long", "2.20", "2.15", "—", "₹1,657.68"],
        ["₹21,298.49", "long", "1.82", "1.57", "—", "₹38,860.85"],
        ["₹114,923.81\nTotal cost", "—", "—", "0.89\nAverage value", "—", "₹341,575.43\nTotal"],
      ]
    },
    callout: "\"Scaled the top-performing campaign to ₹1.17L in spend - without sacrificing returns.\"",
    themeColor: "#DEDCDC"
  }
};
