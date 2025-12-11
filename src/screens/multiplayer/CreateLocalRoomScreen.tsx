import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import HeaderBar from '../../../components/HeaderBar';

const ANSWER_TIME_OPTIONS = [10, 15, 20];

export default function CreateLocalRoomScreen() {
  const router = useRouter();
  const [roomName, setRoomName] = useState('');
  const [answerTime, setAnswerTime] = useState(15);

  const handleCreateRoom = () => {
    if (!roomName.trim()) {
      return;
    }

    // Mock room creation
    const room = {
      id: `#room${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      name: roomName.trim(),
      answerTime,
    };

    router.push({
      pathname: '/local-room-lobby',
      params: {
        room: JSON.stringify(room),
      },
    });
  };

  return (
    <View className="flex-1">
      <HeaderBar title="Create Room" showBack={true} />

      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ flex: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 32 }}
      >
        <View className="flex-1 justify-center">

        {/* Room Name Input */}
        <View className="mb-6">
          <Text className="text-white text-lg font-semibold mb-3">
            Room Name
          </Text>
          <View className="bg-white rounded-2xl p-4 shadow-md">
            <TextInput
              value={roomName}
              onChangeText={setRoomName}
              placeholder="Enter room name"
              placeholderTextColor="#9CA3AF"
              className="text-gray-900 text-base"
              autoCapitalize="words"
            />
          </View>
        </View>

        {/* Answer Time Selector */}
        <View className="mb-8">
          <Text className="text-white text-lg font-semibold mb-3">
            Answer Time
          </Text>
          <View className="flex-row gap-3">
            {ANSWER_TIME_OPTIONS.map((time) => (
              <Pressable
                key={time}
                onPress={() => setAnswerTime(time)}
                className={`flex-1 rounded-xl py-4 px-4 ${
                  answerTime === time
                    ? 'bg-orange-500'
                    : 'bg-white/20'
                }`}
              >
                <Text
                  className={`text-center text-lg font-semibold ${
                    answerTime === time ? 'text-white' : 'text-white/70'
                  }`}
                >
                  {time}s
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Create Room Button */}
        <Pressable
          onPress={handleCreateRoom}
          disabled={!roomName.trim()}
          className={`w-full rounded-2xl py-5 px-6 shadow-lg ${
            roomName.trim()
              ? 'bg-orange-500 active:opacity-80'
              : 'bg-gray-400 opacity-50'
          }`}
        >
          <View className="flex-row items-center justify-center">
            <Ionicons name="create" size={24} color="#FFFFFF" style={{ marginRight: 8 }} />
            <Text className="text-white text-lg font-semibold">
              Create Room
            </Text>
          </View>
        </Pressable>
      </View>
      </ScrollView>
    </View>
  );
}
