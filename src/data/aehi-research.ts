/**
 * AEHI research pieces for the Library. Crelligent analysis of PUBLISHED third-party data only
 * (see src/data/aehi/evidence.ts for the figures and sources). They contain no AEHI results:
 * the inaugural AEHI edition is in preparation.
 */
import type { FoundryResearchArticle } from './foundry-research'

const WBES = '<em>Enterprise Surveys: Nigeria 2025 Country Profile</em>, World Bank, 2025. 1,043 firms, fieldwork February to September 2025. <a href="https://www.enterprisesurveys.org/content/dam/enterprisesurveys/documents/country/Nigeria-2025.pdf">enterprisesurveys.org</a>'
const FBS21 = '<em>Nigeria Family Business Survey 2021</em>, PwC Nigeria, 2021. Interviews 5 October to 11 December 2020. <a href="https://www.pwc.com/ng/en/assets/pdf/nigeria-family-business-survey-2021.pdf">pwc.com</a>'
const FBS18 = '<em>2018 Nigeria Family Business Survey</em>, PwC Nigeria, 2018. <a href="https://www.pwc.com/ng/en/publications/2018-nigeria-family-business-survey.html">pwc.com</a>'
const MSME24 = "<em>PwC's 2024 MSME Survey</em>, PwC Nigeria, 2024. 567 MSMEs across 13 sectors and 29 states. <a href=\"https://www.pwc.com/ng/en/press-room/pwc-msme-survey-2024.html\">pwc.com</a>"

const NOTE =
  'These are published third-party figures, not AEHI results. The inaugural AEHI edition, which measures Nigerian mid-market enterprises directly through the ESRE OS diagnostic, is in preparation.'

const base = {
  author: 'Crelligent Research',
  publishedAt: '2026-10-13',
  updatedAt: '2026-10-13',
  foundryFeatured: false,
  relatedCapabilities: [],
  relatedTemplates: [],
  relatedResearch: [],
  sourcesNote: NOTE,
}

export const aehiResearch: FoundryResearchArticle[] = [
  {
    ...base,
    slug: 'nigerian-firms-firefighting-not-managing',
    type: 'whitepaper',
    title: "Firefighting, not managing: what the World Bank's 2025 survey says about how Nigerian firms are run",
    dek: 'Nigerian firms with 20 or more staff react well when something goes wrong. They score far lower on the routines that stop things going wrong: measured targets, achievable goals and consequences for under-performance.',
    excerpt:
      "The World Bank surveyed 1,043 Nigerian firms in 2025. Read through the ESRE OS layers, its management data points to the operating model (L2) and to what leaders can see (L4).",
    readingMinutes: 8,
    category: 'Operating Model',
    tags: ['AEHI', 'L2 Operating Model', 'L4 Data & Intelligence', 'Management practices', 'Nigeria', 'World Bank'],
    seo: {
      title: 'How Nigerian Firms Are Run: World Bank 2025 Data',
      description:
        "The World Bank's 2025 Enterprise Survey of 1,043 Nigerian firms, read through the ESRE OS: strong firefighting, weak targets, and headcount growing faster than sales.",
    },
    body: `<h2>Executive summary</h2>
<p>Between February and September 2025, the World Bank interviewed owners and top managers of 1,043 formal Nigerian firms with five or more employees<sup>[1]</sup>. It is the most recent nationally representative picture of how formal Nigerian firms work.</p>
<p>Most coverage of surveys like this focuses on the obstacles firms name: electricity and finance top the list<sup>[1]</sup>. This paper looks instead at the part of the survey that measures how firms are managed, because that is the part a leadership team controls.</p>
<blockquote>
<p><strong>Key findings</strong></p>
<ul>
<li>On a 0 to 100 management practices index, Nigerian firms with 20 or more workers score 51.5, slightly above the Sub-Saharan Africa average of 48.0<sup>[1]</sup>.</li>
<li>The average hides a split. Firms score 80.6 on taking action when a problem arises, but 41.1 on the number of performance indicators they monitor, 34.8 on whether targets are achievable, and 27.3 on whether under-performers are reassigned or dismissed<sup>[1]</sup>.</li>
<li>Medium firms (20 to 99 staff) grew employment by 9.2% a year while real sales grew 1.4% a year. Large firms grew employment 5.1% a year while real sales fell 1.5% a year<sup>[1]</sup>.</li>
<li>Read through the ESRE OS, these patterns point to the Operating Model (L2) and Data &amp; Intelligence (L4) layers. That is a hypothesis, and the inaugural AEHI edition will test it.</li>
</ul>
</blockquote>

<h2>1. The survey</h2>
<p>The World Bank Enterprise Surveys cover the formal, non-agricultural private sector. In Nigeria's 2025 round, 546 firms were small (5 to 19 employees), 344 medium (20 to 99) and 153 large (100 or more), spread across all six geopolitical zones<sup>[1]</sup>. Firms with fewer than five employees, informal firms and fully state-owned firms are excluded.</p>
<p>The management practices questions are asked only of firms with 20 or more workers<sup>[1]</sup>. That is close to the mid-market the AEHI measures, which makes this the most relevant public data on how Nigerian mid-market firms are run.</p>

<h2>2. Good at reacting, weaker at preventing</h2>
<p>The survey scores eight management practices from 0 to 100, where 100 is the most structured practice<sup>[1]</sup>.</p>
<table>
<thead><tr><th>Practice (firms with 20+ workers)</th><th>Nigeria 2025</th><th>Sub-Saharan Africa</th></tr></thead>
<tbody>
<tr><td>Action taken when a problem arose</td><td>80.6</td><td>76.7</td></tr>
<tr><td>Non-managers promoted on performance</td><td>70.0</td><td>68.6</td></tr>
<tr><td>Time focus of production or service targets</td><td>55.3</td><td>52.3</td></tr>
<tr><td>Basis of managers' performance bonuses</td><td>52.9</td><td>37.3</td></tr>
<tr><td>Staff knowledge of targets</td><td>43.7</td><td>39.4</td></tr>
<tr><td>Number of performance indicators monitored</td><td>41.1</td><td>30.2</td></tr>
<tr><td>Achievability of targets</td><td>34.8</td><td>41.9</td></tr>
<tr><td>Under-performers reassigned or dismissed</td><td>27.3</td><td>27.1</td></tr>
<tr><td><strong>Management practices index</strong></td><td><strong>51.5</strong></td><td><strong>48.0</strong></td></tr>
</tbody>
</table>
<p>Source: World Bank Enterprise Surveys, Nigeria 2025<sup>[1]</sup>.</p>
<p>The highest score is for acting when a problem arises. The lowest scores are for the routines that make problems visible early and stop them recurring: how many indicators are tracked, whether targets can actually be met, and what happens when someone consistently misses them.</p>
<p>In plain terms: firms are good at firefighting. They are less good at running the business so there are fewer fires.</p>

<h2>3. More people, little more output</h2>
<p>The survey also asks firms for their sales and permanent staff numbers now and three years earlier<sup>[1]</sup>.</p>
<table>
<thead><tr><th>Firm size</th><th>Employment growth, % a year</th><th>Real sales growth, % a year</th></tr></thead>
<tbody>
<tr><td>Small (5 to 19)</td><td>8.5</td><td>5.1</td></tr>
<tr><td>Medium (20 to 99)</td><td>9.2</td><td>1.4</td></tr>
<tr><td>Large (100+)</td><td>5.1</td><td>−1.5</td></tr>
<tr><td>Sub-Saharan Africa, all firms</td><td>7.5</td><td>6.7</td></tr>
</tbody>
</table>
<p>Source: World Bank Enterprise Surveys, Nigeria 2025<sup>[1]</sup>.</p>
<p>Real sales are adjusted for inflation, and the three years before the survey included high inflation and a large devaluation of the naira, so part of this gap is the economy. But the pattern is sharpest in exactly the firms that the AEHI covers: medium firms added staff more than six times faster than real sales grew. When headcount grows faster than output, each new hire produces less. That is what happens when a business adds people to work around processes that are not written down, rather than fixing the processes.</p>

<h2>4. Reading the data through the ESRE OS</h2>
<p>The ESRE OS scores an enterprise on five layers: Business Design (L1), Operating Model (L2), Technology (L3), Data &amp; Intelligence (L4) and Governance (L5). The World Bank does not use this model, so the mapping below is Crelligent's reading, not the World Bank's.</p>
<ul>
<li><strong>L2 Operating Model.</strong> Low scores on achievable targets (34.8) and on acting on under-performance (27.3) describe work that is not designed or managed as a system: targets are set but not built around what the process can deliver, and nothing happens when they are missed.</li>
<li><strong>L4 Data &amp; Intelligence.</strong> The score for the number of indicators monitored (41.1) and for staff knowing the targets (43.7) describe leaders and teams working with a partial view of performance. Problems are found when they surface, which fits the high firefighting score.</li>
<li><strong>Productivity.</strong> Headcount growing faster than real sales in medium and large firms is consistent with an operating model that scales by adding people rather than by improving how work flows.</li>
</ul>
<p>This is a hypothesis. It is also the first of the three hypotheses the inaugural AEHI edition will test: that the Operating Model (L2) is the most common primary constraint in Nigerian mid-market enterprises.</p>

<h2>5. What leaders can do now</h2>
<ol>
<li><strong>Count what you track.</strong> List the indicators your leadership team actually reviews each week. If there are fewer than five, or none covers delivery or quality, start there.</li>
<li><strong>Test your targets.</strong> For each team target, ask whether the current process could hit it if everyone did their job well. If not, the target is a wish, and people learn to ignore it.</li>
<li><strong>Write down one core process.</strong> Pick the process that most often needs the CEO or founder to step in. Document who does what, in what order, and who decides.</li>
<li><strong>Check headcount against output.</strong> Compare staff growth with real revenue growth over the last two years. If staff grew faster, find where people are compensating for a process gap.</li>
</ol>

<h2>Take part in the AEHI</h2>
<p>The World Bank data shows the pattern across all formal firms. The AEHI will measure it directly, layer by layer, for Nigerian mid-market enterprises. <a href="/diagnostic">Take the free diagnostic</a> to get your own ESRE OS Performance Score and to be part of the inaugural edition, or <a href="/aehi#research">see the evidence charts</a>.</p>`,
    sources: [WBES],
  },
  {
    ...base,
    slug: 'nigerian-family-business-governance-gap',
    type: 'article',
    title: 'The governance gap in Nigerian family businesses',
    dek: 'Half of Nigerian family businesses have no governance policies at all, more than twice the global share. Most have no documented succession plan. The data is from PwC, and it describes the L5 Governance layer.',
    excerpt:
      "PwC's family business surveys show Nigerian firms behind global peers on governance policies, family constitutions, succession plans and written strategy.",
    readingMinutes: 5,
    category: 'Governance',
    tags: ['AEHI', 'L5 Governance', 'L1 Business Design', 'Family business', 'Succession', 'Nigeria'],
    seo: {
      title: 'The Governance Gap in Nigerian Family Businesses',
      description:
        'Half of Nigerian family businesses have no governance policies, against 21% globally. What PwC data says about succession, strategy and control.',
    },
    body: `<h2>The numbers</h2>
<p>Many of Nigeria's mid-market enterprises are family-owned or founder-led. PwC's Nigeria Family Business Survey, last run with interviews between October and December 2020, compares them with family businesses worldwide<sup>[1]</sup>.</p>
<table>
<thead><tr><th>% of family businesses</th><th>Nigeria</th><th>Global</th></tr></thead>
<tbody>
<tr><td>Have no governance policies</td><td>50%</td><td>21%</td></tr>
<tr><td>Have a family constitution or protocol</td><td>9%</td><td>28%</td></tr>
<tr><td>Have a robust, documented and communicated succession plan</td><td>25%</td><td>30%</td></tr>
<tr><td>Say they have a strong leadership team in place</td><td>56%</td><td>71%</td></tr>
</tbody>
</table>
<p>Source: PwC Nigeria Family Business Survey 2021<sup>[1]</sup>.</p>
<p>The same survey found that just over three-quarters of Nigerian family businesses report a clear sense of values, but only 31% have them documented<sup>[1]</sup>.</p>
<p>PwC's earlier 2018 survey looked at strategy. Only 33% of Nigerian family businesses had a formal mid-term strategic plan, against 49% globally, while 53% expected to change their business model, against 20% globally<sup>[2]</sup>.</p>

<h2>Why this matters</h2>
<p>In the ESRE OS, Governance (L5) is about who can approve what, how exceptions are handled, and who answers when things go wrong. When none of this is written down, decisions travel to the top. The founder or CEO becomes the approval process, and the business can only move as fast as one person can decide.</p>
<p>The strategy figures point to Business Design (L1). Expecting to change the business model without a written plan for the next few years means the change happens by reaction rather than by design.</p>
<p>Succession is where both layers meet. A succession plan that is not documented and communicated is not really a plan: when it is needed, the business has to work out its governance at the worst possible moment.</p>

<h2>What these figures can and cannot say</h2>
<p>The data is from 2020 and covers family businesses, not all mid-market enterprises. PwC does not publish a separate Nigerian sample size in the report. Read it as a strong signal, not a benchmark. The inaugural AEHI edition will measure governance directly, as one of the five layers, across Nigerian mid-market enterprises, and will test our third hypothesis: that exceptions are resolved by going to the top rather than through clear approval limits.</p>

<h2>Three questions for your leadership team</h2>
<ol>
<li>Which decisions can only the founder or CEO make today? Which of them could be delegated with a written limit?</li>
<li>If the CEO were unavailable for three months, who would approve spending above your largest routine payment?</li>
<li>Is your strategy for the next three years written down, and do the people expected to deliver it know what it says?</li>
</ol>
<p><a href="/diagnostic">Take the free diagnostic</a> to see how your enterprise scores on Governance and the other four layers, or <a href="/aehi#research">see the evidence charts</a>.</p>`,
    sources: [FBS21, FBS18],
  },
  {
    ...base,
    slug: 'nigerian-firms-what-they-control',
    type: 'article',
    title: 'Power and finance top every list. The operating model never appears. Why that matters.',
    dek: "Ask Nigerian firms what holds them back and they name electricity and finance. Both are real. But the questions measure the business environment, not the business, so the constraints a leadership team controls never show up.",
    excerpt:
      'The World Bank and PwC both find power and finance at the top of Nigerian firms\' constraints. Those surveys do not ask about the operating model. The AEHI does.',
    readingMinutes: 5,
    category: 'Africa',
    tags: ['AEHI', 'Business environment', 'Electricity', 'Access to finance', 'ESRE OS', 'Nigeria'],
    seo: {
      title: 'What Holds Nigerian Firms Back, and What They Control',
      description:
        'Power and finance top Nigerian firms\' list of obstacles in World Bank and PwC data. Why the operating model never appears, and what the AEHI measures instead.',
    },
    body: `<h2>What firms say</h2>
<p>The World Bank's 2025 Enterprise Survey asked 1,043 Nigerian firms to choose their single biggest obstacle from a list of 15. Electricity came first, chosen by 27.6% of firms, more than twice the Sub-Saharan Africa average of 11.0%. Access to finance came second at 23.2%<sup>[1]</sup>.</p>
<p>The figures behind those answers are stark. Firms experienced 10.9 electrical outages in a typical month, against 6.6 across Sub-Saharan Africa. Three-quarters of investment (75.8%) was financed from the firm's own funds, and just 1.5% by banks<sup>[1]</sup>.</p>
<p>PwC's 2024 survey of 567 MSMEs found the same order: inadequate access to finance was the number one challenge for 35%, unreliable power was a major challenge for 21%, then multiple taxation (12%), skilled labour (11%) and insecurity (10%)<sup>[2]</sup>.</p>

<h2>What the questions leave out</h2>
<p>Both surveys ask about the business environment: power, credit, tax, crime, regulation. None of their lists includes "the way our work is organised" or "decisions that wait for the CEO". Respondents cannot name a constraint that is not on the list.</p>
<p>That does not make the environment unimportant. A firm that loses power ten times a month has a real problem. But two firms facing the same grid and the same banks do not perform the same. The difference between them is how they are run, and that is the part leadership controls.</p>
<p>The World Bank's own management data hints at it. Nigerian firms with 20 or more workers score 80.6 out of 100 on acting when a problem arises, but 27.3 on dealing with under-performance and 34.8 on setting achievable targets<sup>[1]</sup>. Firms that run on firefighting feel every outage and every cash squeeze more sharply, because there is no system absorbing the shock.</p>

<h2>What the AEHI measures instead</h2>
<p>The African Enterprise Health Index does not ask firms to rank obstacles. It scores how each enterprise is run across the five ESRE OS layers, from Business Design to Governance, through the diagnostic. The question changes from "what is in your way?" to "how well does your business work, given what is in its way?"</p>
<p>Our working hypothesis, which the inaugural edition will test, is that the Operating Model (L2) is the most common primary constraint, even for firms that would name power or finance first.</p>
<p><a href="/diagnostic">Take the free diagnostic</a>, answer the five-minute <a href="/aehi#barometer">Executive Barometer</a>, or <a href="/aehi#research">see the evidence charts</a>.</p>`,
    sources: [WBES, MSME24],
  },
]
