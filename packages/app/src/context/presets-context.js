import { useCallback } from 'react'

import * as presets from '@/components/presets'

const presetOptions = Object.keys(presets).map((key) => ({
  value: key,
  label: presets[key].name
}))

const presetsContext = (onChange) => {
  const handlePresetChange = useCallback((presetName) => {
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

export default presetsContext
