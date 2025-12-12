import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { COLORS } from '../../../constants/colors';
import Card from '../../../components/Card';
import Avatar from '../../../components/Avatar';
import PlayButton from '../../../components/PlayButton';

interface PlayerStats {
  name: string;
  imgUrl: string;
  correctAnswers: number;
  totalQuestions: number;
  lives: number;
}

export default function MultiplayerNineLivesWinScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Get stats from params
  const userName = (params.userName as string) || 'Alex Johnson';
  const userImageUrl = (params.userImageUrl as string) || 'https://i.pravatar.cc/150?img=2';
  const isWinner = params.isWinner === 'true';
  
  // Parse all players data
  let allPlayers: PlayerStats[] = [];
  if (params.allPlayers) {
    try {
      allPlayers = JSON.parse(params.allPlayers as string);
    } catch (e) {
      console.error('Failed to parse allPlayers:', e);
    }
  }

  // Sort players by lives (highest first), then by correct answers
  const sortedPlayers = [...allPlayers].sort((a, b) => {
    if (b.lives !== a.lives) {
      return b.lives - a.lives;
    }
    return b.correctAnswers - a.correctAnswers;
  });

  const handleEndHere = () => {
    router.push('/(tabs)/games');
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Winner Card */}
          <Card variant="liquid" padding="md" style={styles.winnerCard}>
            <View style={styles.avatarSection}>
              <Avatar
                name={userName}
                imgUrl={userImageUrl}
                size="lg"
                showBorder={true}
              />
              <Text style={styles.winText}>
                {isWinner ? "You've won this round!" : `${userName} won this round!`}
              </Text>
            </View>
          </Card>

          {/* Players Stats List */}
          <Card variant="liquid" padding="md" style={styles.statsCard}>
            <Text style={styles.statsTitle}>Final Scores</Text>
            <View style={styles.playersList}>
              {sortedPlayers.map((player, index) => (
                <View key={player.name} style={styles.playerRow}>
                  <View style={styles.playerInfo}>
                    <Avatar
                      name={player.name}
                      imgUrl={player.imgUrl}
                      size="md"
                      showBorder={player.name === userName}
                    />
                    <View style={styles.playerDetails}>
                      <Text style={styles.playerName}>{player.name}</Text>
                      <Text style={styles.playerStats}>
                        {player.correctAnswers} / {player.totalQuestions} correct
                      </Text>
                    </View>
                  </View>
                  <View style={styles.livesContainer}>
                    <Text style={styles.livesText}>{player.lives} 🐾</Text>
                  </View>
                </View>
              ))}
            </View>
          </Card>

          {/* Action Button */}
          <PlayButton
            onPress={handleEndHere}
            icon="close-circle-outline"
            label="Back to Games"
            backgroundColor="transparent"
            iconColor="#1F2937"
            border={{ width: 2, color: '#6B7280' }}
            flex1={false}
            textStyle={styles.buttonText}
            style={styles.button}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 400,
    gap: 16,
    alignSelf: 'center',
  },
  winnerCard: {
    width: '100%',
    alignItems: 'center',
  },
  avatarSection: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  winText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  statsCard: {
    width: '100%',
  },
  statsTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  playersList: {
    gap: 12,
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  playerDetails: {
    flex: 1,
  },
  playerName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  playerStats: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
  },
  livesContainer: {
    alignItems: 'flex-end',
  },
  livesText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
  },
});
