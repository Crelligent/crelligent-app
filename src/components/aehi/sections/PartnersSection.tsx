import { ShieldCheck } from 'lucide-react'
import { EDITION, MIN_GROUP_SIZE } from '@/data/aehi/edition'
import { Band, Eyebrow } from '@/components/aehi/ui/Typography'
import { ButtonLink, TextLink } from '@/components/aehi/ui/Links'
import { InstitutionalInquiry } from '@/components/aehi/forms/InstitutionalInquiry'

const PARTNER_TYPES = [
  {
    n: '01',
    title: 'Research partners',
    who: 'Universities, business schools and research institutes.',
    involves:
      'Review the survey and scoring method, advise on sampling, and co-author analysis where there is a shared research interest.',
    get: 'Access to the anonymised, aggregated dataset for research, with credit as a research partner in each edition you contribute to.',
  },
  {
    n: '02',
    title: 'Networks and associations',
    who: 'Industry associations, chambers of commerce, founder and executive networks.',
    involves: 'Invite your members to take the diagnostic.',
    get: `Every member who takes part gets a private score. Your network gets an aggregate view of its members, provided at least ${MIN_GROUP_SIZE} take part.`,
  },
  {
    n: '03',
    title: 'Investors and lenders',
    who: 'Private equity, venture capital, development finance and banks.',
    involves: 'Invite portfolio companies or borrowers to take the diagnostic.',
    // OWNER CONFIRM: aggregate baseline for investors, and consent-only sharing of individual results
    get: `A baseline of operating health across the group in aggregate (at least ${MIN_GROUP_SIZE} companies), and the published benchmark data as editions appear. Individual company results are shared only with that company’s own consent.`,
  },
]

const PRINCIPLES = [
  'The method is published and the same for everyone.',
  'Partners never see an individual enterprise’s answers or score without that enterprise’s consent.',
  `Results are published only for groups of at least ${MIN_GROUP_SIZE} enterprises.`,
  // OWNER CONFIRM
  'Partners do not approve or change findings before publication.',
]

export function PartnersSection() {
  return (
    <>
      <section id="partners" aria-labelledby="partners-title" className="scroll-mt-20 border-t border-aehi-line bg-aehi-bg pb-16 pt-16 lg:pb-24 lg:pt-24">
        <div className="container-x">
          <div className="lg:max-w-[58%]">
            <Eyebrow>Partners</Eyebrow>
            <h2 id="partners-title" className="t-h1 mt-5">
              Build the index with us.
            </h2>
            <p className="t-lead mt-6">
              The AEHI is in its first edition. We are looking for research partners to review the method, networks that can invite
              their members to take part, and institutions that want to use the data once it is published.
            </p>
            <p className="t-small mt-4 text-aehi-text-subtle">Partners will be listed here once agreements are signed.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              <ButtonLink href="#enquiry" variant="primary" fullWidthOnMobile>
                Send an enquiry
              </ButtonLink>
              <TextLink href="/aehi#methodology">Read the methodology</TextLink>
            </div>
          </div>
        </div>
      </section>

      <Band tone="deep" labelledBy="kinds-title">
        <h2 id="kinds-title" className="t-h2">
          Three kinds of partner.
        </h2>
        <div aria-hidden="true" className="mt-14 hidden grid-cols-12 gap-6 pb-3 lg:grid">
          <span className="t-label col-span-4 col-start-5 text-aehi-text-subtle">What it involves</span>
          <span className="t-label col-span-4 text-aehi-text-subtle">What you get</span>
        </div>
        <ol className="mt-10 lg:mt-0">
          {PARTNER_TYPES.map((p) => (
            <li key={p.n} className="grid grid-cols-1 gap-3 border-t border-aehi-line py-6 lg:grid-cols-12 lg:gap-6 lg:py-8">
              <span className="t-data text-sm text-aehi-text-subtle lg:col-span-1">{p.n}</span>
              <div className="lg:col-span-3">
                <h3 className="t-h3">{p.title}</h3>
                <p className="t-small mt-2 text-aehi-text-muted">{p.who}</p>
              </div>
              <div className="mt-2 lg:col-span-4 lg:mt-0">
                <p className="t-label text-aehi-text-subtle lg:sr-only">What it involves</p>
                <p className="t-body mt-1 lg:mt-0">{p.involves}</p>
              </div>
              <div className="mt-2 lg:col-span-4 lg:mt-0">
                <p className="t-label text-aehi-text-subtle lg:sr-only">What you get</p>
                <p className="t-body mt-1 lg:mt-0">{p.get}</p>
              </div>
            </li>
          ))}
        </ol>
      </Band>

      <Band tone="bg" labelledBy="principles-title">
        <h2 id="principles-title" className="t-h2">
          What stays fixed, whoever we work with.
        </h2>
        <ul className="mt-10 max-w-3xl lg:mt-14">
          {PRINCIPLES.map((p) => (
            <li key={p} className="t-body flex gap-4 border-t border-aehi-line py-5">
              <ShieldCheck className="mt-1 h-4 w-4 flex-none text-aehi-accent" aria-hidden="true" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </Band>

      <Band id="enquiry" tone="deep" labelledBy="enquiry-title">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-4">
            <h2 id="enquiry-title" className="t-h2">
              Start a conversation.
            </h2>
            <p className="t-body mt-4">
              Tell us who you are and how you would like to work with the index. We reply within two working days.
            </p>
            <p className="t-body mt-4">
              Prefer email?{' '}
              <a href={`mailto:${EDITION.contactEmail}`} className="link-inline">
                {EDITION.contactEmail}
              </a>
            </p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <InstitutionalInquiry />
          </div>
        </div>
      </Band>
    </>
  )
}
