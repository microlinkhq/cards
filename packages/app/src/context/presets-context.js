import { useCallback } from 'react'

import { presets } from '@/components'

const presetOptions = Object.keys(presets).map(key => ({
  value: key,
  label: presets[key].name
}))

export default function PresetsContext (onChange) {
  const handlePresetChange = useCallback(presetName => {
    const newPreset = presets[presetName]
    if (onChange) {
      onChange(presetName, newPreset)
    }
  }, [])

  return {
    handlePresetChange,
    presetOptions
  }
}
