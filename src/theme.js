import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  shadows: Array(25)
    .fill('none')
    .map((_, index) => (index === 1 ? '0px 2px 4px rgba(0,0,0,0.1)' : 'none')),
  palette: {
    primary: {
      main: '#4361ee'
    }
  },
  typography: {
    button: {
      textTransform: 'none',
      fontWeight: 400
    }
  }
})
