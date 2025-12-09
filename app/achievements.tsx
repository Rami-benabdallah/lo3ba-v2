import { View, Text } from 'react-native';
import HeaderBar from '../components/HeaderBar';

export default function AchievementsScreen() {
  return (
    <View className="flex-1 bg-transparent">
      <HeaderBar title="Achievements" />
      <View className="flex-1 items-center justify-center">
        <Text className="text-white text-2xl font-bold">Achievements</Text>
      </View>
    </View>
  );
}

