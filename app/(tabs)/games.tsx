import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { defaultGames } from '../../components/RecommendedGames';
import GameCard from '../../components/GameCard';

export default function GamesScreen() {
  const isFocused = useIsFocused();
  
  if (!isFocused) {
    return null;  // Don't render when not focused to prevent stacking
  }
  
  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>All Games</Text>
        <View style={styles.gamesGrid}>
          {defaultGames.map((game, index) => (
            <View key={index} style={styles.gameCardWrapper}>
              <GameCard
                gameName={game.gameName}
                iconName={game.iconName}
                players={game.players}
                rank={game.rank}
                rankIconName={game.rankIconName}
                energyIconName={game.energyIconName}
              />
            </View>
          ))}
        </View>
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
    paddingBottom: 24,
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  gamesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gameCardWrapper: {
    width: '48%',
    marginBottom: 12,
  },
});

