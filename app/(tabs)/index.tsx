import { View, ScrollView, Text } from 'react-native';
import Avatar from '../../components/Avatar';
import UserAvatarHeader from '../../components/UserAvatarHeader';

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-transparent">
      <View className="flex-1 items-center justify-center bg-transparent py-8">
        {/* Example #1 - Avatar with border, no image */}
        <View className="mb-8">
          <Avatar id="1" name="Alex Johnson" size="lg" showBorder={true} />
        </View>

        {/* Example #2 - UserAvatarHeader with subtitle only */}
        <View className="mb-8">
          <UserAvatarHeader
            name="Sarah Mills"
            size="md"
            showBorder={true}
            subtitle="Welcome back!"
          />
        </View>

        {/* Example #3 - UserAvatarHeader with subtitle */}
        <View className="mb-8">
          <UserAvatarHeader
            name="David Brown"
            size="sm"
            showBorder={false}
            subtitle="You have 3 new messages"
          />
        </View>

        {/* Example #4 - Avatar with image and border */}
        <View className="mb-8">
          <Text className="text-white text-sm mb-2">With Image & Border</Text>
          <Avatar
            id="4"
            name="Emma Watson"
            imgUrl="https://i.pravatar.cc/150?img=1"
            size="lg"
            showBorder={true}
          />
        </View>

        {/* Example #5 - Avatar with image, no border */}
        <View className="mb-8">
          <Text className="text-white text-sm mb-2">With Image, No Border</Text>
          <Avatar
            id="5"
            name="Tom Hanks"
            imgUrl="https://i.pravatar.cc/150?img=2"
            size="md"
            showBorder={false}
          />
        </View>

        {/* Example #6 - UserAvatarHeader with image and border */}
        <View className="mb-8">
          <Text className="text-white text-sm mb-2">Header with Image & Border</Text>
          <UserAvatarHeader
            name="Jennifer Lopez"
            imgUrl="https://i.pravatar.cc/150?img=3"
            size="md"
            showBorder={true}
            subtitle="Online now"
          />
        </View>

        {/* Example #7 - Small avatar with image and border */}
        <View className="mb-8">
          <Text className="text-white text-sm mb-2">Small with Image & Border</Text>
          <Avatar
            id="7"
            name="Chris Evans"
            imgUrl="https://i.pravatar.cc/150?img=4"
            size="sm"
            showBorder={true}
          />
        </View>

        {/* Example #8 - UserAvatarHeader with image, no border */}
        <View>
          <Text className="text-white text-sm mb-2">Header with Image, No Border</Text>
          <UserAvatarHeader
            name="Robert Downey"
            imgUrl="https://i.pravatar.cc/150?img=5"
            size="lg"
            showBorder={false}
            subtitle="Last seen 2 hours ago"
          />
        </View>
      </View>
    </ScrollView>
  );
}

