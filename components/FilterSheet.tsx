import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  Pressable, 
  Switch, 
  StyleSheet, 
  Animated, 
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
  PanResponder
} from 'react-native';
import { BlurView } from 'expo-blur';
import { COLORS } from '../constants/colors';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const DEFAULT_HEIGHT = 0.6; // 60% of screen height
const MIN_HEIGHT = 0.3; // 30% minimum
const MAX_HEIGHT = 0.9; // 90% maximum

interface FilterSheetProps {
  visible: boolean;
  onClose: () => void;
}

export default function FilterSheet({ visible, onClose }: FilterSheetProps) {
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const panY = useRef(0);
  const currentHeight = useRef(DEFAULT_HEIGHT);
  const [playedBefore, setPlayedBefore] = useState(false);
  const [showOnlyNewGames, setShowOnlyNewGames] = useState(false);
  const [multiplayerOnly, setMultiplayerOnly] = useState(false);
  const [recommendedForYou, setRecommendedForYou] = useState(false);

  useEffect(() => {
    if (visible) {
      // Animate slide up when visible
      const initialY = SCREEN_HEIGHT * (1 - DEFAULT_HEIGHT);
      slideAnim.setValue(SCREEN_HEIGHT);
      Animated.spring(slideAnim, {
        toValue: initialY,
        useNativeDriver: true,
        tension: 50,
        friction: 8,
      }).start();
      panY.current = initialY;
    } else {
      // Reset position when hidden
      slideAnim.setValue(SCREEN_HEIGHT);
      panY.current = SCREEN_HEIGHT;
    }
  }, [visible]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only respond to vertical movements
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderGrant: () => {
        // Stop any ongoing animations
        slideAnim.stopAnimation((value) => {
          panY.current = value;
        });
      },
      onPanResponderMove: (_, gestureState) => {
        const newY = panY.current + gestureState.dy;
        const minY = SCREEN_HEIGHT * (1 - MAX_HEIGHT);
        const maxY = SCREEN_HEIGHT * (1 - MIN_HEIGHT);
        const clampedY = Math.max(minY, Math.min(maxY, newY));
        slideAnim.setValue(clampedY);
      },
      onPanResponderRelease: (_, gestureState) => {
        const currentY = panY.current + gestureState.dy;
        const velocity = gestureState.vy;
        
        // Determine target height based on velocity and position
        let targetHeight = DEFAULT_HEIGHT;
        const currentHeightRatio = 1 - (currentY / SCREEN_HEIGHT);
        
        if (Math.abs(velocity) > 0.5) {
          // Fast swipe - snap to min or max
          if (velocity > 0) {
            // Swiping down
            if (currentHeightRatio < 0.5) {
              // Close if below halfway
              handleClose();
              return;
            } else {
              targetHeight = DEFAULT_HEIGHT;
            }
          } else {
            // Swiping up
            targetHeight = MAX_HEIGHT;
          }
        } else {
          // Slow drag - snap to nearest snap point
          if (currentHeightRatio < 0.45) {
            handleClose();
            return;
          } else if (currentHeightRatio < 0.75) {
            targetHeight = DEFAULT_HEIGHT;
          } else {
            targetHeight = MAX_HEIGHT;
          }
        }
        
        currentHeight.current = targetHeight;
        const targetY = SCREEN_HEIGHT * (1 - targetHeight);
        panY.current = targetY;
        
        Animated.spring(slideAnim, {
          toValue: targetY,
          useNativeDriver: true,
          tension: 50,
          friction: 8,
        }).start();
      },
    })
  ).current;

  const handleClose = () => {
    // Animate slide down and call onClose
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  const handleApplyFilters = () => {
    // TODO: Apply filters logic
    handleClose();
  };

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.container} pointerEvents="box-none">
      {/* Backdrop Blur - shows content behind */}
      <BlurView
        intensity={20}
        tint="light"
        style={StyleSheet.absoluteFillObject}
      >
        <View style={styles.backdropOverlay} />
      </BlurView>

      {/* Backdrop Pressable */}
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={StyleSheet.absoluteFillObject} />
      </TouchableWithoutFeedback>

      {/* Bottom Sheet */}
      <Animated.View
        style={[
          styles.bottomSheet,
          {
            transform: [{ translateY: slideAnim }],
            height: SCREEN_HEIGHT * MAX_HEIGHT,
          },
        ]}
      >
        <View style={styles.sheetContent}>
          {/* Draggable Handle bar */}
          <View 
            style={styles.handleBarContainer}
            {...panResponder.panHandlers}
          >
            <View style={styles.handleBar} />
          </View>

          {/* Title */}
          <Text style={styles.title}>Filters</Text>

          {/* Scrollable Filter Options */}
          <ScrollView 
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            {/* Played before */}
            <View style={styles.filterRow}>
              <Text style={styles.filterLabel}>Played before</Text>
              <Switch
                value={playedBefore}
                onValueChange={setPlayedBefore}
                trackColor={{ false: '#767577', true: COLORS.PRIMARY }}
                thumbColor={playedBefore ? '#ffffff' : '#f4f3f4'}
              />
            </View>

            {/* Show only new games */}
            <View style={styles.filterRow}>
              <Text style={styles.filterLabel}>Show only new games</Text>
              <Switch
                value={showOnlyNewGames}
                onValueChange={setShowOnlyNewGames}
                trackColor={{ false: '#767577', true: COLORS.PRIMARY }}
                thumbColor={showOnlyNewGames ? '#ffffff' : '#f4f3f4'}
              />
            </View>

            {/* Multiplayer only */}
            <View style={styles.filterRow}>
              <Text style={styles.filterLabel}>Multiplayer only</Text>
              <Switch
                value={multiplayerOnly}
                onValueChange={setMultiplayerOnly}
                trackColor={{ false: '#767577', true: COLORS.PRIMARY }}
                thumbColor={multiplayerOnly ? '#ffffff' : '#f4f3f4'}
              />
            </View>

            {/* Recommended for you */}
            <View style={styles.filterRow}>
              <Text style={styles.filterLabel}>Recommended for you</Text>
              <Switch
                value={recommendedForYou}
                onValueChange={setRecommendedForYou}
                trackColor={{ false: '#767577', true: COLORS.PRIMARY }}
                thumbColor={recommendedForYou ? '#ffffff' : '#f4f3f4'}
              />
            </View>
          </ScrollView>

          {/* Apply Filters Button */}
          <Pressable
            style={styles.applyButton}
            onPress={handleApplyFilters}
          >
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </Pressable>
        </View>
      </Animated.View>
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
    zIndex: 1000,
  },
  backdropOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  sheetContent: {
    flex: 1,
    padding: 24,
    paddingTop: 12,
  },
  handleBarContainer: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: '#D4D4D8',
    borderRadius: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
  },
  scrollView: {
    flex: 1,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  filterLabel: {
    fontSize: 16,
    color: '#000000',
  },
  applyButton: {
    width: '100%',
    height: 48,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  applyButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
