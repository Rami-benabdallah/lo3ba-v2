import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import HeaderBar from '../../../components/HeaderBar';
import AnimatedGrowingCircle from '../../../components/AnimatedGrowingCircle';
import LobbyCubeAvatarContainer from '../../components/LobbyCubeAvatarContainer';
import PlayButton from '../../../components/PlayButton';

export interface LobbyUser {
  id?: string | number;
  imgUrl?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  showBorder?: boolean;
}

export const mockUsers: LobbyUser[] = [
  {
    id: 1,
    imgUrl: 'https://i.pravatar.cc/150?img=11',
    name: 'Luna Carter',
    size: 'md',
    showBorder: true,
  },
  {
    id: 2,
    imgUrl: 'https://i.pravatar.cc/150?img=22',
    name: 'Ethan Miles',
    size: 'sm',
    showBorder: false,
  },
  {
    id: 3,
    imgUrl: 'https://i.pravatar.cc/150?img=33',
    name: 'Ava Rodriguez',
    size: 'lg',
    showBorder: true,
  },
  {
    id: 4,
    imgUrl: 'https://i.pravatar.cc/150?img=44',
    name: 'Kai Thompson',
    size: 'md',
    showBorder: false,
  },
  {
    id: 5,
    imgUrl: 'https://i.pravatar.cc/150?img=55',
    name: 'Mia Nguyen',
    size: 'sm',
    showBorder: true,
  },
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
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  badgesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    marginTop: 16,
    marginBottom: 32,
    zIndex: 10,
  },
  badge: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomSection: {
    marginBottom: 24,
  },
  hintContainer: {
    marginBottom: 24,
    alignItems: 'center',
  },
  hintLabel: {
    color: '#9CA3AF',
    fontSize: 12,
    marginBottom: 4,
  },
  hintText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  buttonsContainer: {
    width: '30%',
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 12,
  },
});

export default function LocalRoomLobbyScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes in seconds

  const handleStartGame = () => {
    router.replace('/multiplayer-nine-lives');
  };
  
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

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      {/* Animated growing circle in the background */}
      <AnimatedGrowingCircle />

      <HeaderBar title={room.name} showBack={true} />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Badges: Room Number and Countdown */}
        <View style={styles.badgesContainer}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{room.id}</Text>
          </View>
          <View style={styles.badge}>
            <Ionicons name="time-outline" size={16} color="#FFFFFF" />
            <Text style={styles.badgeText}>{formatTime(timeLeft)}</Text>
          </View>
        </View>

        {/* Players Grid: 3 rows x 2 columns */}
        <LobbyCubeAvatarContainer users={mockUsers} />

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          <View style={styles.hintContainer}>
            <Text style={styles.hintLabel}>Hint:</Text>
            <Text style={styles.hintText}>Focus better to improve your performance</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonsContainer}>
            <PlayButton
              icon="play"
              label="Start Game"
              variant="primary"
              flex1={true}
              onPress={handleStartGame}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
