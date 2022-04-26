import { ThemeProvider } from 'styled-components'
import { theme } from '@primer-design-system/foundations'

const ThemeDecorator = (storyFn: any) => (
  <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>
)

export default ThemeDecorator
