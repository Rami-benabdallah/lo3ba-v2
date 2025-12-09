import React from 'react';
import { View, Text, StyleProp, ViewStyle, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Card from './Card';
import ProgressBar from './ProgressBar';
import { GRADIENT_COLORS } from '../constants/colors';

export interface DailyProps {
  tasksRemaining?: number; // default: 13
  progress?: number; // default: 40
  href?: string; // default: "/achievements"
  className?: string;
  style?: StyleProp<ViewStyle>;
}

export default function Daily({
  tasksRemaining = 13,
  progress = 40,
  href = '/achievements',
  className = '',
  style,
}: DailyProps) {
  const router = useRouter();
  const description = `${tasksRemaining} tasks not finished yet`;
  const progressText = `${progress}%`;

  const handlePress = () => {
    router.push(href as any);
  };

  return (
    <Pressable onPress={handlePress}>
      <Card
        variant="transparentBlur"
        padding="md"
        className={`rounded-3xl bg-transparent ${className}`.trim()}
        style={style}
      >
      <View className="flex-row items-center">
        {/* SECTION 1: LEFT SIDE (1/3 width) */}
        <View className="w-1/3 pr-3">
          <View
            className="rounded-2xl items-center justify-center"
            style={{
              backgroundColor: "#fff",
              opacity: 0.4,
              aspectRatio: 1,
            }}
          >
            <Ionicons name="analytics-outline" size={40} color="#8669fd" />
          </View>
        </View>

        {/* SECTION 2: RIGHT SIDE (2/3 width) */}
        <View className="flex-1 h-full justify-between">
            <View className="flex-1">
                {/* Title */}
                <Text className="text-white text-lg font-semibold">Daily</Text>

                {/* Description */}
                <Text className="text-white/70 text-sm mt-1">{description}</Text>
            </View>

            {/* ProgressBar */}
            <ProgressBar
                value={progress}
                leftText="Progress"
                rightText={progressText}
                className="mt-2"
            />
        </View>
      </View>
    </Card>
    </Pressable>
  );
}

