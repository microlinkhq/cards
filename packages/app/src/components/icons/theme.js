import Svg from './svg'

export default ({ size = '24', ...props }) => (
  <Svg
    xmlns='http://www.w3.org/2000/svg'
    strokeWidth='0'
    viewBox='0 -2 19 23'
    size={size}
    {...props}
  >
    <path d='M13.66 5.93L8 .27 2.34 5.93c-3.12 3.12-3.12 8.19 0 11.31A7.98 7.98 0 008 19.58c2.05 0 4.1-.78 5.66-2.34 3.12-3.12 3.12-8.19 0-11.31zM8 17.59c-1.6 0-3.11-.62-4.24-1.76C2.62 14.69 2 13.19 2 11.59s.62-3.11 1.76-4.24L8 3.1v14.49z' />
  </Svg>
)
