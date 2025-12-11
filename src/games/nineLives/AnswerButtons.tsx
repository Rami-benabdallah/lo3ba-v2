import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export interface AnswerButtonsProps {
  onAnswer: (answer: boolean) => void;
  selectedAnswer: boolean | null;
  isCorrect: boolean;
  showResult: boolean;
}

export default function AnswerButtons({
  onAnswer,
  selectedAnswer,
  isCorrect,
  showResult,
}: AnswerButtonsProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          selectedAnswer === true && isCorrect && styles.correctOverlay,
          selectedAnswer === true && !isCorrect && styles.wrongOverlay,
        ]}
        onPress={() => onAnswer(true)}
        disabled={selectedAnswer !== null}
      >
        <Text
          style={[
            styles.buttonText,
            selectedAnswer === true && styles.buttonTextSelected,
          ]}
        >
          True
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          selectedAnswer === false && isCorrect && styles.correctOverlay,
          selectedAnswer === false && !isCorrect && styles.wrongOverlay,
        ]}
        onPress={() => onAnswer(false)}
        disabled={selectedAnswer !== null}
      >
        <Text
          style={[
            styles.buttonText,
            selectedAnswer === false && styles.buttonTextSelected,
          ]}
        >
          False
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    marginBottom: 12,
  },
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
