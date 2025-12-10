import React from 'react';
import { Switch as RNSwitch, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

export interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export default function Switch({
  value,
  onValueChange,
  size = 'md',
  disabled = false,
}: SwitchProps) {
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
        };
      case 'md':
        return {
          transform: [{ scaleX: 1 }, { scaleY: 1 }],
        };
      case 'lg':
        return {
          transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
        };
      default:
        return {
          transform: [{ scaleX: 1 }, { scaleY: 1 }],
        };
    }
  };

  return (
    <RNSwitch
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      trackColor={{
        false: '#E5E7EB', // Gray for inactive
        true: COLORS.PRIMARY, // Primary color for active
      }}
      thumbColor="#ffffff" // Always white
      ios_backgroundColor="#E5E7EB" // Gray for iOS inactive state
      style={[styles.switch, getSizeStyles()]}
    />
  );
}

const styles = StyleSheet.create({
  switch: {
    // Base styles - size handled via transform
  },
});
