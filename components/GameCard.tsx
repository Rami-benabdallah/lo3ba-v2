import React from 'react';
import { View, Text, StyleProp, ViewStyle, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from './Card';
import { COLORS } from '../constants/colors';

export interface GameCardProps {
  gameName: string;
  iconName: keyof typeof Ionicons.glyphMap;
  players: number;
  rank?: number;
  rankIconName?: keyof typeof Ionicons.glyphMap;
  energyIconName?: keyof typeof Ionicons.glyphMap;
  className?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export default function GameCard({
  gameName,
  iconName,
  players,
  rank = 0,
  rankIconName = 'trophy',
  energyIconName = 'flash',
  className = '',
  onPress,
  style,
}: GameCardProps) {
  const cardContent = (
    <Card variant="solid" padding="xs" style={[styles.card, style]}>
      <View style={styles.container}>
        {/* TOP: Square icon box */}
        <View style={styles.iconBox}>
          <Ionicons name={iconName} size={60} color="#ffffff" />
        </View>

        {/* Game name */}
        <Text style={styles.gameName}>{gameName}</Text>

        {/* Rank icon and rank number */}
        <View style={styles.rankRow}>
          <Ionicons name={rankIconName} size={16} color="rgba(0, 0, 0, 0.7)" style={styles.rankIcon} />
          <Text style={styles.rankText}>#{rank || 'N/A'}</Text>
        </View>

        {/* Bottom row: Players on left, Energy on right */}
        <View style={styles.bottomRow}>
          <View style={styles.playersRow}>
            <Ionicons name="people" size={16} style={styles.playersIcon} />
            <Text style={styles.playersText}>{players.toLocaleString()}</Text>
          </View>
          <View style={styles.energyIconBox}>
            <Ionicons name={energyIconName} size={16} color="#ffffff" />
          </View>
        </View>
      </View>
    </Card>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress}>
        {cardContent}
      </Pressable>
    );
  }

  return cardContent;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
  },
  container: {
    position: 'relative',
  },
  iconBox: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: COLORS.SECONDARY,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  gameName: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  rankRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rankIcon: {
    marginRight: 4,
  },
  rankText: {
    color: 'rgba(0, 0, 0, 0.7)',
    fontSize: 12,
    fontWeight: '500',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playersRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playersIcon: {
    marginRight: 4,
    color: COLORS.PRIMARY,
  },
  playersText: {
    color: COLORS.PRIMARY,
    fontSize: 12,
  },
  energyIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

