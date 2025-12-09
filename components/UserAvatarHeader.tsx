import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
    <View style={styles.container}>
      <Avatar {...avatarProps} />
      {(name || subtitle) && (
        <View style={styles.textContainer}>
          {name && (
            <Text style={styles.name}>
              {name}
            </Text>
          )}
          {subtitle && (
            <Text style={styles.subtitle}>
              {subtitle}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 12,
    justifyContent: 'center',
  },
  name: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 18,
    fontWeight: '500',
    marginTop: 2,
  },
});

