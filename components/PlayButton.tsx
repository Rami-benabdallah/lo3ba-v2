import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, PRIMARY_GRADIENT_COLORS } from '../constants/colors';

export interface PlayButtonProps {
  onPress?: () => void;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  variant?: 'primary' | 'secondary' | 'radiant' | 'tertiary' | 'fourth';
  backgroundColor?: string; // Deprecated: use variant instead
  flex1?: boolean;
  activeOpacity?: number;
  style?: ViewStyle;
  textStyle?: TextStyle;
  iconSize?: number;
  iconColor?: string;
  border?: {
    width?: number;
    color?: string;
    style?: 'solid' | 'dashed' | 'dotted';
  };
  disabled?: boolean;
}

export default function PlayButton({
  onPress,
  icon,
  label,
  variant,
  backgroundColor,
  flex1 = true,
  activeOpacity = 0.8,
  style,
  textStyle,
  iconSize = 32,
  iconColor = '#FFFFFF',
  border,
  disabled = false,
}: PlayButtonProps) {
  const getBackgroundColor = (): string => {
    if (variant) {
      switch (variant) {
        case 'primary':
          return COLORS.PRIMARY;
        case 'secondary':
          return COLORS.SECONDARY;
        case 'tertiary':
          return COLORS.TERTIARY;
        case 'fourth':
          return COLORS.FOURTH;
        case 'radiant':
          return 'transparent'; // Gradient will handle the background
        default:
          return backgroundColor || COLORS.PRIMARY;
      }
    }
    return backgroundColor || COLORS.PRIMARY;
  };

  const borderStyles: ViewStyle = {};
  if (border) {
    if (border.width !== undefined) {
      borderStyles.borderWidth = border.width;
    }
    if (border.color) {
      borderStyles.borderColor = border.color;
    }
    if (border.style) {
      borderStyles.borderStyle = border.style;
    }
  }

  const disabledStyles: ViewStyle = disabled
    ? {
        opacity: 0.5,
        backgroundColor: '#9CA3AF',
        borderColor: COLORS.gray[900],
        borderWidth: 2,
      }
    : {};

  const buttonContent = (
    <>
      <Ionicons name={icon} size={iconSize} color={iconColor} />
      <Text style={[styles.text, textStyle]}>
        {label}
      </Text>
    </>
  );

  const buttonStyle = [
    styles.button,
    variant !== 'radiant' && { backgroundColor: getBackgroundColor() },
    borderStyles,
    flex1 && { flex: 1 },
    disabledStyles,
    style,
  ];

  return (
    <TouchableOpacity
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      style={buttonStyle}
      activeOpacity={disabled ? 1 : activeOpacity}
    >
      {variant === 'radiant' ? (
        <LinearGradient
          colors={[
            PRIMARY_GRADIENT_COLORS.PRIMARY_LIGHTER,
            PRIMARY_GRADIENT_COLORS.PRIMARY_LIGHT,
            PRIMARY_GRADIENT_COLORS.PRIMARY_MEDIUM,
            PRIMARY_GRADIENT_COLORS.PRIMARY,
          ]}
          locations={[0, 0.3, 0.6, 0.8, 1]}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={styles.gradient}
        >
          {buttonContent}
        </LinearGradient>
      ) : (
        buttonContent
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12, // rounded-xl
    padding: 16, // p-4
    flexGrow: 1,
    overflow: 'hidden', // Ensure gradient respects border radius
  },
  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 12,
  },
  text: {
    color: '#FFFFFF', // text-white
    fontSize: 8, // text-sm
    marginTop: 4, // reduced spacing
    textAlign: 'center',
  },
});
