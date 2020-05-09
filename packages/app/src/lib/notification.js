import { createSnackbar } from '@snackbar/core'

export const notification = (text, props) =>
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
