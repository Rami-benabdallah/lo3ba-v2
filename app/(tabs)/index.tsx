import { View, ScrollView, Text, StyleSheet } from 'react-native';
import HomeScreenTopBar from '../../components/HomeScreenTopBar';
import Daily from '../../components/Daily';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <HomeScreenTopBar
        name="Alex Johnson"
        subtitle="Level 12 Explorer"
        imgUrl="https://i.pravatar.cc/150?img=2"
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Daily progress={40} tasksRemaining={13} style={styles.dailyCard} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  dailyCard: {
    marginBottom: 16,
  },
});

