import styled, { keyframes, css } from 'styled-components'

const dropIn = keyframes`
  0% { transform: translateY(-30px); opacity: 0; }
  60% { opacity: 1; }
  100% { transform: translateY(0px); }
`

const Dropdown = styled.ul(
  ({ theme }) => ({
    listStyle: 'none',
    padding: 0,
    margin: 0,
    boxSizing: 'border-box',
    overflow: 'hidden',
    backgroundColor: theme.tokens.colors.white,
    borderRadius: `0 ${theme.tokens.radii.rounded} ${theme.tokens.radii.rounded}`,
    border: `1px solid ${theme.tokens.colors.gray500}`,
    position: 'absolute',
    top: 'calc(100% + 4px)',
    right: 0,
    width: '120px',
    transformOrigin: 'top center',
    outline: 'none',
    zIndex: theme.tokens.zIndices.dropdown,
  }),
  css`
    animation: ${dropIn} 200ms ease-out forwards;
  `,
)

const Option = styled.li<{ active?: boolean }>(({ theme, active }) => ({
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '12px',
  '& + &': {
    borderTop: `1px solid ${theme.tokens.colors.gray300}`,
  },
  // to make it play nice with headlessui (for some reason :focus doesn't work)
  backgroundColor: active ? theme.tokens.colors.gray300 : undefined,
  ':hover': {
    backgroundColor: theme.tokens.colors.gray300,
  },
  '&[aria-selected="true"]': {
    backgroundColor: theme.tokens.colors.blue300,
  },
}))

type CompoundDropdown = typeof Dropdown & {
  Option: typeof Option
}

export default Object.assign({}, Dropdown, { Option }) as CompoundDropdown
