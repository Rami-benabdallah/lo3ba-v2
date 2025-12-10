import React from 'react';
import { View, Text, Pressable, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export interface HeaderBarProps {
  title?: string;
  showBack?: boolean; // default true
  leftIcon?: React.ReactNode; // Custom left icon (overrides default back button)
  onLeftPress?: () => void; // Custom left icon handler (defaults to router.back())
  rightIcon?: React.ReactNode;
  onRightPress?: () => void;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

export default function HeaderBar({
  title,
  showBack = true,
  leftIcon,
  onLeftPress,
  rightIcon,
  onRightPress,
  className = '',
  style,
}: HeaderBarProps) {
  const router = useRouter();

  const handleLeftPress = () => {
    if (onLeftPress) {
      onLeftPress();
    } else {
      router.back();
    }
  };

  return (
    <View style={[styles.container, style]}>
      {/* Left: Back button, custom icon, or spacer */}
      <View style={styles.leftContainer}>
        {showBack ? (
          <Pressable
            onPress={handleLeftPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <View style={styles.iconButton}>
              {leftIcon ? (
                leftIcon
              ) : (
                <Ionicons name="chevron-back" size={20} color="#000000" />
              )}
            </View>
          </Pressable>
        ) : null}
      </View>

      {/* Center: Title */}
      <View style={styles.centerContainer}>
        {title && (
          <Text style={styles.title}>{title}</Text>
        )}
      </View>

      {/* Right: Right icon or spacer */}
      <View style={styles.rightContainer}>
        {rightIcon ? (
          <Pressable
            onPress={onRightPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <View style={styles.iconButton}>
              {rightIcon}
            </View>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'transparent',
  },
  leftContainer: {
    width: 40,
    alignItems: 'flex-start',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});

