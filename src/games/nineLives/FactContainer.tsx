import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Card from '../../../components/Card';

export interface FactContainerProps {
  factText: string;
}

export default function FactContainer({ factText }: FactContainerProps) {
  return (
    <Card variant="liquidWhite" padding="md" style={styles.factCard}>
      <Text style={styles.factText}>{factText}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  factCard: {
    marginBottom: 12,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  factText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 28,
  },
});
