import React from 'react';
import { View, StyleSheet } from 'react-native';
import UserAvatarHeader from './UserAvatarHeader';
import UserXpHeader from './UserXpHeader';

export interface ExploreScreenTopBarProps {
  name: string;
  subtitle?: string;
  imgUrl?: string;
  size?: 'sm' | 'md' | 'lg';
  xp?: number | string;
}

export default function ExploreScreenTopBar({
  name,
  subtitle,
  imgUrl,
  size = 'md',
  xp = 1200,
}: ExploreScreenTopBarProps) {
  return (
    <View style={styles.container}>
      <UserAvatarHeader
        name={name}
        subtitle={subtitle}
        imgUrl={imgUrl}
        size={size}
      />
      <UserXpHeader xp={xp} />
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
});

