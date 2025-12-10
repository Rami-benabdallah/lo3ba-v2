import { Game } from '../../components/RecommendedGames';

export interface GameDetails {
  id: string;
  name: string;
  image: string;
  description: string;
  howToPlay: string;
  rules: string;
  history: string[];
}

// Mock game details data
export const gameDetailsMap: Record<string, Omit<GameDetails, 'id' | 'name'>> = {
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

// Default game details for games not in the map
const defaultGameDetails: Omit<GameDetails, 'id' | 'name'> = {
  description: '',
  howToPlay: 'Tap to interact and follow the on-screen instructions to play.',
  rules: 'Follow the game guidelines and have fun!',
  history: [],
  image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800',
};

/**
 * Converts a Game object to GameDetails format
 * @param game - The game object from RecommendedGames
 * @returns GameDetails object ready for GameDetailsSheet
 */
export function getGameDetails(game: Game): GameDetails {
  const details = gameDetailsMap[game.gameName] || {
    ...defaultGameDetails,
    description: `Experience the exciting world of ${game.gameName}. Join ${game.players.toLocaleString()} players in this thrilling adventure!`,
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
}
