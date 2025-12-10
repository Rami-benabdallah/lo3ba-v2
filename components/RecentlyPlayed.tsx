import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GameItem, { GameType } from './GameItem';

export interface RecentlyPlayedItem {
  name: string;
  iconName: keyof typeof Ionicons.glyphMap;
  lastPlayed?: string;
  experienceGained?: number;
  gameType?: GameType;
}

export interface RecentlyPlayedProps {
  items?: RecentlyPlayedItem[];
  className?: string;
}

const defaultItems: RecentlyPlayedItem[] = [
  {
    name: 'Space Defender',
    iconName: 'planet',
    lastPlayed: '2h ago',
    experienceGained: 150,
    gameType: 'single',
  },
  {
    name: 'Pirate Quest',
    iconName: 'skull',
    lastPlayed: 'Yesterday',
    experienceGained: 250,
    gameType: 'multiplayer',
  },
  {
    name: 'Pirate Quest',
    iconName: 'skull',
    lastPlayed: '2 days ago',
    experienceGained: 550,
    gameType: 'multiplayer',
  },
  {
    name: 'Pirate Quest',
    iconName: 'skull',
    lastPlayed: '3 days ago',
    experienceGained: 420,
    gameType: 'multiplayer',
  },
];

export default function RecentlyPlayed({
  items = defaultItems,
  className = '',
}: RecentlyPlayedProps) {
  return (
    <View className={className}>
      {/* Vertical list of GameItem components */}
      <View style={styles.container}>
        {items.map((item, index) => (
          <GameItem
            key={index}
            name={item.name}
            iconName={item.iconName}
            lastPlayed={item.lastPlayed}
            experienceGained={item.experienceGained}
            gameType={item.gameType}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
});
