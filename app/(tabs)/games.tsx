import { View, ScrollView, Text, StyleSheet, Switch } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useState, useEffect, useRef } from 'react';
import { defaultGames } from '../../components/RecommendedGames';
import GameCard from '../../components/GameCard';
import HeaderBar from '../../components/HeaderBar';
import Sheet from '../../components/Sheet';
import Button from '../../components/Button';
import { COLORS } from '../../constants/colors';

export default function GamesScreen() {
  const isFocused = useIsFocused();
  const [filterVisible, setFilterVisible] = useState(false);
  const [playedBefore, setPlayedBefore] = useState(false);
  const [showOnlyNew, setShowOnlyNew] = useState(false);
  const [multiplayerOnly, setMultiplayerOnly] = useState(false);
  const [recommendedForYou, setRecommendedForYou] = useState(false);
  
  // Store initial filter values when sheet opens
  const initialFiltersRef = useRef({
    playedBefore: false,
    showOnlyNew: false,
    multiplayerOnly: false,
    recommendedForYou: false,
  });
  const prevFilterVisibleRef = useRef(false);
  
  // Reset initial values when sheet opens
  useEffect(() => {
    // Only capture initial values when sheet transitions from closed to open
    if (filterVisible && !prevFilterVisibleRef.current) {
      initialFiltersRef.current = {
        playedBefore,
        showOnlyNew,
        multiplayerOnly,
        recommendedForYou,
      };
    }
    prevFilterVisibleRef.current = filterVisible;
  }, [filterVisible, playedBefore, showOnlyNew, multiplayerOnly, recommendedForYou]);
  
  // Check if any filter has changed
  const hasFiltersChanged =
    playedBefore !== initialFiltersRef.current.playedBefore ||
    showOnlyNew !== initialFiltersRef.current.showOnlyNew ||
    multiplayerOnly !== initialFiltersRef.current.multiplayerOnly ||
    recommendedForYou !== initialFiltersRef.current.recommendedForYou;
  
  if (!isFocused) {
    return null;  // Don't render when not focused to prevent stacking
  }
  
  const handleApplyFilters = () => {
    // Apply filter logic here
    // Update initial values to current values after applying
    initialFiltersRef.current = {
      playedBefore,
      showOnlyNew,
      multiplayerOnly,
      recommendedForYou,
    };
    setFilterVisible(false);
  };
  
  return (
    <View style={styles.container}>
      <HeaderBar 
        title="Games"
        showBack={false} 
        rightIconName="filter"
        onRightPress={() => setFilterVisible(true)}
      />
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
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
      
      <Sheet
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        expandable={false}
        defaultHeight={0.6}
        padding={20}
      >
        <ScrollView 
          style={styles.filterContent}
          contentContainerStyle={styles.filterContentContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.filterTitle}>Filters</Text>
          
          <View style={styles.filterItem}>
            <View style={styles.filterItemContent}>
              <Text style={styles.filterLabel}>Played before</Text>
              <Text style={styles.filterDescription}>Show games you've played</Text>
            </View>
            <Switch
              value={playedBefore}
              onValueChange={setPlayedBefore}
              trackColor={{ false: '#E5E7EB', true: COLORS.PRIMARY }}
              thumbColor="#ffffff"
              ios_backgroundColor="#E5E7EB"
            />
          </View>
          
          <View style={styles.filterItem}>
            <View style={styles.filterItemContent}>
              <Text style={styles.filterLabel}>Show only new games</Text>
              <Text style={styles.filterDescription}>Display new releases only</Text>
            </View>
            <Switch
              value={showOnlyNew}
              onValueChange={setShowOnlyNew}
              trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
              thumbColor="#ffffff"
              ios_backgroundColor="#E5E7EB"
            />
          </View>
          
          <View style={styles.filterItem}>
            <View style={styles.filterItemContent}>
              <Text style={styles.filterLabel}>Multiplayer only</Text>
              <Text style={styles.filterDescription}>Filter multiplayer games</Text>
            </View>
            <Switch
              value={multiplayerOnly}
              onValueChange={setMultiplayerOnly}
              trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
              thumbColor="#ffffff"
              ios_backgroundColor="#E5E7EB"
            />
          </View>
          
          <View style={styles.filterItem}>
            <View style={styles.filterItemContent}>
              <Text style={styles.filterLabel}>Recommended for you</Text>
              <Text style={styles.filterDescription}>Personalized recommendations</Text>
            </View>
            <Switch
              value={recommendedForYou}
              onValueChange={setRecommendedForYou}
              trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
              thumbColor="#ffffff"
              ios_backgroundColor="#E5E7EB"
            />
          </View>
          
          <View style={styles.filterButtonContainer}>
            <Button
              text="Apply Filters"
              variant="primary"
              size="lg"
              disabled={!hasFiltersChanged}
              onPress={handleApplyFilters}
            />
          </View>
        </ScrollView>
      </Sheet>
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
  filterContent: {
    flex: 1,
  },
  filterContentContainer: {
    flexGrow: 1,
  },
  filterTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 24,
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  filterItemContent: {
    flex: 1,
    marginRight: 16,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  filterDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  filterButtonContainer: {
    marginTop: 24,
    paddingBottom: 8,
  },
});

