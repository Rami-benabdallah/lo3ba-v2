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

export default function SoloNineLivesScreen() {
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

  const currentFact = facts[currentIndex];

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
      {/* Top Left: User Avatar */}
      <View style={styles.topSection}>
        <UserAvatarHeader
          name="Alex Johnson"
          imgUrl="https://i.pravatar.cc/150?img=2"
          size="md"
        />

        {/* Paw counter - right side */}
        <View style={styles.pawCounter}>
        <Text style={styles.pawCount}>{lives} x</Text>
          <Text style={styles.pawIcon}>🐾</Text>
        </View>
      </View>

      {/* Answer cubes - scrollable (reserve space from start) */}
      <View style={styles.answerCubesContainer}>
        <AnswerCubes answerHistory={answerHistory} />
      </View>

      {/* Card with liquid variant */}
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pawCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pawIcon: {
    fontSize: 24,
  },
  pawCount: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  answerCubesContainer: {
    height: 64, // Fixed height: marginTop (16) + cube height (40) + some padding (8)
    justifyContent: 'flex-end', // Align cubes to bottom of reserved space
    marginBottom: 16,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  mainCard: {
    marginTop: 0, // No margin since space is already reserved
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
