import { useTheme } from 'styled-components'

import { Theme, Color } from '@primer-design-system/foundations'

export interface DropdownArrowProps {
  fill?: Color
}
const DropdownArrow = ({ fill = 'blue300' }: DropdownArrowProps) => {
  const theme = useTheme() as Theme
  return (
    <svg
      width="10"
      height="8"
      viewBox="0 0 10 8"
      fill={theme.tokens.colors[fill]}
    >
      <path d="M5 8L0.669873 0.499999L9.33013 0.5L5 8Z" />
    </svg>
  )
}

export default DropdownArrow
