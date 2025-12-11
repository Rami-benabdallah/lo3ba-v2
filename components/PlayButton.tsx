import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface PlayButtonProps {
  onPress?: () => void;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  backgroundColor: string;
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
        backgroundColor: '#9CA3AF', // gray-400
      }
    : {};

  return (
    <TouchableOpacity
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      style={[
        styles.button,
        { backgroundColor },
        borderStyles,
        flex1 && { flex: 1 },
        disabledStyles,
        style,
      ]}
      activeOpacity={disabled ? 1 : activeOpacity}
    >
      <Ionicons name={icon} size={iconSize} color={iconColor} />
      <Text style={[styles.text, textStyle]}>
        {label}
      </Text>
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
  },
  text: {
    color: '#FFFFFF', // text-white
    fontSize: 8, // text-sm
    marginTop: 4, // reduced spacing
    textAlign: 'center',
  },
});
