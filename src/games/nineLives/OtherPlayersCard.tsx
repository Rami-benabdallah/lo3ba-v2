import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Card from '../../../components/Card';
import UserAvatarHeader from '../../../components/UserAvatarHeader';
import AnswerCubes, { AnswerHistory } from './AnswerCubes';

export interface OtherPlayer {
  id?: string | number;
  name: string;
  imgUrl?: string;
  lives: number;
  answerHistory: AnswerHistory[];
}

export interface OtherPlayersCardProps {
  players: OtherPlayer[];
}

export default function OtherPlayersCard({ players }: OtherPlayersCardProps) {
  return (
    <Card variant="liquid" padding="xs" style={styles.card}>
      <View style={styles.scrollContainer}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
        >
          {players.map((player) => (
            <View key={player.id || player.name} style={styles.playerRow}>
              {/* User Avatar Header */}
              <View style={styles.playerHeader}>
                <UserAvatarHeader
                  name={player.name}
                  imgUrl={player.imgUrl}
                  size="xs"
                />

                {/* Paw counter */}
                <View style={styles.pawCounter}>
                  <Text style={styles.pawCount}>{player.lives} x</Text>
                  <Text style={styles.pawIcon}>🐾</Text>
                </View>
              </View>

              {/* Answer cubes */}
              <AnswerCubes answerHistory={player.answerHistory} size="sm" />
            </View>
          ))}
        </ScrollView>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 120, // Fixed height to match left half (avatar ~30px + margin 12 + cubes margin 16 + cubes height 48 + padding)
  },
  scrollContainer: {
    height: 104, // Card height (120) - padding (8*2 = 16) = 104
    width: '100%',
    overflow: 'hidden',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    gap: 4,
    paddingBottom: 8,
  },
  playerRow: {
    marginBottom: 4,
  },
  playerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pawCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pawIcon: {
    fontSize: 18,
  },
  pawCount: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

