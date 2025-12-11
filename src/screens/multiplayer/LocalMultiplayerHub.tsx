import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import HeaderBar from '../../../components/HeaderBar';

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
        <Pressable
          onPress={handleCreateRoom}
          className="w-full bg-orange-500 rounded-2xl py-5 px-6 mb-8 shadow-lg active:opacity-80"
        >
          <View className="flex-row items-center justify-center">
            <Ionicons name="add-circle" size={24} color="#FFFFFF" style={{ marginRight: 8 }} />
            <Text className="text-white text-lg font-semibold">
              Create Room
            </Text>
          </View>
        </Pressable>

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

          <Pressable
            onPress={handleJoinRoom}
            disabled={!roomCode.trim()}
            className={`w-full rounded-2xl py-4 px-6 shadow-lg ${
              roomCode.trim() 
                ? 'bg-orange-500 active:opacity-80' 
                : 'bg-gray-400 opacity-50'
            }`}
          >
            <Text className="text-white text-lg font-semibold text-center">
              Join Room
            </Text>
          </Pressable>
        </View>
      </View>
      </ScrollView>
    </View>
  );
}
