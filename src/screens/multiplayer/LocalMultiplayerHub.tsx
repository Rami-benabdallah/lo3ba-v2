import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import HeaderBar from '../../../components/HeaderBar';
import Button from '../../../components/Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createRoomContainer: {
    width: '100%',
    marginBottom: 32,
  },
  joinSection: {
    width: '100%',
  },
  joinTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    color: '#111827',
    fontSize: 16,
  },
});

export default function LocalMultiplayerHub() {
  const router = useRouter();
  const [roomCode, setRoomCode] = useState('');

  const handleCreateRoom = () => {
    router.push('/create-local-room');
  };

  const handleJoinRoom = () => {
    if (roomCode.trim()) {
      router.push({
        pathname: '/local-room-lobby',
        params: { roomId: roomCode.trim() },
      });
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBar title="Local Multiplayer" showBack={true} />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.contentWrapper}>

        {/* Create Room Button */}
        <View style={styles.createRoomContainer}>
          <Button
            text="Create Room"
            variant="primary"
            size="lg"
            leftIcon={<Ionicons name="add-circle" size={24} color="#FFFFFF" />}
            onPress={handleCreateRoom}
            containerStyle={{ width: '100%' }}
          />
        </View>

        {/* Join Existing Room Section */}
        <View style={styles.joinSection}>
          <Text style={styles.joinTitle}>
            Join Existing Room
          </Text>
          
          <View style={styles.inputContainer}>
            <TextInput
              value={roomCode}
              onChangeText={setRoomCode}
              placeholder="Enter room code"
              placeholderTextColor="#9CA3AF"
              style={styles.input}
              autoCapitalize="characters"
            />
          </View>

          <Button
            text="Join Room"
            variant="primary"
            size="lg"
            disabled={!roomCode.trim()}
            onPress={handleJoinRoom}
            containerStyle={{ width: '100%' }}
          />
        </View>
      </View>
      </ScrollView>
    </View>
  );
}
