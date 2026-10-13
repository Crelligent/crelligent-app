import { ogAlt, ogContentType, ogSize, renderOg } from '@/components/aehi/og/renderOg'

export const alt = ogAlt
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOg('How the index is built.')
}
