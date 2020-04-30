import dynamic from 'next/dynamic'
import styled from 'styled-components'

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
    border: 1px solid ${props => props.theme.contrast} !important;
    color: ${props => props.theme.color} !important;
  }
  .key-modal-submit {
    position: relative;
    right: 4px;
  }
  .key-modal-submit svg {
    color: ${props => props.theme.iconColor} !important;
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
    color: ${props => props.theme.iconColor} !important;
  }

  .edit-check svg {
    color: ${props => props.theme.iconColor} !important;
  }

  .edit-cancel svg,
  .click-to-remove svg {
    color: ${props => props.theme.iconColor} !important;
  }
`

export default ({ onChange, children, theme }) => {
  const { borderColor, color, bg } = theme

  return (
    <ThemeWrapper theme={theme}>
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
          base00: bg,
          base01: color,
          base02: borderColor, // line
          base03: color,
          base04: color,
          base05: color,
          base06: color,
          base07: color, // key
          base08: color,
          base09: color, // value, close bg
          base0A: color,
          base0B: color,
          base0C: color,
          base0D: color, // arrow
          base0E: color,
          base0F: color
        }}
      />
    </ThemeWrapper>
  )
}
