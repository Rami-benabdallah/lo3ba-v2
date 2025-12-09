import { View, ScrollView, Text } from 'react-native';
import Avatar from '../../components/Avatar';
import UserAvatarHeader from '../../components/UserAvatarHeader';
import HomeScreenTopBar from '../../components/HomeScreenTopBar';
import Card from '../../components/Card';

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-transparent">
      <HomeScreenTopBar
        name="Alex Johnson"
        subtitle="Level 12 Explorer"
        imgUrl="https://i.pravatar.cc/150?img=2"
      />
      <ScrollView className="flex-1">
        <Card padding="lg" variant="transparentBlur" className="mx-4 mt-6">
          <Text className="text-white text-lg">Transparent Blur Card</Text>
          <Text className="text-white/80">This is a larger example card</Text>
        </Card>
      </ScrollView>
    </View>
  );
}

