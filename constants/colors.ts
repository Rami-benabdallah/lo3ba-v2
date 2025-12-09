// Primary and secondary colors
export const COLORS = {
  PRIMARY: '#f66728',
  SECONDARY: '#8669fd',
} as const;

// Gradient colors based on secondary color
export const GRADIENT_COLORS = {
  SECONDARY_LIGHTEST: '#e8e1ff', // Very light shade
  SECONDARY_LIGHT: '#b8a7fd', // Light shade
  SECONDARY: COLORS.SECONDARY, // Base secondary color
} as const;
