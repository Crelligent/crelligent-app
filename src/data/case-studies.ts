import { CaseStudy } from './cms';

export const caseStudies: CaseStudy[] = [
  {
    title: "Project M: Core Banking Transformation",
    slug: "project-m-banking",
    clientContext: "A top-tier Nigerian commercial bank processing 2M+ transactions daily.",
    challenge: "New product launches took 8+ months due to a monolithic legacy core. Customer churn was increasing among millennials.",
    systemDiagnosis: "The L3 Technology layer was tightly coupled to the L2 Scheduler. Every change required rebuilding the entire deployment pipeline.",
    intervention: "Crelligent designed a middleware abstraction layer, decoupling the core from digital channels.",
    architectureDesign: "Event-driven architecture using Kafka, standardizing APIs across 14 independent squads.",
    implementation: "12-month phased rollout. No downtime.",
    results: "Product time-to-market reduced from 8 months to 3 weeks. API latency dropped by 40%.",
    lessons: "Do not attempt to rip-and-replace a legacy core. Abstract it, strangle it, and innovate on the edge.",
    relatedCapabilities: ["technology-platform", "systems-architecture", "change-adoption"],
    seo: {
      title: "Core Banking Transformation Case Study | Crelligent",
      description: "How Crelligent decoupled a monolithic banking core to reduce product time-to-market from 8 months to 3 weeks."
    }
  }
];
