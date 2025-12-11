import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { mockFacts, Fact } from '../../data/mockFacts';
import { COLORS } from '../../../constants/colors';
import Card from '../../../components/Card';
import ProgressBar from '../../../components/ProgressBar';
import UserAvatarHeader from '../../../components/UserAvatarHeader';
import PlayButton from '../../../components/PlayButton';
import FactContainer from './FactContainer';
import AnswerButtons from './AnswerButtons';
import FactExplanationModal from './FactExplanationModal';

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
  const scrollViewRef = useRef<ScrollView>(null);
  const contentWidthRef = useRef(0);
  const scrollViewWidthRef = useRef(0);
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
      router.push('/solo-nine-lives-win');
    }
  }, [lives, router]);

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

  // Smooth scroll to end function
  const scrollToEndSmooth = useCallback(() => {
    if (!scrollViewRef.current) return;
    
    // Use double requestAnimationFrame for smooth rendering
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (contentWidthRef.current > 0 && scrollViewWidthRef.current > 0) {
          // Calculate scroll position to show the end
          const scrollX = Math.max(0, contentWidthRef.current - scrollViewWidthRef.current);
          scrollViewRef.current?.scrollTo({
            x: scrollX,
            animated: true,
          });
        } else {
          // Fallback to scrollToEnd
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }
      });
    });
  }, []);

  // Auto-scroll to end when new answer cube is added
  useEffect(() => {
    if (answerHistory.length > 0) {
      scrollToEndSmooth();
    }
  }, [answerHistory.length, scrollToEndSmooth]);

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

  // Render cubes for answer history
  const renderAnswerCubes = () => {
    return answerHistory.map((answer, index) => (
      <View
        key={index}
        style={[
          styles.answerCube,
          answer.isCorrect ? styles.correctCube : styles.wrongCube,
        ]}
      >
        <Text style={styles.cubeText}>{answer.questionNumber}</Text>
      </View>
    ));
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

      {/* Answer cubes - scrollable */}
      <View style={styles.cubesSection}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.cubesContainer}
          contentContainerStyle={styles.cubesContent}
          decelerationRate="fast"
          scrollEventThrottle={16}
          onLayout={(event) => {
            // Store ScrollView width
            scrollViewWidthRef.current = event.nativeEvent.layout.width;
          }}
          onContentSizeChange={(contentWidth) => {
            // Store content width for scrolling
            contentWidthRef.current = contentWidth;
            // Scroll to end whenever content size changes (new cube added)
            if (contentWidth > 0) {
              scrollToEndSmooth();
            }
          }}
        >
          {renderAnswerCubes()}
        </ScrollView>
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
          <View style={styles.actionButtonsContainer}>
            <PlayButton
              onPress={handleSkip}
              icon={showResult ? 'arrow-forward' : 'play-skip-forward'}
              label={showResult ? 'Next' : 'Skip'}
              backgroundColor={COLORS.PRIMARY}
              border={{ width: 2, color: COLORS.PRIMARY_DARK }}
            />

            <PlayButton
              onPress={handleSurrender}
              icon="flag-outline"
              label="Surrender"
              backgroundColor={COLORS.ERROR}
              iconColor="#FFFFFF"
              border={{ width: 2, color: COLORS.ERROR_DARK }}
            />
            <PlayButton
                onPress={handlePaw}
                icon="paw-outline"
                label="Paw"
                backgroundColor={COLORS.SECONDARY }
                iconColor="#FFFFFF"
                border={{ width: 2, color: COLORS.SECONDARY_DARK }}
                disabled={lives <= 1 || showResult}
            />
            {isPawActive && (
              <View style={styles.pawIndicator}>
                <Text style={styles.pawEmoji}>🐾</Text>
              </View>
            )}
          </View>
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
  cubesSection: {
    marginTop: 16,
  },
  cubesContainer: {
    marginTop: 16,
    height: 48,   // or whatever height fits 1 row of cubes
    overflow: 'visible',
  },
  cubesContent: {
    flexDirection: 'row',
    gap: 8,
    paddingRight: 20,
  },
  answerCube: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  correctCube: {
    backgroundColor: '#10B981',
    borderColor: '#059669',
  },
  wrongCube: {
    backgroundColor: '#EF4444',
    borderColor: '#DC2626',
  },
  cubeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
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
  pawIndicator: {
    position: 'absolute',
    top: -17,
    right: -8,
  },
  pawEmoji: {
    fontSize: 44,
  },
  progressSection: {
    marginBottom: 12,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  pawButtonContainer: {
    position: 'relative',
    flex: 1,
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
