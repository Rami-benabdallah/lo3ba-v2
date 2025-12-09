import { Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { GRADIENT_COLORS } from "../constants/colors";

export default function RootLayout() {
  return (
    <View style={styles.container}>
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
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "transparent",
          },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>

        <StatusBar style="light" />
      </LinearGradient>
      <View style={styles.content}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: "transparent",
            },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
    backgroundColor: "transparent",
  },
});