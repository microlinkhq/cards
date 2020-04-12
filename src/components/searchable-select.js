import SearchableSelect from 'react-select'
import * as polished from 'polished'
import themeBase from '@/theme'

export default ({ bg, color, ...props }) => {
  const secondaryColor = polished.lighten(0.1, bg)
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

  const styles = {
    singleValue: (provided, { isFocused }) => ({
      ...provided,
      fontFamily: themeBase.fonts.sans,
      fontSize: themeBase.fontSizes[2]
    }),
    indicatorSeparator: () => ({ display: 'none' }),
    control: (provided, { isFocused }) => {
      return { ...provided, opacity: isFocused ? 1 : 0.6, boxShadow: 'none' } // isFocused && `0 0 0 1px ${color}` }
    }
  }

  return <SearchableSelect styles={styles} theme={theme} {...props} />
}
