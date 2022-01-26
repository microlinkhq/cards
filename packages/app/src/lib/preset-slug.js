import { FALLBACK_SLUGS } from '@/constants'

export const getPresetSlug = presetName => presetName.toLowerCase().replace(/[^\w\s]/gi, '').replace(/ /g, '-')

const findPreset = (presets, slug) => Object.values(presets).find(({ name }) => getPresetSlug(name) === slug)

export const getPresetBySlug = (presets, slug) => {
  const preset = findPreset(presets, slug)

  return preset || findPreset(presets, FALLBACK_SLUGS[slug])
}
