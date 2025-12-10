import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useState, useEffect, useRef } from 'react';
import { defaultGames, Game } from '../../components/RecommendedGames';
import GameCard from '../../components/GameCard';
import HeaderBar from '../../components/HeaderBar';
import Sheet from '../../components/Sheet';
import Button from '../../components/Button';
import Switch from '../../components/Switch';
import GameDetailsSheet from '../../src/components/GameDetailsSheet';

export default function GamesScreen() {
  const isFocused = useIsFocused();
  const [filterVisible, setFilterVisible] = useState(false);
  const [playedBefore, setPlayedBefore] = useState(false);
  const [showOnlyNew, setShowOnlyNew] = useState(false);
  const [multiplayerOnly, setMultiplayerOnly] = useState(false);
  const [recommendedForYou, setRecommendedForYou] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
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

  // Helper function to convert Game to GameDetailsSheet format
  const getGameDetails = (game: Game) => {
    // Mock data - replace with actual game data from your API/database
    const gameDetailsMap: Record<string, {
      description: string;
      howToPlay: string;
      rules: string;
      history: string[];
      image: string;
    }> = {
      'Space Defender': {
        description: 'Defend your space station from waves of alien invaders in this action-packed arcade game. Use your weapons strategically to survive as long as possible and achieve the highest score.',
        howToPlay: '1. Tap to shoot at incoming enemies\n2. Swipe to move your ship left and right\n3. Collect power-ups to enhance your weapons\n4. Survive as many waves as possible',
        rules: '• You have 3 lives\n• Each enemy destroyed gives you points\n• Power-ups appear randomly\n• Game ends when all lives are lost',
        history: [
          'Dec 15, 2024 - Score: 12,450',
          'Dec 10, 2024 - Score: 10,200',
          'Dec 5, 2024 - Score: 8,900',
        ],
        image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800',
      },
      'Pirate Quest': {
        description: 'Embark on an epic adventure as a pirate captain searching for hidden treasures across the seven seas. Battle rival pirates, solve puzzles, and build your crew.',
        howToPlay: '1. Navigate your ship by tapping on the map\n2. Engage in battles by matching cards\n3. Collect treasure chests to earn rewards\n4. Upgrade your ship and crew',
        rules: '• Each battle costs energy\n• Win battles to progress the story\n• Collect resources to upgrade\n• Complete quests for bonus rewards',
        history: [
          'Dec 14, 2024 - Level 15 reached',
          'Dec 8, 2024 - Level 12 reached',
          'Dec 1, 2024 - Level 8 reached',
        ],
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
      },
    };

    const details = gameDetailsMap[game.gameName] || {
      description: `Experience the exciting world of ${game.gameName}. Join ${game.players.toLocaleString()} players in this thrilling adventure!`,
      howToPlay: 'Tap to interact and follow the on-screen instructions to play.',
      rules: 'Follow the game guidelines and have fun!',
      history: [],
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800',
    };

    return {
      id: game.gameName.toLowerCase().replace(/\s+/g, '-'),
      name: game.gameName,
      image: details.image,
      description: details.description,
      howToPlay: details.howToPlay,
      rules: details.rules,
      history: details.history,
    };
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
                onPress={() => {
                  console.log('GameCard pressed:', game.gameName);
                  setSelectedGame(game);
                  setIsDetailsOpen(true);
                }}
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
              size="md"
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
              size="md"
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
              size="md"
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
              size="md"
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

      {/* Game Details Sheet */}
      <GameDetailsSheet
        visible={isDetailsOpen}
        game={selectedGame ? getGameDetails(selectedGame) : null}
        onClose={() => setIsDetailsOpen(false)}
        onPlay={() => {
          setIsDetailsOpen(false);
          // TODO: navigate to game screen in the future
        }}
      />
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

