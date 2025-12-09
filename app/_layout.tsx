import { Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Platform } from "react-native";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GRADIENT_COLORS } from "../constants/colors";
import "../global.css";

export default function RootLayout() {
  // Fix the background-color issue on Web by directly manipulating the DOM
  useEffect(() => {
    if (Platform.OS === "web" && typeof document !== "undefined") {
      const fixBackgroundColors = () => {
        // Find all divs with the problematic background color
        const allDivs = document.querySelectorAll("div");
        
        allDivs.forEach((div) => {
          const htmlDiv = div as HTMLElement;
          const style = htmlDiv.style;
          const computedStyle = window.getComputedStyle(htmlDiv);
          
          // Check if it has the problematic background color
          if (
            style.backgroundColor === "rgb(242, 242, 242)" ||
            style.backgroundColor === "rgb(242,242,242)" ||
            computedStyle.backgroundColor === "rgb(242, 242, 242)" ||
            computedStyle.backgroundColor === "rgb(242,242,242)"
          ) {
            // Check if it has the React Native Web classes
            if (
              htmlDiv.className.includes("css-view-") &&
              htmlDiv.className.includes("r-flex-") &&
              htmlDiv.className.includes("r-position-")
            ) {
              // Remove the inline background-color
              htmlDiv.style.backgroundColor = "transparent";
              htmlDiv.style.background = "transparent";
            }
          }
        });
      };

      // Run immediately
      fixBackgroundColors();

      // Use MutationObserver to catch dynamically added elements
      const observer = new MutationObserver(() => {
        fixBackgroundColors();
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["style", "class"],
      });

      // Also run after a short delay to catch late-rendered elements
      const timeout = setTimeout(fixBackgroundColors, 100);
      const timeout2 = setTimeout(fixBackgroundColors, 500);

      return () => {
        observer.disconnect();
        clearTimeout(timeout);
        clearTimeout(timeout2);
      };
    }
  }, []);

  return (
    <SafeAreaProvider>
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
        />
        <View style={styles.content}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: "transparent",
              },
              // Ensure the Stack container itself is transparent on Web
              presentation: "card",
              animation: "default",
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="light" />
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "transparent", // Explicitly set transparent for Web
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