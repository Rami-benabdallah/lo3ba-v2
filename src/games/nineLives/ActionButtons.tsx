import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PlayButton from '../../../components/PlayButton';
import { COLORS } from '../../../constants/colors';

export interface ActionButtonsProps {
  onSkip: () => void;
  onSurrender: () => void;
  onPaw: () => void;
  showResult: boolean;
  lives: number;
  isPawActive: boolean;
}

export default function ActionButtons({
  onSkip,
  onSurrender,
  onPaw,
  showResult,
  lives,
  isPawActive,
}: ActionButtonsProps) {
  return (
    <View style={styles.container}>
      <PlayButton
        onPress={onSkip}
        icon={showResult ? 'arrow-forward' : 'play-skip-forward'}
        label={showResult ? 'Next' : 'Skip'}
        backgroundColor={COLORS.PRIMARY}
        border={{ width: 2, color: COLORS.PRIMARY_DARK }}
      />

      <PlayButton
        onPress={onSurrender}
        icon="flag-outline"
        label="Surrender"
        backgroundColor={COLORS.ERROR}
        iconColor="#FFFFFF"
        border={{ width: 2, color: COLORS.ERROR_DARK }}
      />

      <PlayButton
        onPress={onPaw}
        icon="paw-outline"
        label="Paw"
        backgroundColor={COLORS.SECONDARY}
        iconColor="#FFFFFF"
        border={{ width: 2, color: COLORS.SECONDARY_DARK }}
        disabled={lives <= 1 || showResult}
      />

      {isPawActive && (
        <View style={styles.pawIndicator}>
          <Text style={styles.pawEmoji}>🐾</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  pawIndicator: {
    position: 'absolute',
    top: -17,
    right: -8,
  },
  pawEmoji: {
    fontSize: 44,
  },
});
