import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import Card from './Card';

export type GameType = 'single' | 'multiplayer';

export interface GameItemProps {
  name: string;
  iconName: keyof typeof Ionicons.glyphMap;
  lastPlayed?: string;
  experienceGained?: number;
  gameType?: GameType;
  onPress?: () => void;
  className?: string;
}

export default function GameItem({
  name,
  iconName,
  lastPlayed,
  experienceGained,
  gameType,
  onPress,
  className = '',
}: GameItemProps) {
  return (
    <Pressable onPress={onPress}>
      <Card variant="liquid" padding="sm">
        <View style={styles.container}>
          {/* Left: Rounded secondary-colored box with icon */}
          <View style={styles.iconContainer}>
            <Ionicons name={iconName} size={24} color="#ffffff" />
          </View>

          {/* Middle: Vertical column with game name and metadata */}
          <View style={styles.middleSection}>
            <Text style={styles.gameName}>{name}</Text>
            <View style={styles.metadataRow}>
              {lastPlayed && (
                <Text style={styles.metadataText}>{lastPlayed}</Text>
              )}
              {gameType && (
                <View style={styles.gameTypeContainer}>
                  <Ionicons
                    name={gameType === 'multiplayer' ? 'people' : 'person'}
                    size={12}
                    color="rgba(255, 255, 255, 0.6)"
                  />
                  <Text style={[styles.metadataText, styles.gameTypeText]}>
                    {gameType === 'multiplayer' ? 'Multiplayer' : 'Single'}
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Right: Experience gained */}
          {experienceGained !== undefined && (
            <View style={styles.experienceContainer}>
              <Ionicons name="star" size={16} color={COLORS.PRIMARY} />
              <Text style={styles.experienceText}>+{experienceGained}</Text>
            </View>
          )}
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.SECONDARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleSection: {
    flex: 1,
    marginLeft: 12,
  },
  gameName: {
    color: '#ffffff',
    fontWeight: '600',
  },
  metadataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  metadataText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
  },
  gameTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  gameTypeText: {
    marginLeft: 4,
  },
  experienceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  experienceText: {
    color: '#ffffff',
    fontWeight: '600',
    marginLeft: 4,
  },
});
