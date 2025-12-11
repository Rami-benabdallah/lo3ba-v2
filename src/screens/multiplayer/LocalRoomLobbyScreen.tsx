import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import HeaderBar from '../../../components/HeaderBar';
import RoomQRCode from '../../components/RoomQRCode';

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
    <View className="flex-1">
      <HeaderBar title={room.name} showBack={true} />

      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 32 }}
      >
      <View className="flex-1">
        {/* Room Info */}
        <View className="items-center mb-8">
          <Text className="text-orange-500 text-xl font-semibold">
            {room.id}
          </Text>
        </View>

        {/* QR Code */}
        <View className="mt-6 mb-8 items-center">
          <RoomQRCode value={room.id} />
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
