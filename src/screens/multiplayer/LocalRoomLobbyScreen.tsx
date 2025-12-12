import React, { useEffect } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import HeaderBar from '../../../components/HeaderBar';
import { COLORS } from '@/constants/colors';

interface Player {
  name: string;
}

const MOCK_PLAYERS: Player[] = [
  { name: 'You' },
  { name: 'Player 2 (waiting…)' },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  contentWrapper: {
    flex: 1,
  },
  roomInfoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  roomId: {
    color: '#F97316',
    fontSize: 20,
    fontWeight: '600',
  },
  qrCodeContainer: {
    marginTop: 24,
    marginBottom: 32,
    alignItems: 'center',
  },
  playersSection: {
    marginBottom: 32,
  },
  playersTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  playersList: {
    gap: 12,
  },
  playerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerAvatar: {
    width: 40,
    height: 40,
    backgroundColor: '#F97316',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  playerAvatarText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 18,
  },
  playerName: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  startButton: {
    width: '100%',
    backgroundColor: '#9CA3AF',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    opacity: 0.5,
  },
  startButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  animatedCircleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
    pointerEvents: 'none',
  },
  animatedCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.SECONDARY_DARK,
  },
});

export default function LocalRoomLobbyScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Animated values for the growing circle
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.6);

  // Start animation on mount
  useEffect(() => {
    scale.value = withRepeat(
      withTiming(5, { duration: 3000 }),
      -1, // infinite repeat
      false // don't reverse
    );
    opacity.value = withRepeat(
      withTiming(0, { duration: 3000 }),
      -1, // infinite repeat
      false // don't reverse
    );
  }, []);

  // Animated style for the circle
  const animatedCircleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });
  
  // Parse room data from params
  let room: { id: string; name: string; answerTime?: number };
  
  if (params.room) {
    try {
      room = JSON.parse(params.room as string);
    } catch (e) {
      // If parsing fails, use roomId from params
      room = {
        id: (params.roomId as string) || '#room001',
        name: 'Room',
      };
    }
  } else if (params.roomId) {
    room = {
      id: params.roomId as string,
      name: 'Room',
    };
  } else {
    // Fallback for testing
    room = {
      id: '#room001',
      name: 'My Room',
    };
  }

  return (
    <View style={styles.container}>
      {/* Animated growing circle in the background */}
      <View style={styles.animatedCircleContainer}>
        <Animated.View style={[styles.animatedCircle, animatedCircleStyle]} />
      </View>

      <HeaderBar title={room.name} showBack={true} />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
      <View style={styles.contentWrapper}>
        {/* Room Info */}
        <View style={styles.roomInfoContainer}>
          <Text style={styles.roomId}>
            {room.id}
          </Text>
        </View>

        {/* Players List */}
        <View style={styles.playersSection}>
          <Text style={styles.playersTitle}>
            Players ({MOCK_PLAYERS.length})
          </Text>
          
          <View style={styles.playersList}>
            {MOCK_PLAYERS.map((player, index) => (
              <View
                key={index}
                style={styles.playerCard}
              >
                <View style={styles.playerAvatar}>
                  <Text style={styles.playerAvatarText}>
                    {player.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <Text style={styles.playerName}>
                  {player.name}
                </Text>
                {index === 0 && (
                  <Ionicons name="star" size={20} color="#F97316" />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Start Game Button */}
        <Pressable
          disabled={true}
          style={styles.startButton}
        >
          <View style={styles.startButtonContent}>
            <Ionicons name="play" size={24} color="#FFFFFF" style={{ marginRight: 8 }} />
            <Text style={styles.startButtonText}>
              Start Game
            </Text>
          </View>
        </Pressable>
      </View>
      </ScrollView>
    </View>
  );
}
