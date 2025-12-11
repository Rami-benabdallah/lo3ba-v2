import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ProgressBar from '../components/ProgressBar';

export default function GameLoadingScreen() {
  const params = useLocalSearchParams<{
    gameId: string;
    gameName: string;
    mode: 'solo' | 'online' | 'local';
  }>();
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState(1);

  // Animate dots: 1, 2, 3, 1, 2, 3...
  useEffect(() => {
    const dotsTimer = setInterval(() => {
      setDots((prev) => (prev >= 3 ? 1 : prev + 1));
    }, 500); // Change every 500ms

    return () => clearInterval(dotsTimer);
  }, []);

  useEffect(() => {
    // Animate progress from 0 to 100 over 5 seconds
    const duration = 5000; // 5 seconds
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(100, (elapsed / duration) * 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(timer);
        // Navigate to game screen after loading completes
        setTimeout(() => {
          if (params.mode === 'solo' && params.gameId === '9-lives') {
            router.replace('/solo-nine-lives');
          } else {
            // For other games or modes, navigate back
            router.back();
          }
        }, 500);
      }
    }, 16); // ~60fps

    return () => clearInterval(timer);
  }, [router, params.mode, params.gameId]);

  return (
    <View style={styles.container}>
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading</Text>
        <View style={styles.dotsContainer}>
          <Text style={styles.dots}>{'.'.repeat(dots)}</Text>
        </View>
      </View>
      <View style={styles.progressContainer}>
        <ProgressBar value={progress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  loadingText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  dotsContainer: {
    width: 30, // Fixed width to prevent shifting
    alignItems: 'flex-start',
  },
  dots: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  progressContainer: {
    width: '80%',
    maxWidth: 400,
  },
});
