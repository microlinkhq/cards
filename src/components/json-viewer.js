import dynamic from 'next/dynamic'
import styled from 'styled-components'
import * as polished from 'polished'

const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false })

const ThemeWrapper = styled.div`
  div.key-modal-request > div > span {
    background: transparent !important;
  }

  textarea,
  input {
    border-radius: 4px;
    outline: 0;
    background: transparent !important;
    border: 1px solid ${props => props.color} !important;
    color: ${props => props.color} !important;
  }
  .key-modal-submit {
    position: relative;
    right: 4px;
  }
  .key-modal-submit svg {
    color: ${props => props.addColor} !important;
  }

  .click-to-add-icon {
    position: relative;
    top: 6px;
  }

  .click-to-edit,
  .click-to-remove {
    position: relative;
    top: 4px;
  }

  .click-to-add-icon svg {
    color: ${props => props.plusColor} !important;
  }

  .edit-check svg {
    color: ${props => props.editColor} !important;
  }

  .edit-cancel svg,
  .click-to-remove svg {
    color: ${props => props.removeColor} !important;
  }
`

export default ({ onChange, children, theme, ...props }) => {
  const stringColor = theme.styles.find(item => item.types.includes('string'))
    .style.color
  const secondaryColor = polished.lighten(0.1, theme.plain.backgroundColor)
  const terciaryColor = polished.rgba(theme.plain.color, 0.6)
  const removeColor = theme.styles.find(item => item.types.includes('tag'))
    .style.color
  const editColor = theme.styles.find(item => item.types.includes('operator'))
  const plusColor = theme.styles.find(item => item.types.includes('attr-name'))
    .style.color

  return (
    <ThemeWrapper
      plusColor={plusColor}
      editColor={editColor}
      removeColor={removeColor}
      stringColor={stringColor}
      color={theme.plain.color}
    >
      <DynamicReactJson
        displayDataTypes={false}
        enableClipboard={false}
        displayObjectSize={false}
        indentWidth={2}
        name={null}
        src={children}
        onEdit={value => {
          onChange(value.updated_src)
          return true
        }}
        onAdd={value => {
          onChange(value.updated_src)
          return true
        }}
        onDelete={value => {
          onChange(value.updated_src)
          return true
        }}
        theme={{
          base00: theme.plain.backgroundColor,
          base01: theme.plain.color,
          base02: terciaryColor, // line
          base03: secondaryColor,
          base04: secondaryColor,
          base05: secondaryColor,
          base06: theme.plain.color,
          base07: stringColor, // key
          base08: theme.plain.color,
          base09: stringColor, // value, close bg
          base0A: theme.plain.color,
          base0B: theme.plain.color,
          base0C: theme.plain.color,
          base0D: terciaryColor, // arrow
          base0E: theme.plain.color,
          base0F: theme.plain.color
        }}
      />
    </ThemeWrapper>
  )
}
