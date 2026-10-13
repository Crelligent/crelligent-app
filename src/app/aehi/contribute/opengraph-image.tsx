import { ogAlt, ogContentType, ogSize, renderOg } from '@/components/aehi/og/renderOg'

export const alt = ogAlt
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOg('Get your enterprise’s score, and help build the index.')
}
