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
        // TODO: Navigate to actual game screen
        setTimeout(() => {
          router.back();
        }, 500);
      }
    }, 16); // ~60fps

    return () => clearInterval(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <Text style={styles.letter}>Loading...</Text>
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
  letter: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 40,
  },
  progressContainer: {
    width: '80%',
    maxWidth: 400,
  },
});
