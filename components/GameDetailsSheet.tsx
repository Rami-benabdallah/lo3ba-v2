import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import Sheet from './Sheet';
import Tabs, { TabItem } from './Tabs';
import PlayButton from './PlayButton';

export interface GameDetailsSheetProps {
  visible: boolean;
  onClose: () => void;
  onPlaySolo?: () => void;
  onPlayOnline?: () => void;
  onPlayLocal?: () => void;
  game: {
    id: string;
    name: string;
    image: string;
    description: string;
    howToPlay: string;
    rules: string;
    history: string[];
  } | null;
}

export default function GameDetailsSheet({
  visible,
  onClose,
  onPlaySolo,
  onPlayOnline,
  onPlayLocal,
  game,
}: GameDetailsSheetProps) {
  if (!game) {
    return null;
  }

  const tabs: TabItem[] = [
    {
      id: 'description',
      title: 'Description',
      content: (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          <Text style={styles.contentText}>
            {game.description}
          </Text>
        </ScrollView>
      ),
    },
    {
      id: 'howToPlay',
      title: 'How to Play',
      content: (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          <Text style={styles.contentText}>
            {game.howToPlay}
          </Text>
        </ScrollView>
      ),
    },
    {
      id: 'rules',
      title: 'Rules',
      content: (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          <Text style={styles.contentText}>
            {game.rules}
          </Text>
        </ScrollView>
      ),
    },
    {
      id: 'history',
      title: 'History',
      content: (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          {game.history.length > 0 ? (
            <View>
              {game.history.map((entry, index) => (
                <View
                  key={index}
                  style={[
                    styles.historyItem,
                    index > 0 && styles.historyItemSpacing,
                  ]}
                >
                  <Text style={styles.historyText}>
                    {entry}
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.emptyHistoryContainer}>
              <Text style={styles.emptyHistoryText}>
                No history available
              </Text>
            </View>
          )}
        </ScrollView>
      ),
    },
  ];

  return (
    <Sheet
      visible={visible}
      onClose={onClose}
      expandable={true}
      defaultHeight={0.75}
      backgroundColor="#ffffff"
      padding={0}
    >
      <View style={styles.container}>
        {/* Game Image/Banner */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: game.image }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        {/* Game Name */}
        <View style={styles.gameNameContainer}>
          <Text style={styles.gameName}>
            {game.name}
          </Text>
        </View>

        {/* Tabs Component */}
        <Tabs tabs={tabs} defaultTabId="description" />

        {/* Fixed Play Game Buttons */}
        <View style={styles.buttonContainer}>
          <View style={styles.buttonsRow}>
            {/* Play Solo Button */}
            <PlayButton
              onPress={onPlaySolo}
              icon="person"
              label="Solo"
              variant="fourth"
            />

            {/* Play Multiplayer Online Button */}
            <PlayButton
              onPress={onPlayOnline}
              icon="people"
              label="Multiplayer Online"
              variant="tertiary"
            />

            {/* Play Multiplayer Local Button */}
            <PlayButton
              onPress={onPlayLocal}
              icon="phone-portrait"
              label="Multiplayer Local"
              variant="primary"
            />
          </View>
        </View>
      </View>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 192, // h-48 = 192px
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gameNameContainer: {
    paddingHorizontal: 20, // px-5
    paddingTop: 16, // pt-4
    paddingBottom: 12, // pb-3
  },
  gameName: {
    fontSize: 24, // text-2xl
    fontWeight: 'bold',
    color: '#111827', // text-gray-900
  },
  scrollView: {
    flex: 1,
  },
  contentText: {
    color: '#1F2937', // text-gray-800
    fontSize: 16, // text-base
    lineHeight: 24, // leading-6
  },
  historyItem: {
    backgroundColor: '#F9FAFB', // bg-gray-50
    padding: 16, // p-4
    borderRadius: 12, // rounded-xl
    borderWidth: 1,
    borderColor: '#E5E7EB', // border-gray-200
  },
  historyItemSpacing: {
    marginTop: 12, // mt-3
  },
  historyText: {
    color: '#1F2937', // text-gray-800
    fontSize: 14, // text-sm
    lineHeight: 20, // leading-5
  },
  emptyHistoryContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32, // py-8
  },
  emptyHistoryText: {
    color: '#6B7280', // text-gray-500
    fontSize: 16, // text-base
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20, // px-5
    paddingBottom: 20, // pb-5
    backgroundColor: '#FFFFFF', // bg-white
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6', // border-gray-100
    paddingTop: 16, // pt-4
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12, // gap-3
  },
});
