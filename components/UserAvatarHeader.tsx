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
  const { name, size = 'md' } = avatarProps;
  const isXs = size === 'xs';
  
  return (
    <View style={styles.container}>
      <Avatar {...avatarProps} />
      {(name || subtitle) && (
        <View style={[
          styles.textContainer,
          isXs && styles.textContainerXs
        ]}>
          {name && (
            <Text style={[
              styles.name,
              isXs && styles.nameXs
            ]}>
              {name}
            </Text>
          )}
          {subtitle && (
            <Text style={[
              styles.subtitle,
              isXs && styles.subtitleXs
            ]}>
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
  textContainerXs: {
    marginLeft: 6,
  },
  name: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  nameXs: {
    fontSize: 10,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 10,
    fontWeight: '500',
    marginTop: 2,
  },
  subtitleXs: {
    fontSize: 8,
    marginTop: 1,
  },
});

