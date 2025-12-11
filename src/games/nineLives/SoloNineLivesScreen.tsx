import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { mockFacts, Fact } from '../../data/mockFacts';
import { COLORS } from '../../../constants/colors';

// Helper function to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function SoloNineLivesScreen() {
  const router = useRouter();
  const [lives, setLives] = useState(1);
  const [facts, setFacts] = useState<Fact[]>(shuffleArray(mockFacts));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const currentFact = facts[currentIndex];

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
    if (selectedAnswer !== null) return; // Lock input

    setSelectedAnswer(answer);
    const correct = answer === currentFact.isTrue;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setLives((prev) => Math.min(prev + 1, 9)); // Cap at 9
    }
  };

  const handleNextFact = () => {
    setCurrentIndex((prev) => prev + 1);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
  };

  const handleQuit = () => {
    router.back();
  };

  // Render paw icons for lives
  const renderLives = () => {
    const paws = [];
    for (let i = 0; i < lives; i++) {
      paws.push(
        <Text key={i} style={styles.pawIcon}>
          🐾
        </Text>
      );
    }
    return paws;
  };

  return (
    <View style={styles.container}>
      {/* Header with lives */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleQuit} style={styles.quitButton}>
          <Ionicons name="close" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.livesContainer}>
          <Text style={styles.livesLabel}>Lives:</Text>
          <View style={styles.pawsContainer}>{renderLives()}</View>
        </View>
      </View>

      {/* Main content */}
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Fact card */}
        <View style={styles.factCard}>
          <Text style={styles.factText}>{currentFact.text}</Text>
        </View>

        {/* Answer buttons */}
        {!showResult && (
          <View style={styles.answerButtonsContainer}>
            <TouchableOpacity
              style={[styles.answerButton, styles.trueButton]}
              onPress={() => handleAnswer(true)}
              disabled={selectedAnswer !== null}
            >
              <Text style={styles.answerButtonText}>TRUE</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.answerButton, styles.falseButton]}
              onPress={() => handleAnswer(false)}
              disabled={selectedAnswer !== null}
            >
              <Text style={styles.answerButtonText}>FALSE</Text>
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

            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNextFact}
            >
              <Text style={styles.nextButtonText}>Next Fact</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  quitButton: {
    padding: 8,
  },
  livesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  livesLabel: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  pawsContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  pawIcon: {
    fontSize: 24,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  factCard: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
    minHeight: 200,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.PRIMARY,
  },
  factText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 32,
  },
  answerButtonsContainer: {
    gap: 16,
  },
  answerButton: {
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 64,
  },
  trueButton: {
    backgroundColor: '#10B981', // green-500
  },
  falseButton: {
    backgroundColor: '#EF4444', // red-500
  },
  answerButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  resultContainer: {
    gap: 20,
  },
  resultCard: {
    borderRadius: 16,
    padding: 24,
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
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  explanationContainer: {
    marginTop: 8,
  },
  explanationLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  explanationText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.95,
  },
  correctMessage: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
