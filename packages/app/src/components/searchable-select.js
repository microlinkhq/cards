import ReactSelect, { components } from 'react-select'
import { Box, Flex, Text } from 'theme-ui'
import { useRef, useMemo } from 'react'
import { lighten } from 'polished'
import Image from 'next/image'

import { theme as themeBase } from '@/theme'

const previews = (() => {
  const { scope, ...presets } = require('./presets')
  return Object.keys(presets).reduce(
    (acc, presetName) => ({
      ...acc,
      [presetName]: require(`../../public/preview/${presetName}.png`).default
    }),
    {}
  )
})()

const Option = ({ innerRef, innerProps, children, value, ...props }) => (
  <components.Option {...props}>
    <Flex
      ref={innerRef}
      sx={{
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
      {...innerProps}
    >
      <Text
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          pr: 3,
          flex: 1
        }}
        title={children}
      >
        {children}
      </Text>
      <Box>
        <Image placeholder='blur' src={previews[value]} width={128} height={72} />
      </Box>
    </Flex>
  </components.Option>
)

const getStyles = ({ bg, color }) => {
  const secondaryColor = lighten(0.1, bg)

  const theme = () => {
    return {
      borderRadius: 4,
      colors: {
        primary: color,
        primary75: secondaryColor,
        primary50: secondaryColor,
        primary25: secondaryColor,
        danger: '#DE350B',
        dangerLight: '#FFBDAD',
        neutral0: bg,
        neutral5: color,
        neutral10: color,
        neutral20: color,
        neutral30: color,
        neutral40: color,
        neutral50: color,
        neutral60: color,
        neutral70: color,
        neutral80: color,
        neutral90: color
      },
      spacing: { baseUnit: 4, controlHeight: 38, menuGutter: 8 }
    }
  }

  const fontStyle = {
    fontFamily: themeBase.fonts.sans,
    fontSize: themeBase.fontSizes[1],
    fontWeight: themeBase.fontWeights.normal
  }

  const styles = {
    singleValue: provided => ({
      ...provided,
      ...fontStyle
    }),
    valueContainer: provided => ({
      ...provided,
      padding: '2px 8px'
    }),
    menu: provided => ({
      ...provided,
      ...fontStyle,
      minWidth: '300px',
      zIndex: 3
    }),
    option: (provided, { isFocused }) => ({
      ...provided,
      cursor: 'pointer',
      background: isFocused ? color : 'inherit',
      color: isFocused ? bg : 'inherit'
    }),
    indicatorSeparator: () => ({ display: 'none' }),
    control: (provided, { isFocused }) => ({
      ...provided,
      opacity: isFocused ? 1 : 0.75,
      cursor: 'pointer',
      boxShadow: 'none'
    })
  }

  return { theme, styles }
}

export const SearchableSelect = ({ bg, color, selectedValue, ...props }) => {
  const selectRef = useRef()

  const { styles, theme } = useMemo(() => getStyles({ bg, color }), [bg, color])

  const value = useMemo(
    () =>
      props.options.find(
        ({ value, label }) =>
          value === selectedValue.value && label === selectedValue.label
      ),
    [selectedValue, props.options]
  )

  const onMenuOpen = () =>
    setTimeout(() => {
      const { focusedOptionRef } = selectRef.current
      if (focusedOptionRef) {
        focusedOptionRef.scrollIntoView({ behavior: 'smooth' })
      }
    }, themeBase.speed.quickly)

  return (
    <ReactSelect
      onMenuOpen={onMenuOpen}
      ref={selectRef}
      components={{ Option }}
      styles={styles}
      theme={theme}
      value={value}
      {...props}
    />
  )
}
