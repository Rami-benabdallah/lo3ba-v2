import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  Pressable,
  Modal,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export interface SheetProps {
  visible: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  expandable?: boolean;
  defaultHeight?: number; // percentage of screen height (0.3-0.9)
  backgroundColor?: string;
  padding?: number;
  blurIntensity?: number;
}

export default function Sheet({
  visible,
  onClose,
  children,
  expandable = false,
  defaultHeight = 0.4,
  backgroundColor = '#ffffff',
  padding = 20,
  blurIntensity = 70,
}: SheetProps) {
  const insets = useSafeAreaInsets();
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const sheetHeight = useRef(new Animated.Value(defaultHeight * SCREEN_HEIGHT)).current;
  const currentHeightRef = useRef(defaultHeight * SCREEN_HEIGHT);
  
  const defaultSheetHeight = defaultHeight * SCREEN_HEIGHT;
  const maxSheetHeight = 0.9 * SCREEN_HEIGHT;
  const minSheetHeight = defaultSheetHeight;

  useEffect(() => {
    if (visible) {
      // Reset sheet height to default when opening
      sheetHeight.setValue(defaultSheetHeight);
      currentHeightRef.current = defaultSheetHeight;
      
      // Animate sheet up and backdrop in
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 65,
          friction: 11,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Animate sheet down and backdrop out
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: SCREEN_HEIGHT,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, defaultSheetHeight]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => expandable,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        if (!expandable) return false;
        // Only respond to vertical drags
        return Math.abs(gestureState.dy) > Math.abs(gestureState.dx) && Math.abs(gestureState.dy) > 5;
      },
      onPanResponderGrant: () => {
        // Store current height and reset animated value
        sheetHeight.setOffset(currentHeightRef.current);
        sheetHeight.setValue(0);
      },
      onPanResponderMove: (_, gestureState) => {
        if (!expandable) return;
        
        const newHeight = currentHeightRef.current - gestureState.dy;
        
        // Clamp between min and max heights
        const clampedHeight = Math.max(
          minSheetHeight,
          Math.min(maxSheetHeight, newHeight)
        );
        
        sheetHeight.setValue(clampedHeight - currentHeightRef.current);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (!expandable) return;
        
        // Calculate current height from gesture
        const newHeight = currentHeightRef.current - gestureState.dy;
        const currentHeight = Math.max(
          minSheetHeight,
          Math.min(maxSheetHeight, newHeight)
        );
        
        sheetHeight.flattenOffset();
        currentHeightRef.current = currentHeight;
        
        const velocity = -gestureState.vy;
        
        // Determine target height based on velocity and current position
        let targetHeight;
        if (Math.abs(velocity) > 0.5) {
          // Fast swipe - snap to min or max
          targetHeight = velocity > 0 ? minSheetHeight : maxSheetHeight;
        } else {
          // Slow drag - snap to nearest (min or max)
          const midPoint = (minSheetHeight + maxSheetHeight) / 2;
          targetHeight = currentHeight < midPoint ? minSheetHeight : maxSheetHeight;
        }
        
        currentHeightRef.current = targetHeight;
        Animated.spring(sheetHeight, {
          toValue: targetHeight,
          useNativeDriver: false,
          tension: 65,
          friction: 11,
        }).start();
      },
    })
  ).current;

  const handleBackdropPress = () => {
    if (onClose) {
      onClose();
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.modalContainer}>
        {/* Backdrop with blur */}
        <Animated.View
          style={[
            styles.backdrop,
            {
              opacity: backdropOpacity,
            },
          ]}
        >
          <BlurView
            intensity={blurIntensity}
            tint="dark"
            style={StyleSheet.absoluteFillObject}
          />
          <View style={styles.backdropOverlay} />
        </Animated.View>

        {/* Backdrop pressable */}
        <Pressable
          style={StyleSheet.absoluteFillObject}
          onPress={handleBackdropPress}
        />

        {/* Sheet */}
        <Animated.View
          style={[
            styles.sheet,
            {
              transform: [{ translateY }],
            },
          ]}
        >
          <Animated.View
            style={[
              styles.sheetInner,
              {
                backgroundColor,
                padding,
                paddingBottom: Math.max(padding, insets.bottom),
                height: expandable ? sheetHeight : defaultSheetHeight,
              },
            ]}
            {...(expandable ? panResponder.panHandlers : {})}
          >
            {expandable && (
              <View style={styles.grabHandleContainer}>
                <View style={styles.grabHandle} />
              </View>
            )}
            <View style={styles.sheetContent}>{children}</View>
          </Animated.View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  backdropOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  sheet: {
    width: '100%',
  },
  sheetInner: {
    width: '100%',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 16,
  },
  grabHandleContainer: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 8,
  },
  grabHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D1D5DB',
  },
  sheetContent: {
    flex: 1,
  },
});
