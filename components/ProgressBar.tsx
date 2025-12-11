import React, { useEffect, useRef } from 'react';
import { View, Text, StyleProp, ViewStyle, Animated, StyleSheet } from 'react-native';
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
  reverse?: boolean; // if true, starts full and empties (for countdown timers)
}

export default function ProgressBar({
  value,
  leftText,
  rightText,
  className = '',
  style,
  height = 12,
  borderRadius = 999,
  reverse = false,
}: ProgressBarProps) {
  // Clamp value between 0 and 100
  const clampedValue = Math.max(0, Math.min(100, value));
  // Initialize animated value - for reverse mode, start at 100 (full), for normal mode start at 0 (empty)
  const animatedWidth = useRef(new Animated.Value(reverse ? 100 : 0)).current;
  const isInitialized = useRef(false);

  useEffect(() => {
    // On first render, set the value immediately
    if (!isInitialized.current) {
      // For reverse mode, the animated value is already initialized to 100
      // Just ensure it matches the clampedValue (which should be 100 for countdown start)
      animatedWidth.setValue(clampedValue);
      isInitialized.current = true;
      return;
    }
    
    // For reverse mode (countdown), use shorter duration for smoother real-time updates
    // For normal mode, use longer duration for smoother fill animation
    const duration = reverse ? 50 : 500;
    
    // Animate to the new value
    Animated.timing(animatedWidth, {
      toValue: clampedValue,
      duration,
      useNativeDriver: false,
    }).start();
  }, [clampedValue, animatedWidth, reverse]);

  return (
    <View style={style}>
      {/* Progress bar container */}
      <View
        style={[
          styles.progressContainer,
          {
            height,
            borderRadius,
          },
        ]}
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
        <View style={styles.textRow}>
          {leftText && (
            <Text style={styles.leftText}>{leftText}</Text>
          )}
          {rightText && (
            <Text style={styles.rightText}>{rightText}</Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  progressContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 1)',
    overflow: 'hidden',
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  leftText: {
    color: '#ffffff',
    fontSize: 12,
  },
  rightText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
  },
});

