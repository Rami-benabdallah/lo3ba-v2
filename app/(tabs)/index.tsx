import { View, ScrollView, Text } from 'react-native';
import Avatar from '../../components/Avatar';
import UserAvatarHeader from '../../components/UserAvatarHeader';
import HomeScreenTopBar from '../../components/HomeScreenTopBar';
import Card from '../../components/Card';
import ProgressBar from '../../components/ProgressBar';
import Daily from '../../components/Daily';

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-transparent">
      <HomeScreenTopBar
        name="Alex Johnson"
        subtitle="Level 12 Explorer"
        imgUrl="https://i.pravatar.cc/150?img=2"
      />
      <ScrollView className="flex-1">
        <Daily progress={40} tasksRemaining={13} className="mx-4 mt-6" />
      </ScrollView>
    </View>
  );
}

