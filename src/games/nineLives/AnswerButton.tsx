import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export interface AnswerButtonProps {
  label: string;
  value: boolean;
  onPress: (value: boolean) => void;
  isSelected: boolean;
  isCorrect: boolean;
  disabled: boolean;
}

export default function AnswerButton({
  label,
  value,
  onPress,
  isSelected,
  isCorrect,
  disabled,
}: AnswerButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isSelected && isCorrect && styles.correctOverlay,
        isSelected && !isCorrect && styles.wrongOverlay,
      ]}
      onPress={() => onPress(value)}
      disabled={disabled}
    >
      <Text
        style={[
          styles.buttonText,
          isSelected && styles.buttonTextSelected,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#9CA3AF',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 64,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
    overflow: 'hidden',
  },
  correctOverlay: {
    borderColor: '#10B981',
    borderWidth: 3,
    backgroundColor: 'rgba(16, 185, 129, 0.3)', // green with opacity
  },
  wrongOverlay: {
    borderColor: '#EF4444',
    borderWidth: 3,
    backgroundColor: 'rgba(239, 68, 68, 0.3)', // red with opacity
  },
  buttonText: {
    color: '#1F2937',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonTextSelected: {
    color: '#FFFFFF',
  },
});
