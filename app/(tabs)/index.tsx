import { View, ScrollView, Text } from 'react-native';
import Avatar from '../../components/Avatar';
import UserAvatarHeader from '../../components/UserAvatarHeader';
import HomeScreenTopBar from '../../components/HomeScreenTopBar';

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-transparent">
      <HomeScreenTopBar
        name="Alex Johnson"
        subtitle="Level 12 Explorer"
        imgUrl="https://i.pravatar.cc/150?img=2"
      />
    </View>
  );
}

