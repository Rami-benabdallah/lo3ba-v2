import { Game } from '../../components/RecommendedGames';
import { Ionicons } from '@expo/vector-icons';

export interface GameDetails {
  id: string;
  name: string;
  image: string;
  description: string;
  howToPlay: string;
  rules: string;
  history: string[];
}

// Games list - single source of truth for all games
export const games: Game[] = [
  {
    gameName: '9 LIVES',
    iconName: 'paw' as keyof typeof Ionicons.glyphMap,
    players: 1560,
    rank: 25,
  },
];

// Mock game details data
export const gameDetailsMap: Record<string, Omit<GameDetails, 'id' | 'name'>> = {
  '9 LIVES': {
    description: 
      "9 Lives is a fast, chaotic fact-checking party game where players test their intuition, bluffing skills, and confidence. Each player starts with 1 life (shown as a cat paw). Every round, one player reads a surprising fact aloud, and the others must decide if it's TRUE or FALSE. Guess correctly to earn a paw. The first to reach 9 paws wins! But be careful—if you bet too confidently and get it wrong, you can lose paws quickly. Perfect for parties, groups, and quick-thinking fun.",

    howToPlay: 
      "1. Players join the game (max 6), each starting with 1 paw.\n\n" +
      "2. The first player reads a fact aloud. Only the reader sees whether the fact is true or false.\n\n" +
      "3. All other players vote TRUE or FALSE at the same time.\n\n" +
      "4. Players who guess correctly earn +1 paw.\n\n" +
      "5. Players with more than 1 paw may use a Claw bet: if they are correct, they gain +2 paws; if wrong, they lose 1 paw.\n\n" +
      "6. The next player becomes the reader, and the game continues.\n\n" +
      "7. The first player to reach 9 paws wins. If multiple players reach 9 in the same round, all are winners.",

    rules: 
      "• Each player starts with 1 paw.\n\n" +
      "• Up to 6 players can join a match.\n\n" +
      "• The reader must read the displayed fact exactly as written.\n\n" +
      "• Players submit their TRUE/FALSE answers simultaneously.\n\n" +
      "• Correct answer → +1 paw.\n" +
      "• Wrong answer → no paws.\n\n" +
      "• Claw Bet: Available only if the player has 2 or more paws.\n" +
      "   – Correct → +2 paws.\n" +
      "   – Incorrect → -1 paw.\n\n" +
      "• A player wins immediately upon reaching 9 paws.\n\n" +
      "• If multiple players reach 9 in the same round, they all win and each receives a point.\n\n" +
      "• No hinting or revealing the answer while reading facts.",
    history: [
      'Dec 15, 2024 - Score: 12,450',
      'Dec 10, 2024 - Score: 10,200',
      'Dec 5, 2024 - Score: 8,900',
    ],
    image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800',
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
