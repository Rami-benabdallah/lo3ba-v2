import { Tabs } from "expo-router";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import CustomTabBar from "../../components/CustomTabBar";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const [isFocused, setIsFocused] = useState(true);

  useFocusEffect(
    useCallback(() => {
      // Show tab bar when tabs layout is focused
      setIsFocused(true);
      return () => {
        // Hide tab bar immediately when tabs layout loses focus (navigating away)
        setIsFocused(false);
      };
    }, [])
  );
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Tabs
        tabBar={(props) => (isFocused ? <CustomTabBar {...props} /> : null)}
        screenOptions={{
          headerShown: false,
          lazy: true,  // Only mount screens when they're focused

          sceneStyle: {
            backgroundColor: "transparent",  // ← REQUIRED FOR TRANSPARENT PAGES
          },

          tabBarStyle: {
            position: "absolute",
            backgroundColor: "transparent",  // Tab bar container stays transparent
            borderTopWidth: 0,
            elevation: 0,
            zIndex: 1, // Ensure proper layering
          },

          tabBarBackground: () => null,
        }}
      >
        <Tabs.Screen name="index" options={{ title: "Explore" }} />
        <Tabs.Screen name="games" options={{ title: "Games" }} />
        <Tabs.Screen name="multiplayer" options={{ title: "Multiplayer" }} />
        <Tabs.Screen name="leaderboard" options={{ title: "Leaderboard" }} />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    overflow: "hidden",  // Prevent screens from stacking visually
  },
});