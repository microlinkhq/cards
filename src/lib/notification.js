import { createSnackbar } from '@snackbar/core'

export default (text, props) =>
  createSnackbar(text, {
    actions: [
      {
        text: '×'
      }
    ],
    timeout: 2000,
    maxStack: 2,
    ...props
  })
