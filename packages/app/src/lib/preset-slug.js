export const getPresetSlug = presetName => encodeURIComponent(presetName.toLowerCase().replace(/ /g, '-'))

export const getPresetBySlug = (presets, slug) => Object.values(presets).find(({ name }) => getPresetSlug(name) === slug)
