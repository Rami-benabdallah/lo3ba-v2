import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={{ $$css: true, _: 'flex-1 bg-white items-center justify-center' } as any}>
      <Text style={{ $$css: true, _: 'text-2xl font-bold bg-blue-500 text-white px-4 py-2 rounded-lg' } as any}>
        Hello World
      </Text>
    </View>
  );
}

