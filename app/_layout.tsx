import { Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Platform } from "react-native";
import { useEffect, useState, useRef } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GRADIENT_COLORS } from "../constants/colors";
import "../global.css";

export default function RootLayout() {
  // Animate gradient movement with circular rotation
  const [gradientAngle, setGradientAngle] = useState(0);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTimeRef.current;
      // Much slower: 90 seconds for full rotation (was 20 seconds)
      const duration = 5000;
      // Continuous angle that keeps increasing (no modulo jump)
      const angle = (elapsed / duration) * Math.PI * 2;
      
      setGradientAngle(angle);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Calculate animated gradient positions in a circular pattern
  // This creates a rotating gradient effect
  const radius = 0.6; // How far from center the gradient points move
  const centerX = 0.5;
  const centerY = 0.5;
  
  // Clamp values between 0 and 1 for gradient coordinates
  const startX = Math.max(0, Math.min(1, centerX + Math.cos(gradientAngle) * radius));
  const startY = Math.max(0, Math.min(1, centerY + Math.sin(gradientAngle) * radius));
  const endX = Math.max(0, Math.min(1, centerX + Math.cos(gradientAngle + Math.PI) * radius));
  const endY = Math.max(0, Math.min(1, centerY + Math.sin(gradientAngle + Math.PI) * radius));

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
            GRADIENT_COLORS.SECONDARY_MEDIUM,
            GRADIENT_COLORS.SECONDARY_LIGHT,
            GRADIENT_COLORS.SECONDARY_LIGHTER,
            GRADIENT_COLORS.SECONDARY_LIGHTEST,
          ]}
          start={{ x: startX, y: startY }}
          end={{ x: endX, y: endY }}
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
              animationDuration: 150, // Faster transition for smoother feel
              gestureEnabled: true,
              gestureDirection: "horizontal",
            }}
          >
            <Stack.Screen 
              name="(tabs)" 
              options={{ 
                headerShown: false,
                animation: "default",
              }} 
            />
            <Stack.Screen 
              name="profile" 
              options={{ 
                headerShown: false,
                animation: "slide_from_right",
                animationDuration: 150,
                gestureEnabled: true,
                gestureDirection: "horizontal",
                contentStyle: {
                  backgroundColor: "transparent",
                },
              }} 
            />
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