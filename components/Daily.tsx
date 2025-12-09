import React from 'react';
import { View, Text, StyleProp, ViewStyle, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Card from './Card';
import ProgressBar from './ProgressBar';
import { GRADIENT_COLORS } from '../constants/colors';

export interface DailyProps {
  tasksRemaining?: number; // default: 13
  progress?: number; // default: 40
  href?: string; // default: "/achievements"
  className?: string;
  style?: StyleProp<ViewStyle>;
}

export default function Daily({
  tasksRemaining = 13,
  progress = 40,
  href = '/achievements',
  className = '',
  style,
}: DailyProps) {
  const router = useRouter();
  const description = `${tasksRemaining} tasks not finished yet`;
  const progressText = `${progress}%`;

  const handlePress = () => {
    router.push(href as any);
  };

  return (
    <Pressable onPress={handlePress}>
      <Card
        variant="transparentBlur"
        padding="md"
        style={style}
      >
      <View style={styles.row}>
        {/* SECTION 1: LEFT SIDE (1/3 width) */}
        <View style={styles.leftSection}>
          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: "#fff",
                opacity: 0.4,
                aspectRatio: 1,
              },
            ]}
          >
            <Ionicons name="analytics-outline" size={40} color="#8669fd" />
          </View>
        </View>

        {/* SECTION 2: RIGHT SIDE (2/3 width) */}
        <View style={styles.rightSection}>
            <View style={styles.textContainer}>
                {/* Title */}
                <Text style={styles.title}>Daily</Text>

                {/* Description */}
                <Text style={styles.description}>{description}</Text>
            </View>

            {/* ProgressBar */}
            <ProgressBar
                value={progress}
                leftText="Progress"
                rightText={progressText}
                style={styles.progressBar}
            />
        </View>
      </View>
    </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftSection: {
    width: '33.333%',
    paddingRight: 12,
  },
  iconContainer: {
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSection: {
    flex: 1,
    height: '100%',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  description: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginTop: 4,
  },
  progressBar: {
    marginTop: 8,
  },
});

