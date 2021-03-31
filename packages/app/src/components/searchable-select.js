import ReactSelect, { components } from 'react-select'
import { theme as themeBase } from '@/theme'
import { useRef, useMemo } from 'react'
import { lighten } from 'polished'
import { Flex } from 'theme-ui'

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
      {children}
      <img src={`/preview/${value}.png`} style={{ height: 72, width: 128 }} />
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
    [selectedValue]
  )

  const onMenuOpen = () =>
    setTimeout(() => {
      const { focusedOptionRef } = selectRef.current.select
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
