import { render, RenderOptions } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '@primer-design-system/foundations'

// move to a utility file
const AllTheProviders: React.FC = props => (
  <ThemeProvider theme={theme} {...props} />
)
const renderWithTheme = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

export { renderWithTheme as render }
