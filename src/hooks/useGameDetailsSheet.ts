import { useState } from 'react';
import { Game } from '../../components/RecommendedGames';
import { getGameDetails, GameDetails } from '../data/mockGames';

interface UseGameDetailsSheetReturn {
  selectedGame: Game | null;
  isDetailsOpen: boolean;
  gameDetails: GameDetails | null;
  openGameDetails: (game: Game) => void;
  closeGameDetails: () => void;
  handlePlayGame: () => void;
}

/**
 * Custom hook to manage game details sheet state
 * Provides functions to open/close the sheet and handle game selection
 */
export function useGameDetailsSheet(): UseGameDetailsSheetReturn {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const openGameDetails = (game: Game) => {
    setSelectedGame(game);
    setIsDetailsOpen(true);
  };

  const closeGameDetails = () => {
    setIsDetailsOpen(false);
    setSelectedGame(null);
  };

  const handlePlayGame = () => {
    setIsDetailsOpen(false);
    // TODO: navigate to game screen in the future
    // You can add navigation logic here when ready
  };

  const gameDetails = selectedGame ? getGameDetails(selectedGame) : null;

  return {
    selectedGame,
    isDetailsOpen,
    gameDetails,
    openGameDetails,
    closeGameDetails,
    handlePlayGame,
  };
}
