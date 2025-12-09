import React from 'react';
import { View, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

export interface CardProps {
  children: React.ReactNode;
  padding?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'liquid';
  className?: string;
  style?: StyleProp<ViewStyle>;
}

const paddingClasses = {
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-8',
};

export default function Card({
  children,
  padding = 'md',
  variant = 'solid',
  className = '',
  style,
}: CardProps) {
  const paddingClass = paddingClasses[padding];
  const radius = 24; // Tailwind rounded-3xl ≈ 24px

  const baseClasses = `rounded-3xl ${paddingClass} ${className}`.trim();

  // --------------------------
  // LIQUID (APPLE GLASS) CARD
  // --------------------------
  if (variant === 'liquid') {
    return (
      <View
        className={baseClasses}
        style={[
          {
            overflow: 'hidden',
            position: 'relative',
            borderRadius: radius,
          },
          style,
        ]}
      >
        {/* Blur Layer */}
        <BlurView
          intensity={85}
          tint="light"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: radius,
          }}
        />

        {/* Frosted translucency */}
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            borderRadius: radius,
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.28)',
          }}
        />

        {/* Apple inner highlight */}
        <LinearGradient
          colors={[
            'rgba(255,255,255,0.45)',
            'rgba(255,255,255,0.12)',
            'rgba(255,255,255,0.02)',
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: radius,
          }}
        />

        {/* Content */}
        <View style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </View>
      </View>
    );
  }

  // --------------------------
  // SOLID WHITE CARD
  // --------------------------
  return (
    <View
      className={`${baseClasses} bg-white`}
      style={[
        {
          borderRadius: radius,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}