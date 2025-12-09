import { Tabs } from "expo-router";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomTabBar from "../../components/CustomTabBar";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Tabs
        tabBar={(props) => <CustomTabBar {...props} />}
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