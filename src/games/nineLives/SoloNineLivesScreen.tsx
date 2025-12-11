import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { mockFacts, Fact } from '../../data/mockFacts';
import { COLORS } from '../../../constants/colors';
import Card from '../../../components/Card';
import ProgressBar from '../../../components/ProgressBar';
import UserAvatarHeader from '../../../components/UserAvatarHeader';

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
    router.back();
  };

  const handleQuit = () => {
    router.back();
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

        {/* Answer cubes - scrollable */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.cubesContainer}
          contentContainerStyle={styles.cubesContent}
        >
          {renderAnswerCubes()}
        </ScrollView>
      </View>

      {/* Main content */}
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Card with solid variant */}
        <Card variant="liquid" padding="lg" style={styles.mainCard}>
          <View style={styles.cardContent}>
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
            />
          </View>

          {/* Answer buttons */}
          {!showResult && (
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
                  TRUE
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
                  FALSE
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Result display */}
          {showResult && (
            <View style={styles.resultContainer}>
              <View
                style={[
                  styles.resultCard,
                  isCorrect ? styles.correctCard : styles.wrongCard,
                ]}
              >
                <Text style={styles.resultTitle}>
                  {isCorrect ? '✅ Correct!' : '❌ Wrong!'}
                </Text>
                {!isCorrect && (
                  <View style={styles.explanationContainer}>
                    <Text style={styles.explanationLabel}>Explanation:</Text>
                    <Text style={styles.explanationText}>
                      {currentFact.correctFact}
                    </Text>
                  </View>
                )}
                {isCorrect && (
                  <Text style={styles.correctMessage}>
                    You earned +1 paw! 🐾
                  </Text>
                )}
              </View>
            </View>
          )}

          {/* Action buttons */}
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity
              style={styles.skipButton}
              onPress={handleSkip}
            >
              <Text style={styles.skipButtonText}>
                {showResult ? 'Next Fact' : 'Skip'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.surrenderButton}
              onPress={handleSurrender}
            >
              <Text style={styles.surrenderButtonText}>Surrender</Text>
            </TouchableOpacity>
          </View>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  cubesContainer: {
    marginTop: 16,
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
    height: 600, // Fixed height to prevent expansion/contraction
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  factCard: {
    marginBottom: 24,
  },
  factText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 28,
  },
  progressSection: {
    marginBottom: 24,
  },
  answerButtonsContainer: {
    gap: 16,
    marginBottom: 24,
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
    backgroundColor: 'rgba(16, 185, 129, 0.2)', // green with opacity
  },
  wrongOverlay: {
    borderColor: '#EF4444',
    backgroundColor: 'rgba(239, 68, 68, 0.2)', // red with opacity
  },
  answerButtonText: {
    color: '#1F2937',
    fontSize: 20,
    fontWeight: 'bold',
  },
  answerButtonTextSelected: {
    color: '#FFFFFF',
  },
  resultContainer: {
    marginBottom: 24,
  },
  resultCard: {
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
  },
  correctCard: {
    backgroundColor: '#10B981',
    borderColor: '#059669',
  },
  wrongCard: {
    backgroundColor: '#EF4444',
    borderColor: '#DC2626',
  },
  resultTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  explanationContainer: {
    marginTop: 8,
  },
  explanationLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  explanationText: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.95,
  },
  correctMessage: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  skipButton: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  surrenderButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#6B7280',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  surrenderButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
