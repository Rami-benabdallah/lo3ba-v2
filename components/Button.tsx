import React from 'react';
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, PRIMARY_GRADIENT_COLORS } from '../constants/colors';

export interface ButtonProps {
  text?: string;
  variant?: 'primary' | 'secondary' | 'radiant';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

export default function Button({
  text,
  variant = 'primary',
  size = 'md',
  disabled = false,
  leftIcon,
  rightIcon,
  onPress,
  style,
  containerStyle,
}: ButtonProps) {
  const isIconOnly = !text && (leftIcon || rightIcon);
  const icon = leftIcon || rightIcon;

  const handlePress = () => {
    if (!disabled && onPress) {
      onPress();
    }
  };

  const getBackgroundColor = () => {
    if (variant === 'radiant') {
      return 'transparent'; // Gradient will handle the background
    }
    return variant === 'primary' ? COLORS.PRIMARY : COLORS.SECONDARY;
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          height: 40,
          paddingHorizontal: 14,
          fontSize: 14,
          borderRadius: 12,
        };
      case 'md':
        return {
          height: 48,
          paddingHorizontal: 18,
          fontSize: 16,
          borderRadius: 12,
        };
      case 'lg':
        return {
          height: 56,
          paddingHorizontal: 22,
          fontSize: 18,
          borderRadius: 16,
        };
      default:
        return {
          height: 48,
          paddingHorizontal: 18,
          fontSize: 16,
          borderRadius: 12,
        };
    }
  };

  const sizeStyles = getSizeStyles();

  const buttonContent = (
    <View style={styles.content}>
      {isIconOnly ? (
        // Icon-only mode: center the icon
        <View style={styles.iconOnlyContainer}>
          {icon}
        </View>
      ) : (
        // Text mode: render icons and text
        <>
          {leftIcon && (
            <View style={styles.leftIconContainer}>
              {leftIcon}
            </View>
          )}
          {text && (
            <Text
              style={[
                styles.text,
                variant === 'radiant' && styles.textRadiant,
                {
                  fontSize: sizeStyles.fontSize,
                },
              ]}
            >
              {text}
            </Text>
          )}
          {rightIcon && (
            <View style={styles.rightIconContainer}>
              {rightIcon}
            </View>
          )}
        </>
      )}
    </View>
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <Pressable
        onPress={handlePress}
        disabled={disabled}
        style={({ pressed }) => [
          styles.button,
          {
            height: sizeStyles.height,
            paddingHorizontal: isIconOnly ? 0 : sizeStyles.paddingHorizontal,
            borderRadius: sizeStyles.borderRadius,
            opacity: disabled ? 0.5 : pressed ? 0.8 : 1,
            width: isIconOnly ? sizeStyles.height : 'auto',
          },
          variant !== 'radiant' && {
            backgroundColor: getBackgroundColor(),
          },
          style,
        ]}
      >
        {variant === 'radiant' ? (
          <LinearGradient
            colors={[
              PRIMARY_GRADIENT_COLORS.PRIMARY_LIGHTER,
              PRIMARY_GRADIENT_COLORS.PRIMARY_LIGHT,
              PRIMARY_GRADIENT_COLORS.PRIMARY_MEDIUM,
              PRIMARY_GRADIENT_COLORS.PRIMARY,
            ]}
            locations={[0, 0.3, 0.6, 0.8, 1]}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={[
              styles.gradient,
              {
                height: sizeStyles.height,
                borderRadius: sizeStyles.borderRadius,
              },
            ]}
          >
            {buttonContent}
          </LinearGradient>
        ) : (
          buttonContent
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Container wrapper for external styling
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  gradient: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#ffffff',
    fontWeight: '600',
  },
  textRadiant: {
    color: COLORS.PRIMARY_TEXT,
  },
  leftIconContainer: {
    marginRight: 8,
  },
  rightIconContainer: {
    marginLeft: 8,
  },
  iconOnlyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
