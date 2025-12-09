import { View, Text, StyleSheet } from 'react-native';
import HeaderBar from '../components/HeaderBar';

export default function AchievementsScreen() {
  return (
    <View style={styles.container}>
      <HeaderBar title="Achievements" />
      <View style={styles.content}>
        <Text style={styles.text}>Achievements</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  text: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

