import React from 'react';
import { View, Text } from 'react-native';
import Avatar, { AvatarProps } from './Avatar';

export interface UserAvatarHeaderProps extends AvatarProps {
  title?: string;
  subtitle?: string;
}

export default function UserAvatarHeader({
  title,
  subtitle,
  ...avatarProps
}: UserAvatarHeaderProps) {
  return (
    <View className="flex-row items-center justify-center">
      <Avatar {...avatarProps} />
      {(title || subtitle) && (
        <View className="ml-3 justify-center">
          {title && (
            <Text className="text-white text-base font-semibold">
              {title}
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

