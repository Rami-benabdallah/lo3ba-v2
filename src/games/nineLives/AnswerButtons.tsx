import React from 'react';
import { View, StyleSheet } from 'react-native';
import AnswerButton from './AnswerButton';

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
      <AnswerButton
        label="True"
        value={true}
        onPress={onAnswer}
        isSelected={selectedAnswer === true}
        isCorrect={isCorrect}
        disabled={selectedAnswer !== null}
      />
      <AnswerButton
        label="False"
        value={false}
        onPress={onAnswer}
        isSelected={selectedAnswer === false}
        isCorrect={isCorrect}
        disabled={selectedAnswer !== null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 16,
    marginBottom: 12,
  },
});
