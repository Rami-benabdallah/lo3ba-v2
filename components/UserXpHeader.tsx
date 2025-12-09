import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

export interface UserXpHeaderProps {
  xp: number | string;
  iconName?: keyof typeof Ionicons.glyphMap;
}

const AVATAR_MD_SIZE = 48; // Height matches md avatar size
const ICON_CONTAINER_SIZE = 36; // Slightly smaller than pill height
const ICON_SIZE = 20; // Icon size inside the container

export default function UserXpHeader({
  xp,
  iconName = 'star',
}: UserXpHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name={iconName} size={ICON_SIZE} color="#ffffff" />
      </View>
      <Text style={styles.xpText}>{xp}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: AVATAR_MD_SIZE,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: AVATAR_MD_SIZE / 2, // Pill shape
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  iconContainer: {
    width: ICON_CONTAINER_SIZE,
    height: ICON_CONTAINER_SIZE,
    borderRadius: ICON_CONTAINER_SIZE / 2,
    backgroundColor: COLORS.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  xpText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

