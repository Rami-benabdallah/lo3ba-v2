import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import HeaderBar from '../../../components/HeaderBar';

const ANSWER_TIME_OPTIONS = [10, 15, 20];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionLarge: {
    marginBottom: 32,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    color: '#111827',
    fontSize: 16,
  },
  answerTimeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  answerTimeButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  answerTimeButtonActive: {
    backgroundColor: '#F97316',
  },
  answerTimeButtonInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  answerTimeText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  answerTimeTextActive: {
    color: '#FFFFFF',
  },
  answerTimeTextInactive: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  createButton: {
    width: '100%',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  createButtonActive: {
    backgroundColor: '#F97316',
  },
  createButtonDisabled: {
    backgroundColor: '#9CA3AF',
    opacity: 0.5,
  },
  createButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default function CreateLocalRoomScreen() {
  const router = useRouter();
  const [roomName, setRoomName] = useState('');
  const [answerTime, setAnswerTime] = useState(15);

  const handleCreateRoom = () => {
    if (!roomName.trim()) {
      return;
    }

    // Mock room creation
    const room = {
      id: `#room${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      name: roomName.trim(),
      answerTime,
    };

    router.push({
      pathname: '/local-room-lobby',
      params: {
        room: JSON.stringify(room),
      },
    });
  };

  return (
    <View style={styles.container}>
      <HeaderBar title="Create Room" showBack={true} />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.contentWrapper}>

        {/* Room Name Input */}
        <View style={styles.section}>
          <Text style={styles.label}>
            Room Name
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              value={roomName}
              onChangeText={setRoomName}
              placeholder="Enter room name"
              placeholderTextColor="#9CA3AF"
              style={styles.input}
              autoCapitalize="words"
            />
          </View>
        </View>

        {/* Answer Time Selector */}
        <View style={styles.sectionLarge}>
          <Text style={styles.label}>
            Answer Time
          </Text>
          <View style={styles.answerTimeContainer}>
            {ANSWER_TIME_OPTIONS.map((time) => (
              <Pressable
                key={time}
                onPress={() => setAnswerTime(time)}
                style={[
                  styles.answerTimeButton,
                  answerTime === time
                    ? styles.answerTimeButtonActive
                    : styles.answerTimeButtonInactive
                ]}
              >
                <Text
                  style={[
                    styles.answerTimeText,
                    answerTime === time
                      ? styles.answerTimeTextActive
                      : styles.answerTimeTextInactive
                  ]}
                >
                  {time}s
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Create Room Button */}
        <Pressable
          onPress={handleCreateRoom}
          disabled={!roomName.trim()}
          style={[
            styles.createButton,
            roomName.trim()
              ? styles.createButtonActive
              : styles.createButtonDisabled
          ]}
        >
          <View style={styles.createButtonContent}>
            <Ionicons name="create" size={24} color="#FFFFFF" style={{ marginRight: 8 }} />
            <Text style={styles.createButtonText}>
              Create Room
            </Text>
          </View>
        </Pressable>
      </View>
      </ScrollView>
    </View>
  );
}
