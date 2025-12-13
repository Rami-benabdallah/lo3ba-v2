import React from 'react';
import { Pressable, View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

export type SocialProvider = 'google' | 'apple' | 'facebook';

export interface SocialLoginButtonProps {
  provider: SocialProvider;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const providerConfig = {
  google: {
    icon: 'logo-google' as const,
    color: '#4285F4',
  },
  apple: {
    icon: 'logo-apple' as const,
    color: '#000000',
  },
  facebook: {
    icon: 'logo-facebook' as const,
    color: '#1877F2',
  },
};

export default function SocialLoginButton({
  provider,
  onPress,
  style,
}: SocialLoginButtonProps) {
  const config = providerConfig[provider];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          opacity: pressed ? 0.7 : 1,
        },
        style,
      ]}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={config.icon} size={24} color={config.color} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: COLORS.gray[200],
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

