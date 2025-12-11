import React from 'react';
import { View, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

export interface CardProps {
  children: React.ReactNode;
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'liquid' | 'liquidWhite';
  className?: string;
  style?: StyleProp<ViewStyle>;
}

const paddingValues = {
  none: 0,
  xs: 8, // p-2 = 8px
  sm: 12, // p-3 = 12px
  md: 20, // p-5 = 20px
  lg: 32, // p-8 = 32px
};

export default function Card({
  children,
  padding = 'md',
  variant = 'solid',
  className = '',
  style,
}: CardProps) {
  const paddingValue = paddingValues[padding];
  const radius = 24; // rounded-3xl

  // ---------------------------------------------------
  // LIQUID VARIANT (Apple glass)
  // ---------------------------------------------------
  if (variant === 'liquid') {
    return (
      <View
        style={[
          styles.base,
          {
            borderRadius: radius,
            padding: paddingValue,
          },
          style,
        ]}
      >
        <BlurView
          intensity={10}
          tint="default"
          style={[styles.absoluteFill, { borderRadius: radius }]}
        />

        <View
          style={[styles.absoluteFill, styles.liquidOverlay, { borderRadius: radius }]}
        />

        <LinearGradient
          colors={[
            'rgba(255,255,255,0.28)',
            'rgba(255,255,255,0.06)',
            'rgba(255,255,255,0.01)',
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.absoluteFill, { borderRadius: radius }]}
        />

        <View style={styles.content}>{children}</View>
      </View>
    );
  }

  // ---------------------------------------------------
  // LIQUID WHITE VARIANT (whiter liquid glass)
  // ---------------------------------------------------
  if (variant === 'liquidWhite') {
    return (
      <View
        style={[
          styles.base,
          {
            borderRadius: radius,
            padding: paddingValue,
          },
          style,
        ]}
      >
        <BlurView
          intensity={10}
          tint="default"
          style={[styles.absoluteFill, { borderRadius: radius }]}
        />

        <View
          style={[styles.absoluteFill, styles.liquidWhiteOverlay, { borderRadius: radius }]}
        />

        <LinearGradient
          colors={[
            'rgba(255,255,255,0.45)',
            'rgba(255,255,255,0.15)',
            'rgba(255,255,255,0.05)',
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.absoluteFill, { borderRadius: radius }]}
        />

        <View style={styles.content}>{children}</View>
      </View>
    );
  }

  // ---------------------------------------------------
  // SOLID VARIANT
  // ---------------------------------------------------
  return (
    <View
      style={[
        styles.base,
        styles.solid,
        {
          borderRadius: radius,
          padding: paddingValue,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
    position: 'relative',
  },
  solid: {
    backgroundColor: '#ffffff',
  },
  content: {
    position: 'relative',
    zIndex: 10,
  },
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
  liquidOverlay: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  liquidWhiteOverlay: {
    backgroundColor: 'rgba(255,255,255,0.20)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },
});
