import { View, ScrollView, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';
import ExploreScreenTopBar from '../../components/ExploreScreenTopBar';
import Daily from '../../components/Daily';
import RecommendedGames from '../../components/RecommendedGames';

export default function ExploreScreen() {
  const router = useRouter();
  const isFocused = useIsFocused();

  const handleViewAllPress = () => {
    router.push('/(tabs)/games' as any);
  };

  if (!isFocused) {
    return null;  // Don't render when not focused to prevent stacking
  }

  return (
    <View style={styles.container}>
      <ExploreScreenTopBar
        name="Alex Johnson"
        subtitle="Level 12 Explorer"
        imgUrl="https://i.pravatar.cc/150?img=2"
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Daily progress={40} tasksRemaining={13} style={styles.dailyCard} />
        
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended games</Text>
          <Pressable onPress={handleViewAllPress}>
            <Text style={styles.sectionSecondaryTitle}>View all</Text>
          </Pressable>
        </View>
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionSecondaryTitle: {
    color: '#ffffff',
    fontSize: 12,
  },
  recommendedGames: {
    marginBottom: 16,
  },
});

