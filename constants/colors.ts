// Primary and secondary colors
export const COLORS = {
  PRIMARY:         '#F97316', // default
  PRIMARY_LIGHT:   '#FDBA74', // lighter (orange-300)
  PRIMARY_SOFT:    '#FFEDD5', // very light (orange-100)
  PRIMARY_DARK:    '#EA580C', // darker (orange-600)
  PRIMARY_DEEP:    '#C2410C', // even darker (orange-700)
  PRIMARY_SHADOW:  '#9A3412', // shadow / border dark (orange-800)
  PRIMARY_TEXT:    '#7C2D12', // darkest variant (orange-900)
  SECONDARY:         '#8669FD', // default
  SECONDARY_LIGHT:   '#BBA5FF', // lighter
  SECONDARY_SOFT:    '#EDE5FF', // very light
  SECONDARY_DARK:    '#6C4EF7', // darker
  SECONDARY_DEEP:    '#5433E3', // even darker
  SECONDARY_SHADOW:  '#3A20B5', // strong shadow/border color
  SECONDARY_TEXT:    '#27157A', // darkest variant for text on light purple
  gray: {
    50: '#FAFAFA',
    100: '#F4F4F5',
    200: '#E4E4E7',
    300: '#D4D4D8',
    400: '#A1A1AA',
    500: '#71717A',
    600: '#52525B',
    700: '#3F3F46',
    800: '#27272A',
    900: '#18181B',
  },
ERROR: '#EF4444',
ERROR_LIGHT: '#F87171',
ERROR_SOFT: '#FEE2E2',
ERROR_DARK: '#DC2626',
ERROR_DEEP: '#B91C1C',
ERROR_SHADOW: '#991B1B',
ERROR_TEXT: '#7F1D1D',
} as const;

// Gradient colors based on secondary color
export const GRADIENT_COLORS = {
  SECONDARY_LIGHTEST: '#e8e1ff', // 1. Very light lavender
  SECONDARY_LIGHTER:  '#d4c8ff', // 2. Added - soft lavender transition
  SECONDARY_LIGHT:    '#b8a7fd', // 3. Original light shade
  SECONDARY_MEDIUM:   '#9a88fa', // 4. Added - medium shade
  SECONDARY:          COLORS.SECONDARY, // 5. Primary secondary color
  
} as const;
