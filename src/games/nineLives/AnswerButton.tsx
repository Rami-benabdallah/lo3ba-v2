import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
  // Choose icon based on value (True/False)
  const iconName = value ? 'checkmark-circle' : 'close-circle';
  
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isSelected && isCorrect && styles.correctOverlay,
        isSelected && !isCorrect && styles.wrongOverlay,
      ]}
      onPress={() => onPress(value)}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <Ionicons
          name={iconName}
          size={48}
          color={
            isSelected
              ? '#FFFFFF'
              : isCorrect && isSelected
              ? '#10B981'
              : !isCorrect && isSelected
              ? '#EF4444'
              : '#1F2937'
          }
        />
        <Text
          style={[
            styles.buttonText,
            isSelected && styles.buttonTextSelected,
          ]}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#9CA3AF',
    borderRadius: 12,
    width: 120,
    height: 120,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
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
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonTextSelected: {
    color: '#FFFFFF',
  },
});
