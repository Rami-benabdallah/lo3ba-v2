import { View, Text } from 'react-native';
import HeaderBar from '../components/HeaderBar';

export default function ProfileScreen() {
  return (
    <View className="flex-1 bg-transparent">
      <HeaderBar title="Profile" />
      <View className="flex-1 items-center justify-center">
        <Text className="text-white text-2xl font-bold">Profile</Text>
      </View>
    </View>
  );
}

