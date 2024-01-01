import styled from 'styled-components'
import { styled as muiStyled } from '@mui/material/styles'

export const UnorderedList = styled.ul`
  list-style-type: none;
`

export const Demo = muiStyled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}))
