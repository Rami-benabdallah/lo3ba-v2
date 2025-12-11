import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface PlayButtonProps {
  onPress?: () => void;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  backgroundColor: string;
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
}

export default function PlayButton({
  onPress,
  icon,
  label,
  backgroundColor,
  activeOpacity = 0.8,
  style,
  textStyle,
  iconSize = 32,
  iconColor = '#FFFFFF',
  border,
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

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor },
        borderStyles,
        style,
      ]}
      activeOpacity={activeOpacity}
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12, // rounded-xl
    padding: 16, // p-4
  },
  text: {
    color: '#FFFFFF', // text-white
    fontSize: 8, // text-sm
    marginTop: 4, // reduced spacing
    textAlign: 'center',
  },
});
