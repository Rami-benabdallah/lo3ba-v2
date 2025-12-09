import { Tabs } from "expo-router";
import CustomTabBar from "../../components/CustomTabBar";

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
     	screenOptions={{
        headerShown: false,

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
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="games" options={{ title: "Games" }} />
      <Tabs.Screen name="multiplayer" options={{ title: "Multiplayer" }} />
      <Tabs.Screen name="leaderboard" options={{ title: "Leaderboard" }} />
    </Tabs>
  );
}