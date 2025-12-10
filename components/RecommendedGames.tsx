import React from 'react';
import { View, Text, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GameCard from './GameCard';

export interface Game {
  gameName: string;
  iconName: keyof typeof Ionicons.glyphMap;
  players: number;
  rank?: number;
  rankIconName?: keyof typeof Ionicons.glyphMap;
  energyIconName?: keyof typeof Ionicons.glyphMap;
}

export interface RecommendedGamesProps {
  recommendedGames?: Game[];
  className?: string;
  style?: StyleProp<ViewStyle>;
}

export const defaultGames: Game[] = [
  {
    gameName: 'Space Defender',
    iconName: 'planet',
    players: 1240,
    rank: 42,
  },
  {
    gameName: 'Pirate Quest',
    iconName: 'skull',
    players: 820,
    rank: 128,
  },
];

export default function RecommendedGames({
  recommendedGames = defaultGames,
  className = '',
  style,
}: RecommendedGamesProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.gamesContainer}>
        {recommendedGames.map((game, index) => (
          <GameCard
            key={index}
            gameName={game.gameName}
            iconName={game.iconName}
            players={game.players}
            rank={game.rank}
            rankIconName={game.rankIconName}
            energyIconName={game.energyIconName}
            style={[
              styles.gameCard,
              index < recommendedGames.length - 1 && styles.gameCardSpacing,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  gamesContainer: {
    flexDirection: 'row',
  },
  gameCard: {
    flex: 1,
  },
  gameCardSpacing: {
    marginRight: 12,
  },
});

