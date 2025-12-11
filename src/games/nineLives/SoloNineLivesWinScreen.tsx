import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { COLORS } from '../../../constants/colors';
import Card from '../../../components/Card';
import Avatar from '../../../components/Avatar';
import PlayButton from '../../../components/PlayButton';

export default function SoloNineLivesWinScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Get stats from params or use defaults
  const correctAnswers = params.correctAnswers ? parseInt(params.correctAnswers as string) : 0;
  const totalQuestions = params.totalQuestions ? parseInt(params.totalQuestions as string) : 0;
  const userName = (params.userName as string) || 'Alex Johnson';
  const userImageUrl = (params.userImageUrl as string) || 'https://i.pravatar.cc/150?img=2';

  const handleNextRound = () => {
    router.replace('/solo-nine-lives');
  };

  const handleEndHere = () => {
    router.push('/(tabs)/games');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Correct answers card */}
        <Card variant="liquid" padding="none" style={styles.statsCard}>
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>Correct answers</Text>
            <Text style={styles.statsValue}>
              {correctAnswers} / {totalQuestions}
            </Text>
          </View>
          {/* Solid card with avatar and buttons */}
          <Card variant="solid" padding="md" style={styles.solidCard}>
            <View style={styles.avatarSection}>
              <Avatar
                name={userName}
                imgUrl={userImageUrl}
                size="lg"
                showBorder={true}
              />
              <Text style={styles.winText}>You've won this round</Text>
            </View>

            {/* Action buttons */}
            <View style={styles.buttonsContainer}>
              <PlayButton
                onPress={handleNextRound}
                icon="arrow-forward"
                label="Continue Next Round"
                backgroundColor={COLORS.PRIMARY}
                border={{ width: 2, color: COLORS.PRIMARY_DARK }}
                flex1={false}
                textStyle={styles.buttonText}
                style={styles.button}
              />

              <PlayButton
                onPress={handleEndHere}
                icon="close-circle-outline"
                label="End Here"
                backgroundColor="transparent"
                iconColor="#1F2937"
                border={{ width: 2, color: '#6B7280' }}
                flex1={false}
                textStyle={styles.buttonTextSecondary}
                style={styles.button}
              />
            </View>
          </Card>
        </Card>

        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 400,
    gap: 16,
  },
  statsCard: {
    width: '100%',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 8,
    padding: 16,
  },
  statsLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  statsValue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  solidCard: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarSection: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 24,
  },
  winText: {
    color: '#1F2937',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonsContainer: {
    width: '100%',
    gap: 12,
  },
  button: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  buttonTextSecondary: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
  },
});
