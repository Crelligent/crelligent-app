import { Industry } from './cms';

export const industries: Industry[] = [
  {
    name: "Financial Services",
    slug: "financial-services",
    context: "African financial institutions are scaling rapidly but are bottlenecked by legacy core banking systems and siloed operations.",
    majorProblems: ["Legacy core systems", "Siloed customer data", "Slow product launches", "Regulatory compliance drag"],
    technologyChallenges: ["Integrating modern fintech APIs with legacy SOAs", "Real-time ledger reconciliation"],
    dataOpportunities: ["Predictive credit scoring", "Automated fraud detection at the edge", "Hyper-personalized CX"],
    systemsArchitecture: "Transitioning from monolithic core banking to an event-driven, microservices architecture utilizing the ESRE OS.",
    relatedCapabilities: ["technology-platform", "data-intelligence", "governance"],
    seo: {
      title: "Financial Services Systems Architecture | Crelligent",
      description: "Modernize legacy banking infrastructure. Solve data silos and accelerate product delivery with Crelligent's enterprise systems design."
    }
  },
  {
    name: "Manufacturing",
    slug: "manufacturing",
    context: "Mid-market manufacturers face massive supply chain volatility and operational friction due to disconnected ERP deployments.",
    majorProblems: ["Disconnected ERPs", "Manual supply chain tracking", "Machine downtime", "Inventory blind spots"],
    technologyChallenges: ["OT/IT convergence", "Legacy SCADA system integration"],
    dataOpportunities: ["Predictive maintenance", "Supply chain digital twins", "Automated procurement routing"],
    systemsArchitecture: "Implementing a unified sensing layer across the factory floor and back-office ERP.",
    relatedCapabilities: ["operating-model", "embedded-systems", "economics"],
    seo: {
      title: "Manufacturing Operating Models & IoT | Crelligent",
      description: "Connect factory floor data to enterprise strategy. Eliminate ERP silos in African manufacturing."
    }
  }
];
