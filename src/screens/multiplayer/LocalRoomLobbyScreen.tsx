import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Player {
  name: string;
}

const MOCK_PLAYERS: Player[] = [
  { name: 'You' },
  { name: 'Player 2 (waiting…)' },
];

export default function LocalRoomLobbyScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Parse room data from params
  let room: { id: string; name: string; answerTime?: number } | null = null;
  
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
    <View className="flex-1">
      {/* Back Button */}
      <Pressable
        onPress={() => router.back()}
        className="absolute top-12 left-6 z-10 w-10 h-10 items-center justify-center bg-white/20 rounded-full"
      >
        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
      </Pressable>

      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 32 }}
      >
      <View className="flex-1">
        {/* Room Info */}
        <View className="items-center mb-8">
          <Text className="text-3xl font-bold text-white mb-2">
            {room.name}
          </Text>
          <Text className="text-orange-500 text-xl font-semibold">
            {room.id}
          </Text>
        </View>

        {/* QR Code Placeholder */}
        <View className="bg-white rounded-2xl p-8 mb-8 items-center justify-center shadow-md">
          <View className="w-64 h-64 bg-gray-100 rounded-xl items-center justify-center border-2 border-dashed border-gray-300">
            <Ionicons name="qr-code-outline" size={80} color="#9CA3AF" />
            <Text className="text-gray-500 text-sm mt-4 text-center px-4">
              QR Code goes here
            </Text>
          </View>
        </View>

        {/* Players List */}
        <View className="mb-8">
          <Text className="text-white text-lg font-semibold mb-4">
            Players ({MOCK_PLAYERS.length})
          </Text>
          
          <View className="gap-3">
            {MOCK_PLAYERS.map((player, index) => (
              <View
                key={index}
                className="bg-white rounded-xl p-4 shadow-md flex-row items-center"
              >
                <View className="w-10 h-10 bg-orange-500 rounded-full items-center justify-center mr-3">
                  <Text className="text-white font-bold text-lg">
                    {player.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <Text className="text-gray-900 text-base font-medium flex-1">
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
          className="w-full bg-gray-400 rounded-2xl py-5 px-6 shadow-lg opacity-50"
        >
          <View className="flex-row items-center justify-center">
            <Ionicons name="play" size={24} color="#FFFFFF" style={{ marginRight: 8 }} />
            <Text className="text-white text-lg font-semibold">
              Start Game
            </Text>
          </View>
        </Pressable>
      </View>
      </ScrollView>
    </View>
  );
}
