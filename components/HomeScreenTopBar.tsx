import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UserAvatarHeader from './UserAvatarHeader';

export interface HomeScreenTopBarProps {
  name: string;
  subtitle?: string;
  imgUrl?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function HomeScreenTopBar({
  name,
  subtitle,
  imgUrl,
  size = 'md',
}: HomeScreenTopBarProps) {
  return (
    <View style={styles.container}>
      <UserAvatarHeader
        name={name}
        subtitle={subtitle}
        imgUrl={imgUrl}
        size={size}
      />
      <Text style={styles.xpText}>XP</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'transparent',
  },
  xpText: {
    color: '#ffffff',
  },
});

