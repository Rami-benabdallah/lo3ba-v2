import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { mockFacts, Fact } from '../../data/mockFacts';
import { COLORS } from '../../../constants/colors';
import Card from '../../../components/Card';
import ProgressBar from '../../../components/ProgressBar';
import UserAvatarHeader from '../../../components/UserAvatarHeader';
import PlayButton from '../../components/PlayButton';

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
  const timerRef = useRef<number | null>(null);
  const questionNumberRef = useRef(1);
  const scrollViewRef = useRef<ScrollView>(null);
  const contentWidthRef = useRef(0);
  const scrollViewWidthRef = useRef(0);

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
      setLives((prev) => Math.min(prev + 1, 9)); // Cap at 9
    }
  };

  const handleNextFact = () => {
    setCurrentIndex((prev) => prev + 1);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
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
            <Card variant="liquidWhite" padding="md" style={styles.factCard}>
              <Text style={styles.factText}>{currentFact.text}</Text>
            </Card>

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
            <View style={styles.answerButtonsContainer}>
              <TouchableOpacity
                style={[
                  styles.answerButton,
                  selectedAnswer === true && isCorrect && styles.correctOverlay,
                  selectedAnswer === true && !isCorrect && styles.wrongOverlay,
                ]}
                onPress={() => handleAnswer(true)}
                disabled={selectedAnswer !== null}
              >
                <Text
                  style={[
                    styles.answerButtonText,
                    selectedAnswer === true && styles.answerButtonTextSelected,
                  ]}
                >
                  True
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.answerButton,
                  selectedAnswer === false && isCorrect && styles.correctOverlay,
                  selectedAnswer === false && !isCorrect && styles.wrongOverlay,
                ]}
                onPress={() => handleAnswer(false)}
                disabled={selectedAnswer !== null}
              >
                <Text
                  style={[
                    styles.answerButtonText,
                    selectedAnswer === false && styles.answerButtonTextSelected,
                  ]}
                >
                  False
                </Text>
              </TouchableOpacity>
            </View>

            {/* Explanation modal - only show when wrong */}
            {showResult && (
              <View style={styles.explanationModal}>
                <Card variant="liquid" padding="sm">
                  <Text style={styles.explanationText}>
                    {currentFact.correctFact}
                  </Text>
                </Card>
              </View>
            )}
          </View>

          {/* Action buttons */}
          <View style={styles.actionButtonsContainer}>
            <PlayButton
              onPress={handleSkip}
              icon={showResult ? 'arrow-forward' : 'play-skip-forward'}
              label={showResult ? 'Next' : 'Skip'}
              backgroundColor={COLORS.PRIMARY}
              textStyle={styles.actionButtonText}
              style={styles.actionButton}
            />

            <PlayButton
              onPress={handleSurrender}
              icon="flag-outline"
              label="Surrender"
              backgroundColor="transparent"
              iconColor="#FFFFFF"
              textStyle={styles.surrenderButtonText}
              style={styles.surrenderButton}
            />
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
  factCard: {
    marginBottom: 12,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  factText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 28,
  },
  progressSection: {
    marginBottom: 12,
  },
  answerButtonsContainer: {
    gap: 16,
    marginBottom: 12,
  },
  answerButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#9CA3AF',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 64,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
    overflow: 'hidden',
  },
  correctOverlay: {
    borderColor: '#10B981',
    borderWidth: 3,
    backgroundColor: 'rgba(16, 185, 129, 0.3)', // green with opacity
  },
  wrongOverlay: {
    borderColor: '#EF4444',
    borderWidth: 3,
    backgroundColor: 'rgba(239, 68, 68, 0.3)', // red with opacity
  },
  answerButtonText: {
    color: '#1F2937',
    fontSize: 20,
    fontWeight: 'bold',
  },
  answerButtonTextSelected: {
    color: '#FFFFFF',
  },
  explanationModal: {
    marginTop: 16,
    marginBottom: 16,
  },
  explanationTitle: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  explanationText: {
    color: '#000000',
    fontSize: 10,
    lineHeight: 20,
    opacity: 0.95,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
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
  surrenderButton: {
    borderWidth: 2,
    borderColor: '#6B7280',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  surrenderButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
  },
});
