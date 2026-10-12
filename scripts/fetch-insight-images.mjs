/**
 * Downloads the Library cover photos (free Freepik/Magnific stock by DC Studio) and
 * saves web-sized copies to public/images/insights/<slug>.webp.
 * Run once on a machine with internet access:  node scripts/fetch-insight-images.mjs
 * Licence: Freepik free licence — attribution "Image by DC Studio on Freepik" is shown on the site.
 */
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
let sharp = null
try { sharp = (await import('sharp')).default } catch { console.log('sharp not found: saving originals without resizing') }

const PHOTOS = {
  'what-is-enterprise-operating-model': 'manager-giving-instructions-employees_482257-120162.jpg',
  'what-is-technology-debt': 'african-american-it-professional-types-programming-code-dual-monitors_482257-116571.jpg',
  'pmf-blind-spot': 'african-businesswoman-analysing-report-looking-camera-smiling-sitting-conference-desk-brainstorming-entrepreneur-working-professional-start-up-financial-business-ready-meeting_482257-13709.jpg',
  'aehi-q4-2026': 'multiethnic-group-coworkers-analyzing-information-charts-using-paperwork-online-research-digital-tablet-people-planning-business-report-with-data-analysis-ideas_482257-48651.jpg',
  'ceo-corner-issue-1': 'black-man-conducting-group-meeting_482257-123513.jpg',
  'pmf-evidence-gap': 'venture-business-securing-angel-investments-after-innovative-growth-strategy_482257-119352.jpg',
  'seed-to-series-a-africa': 'diverse-team-office-clerks-looking-revenue-figures-documents_482257-123606.jpg',
  'second-product-without-breaking-the-first': 'multi-ethnic-entrepreneurs-stand-up-analyzing-financial-graph-brainstorming-ideas-partnership-project-working-company-presentation-startup-office-executives-managers-having-business-meeting_482257-27819.jpg',
}

const outDir = path.join(process.cwd(), 'public', 'images', 'insights')
await mkdir(outDir, { recursive: true })

for (const [slug, file] of Object.entries(PHOTOS)) {
  const urls = [
    `https://img.freepik.com/free-photo/${file}?w=1600`,
    `https://img.magnific.com/free-photo/${file}?w=1600`,
  ]
  let done = false
  for (const url of urls) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0', Referer: 'https://www.freepik.com/' } })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const buf = Buffer.from(await res.arrayBuffer())
      const out = sharp ? await sharp(buf).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 78 }).toBuffer() : buf
      await writeFile(path.join(outDir, `${slug}.webp`), out)
      console.log(`ok   ${slug}.webp  (${Math.round(out.length / 1024)} KB)`)
      done = true
      break
    } catch (e) {
      console.log(`retry ${slug}: ${e.message}`)
    }
  }
  if (!done) console.log(`FAIL ${slug}: download it manually from freepik.com and save as public/images/insights/${slug}.webp`)
}
