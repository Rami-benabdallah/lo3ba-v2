import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import HeaderBar from '../../../components/HeaderBar';
import Button from '../../../components/Button';

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
    <View className="flex-1">
      <HeaderBar title="Local Multiplayer" showBack={true} />

      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ flex: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 32 }}
      >
        <View className="flex-1 justify-center items-center">

        {/* Create Room Button */}
        <View className="w-full mb-8">
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
        <View className="w-full">
          <Text className="text-white text-lg font-semibold mb-4 text-center">
            Join Existing Room
          </Text>
          
          <View className="bg-white rounded-2xl p-4 mb-4 shadow-md">
            <TextInput
              value={roomCode}
              onChangeText={setRoomCode}
              placeholder="Enter room code"
              placeholderTextColor="#9CA3AF"
              className="text-gray-900 text-base"
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
