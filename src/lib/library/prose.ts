/**
 * Presentation-only transforms for Library HTML bodies (copy is untouched):
 * - <sup>[1][2]</sup> → links to #src-1, #src-2
 * - tables wrapped in a scroll box; "Source:" lines under tables get a caption style
 * - the "Key findings" blockquote becomes a callout
 * - h2s get ids for deep links
 */
function slugify(text: string) {
  return text
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, 'and')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function enhanceProse(html: string) {
  return html
    .replace(/<sup>((?:\[\d+\])+)<\/sup>/g, (_, keys: string) => {
      const nums = keys.match(/\d+/g) ?? []
      const links = nums
        .map((n) => `<a href="#src-${n}" aria-label="Source ${n}">${n}</a>`)
        .join('<span class="cr-cite-sep">,</span>')
      return `<sup>${links}</sup>`
    })
    .replace(/<table>/g, '<div class="cr-table-wrap" role="region" tabindex="0" aria-label="Table"><table>')
    .replace(/<\/table>/g, '</table></div>')
    .replace(/<p>Source:/g, '<p class="cr-table-source">Source:')
    .replace(/<blockquote>(\s*<p><strong>Key findings<\/strong><\/p>)/, '<blockquote class="cr-callout">$1')
    .replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner: string) => `<h2 id="${slugify(inner)}">${inner}</h2>`)
}
