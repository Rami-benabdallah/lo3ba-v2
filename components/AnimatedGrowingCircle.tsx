import React, { useEffect, useMemo, useRef } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
  withSequence,
  SharedValue,
} from 'react-native-reanimated';
import { COLORS } from '../constants/colors';

export interface AnimatedGrowingCircleProps {
  /**
   * Number of circles to render
   * @default 3
   */
  count?: number;
  /**
   * Color of the circle border
   * @default COLORS.SECONDARY_DARK
   */
  color?: string;
  /**
   * Base size (diameter) of the circle
   * @default 60
   */
  size?: number;
  /**
   * Border width of the circle
   * @default 1
   */
  borderWidth?: number;
  /**
   * Maximum scale the circle grows to
   * @default 5
   */
  maxScale?: number;
  /**
   * Initial opacity
   * @default 0.6
   */
  initialOpacity?: number;
  /**
   * Final opacity (fades to this value)
   * @default 0
   */
  finalOpacity?: number;
  /**
   * Animation duration in milliseconds
   * @default 3000
   */
  duration?: number;
  /**
   * Delay between each circle animation in milliseconds
   * @default 1000
   */
  delay?: number;
  /**
   * Custom container style
   */
  containerStyle?: ViewStyle;
}

// Single circle component
function SingleCircle({
  scale,
  opacity,
  size,
  borderWidth,
  color,
}: {
  scale: SharedValue<number>;
  opacity: SharedValue<number>;
  size: number;
  borderWidth: number;
  color: string;
}) {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: -(size / 2) }, // Center horizontally
      { translateY: -(size / 2) }, // Center vertically  
      { scale: scale.value }, // Scale from center
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.circle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth,
          borderColor: color,
        },
        animatedStyle,
      ]}
    />
  );
}

export default function AnimatedGrowingCircle({
  count = 2,
  color = COLORS.SECONDARY_DARK,
  size = 100,
  borderWidth = 1,
  maxScale = 5,
  initialOpacity = 0.6,
  finalOpacity = 0,
  duration = 3000,
  delay = 1000,
  containerStyle,
}: AnimatedGrowingCircleProps) {
  // Create shared values at top level - hooks must be called unconditionally
  // Create a reasonable maximum to handle dynamic count changes
  // Hooks must be called directly, not inside useMemo or other hooks
  const MAX_CIRCLES = 10;
  
  // Create all hooks at top level - React requires consistent hook calls
  const scale0 = useSharedValue(1);
  const scale1 = useSharedValue(1);
  const scale2 = useSharedValue(1);
  const scale3 = useSharedValue(1);
  const scale4 = useSharedValue(1);
  const scale5 = useSharedValue(1);
  const scale6 = useSharedValue(1);
  const scale7 = useSharedValue(1);
  const scale8 = useSharedValue(1);
  const scale9 = useSharedValue(1);
  
  const opacity0 = useSharedValue(initialOpacity);
  const opacity1 = useSharedValue(initialOpacity);
  const opacity2 = useSharedValue(initialOpacity);
  const opacity3 = useSharedValue(initialOpacity);
  const opacity4 = useSharedValue(initialOpacity);
  const opacity5 = useSharedValue(initialOpacity);
  const opacity6 = useSharedValue(initialOpacity);
  const opacity7 = useSharedValue(initialOpacity);
  const opacity8 = useSharedValue(initialOpacity);
  const opacity9 = useSharedValue(initialOpacity);
  
  // Create arrays from the shared values - memoize to keep stable references
  const allScales = useMemo(() => [scale0, scale1, scale2, scale3, scale4, scale5, scale6, scale7, scale8, scale9], []);
  const allOpacities = useMemo(() => [opacity0, opacity1, opacity2, opacity3, opacity4, opacity5, opacity6, opacity7, opacity8, opacity9], []);
  
  // Get the slices we need - memoize to avoid recreating on every render
  const scales = useMemo(() => allScales.slice(0, count), [allScales, count]);
  const opacities = useMemo(() => allOpacities.slice(0, count), [allOpacities, count]);

  // Start animations for all circles
  useEffect(() => {
    scales.forEach((scale, index) => {
      const circleDelay = index * delay;
      // All circles start immediately from scale 1, but each cycle includes a delay
      scale.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 0 }), // Reset to start instantly
          withDelay(circleDelay, withTiming(1, { duration: 0 })), // Wait for delay
          withTiming(maxScale, { duration }) // Then animate
        ),
        -1, // infinite repeat
        false // don't reverse
      );
    });

    opacities.forEach((opacity, index) => {
      const circleDelay = index * delay;
      // All circles start immediately from initialOpacity, but each cycle includes a delay
      opacity.value = withRepeat(
        withSequence(
          withTiming(initialOpacity, { duration: 0 }), // Reset to start instantly
          withDelay(circleDelay, withTiming(initialOpacity, { duration: 0 })), // Wait for delay
          withTiming(finalOpacity, { duration }) // Then animate
        ),
        -1, // infinite repeat
        false // don't reverse
      );
    });
  }, [scales, opacities, maxScale, finalOpacity, initialOpacity, duration, delay]);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.circlesWrapper}>
        {scales.map((scale, index) => (
          <SingleCircle
            key={index}
            scale={scale}
            opacity={opacities[index]}
            size={size}
            borderWidth={borderWidth}
            color={color}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
    pointerEvents: 'none',
  },
  circlesWrapper: {
    // Wrapper is centered by parent flexbox
    // All circles inside will be positioned at the same point
  },
  circle: {
    backgroundColor: 'transparent',
    position: 'absolute',
    // Circles are absolutely positioned and centered using translate transforms
    // All circles start at the exact same point (center of screen)
  },
});