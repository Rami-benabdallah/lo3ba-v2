import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export interface AvatarProps {
  id?: string | number;
  imgUrl?: string;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showBorder?: boolean;
  href?: string; // default: "/profile"
}

const sizeConfig = {
  xs: {
    size: 24,
    fontSize: 10,
  },
  sm: {
    size: 32,
    fontSize: 12,
  },
  md: {
    size: 48,
    fontSize: 14,
  },
  lg: {
    size: 64,
    fontSize: 18,
  },
};

export default function Avatar({
  id,
  imgUrl,
  name,
  size = 'md',
  showBorder = false,
  href = '/profile',
}: AvatarProps) {
  const router = useRouter();
  const config = sizeConfig[size];
  
  // Get first two letters of name (uppercase)
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const handlePress = () => {
    router.push(href as any);
  };

  const avatarContent = (
    <View
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
          style={[
            styles.image,
            {
              width: config.size,
              height: config.size,
              borderRadius: config.size / 2,
            },
          ]}
          resizeMode="cover"
        />
      ) : (
        <Text
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

  return (
    <Pressable onPress={handlePress}>
      {avatarContent}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  initials: {
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});

