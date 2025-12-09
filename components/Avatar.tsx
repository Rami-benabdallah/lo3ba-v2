import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export interface AvatarProps {
  id?: string | number;
  imgUrl?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  showBorder?: boolean;
}

const sizeConfig = {
  sm: {
    size: 32,
    fontSize: 12,
    container: 'w-8 h-8',
    text: 'text-xs',
  },
  md: {
    size: 48,
    fontSize: 14,
    container: 'w-12 h-12',
    text: 'text-sm',
  },
  lg: {
    size: 64,
    fontSize: 18,
    container: 'w-16 h-16',
    text: 'text-lg',
  },
};

export default function Avatar({
  id,
  imgUrl,
  name,
  size = 'md',
  showBorder = false,
}: AvatarProps) {
  const config = sizeConfig[size];
  
  // Get first two letters of name (uppercase)
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <View
      className={`${config.container} rounded-full items-center justify-center bg-secondary-light ${
        showBorder ? 'border-2 border-white' : ''
      }`}
      style={[
        styles.container,
        {
          width: config.size,
          height: config.size,
          borderRadius: config.size / 2,
          backgroundColor: '#b8a7fd', // secondary-light
          borderWidth: showBorder ? 2 : 0,
          borderColor: showBorder ? '#ffffff' : 'transparent',
        },
      ]}
    >
      {imgUrl ? (
        <Image
          source={{ uri: imgUrl }}
          className={`${config.container} rounded-full`}
          style={{
            width: config.size,
            height: config.size,
            borderRadius: config.size / 2,
          }}
          resizeMode="cover"
        />
      ) : (
        <Text
          className={`${config.text} font-bold text-secondary`}
          style={[
            styles.initials,
            {
              fontSize: config.fontSize,
              fontWeight: 'bold',
              color: '#8669fd', // secondary
            },
          ]}
        >
          {initials}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  initials: {
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});

