// Primary and secondary colors
export const COLORS = {
  PRIMARY: '#F97316', // Orange primary color
  SECONDARY: '#8669fd',
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
} as const;

// Gradient colors based on secondary color
export const GRADIENT_COLORS = {
  SECONDARY_LIGHTEST: '#e8e1ff', // 1. Very light lavender
  SECONDARY_LIGHTER:  '#d4c8ff', // 2. Added - soft lavender transition
  SECONDARY_LIGHT:    '#b8a7fd', // 3. Original light shade
  SECONDARY_MEDIUM:   '#9a88fa', // 4. Added - medium shade
  SECONDARY:          COLORS.SECONDARY, // 5. Primary secondary color
  
} as const;
