import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';
import 'react-native-reanimated';
import '../global.css';
import { GRADIENT_COLORS } from '../constants/colors';

export default function RootLayout() {
  return (
    <LinearGradient
      colors={[
        GRADIENT_COLORS.SECONDARY,
        GRADIENT_COLORS.SECONDARY_LIGHT,
        GRADIENT_COLORS.SECONDARY_LIGHTEST,
      ]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.gradient}
    >
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});
