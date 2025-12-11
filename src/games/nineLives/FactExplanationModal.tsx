import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from '../../../components/Card';

export interface FactExplanationModalProps {
  explanation: string;
}

export default function FactExplanationModal({
  explanation,
}: FactExplanationModalProps) {
  return (
    <View style={styles.container}>
      <Card variant="liquid" padding="sm">
        <Text style={styles.explanationText}>{explanation}</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 16,
  },
  explanationText: {
    color: '#000000',
    fontSize: 10,
    lineHeight: 20,
    opacity: 0.95,
  },
});
