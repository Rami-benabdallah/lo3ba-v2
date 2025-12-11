import { useRouter } from 'expo-router';

export type GameMode = 'solo' | 'online' | 'local';

export interface GamePlayParams {
  gameId: string;
  gameName: string;
  mode: GameMode;
}

/**
 * Handles starting a game in solo mode
 */
export function useGameHandlers() {
  const router = useRouter();

  const handlePlaySolo = (gameId: string, gameName: string) => {
    router.push({
      pathname: '/game-loading',
      params: {
        gameId,
        gameName,
        mode: 'solo',
      },
    });
  };

  const handlePlayOnline = (gameId: string, gameName: string) => {
    router.push({
      pathname: '/game-loading',
      params: {
        gameId,
        gameName,
        mode: 'online',
      },
    });
  };

  const handlePlayLocal = (gameId: string, gameName: string) => {
    router.push({
      pathname: '/game-loading',
      params: {
        gameId,
        gameName,
        mode: 'local',
      },
    });
  };

  return {
    handlePlaySolo,
    handlePlayOnline,
    handlePlayLocal,
  };
}
