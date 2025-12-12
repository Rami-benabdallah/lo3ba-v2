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
  TERTIARY:          '#10B981', // green
  FOURTH:            '#3B82F6', // blue
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

// Gradient colors based on primary color
export const PRIMARY_GRADIENT_COLORS = {
  PRIMARY_LIGHTEST: '#FFFFFF', // White
  PRIMARY_LIGHTER:  COLORS.PRIMARY_SOFT, // Very light orange (orange-100)
  PRIMARY_LIGHT:    COLORS.PRIMARY_LIGHT, // Light orange (orange-300)
  PRIMARY_MEDIUM:   '#FF8C42', // Medium orange transition
  PRIMARY:          COLORS.PRIMARY, // Primary orange
} as const;

// Gradient colors based on secondary color (consistent naming)
export const SECONDARY_GRADIENT_COLORS = {
  SECONDARY_LIGHTEST: '#FFFFFF', // White
  SECONDARY_LIGHTER:  COLORS.SECONDARY_SOFT, // Very light purple
  SECONDARY_LIGHT:    COLORS.SECONDARY_LIGHT, // Light purple
  SECONDARY_MEDIUM:   '#A78BFA', // Medium purple transition
  SECONDARY:          COLORS.SECONDARY, // Primary purple
} as const;

// Gradient colors based on tertiary color (green)
export const TERTIARY_GRADIENT_COLORS = {
  TERTIARY_LIGHTEST: '#FFFFFF', // White
  TERTIARY_LIGHTER:  '#D1FAE5', // Very light green (emerald-100)
  TERTIARY_LIGHT:    '#A7F3D0', // Light green (emerald-200)
  TERTIARY_MEDIUM:   '#6EE7B7', // Medium green transition (emerald-300)
  TERTIARY:          COLORS.TERTIARY, // Primary green
} as const;

// Gradient colors based on fourth color (blue)
export const FOURTH_GRADIENT_COLORS = {
  FOURTH_LIGHTEST: '#FFFFFF', // White
  FOURTH_LIGHTER:  '#DBEAFE', // Very light blue (blue-100)
  FOURTH_LIGHT:    '#BFDBFE', // Light blue (blue-200)
  FOURTH_MEDIUM:   '#93C5FD', // Medium blue transition (blue-300)
  FOURTH:          COLORS.FOURTH, // Primary blue
} as const;
