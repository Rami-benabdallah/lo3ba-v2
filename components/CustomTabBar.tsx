import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
  index: 'home-outline',
  games: 'game-controller-outline',
  multiplayer: 'people-outline',
  leaderboard: 'trophy-outline',
};

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        
        // Ensure label is always a string
        let label: string;
        if (typeof options.tabBarLabel === 'string') {
          label = options.tabBarLabel;
        } else if (options.title) {
          label = options.title;
        } else {
          label = route.name;
        }

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const iconName = icons[route.name] || 'help-outline';

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : { selected: false }}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            {...((options as any).tabBarTestID ? { testID: (options as any).tabBarTestID } : {})}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabItem}
          >
            <View
              style={[
                isFocused ? styles.activeIconContainer : styles.inactiveIconContainer,
                { marginBottom: isFocused ? 2 : 2 },
              ]}
            >
              <Ionicons
                name={iconName}
                size={24}
                color={isFocused ? '#fff' : '#8e8e8e'}
              />
            </View>

            <Text style={[styles.label, isFocused ? styles.activeLabel : null]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingTop: 12,
    paddingBottom: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 10,
    minHeight: 72,
    maxHeight: 72,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  inactiveIconContainer: {
    // Default icon container - no background
  },
  activeIconContainer: {
    backgroundColor: COLORS.PRIMARY,
    padding: 10,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
    marginTop: -10,
  },
  label: {
    fontSize: 12,
    color: '#8e8e8e',
  },
  activeLabel: {
    color: COLORS.PRIMARY,
  },
});

