import React from 'react';
import { View, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

export interface CardProps {
  children: React.ReactNode;
  padding?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'liquid' | 'transparentBlur';
  className?: string;
  style?: StyleProp<ViewStyle>;
}

const paddingValues = {
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
          style={{ ...StyleSheet.absoluteFillObject, borderRadius: radius }}
        />

        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(255,255,255,0.08)',
            borderRadius: radius,
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.18)',
          }}
        />

        <LinearGradient
          colors={[
            'rgba(255,255,255,0.28)',
            'rgba(255,255,255,0.06)',
            'rgba(255,255,255,0.01)',
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ ...StyleSheet.absoluteFillObject, borderRadius: radius }}
        />

        <View style={styles.content}>{children}</View>
      </View>
    );
  }

  // ---------------------------------------------------
  // NEW VARIANT: TRANSPARENT BLUR (floating glass)
  // ---------------------------------------------------
  if (variant === 'transparentBlur') {
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
        {/* CLEAR blur, no white wash */}
        <BlurView
          intensity={100}
          tint="default"
          style={{
            ...StyleSheet.absoluteFillObject,
            borderRadius: radius,
          }}
        />

        {/* Right-side soft white gradient */}
        <LinearGradient
          colors={[
            'rgba(255,255,255,0.02)',
            'rgba(255,255,255,0.12)', // stronger on right
          ]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{
            ...StyleSheet.absoluteFillObject,
            borderRadius: radius,
          }}
        />

        {/* Very thin Apple-style rim */}
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            borderRadius: radius,
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.15)',
          }}
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
});
