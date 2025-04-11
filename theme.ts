export const theme = {
  colors: {
    primary: '#34C759', // iOS-style green
    primaryLight: '#4CD964',
    primaryDark: '#30B350',
    secondary: '#8E8E93', // iOS-style grey
    secondaryLight: '#AEAEB2',
    secondaryDark: '#636366',
    background: '#FFFFFF',
    surface: '#F2F2F7',
    text: '#1C1C1E',
    textSecondary: '#6C6C70',
    border: '#C6C6C8',
    success: '#34C759',
    error: '#FF3B30',
    warning: '#FF9500',
    white: '#FFFFFF',
    black: '#000000',
    gray: {
      100: '#F2F2F7',
      200: '#E5E5EA',
      300: '#D1D1D6',
      400: '#C7C7CC',
      500: '#AEAEB2',
      600: '#8E8E93',
      700: '#636366',
      800: '#48484A',
      900: '#3A3A3C',
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
  },
  borderRadius: {
    sm: 6,
    md: 10,
    lg: 16,
    xl: 22,
    full: 9999,
  },
  typography: {
    h1: {
      fontSize: 34,
      lineHeight: 41,
      letterSpacing: 0.37,
    },
    h2: {
      fontSize: 28,
      lineHeight: 34,
      letterSpacing: 0.36,
    },
    h3: {
      fontSize: 22,
      lineHeight: 28,
      letterSpacing: 0.35,
    },
    body: {
      fontSize: 17,
      lineHeight: 22,
      letterSpacing: -0.41,
    },
    bodySmall: {
      fontSize: 15,
      lineHeight: 20,
      letterSpacing: -0.24,
    },
    caption: {
      fontSize: 13,
      lineHeight: 18,
      letterSpacing: -0.08,
    },
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
}

export type Theme = typeof theme

