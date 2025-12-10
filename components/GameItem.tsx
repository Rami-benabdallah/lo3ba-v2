import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import Card from './Card';

export type GameType = 'single' | 'multiplayer';

export interface GameItemProps {
  name: string;
  iconName: keyof typeof Ionicons.glyphMap;
  lastPlayed?: string;
  experienceGained?: number;
  gameType?: GameType;
  onPress?: () => void;
  className?: string;
}

export default function GameItem({
  name,
  iconName,
  lastPlayed,
  experienceGained,
  gameType,
  onPress,
  className = '',
}: GameItemProps) {
  return (
    <Pressable onPress={onPress} className={className}>
      <Card variant="liquid" padding="sm">
        <View className="flex-row items-center">
          {/* Left: Rounded secondary-colored box with icon */}
          <View
            className="rounded-xl items-center justify-center"
            style={{
              width: 48,
              height: 48,
              backgroundColor: COLORS.SECONDARY,
            }}
          >
            <Ionicons name={iconName} size={24} color="#ffffff" />
          </View>

          {/* Middle: Vertical column with game name and metadata */}
          <View className="flex-1 ml-3">
            <Text className="text-white font-semibold">{name}</Text>
            <View className="flex-row items-center mt-1 gap-x-2">
              {lastPlayed && (
                <Text className="text-white/60 text-xs">{lastPlayed}</Text>
              )}
              {gameType && (
                <View className="flex-row items-center">
                  <Ionicons
                    name={gameType === 'multiplayer' ? 'people' : 'person'}
                    size={12}
                    color="rgba(255, 255, 255, 0.6)"
                  />
                  <Text className="text-white/60 text-xs ml-1">
                    {gameType === 'multiplayer' ? 'Multiplayer' : 'Single'}
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Right: Experience gained */}
          {experienceGained !== undefined && (
            <View className="flex-row items-center ml-2">
              <Ionicons name="star" size={16} color={COLORS.PRIMARY} />
              <Text className="text-white font-semibold ml-1">
                +{experienceGained}
              </Text>
            </View>
          )}
        </View>
      </Card>
    </Pressable>
  );
}
