import dynamic from 'next/dynamic'

const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false })

export default ({ onChange, children, ...props }) => (
  <DynamicReactJson
    displayDataTypes={false}
    enableClipboard={false}
    displayObjectSize={false}
    indentWidth={2}
    name={false}
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
  />
)
