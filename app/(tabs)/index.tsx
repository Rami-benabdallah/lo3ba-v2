import { View, ScrollView, Text, StyleSheet } from 'react-native';
import ExploreScreenTopBar from '@/components/ExploreScreenTopBar';
import Daily from '../../components/Daily';
import RecommendedGames from '../../components/RecommendedGames';

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <ExploreScreenTopBar
        name="Alex Johnson"
        subtitle="Level 12 Explorer"
        imgUrl="https://i.pravatar.cc/150?img=2"
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Daily progress={40} tasksRemaining={13} style={styles.dailyCard} />
        
        <Text style={styles.sectionTitle}>Recommended games</Text>
        <RecommendedGames style={styles.recommendedGames} />
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
  sectionTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 16,
  },
  recommendedGames: {
    marginBottom: 16,
  },
});

