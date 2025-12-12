import React from 'react';
import { View, Text, Image, StyleSheet, ViewStyle } from 'react-native';

export interface LobbyCubeAvatarProps {
  id?: string | number;
  imgUrl?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  showBorder?: boolean;
  style?: ViewStyle;
}

const sizeConfig = {
  sm: {
    fontSize: 12,
  },
  md: {
    fontSize: 14,
  },
  lg: {
    fontSize: 18,
  },
};

export default function LobbyCubeAvatar({
  id,
  imgUrl,
  name,
  size = 'md',
  showBorder = false,
  style,
}: LobbyCubeAvatarProps) {
  const config = sizeConfig[size];
  
  // Get first two letters of name (uppercase)
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '';

  return (
    <View
      style={[
        styles.container,
        {
          borderWidth: showBorder ? 2 : 1,
          borderColor: showBorder
            ? 'rgba(255, 255, 255, 0.5)'
            : 'rgba(255, 255, 255, 0.2)',
        },
        style,
      ]}
    >
      {imgUrl ? (
        <Image
          source={{ uri: imgUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : name ? (
        <View style={styles.initialsContainer}>
          <Text style={[styles.initials, { fontSize: config.fontSize }]}>
            {initials}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: 'transparent',
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  initialsContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(134, 105, 253, 0.3)', // secondary with opacity
  },
  initials: {
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});

