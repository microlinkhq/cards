import { useCallback } from 'react'

import { presets } from '@/components'
import { getPresetBySlug, getPresetSlug } from '@/lib'

const presetOptions = Object.values(presets).map(({ name }) => ({
  value: getPresetSlug(name),
  label: name
}))

export default function PresetsContext (onChange) {
  const handlePresetChange = useCallback(
    presetSlug => {
      const newPreset = getPresetBySlug(presets, presetSlug)

      if (onChange) {
        onChange(presetSlug, newPreset)
      }
    },
    [onChange]
  )

  return {
    handlePresetChange,
    presetOptions
  }
}
