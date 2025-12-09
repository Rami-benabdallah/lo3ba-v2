import React, { useEffect, useRef } from 'react';
import { View, Text, StyleProp, ViewStyle, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/colors';

export interface ProgressBarProps {
  value: number; // 0-100
  leftText?: string;
  rightText?: string;
  className?: string;
  style?: StyleProp<ViewStyle>;
  height?: number; // default 12
  borderRadius?: number; // default 999 (fully rounded)
}

export default function ProgressBar({
  value,
  leftText,
  rightText,
  className = '',
  style,
  height = 12,
  borderRadius = 999,
}: ProgressBarProps) {
  // Clamp value between 0 and 100
  const clampedValue = Math.max(0, Math.min(100, value));
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: clampedValue,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [clampedValue, animatedWidth]);

  return (
    <View className={`${className}`.trim()} style={style}>
      {/* Progress bar container */}
      <View
        style={{
          height,
          borderRadius,
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          borderWidth: 1.5,
          borderColor: 'rgba(255, 255, 255, 1)',
          overflow: 'hidden',
        }}
      >
        {/* Animated fill gradient */}
        <Animated.View
          style={{
            height: '100%',
            width: animatedWidth.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
            borderRadius,
          }}
        >
          <LinearGradient
            colors={['#FACC15', COLORS.PRIMARY]} // yellow-400 to PRIMARY
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              flex: 1,
              borderRadius,
            }}
          />
        </Animated.View>
      </View>

      {/* Text row above the bar */}
      {(leftText || rightText) && (
        <View className="flex-row justify-between items-center mb-2">
          {leftText && (
            <Text className="text-white text-xs">{leftText}</Text>
          )}
          {rightText && (
            <Text className="text-white/80 text-xs">{rightText}</Text>
          )}
        </View>
      )}
    </View>
  );
}

