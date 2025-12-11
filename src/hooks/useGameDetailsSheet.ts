import { useState } from 'react';
import { Game } from '../../components/RecommendedGames';
import { getGameDetails, GameDetails } from '../data/mockGames';
import { useGameHandlers } from '../utils/gameHandlers';

interface UseGameDetailsSheetReturn {
  selectedGame: Game | null;
  isDetailsOpen: boolean;
  gameDetails: GameDetails | null;
  openGameDetails: (game: Game) => void;
  closeGameDetails: () => void;
  handlePlaySolo: () => void;
  handlePlayOnline: () => void;
  handlePlayLocal: () => void;
}

/**
 * Custom hook to manage game details sheet state
 * Provides functions to open/close the sheet and handle game selection
 */
export function useGameDetailsSheet(): UseGameDetailsSheetReturn {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { handlePlaySolo: playSolo, handlePlayOnline: playOnline, handlePlayLocal: playLocal } = useGameHandlers();

  const openGameDetails = (game: Game) => {
    setSelectedGame(game);
    setIsDetailsOpen(true);
  };

  const closeGameDetails = () => {
    setIsDetailsOpen(false);
    setSelectedGame(null);
  };

  const handlePlaySolo = () => {
    if (selectedGame) {
      setIsDetailsOpen(false);
      const gameId = selectedGame.gameName.toLowerCase().replace(/\s+/g, '-');
      playSolo(gameId, selectedGame.gameName);
    }
  };

  const handlePlayOnline = () => {
    if (selectedGame) {
      setIsDetailsOpen(false);
      const gameId = selectedGame.gameName.toLowerCase().replace(/\s+/g, '-');
      playOnline(gameId, selectedGame.gameName);
    }
  };

  const handlePlayLocal = () => {
    if (selectedGame) {
      setIsDetailsOpen(false);
      const gameId = selectedGame.gameName.toLowerCase().replace(/\s+/g, '-');
      playLocal(gameId, selectedGame.gameName);
    }
  };

  const gameDetails = selectedGame ? getGameDetails(selectedGame) : null;

  return {
    selectedGame,
    isDetailsOpen,
    gameDetails,
    openGameDetails,
    closeGameDetails,
    handlePlaySolo,
    handlePlayOnline,
    handlePlayLocal,
  };
}
