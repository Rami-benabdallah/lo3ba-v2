import React from 'react';
import { View, Text } from 'react-native';
import Avatar, { AvatarProps } from './Avatar';

export interface UserAvatarHeaderProps extends AvatarProps {
  subtitle?: string;
}

export default function UserAvatarHeader({
  subtitle,
  ...avatarProps
}: UserAvatarHeaderProps) {
  const { name } = avatarProps;
  
  return (
    <View className="flex-row items-center justify-center">
      <Avatar {...avatarProps} />
      {(name || subtitle) && (
        <View className="ml-3 justify-center">
          {name && (
            <Text className="text-white text-base font-semibold">
              {name}
            </Text>
          )}
          {subtitle && (
            <Text className="text-white/70 text-sm mt-0.5">
              {subtitle}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

