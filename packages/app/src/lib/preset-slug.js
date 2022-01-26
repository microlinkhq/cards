export const getPresetSlug = presetName => presetName.toLowerCase().replaceAll(/[^\w\s]/gi, '').replaceAll(' ', '-')

export const getPresetBySlug = (presets, slug) => Object.values(presets).find(({ name }) => getPresetSlug(name) === slug)
