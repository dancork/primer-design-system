import { create } from '@storybook/theming'

export default create({
  base: 'light',

  colorPrimary: '#ff8e7a',
  colorSecondary: '#ff8e7a',

  appBg: '#fff',
  appContentBg: '#fff',
  appBorderColor: '#e0e0e0',
  appBorderRadius: 6,

  fontBase: 'Roboto, sans-serif',
  fontCode: '"Fira Code", monospace',

  textColor: '#212121',
  // textInverseColor: 'rgba(255,255,255,0.9)',

  barTextColor: '#9e9e9e',
  barSelectedColor: '#ff8e7a',
  barBg: 'white',

  inputBg: '#fff',
  inputBorder: '#e0e0e0',
  inputTextColor: '#212121',
  inputBorderRadius: 6,

  brandTitle: 'Primer',
  brandUrl: 'https://primer.io',
  brandImage: '/logo.svg',
})
