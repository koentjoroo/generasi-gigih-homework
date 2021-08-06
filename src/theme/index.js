import {
  extendTheme,
  theme as defaultTheme,
  withDefaultColorScheme,
} from '@chakra-ui/react'
import { brand, trueGray } from './colors'

const Input = {
  defaultProps: {
    variant: "filled",
  },
}

const Button = {
  baseStyle: {
    borderRadius: '64px',
  },
}

const theme = extendTheme(
  {
    components: {
      Input,
      Button,
    },
    fonts: {
      body: `'Inter', ${defaultTheme.fonts.body}`,
      heading: `'Inter', ${defaultTheme.fonts.heading}`,
    },
    colors: { brand, trueGray },
    styles: {
      global: () => ({
        html: {
          scrollBehavior: 'smooth',
        },
        body: {
          bg: "trueGray.900",
          color: "trueGray.300"
        }
      }),
    },
  },
  withDefaultColorScheme({ colorScheme: 'brand' })
)

export default theme
