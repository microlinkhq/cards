export const getPresetSlug = presetName => presetName.toLowerCase().replace(/[^\w\s]/gi, '').replace(/ /g, '-')

export const getPresetBySlug = (presets, slug) => Object.values(presets).find(({ name }) => getPresetSlug(name) === slug)
