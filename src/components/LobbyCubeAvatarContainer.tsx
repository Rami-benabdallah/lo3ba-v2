import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import LobbyCubeAvatar, { LobbyCubeAvatarProps } from './LobbyCubeAvatar';

export interface LobbyCubeAvatarContainerProps {
  users?: LobbyCubeAvatarProps[];
  style?: ViewStyle;
}

export default function LobbyCubeAvatarContainer({
  users = [],
  style,
}: LobbyCubeAvatarContainerProps) {
  // Ensure we have 6 slots (fill empty slots with undefined)
  const slots = Array.from({ length: 6 }, (_, index) => users[index]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.gridContainer}>
        {/* Row 1 */}
        <View style={styles.row}>
          <LobbyCubeAvatar {...(slots[0] || {})} style={styles.cube} />
          <LobbyCubeAvatar {...(slots[1] || {})} style={styles.cube} />
        </View>
        {/* Row 2 */}
        <View style={styles.row}>
          <LobbyCubeAvatar {...(slots[2] || {})} style={styles.cube} />
          <LobbyCubeAvatar {...(slots[3] || {})} style={styles.cube} />
        </View>
        {/* Row 3 */}
        <View style={styles.row}>
          <LobbyCubeAvatar {...(slots[4] || {})} style={styles.cube} />
          <LobbyCubeAvatar {...(slots[5] || {})} style={styles.cube} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridContainer: {
    width: '100%',
    maxWidth: 280,
    gap: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  cube: {
    flex: 1,
    minWidth: 0,
  },
});

