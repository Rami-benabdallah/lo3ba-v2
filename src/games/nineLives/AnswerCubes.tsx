import React, { useRef, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export interface AnswerHistory {
  questionNumber: number;
  isCorrect: boolean;
}

export interface AnswerCubesProps {
  answerHistory: AnswerHistory[];
}

export default function AnswerCubes({ answerHistory }: AnswerCubesProps) {
  const scrollViewRef = useRef<ScrollView>(null);
  const contentWidthRef = useRef(0);
  const scrollViewWidthRef = useRef(0);

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

  return (
    <View style={styles.section}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={styles.content}
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
        {answerHistory.map((answer, index) => (
          <View
            key={index}
            style={[
              styles.cube,
              answer.isCorrect ? styles.correctCube : styles.wrongCube,
            ]}
          >
            <Text style={styles.cubeText}>{answer.questionNumber}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 16,
  },
  container: {
    height: 48, // or whatever height fits 1 row of cubes
    overflow: 'visible',
  },
  content: {
    flexDirection: 'row',
    gap: 8,
    paddingRight: 20,
  },
  cube: {
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
});
