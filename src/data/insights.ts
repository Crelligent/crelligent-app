import { Article } from './cms';

export const insights: Article[] = [
  {
    title: "What Is an Enterprise Operating Model?",
    slug: "what-is-enterprise-operating-model",
    excerpt: "An operating model bridges the gap between strategy and execution. Discover how to architect your enterprise for scale.",
    body: "<p>Most enterprises have a business model (how they make money) and an organizational chart (who reports to whom). But very few have a designed <strong>operating model</strong>.</p><p>An operating model is the architectural blueprint of execution. It defines exactly how people, processes, technology, and data interact to deliver value.</p><h2>The Symptoms of a Broken Operating Model</h2><p>Without a designed operating model, enterprises rely on founder heroism and endless meetings. Symptoms include duplicated effort, messy handoffs, and data silos.</p><h2>The Crelligent Approach</h2><p>We treat the operating model as the <strong>Scheduler</strong> of the enterprise (Layer 2 of the ESRE OS). By designing clear decision rights and automated workflows, we eliminate structural drag.</p>",
    author: "Crelligent Systems Architecture Team",
    publishedAt: "2026-10-15",
    updatedAt: "2026-10-15",
    category: "Operating Model",
    tags: ["Systems Design", "Scaling", "Execution"],
    relatedCapabilities: ["operating-model", "change-adoption"],
    relatedTemplates: ["operating-model-canvas", "dependency-mapping"],
    relatedResearch: [],
    seo: {
      title: "What Is an Enterprise Operating Model? | Crelligent",
      description: "Learn how to bridge the gap between strategy and execution by designing a scalable enterprise operating model."
    }
  },
  {
    title: "What Is Technology Debt?",
    slug: "what-is-technology-debt",
    excerpt: "When your engineering team spends 80% of their time fixing bugs, you have a structural technology debt crisis.",
    body: "<p>Technology debt (or tech debt) is the implied cost of additional rework caused by choosing an easy, fast solution now instead of using a better approach that would take longer.</p><h2>The Systems Problem</h2><p>In mid-market enterprises, tech debt usually manifests as fragile point-to-point integrations and a monolithic legacy core. This stifles innovation and makes launching new products incredibly slow.</p><h2>Abstracting the Core</h2><p>Rather than a risky rip-and-replace, Crelligent advocates for an event-driven architecture that abstracts legacy systems behind modern APIs, allowing the business to innovate on the edge.</p>",
    author: "Crelligent Technology Team",
    publishedAt: "2026-10-18",
    updatedAt: "2026-10-18",
    category: "Technology",
    tags: ["Tech Debt", "Architecture", "Legacy Modernization"],
    relatedCapabilities: ["technology-platform"],
    relatedTemplates: ["system-architecture-blueprint"],
    relatedResearch: [],
    seo: {
      title: "What Is Technology Debt & How to Fix It | Crelligent",
      description: "Understand the structural causes of technology debt and how event-driven architecture can modernize your enterprise."
    }
  }
];
