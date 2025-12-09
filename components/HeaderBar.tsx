import React from 'react';
import { View, Text, Pressable, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export interface HeaderBarProps {
  title?: string;
  showBack?: boolean; // default true
  rightIcon?: React.ReactNode;
  onRightPress?: () => void;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

export default function HeaderBar({
  title,
  showBack = true,
  rightIcon,
  onRightPress,
  className = '',
  style,
}: HeaderBarProps) {
  const router = useRouter();

  const handleBackPress = () => {
    router.back();
  };

  return (
    <View
      className={`w-full flex-row items-center justify-between px-4 py-3 bg-transparent ${className}`.trim()}
      style={style}
    >
      {/* Left: Back button or spacer */}
      <View className="w-10 items-start">
        {showBack ? (
          <Pressable
            onPress={handleBackPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <View className="w-10 h-10 rounded-full bg-white items-center justify-center">
              <Ionicons name="chevron-back" size={20} color="#000000" />
            </View>
          </Pressable>
        ) : null}
      </View>

      {/* Center: Title */}
      <View className="flex-1 items-center">
        {title && (
          <Text className="text-white text-lg font-semibold">{title}</Text>
        )}
      </View>

      {/* Right: Right icon or spacer */}
      <View className="w-10 items-end">
        {rightIcon ? (
          <Pressable
            onPress={onRightPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <View className="w-10 h-10 rounded-full bg-white items-center justify-center">
              {rightIcon}
            </View>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

