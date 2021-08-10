import {
  extendTheme,
  ComponentStyleConfig,
  theme as defaultTheme,
  withDefaultColorScheme,
} from '@chakra-ui/react'
import { brand, gray } from './colors'

const inputSize = { field: { borderRadius: 'xl' } }

const Input: ComponentStyleConfig = {
  parts: ['field'],
  sizes: {
    lg: inputSize,
    md: inputSize,
    sm: inputSize,
    xs: inputSize,
  },
  defaultProps: {
    variant: 'filled',
  },
}

const Textarea: ComponentStyleConfig = {
  defaultProps: {
    variant: 'filled',
  },
  sizes: {
    xs: inputSize.field,
    sm: inputSize.field,
    md: inputSize.field,
    lg: inputSize.field,
  },
}

const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: 'full',
  },
}

const theme = extendTheme(
  {
    config: {
      useSystemColorMode: true
    },
    components: {
      Input,
      Textarea,
      Button,
    },
    fonts: {
      body: `'Inter', ${defaultTheme.fonts.body}`,
      heading: `'Inter', ${defaultTheme.fonts.heading}`,
    },
    colors: { brand, gray },
    styles: {
      global: ({ colorMode }) => ({
        html: {
          scrollBehavior: 'smooth',
        },
        body: {
          bg: colorMode === 'light' ? 'gray.100' : 'gray.900'
        }
      }),
    },
    radii: {
      '4xl': '2rem',
    },
  },
  withDefaultColorScheme({ colorScheme: 'brand' })
)

export default theme
