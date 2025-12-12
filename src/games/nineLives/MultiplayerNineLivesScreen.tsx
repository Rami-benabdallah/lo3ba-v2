import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { mockFacts, Fact } from '../../data/mockFacts';
import Card from '../../../components/Card';
import ProgressBar from '../../../components/ProgressBar';
import UserAvatarHeader from '../../../components/UserAvatarHeader';
import FactContainer from './FactContainer';
import AnswerButtons from './AnswerButtons';
import FactExplanationModal from './FactExplanationModal';
import ActionButtons from './ActionButtons';
import AnswerCubes from './AnswerCubes';
import OtherPlayersCard, { OtherPlayer } from './OtherPlayersCard';

// Helper function to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

interface AnswerHistory {
  questionNumber: number;
  isCorrect: boolean;
}

export default function MultiplayerNineLivesScreen() {
  const router = useRouter();
  const [lives, setLives] = useState(1);
  const [facts, setFacts] = useState<Fact[]>(shuffleArray(mockFacts));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [answerHistory, setAnswerHistory] = useState<AnswerHistory[]>([]);
  const [timeLeft, setTimeLeft] = useState(5);
  const [progress, setProgress] = useState(100);
  const [isPawActive, setIsPawActive] = useState(false);
  const timerRef = useRef<number | null>(null);
  const questionNumberRef = useRef(1);
  const isPawActiveRef = useRef(false);

  // Other players state
  const [otherPlayers, setOtherPlayers] = useState<OtherPlayer[]>([
    {
      id: 1,
      name: 'Luna Carter',
      imgUrl: 'https://i.pravatar.cc/150?img=11',
      lives: 5,
      answerHistory: [],
    },
    {
      id: 2,
      name: 'Ethan Miles',
      imgUrl: 'https://i.pravatar.cc/150?img=22',
      lives: 3,
      answerHistory: [],
    },
    {
      id: 3,
      name: 'Ava Rodriguez',
      imgUrl: 'https://i.pravatar.cc/150?img=33',
      lives: 7,
      answerHistory: [],
    },
  ]);

  const currentFact = facts[currentIndex];

  // Function to randomly update other players when current player answers
  const updateOtherPlayers = (isCorrect: boolean) => {
    setOtherPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        // Randomly determine if this player got it correct (60-80% chance)
        const randomCorrect = Math.random() < (isCorrect ? 0.75 : 0.65);
        
        // Update lives based on answer
        let newLives = player.lives;
        if (randomCorrect) {
          // Randomly give 1 or 2 points (70% chance of 1, 30% chance of 2)
          const pointsToAdd = Math.random() < 0.7 ? 1 : 2;
          newLives = Math.min(player.lives + pointsToAdd, 9);
        } else {
          // Wrong answer - lose 1 point (but not below 0)
          newLives = Math.max(player.lives - 1, 0);
        }

        return {
          ...player,
          lives: newLives,
          answerHistory: [
            ...player.answerHistory,
            { questionNumber: questionNumberRef.current, isCorrect: randomCorrect },
          ],
        };
      })
    );
  };

  // Timer effect - 5 seconds countdown
  useEffect(() => {
    if (showResult) {
      // Stop timer when result is shown
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    // Reset timer for new question
    setTimeLeft(5);
    setProgress(100);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = Math.max(0, prev - 0.1);
        setProgress((newTime / 5) * 100);

        if (newTime <= 0) {
          // Time's up - auto skip
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          // Auto skip when time runs out
          setSelectedAnswer(false);
          setIsCorrect(false);
          setShowResult(true);
          // If paw is active, lose a point
          if (isPawActiveRef.current) {
            setLives((prev) => Math.max(prev - 1, 0)); // Lose 1 point, minimum 0
          }
          setIsPawActive(false); // Lose paw on wrong answer
          setAnswerHistory((prev) => [
            ...prev,
            { questionNumber: questionNumberRef.current, isCorrect: false },
          ]);
          // Update other players randomly
          updateOtherPlayers(false);
          return 0;
        }
        return newTime;
      });
    }, 100);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [currentIndex, showResult]);

  // Check if player won
  useEffect(() => {
    if (lives >= 9) {
      const correctAnswers = answerHistory.filter((answer) => answer.isCorrect).length;
      const totalQuestions = answerHistory.length;
      router.push({
        pathname: '/solo-nine-lives-win',
        params: {
          correctAnswers: correctAnswers.toString(),
          totalQuestions: totalQuestions.toString(),
          userName: 'Alex Johnson',
          userImageUrl: 'https://i.pravatar.cc/150?img=2',
        },
      });
    }
  }, [lives, router, answerHistory]);

  // Deactivate paw if lives drop to 1 or below
  useEffect(() => {
    if (lives <= 1 && isPawActive) {
      setIsPawActive(false);
    }
  }, [lives, isPawActive]);

  // Keep ref in sync with state
  useEffect(() => {
    isPawActiveRef.current = isPawActive;
  }, [isPawActive]);

  // Reshuffle facts when reaching the end
  useEffect(() => {
    if (currentIndex >= facts.length) {
      setFacts(shuffleArray(mockFacts));
      setCurrentIndex(0);
    }
  }, [currentIndex, facts.length]);


  const handleAnswer = (answer: boolean) => {
    if (selectedAnswer !== null || showResult) return; // Lock input

    setSelectedAnswer(answer);
    const correct = answer === currentFact.isTrue;
    setIsCorrect(correct);
    setShowResult(true);

    // Stop timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Add to answer history
    setAnswerHistory((prev) => [
      ...prev,
      { questionNumber: questionNumberRef.current, isCorrect: correct },
    ]);

    // Update other players randomly
    updateOtherPlayers(correct);

    if (correct) {
      // If paw is active, give 2 points, otherwise 1 point
      const pointsToAdd = isPawActive ? 2 : 1;
      setLives((prev) => Math.min(prev + pointsToAdd, 9)); // Cap at 9
      // Paw stays active after correct answer (can be used again)
    } else {
      // If answer is wrong and paw is active, lose a point
      if (isPawActive) {
        setLives((prev) => Math.max(prev - 1, 0)); // Lose 1 point, minimum 0
      }
      // Deactivate paw
      setIsPawActive(false);
    }
  };

  const handleNextFact = () => {
    setCurrentIndex((prev) => prev + 1);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
    setIsPawActive(false); // Reset paw after every question
    questionNumberRef.current += 1;
  };

  const handleSkip = () => {
    if (showResult) {
      handleNextFact();
      return;
    }

    // Skip current question - mark as wrong
    if (selectedAnswer === null) {
      setSelectedAnswer(false); // Mark as answered to prevent double skip
      setIsCorrect(false);
      setShowResult(true);
      // If paw is active, lose a point
      if (isPawActive) {
        setLives((prev) => Math.max(prev - 1, 0)); // Lose 1 point, minimum 0
      }
      setIsPawActive(false); // Lose paw on wrong answer

      // Stop timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      // Add to answer history as wrong
      setAnswerHistory((prev) => [
        ...prev,
        { questionNumber: questionNumberRef.current, isCorrect: false },
      ]);

      // Update other players randomly
      updateOtherPlayers(false);
    }
  };

  const handleSurrender = () => {
    // Navigate to games tab - this is always safe and makes sense after surrendering
    router.push('/(tabs)/games');
  };

  const handlePaw = () => {
    // Only allow paw activation if lives > 1
    if (lives > 1) {
      setIsPawActive((prev) => !prev);
    }
  };

  const handleQuit = () => {
    // Navigate to games tab - this is always safe and makes sense after quitting
    router.push('/(tabs)/games');
  };


  return (
    <View style={styles.container}>
      {/* Top section: Split into two halves */}
      <View style={styles.topSection}>
        {/* Left half: User info container */}
        <View style={styles.leftHalf}>
          {/* User Avatar */}
          <View style={styles.userInfoHeader}>
            <UserAvatarHeader
              name="Alex Johnson"
              imgUrl="https://i.pravatar.cc/150?img=2"
              size="xs"
            />

            {/* Paw counter */}
            <View style={styles.pawCounter}>
              <Text style={styles.pawCount}>{lives} x</Text>
              <Text style={styles.pawIcon}>🐾</Text>
            </View>
          </View>

          {/* Answer cubes - scrollable */}
          <AnswerCubes answerHistory={answerHistory} />
        </View>

        {/* Right half: Other players card */}
        <View style={styles.rightHalf}>
          <OtherPlayersCard players={otherPlayers} />
        </View>
      </View>

      {/* Card with solid variant */}
      <Card variant="liquid" padding="md" style={styles.mainCard}>
        {/* Main content */}
        <View style={styles.cardContent}>
          <View style={styles.factContent}>
            {/* Liquid card with fact text */}
            <FactContainer factText={currentFact.text} />

            {/* Progress bar with countdown */}
            <View style={styles.progressSection}>
              <ProgressBar
                value={progress}
                leftText="Time left"
                rightText={`${Math.ceil(timeLeft)}s`}
                height={12}
                reverse={true}
              />
            </View>

            {/* Answer buttons - always visible */}
            <AnswerButtons
              onAnswer={handleAnswer}
              selectedAnswer={selectedAnswer}
              isCorrect={isCorrect}
              showResult={showResult}
            />

            {/* Explanation modal - only show when wrong */}
            {showResult && (
              <FactExplanationModal explanation={currentFact.correctFact} />
            )}
          </View>

          {/* Action buttons */}
          <ActionButtons
            onSkip={handleSkip}
            onSurrender={handleSurrender}
            onPaw={handlePaw}
            showResult={showResult}
            lives={lives}
            isPawActive={isPawActive}
          />
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  topSection: {
    paddingTop: 60,
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  leftHalf: {
    flex: 1,
    width: '50%',
  },
  rightHalf: {
    flex: 1,
    width: '50%',
    alignSelf: 'stretch',
  },
  userInfoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  pawCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pawIcon: {
    fontSize: 16,
  },
  pawCount: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  playersCard: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  mainCard: {
    marginTop: 16,
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 580,
  },
  factContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  progressSection: {
    marginBottom: 12,
  },
  actionButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  surrenderButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
  },
});
