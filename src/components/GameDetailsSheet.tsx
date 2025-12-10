import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import Sheet from '../../components/Sheet';
import { COLORS } from '../../constants/colors';

export interface GameDetailsSheetProps {
  visible: boolean;
  onClose: () => void;
  onPlay: () => void;
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

type TabType = 'description' | 'howToPlay' | 'rules' | 'history';

export default function GameDetailsSheet({
  visible,
  onClose,
  onPlay,
  game,
}: GameDetailsSheetProps) {
  const [activeTab, setActiveTab] = useState<TabType>('description');

  if (!game) {
    return null;
  }

  const tabs: { id: TabType; label: string }[] = [
    { id: 'description', label: 'Description' },
    { id: 'howToPlay', label: 'How to Play' },
    { id: 'rules', label: 'Rules' },
    { id: 'history', label: 'History' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}
          >
            <Text style={styles.contentText}>
              {game.description}
            </Text>
          </ScrollView>
        );
      case 'howToPlay':
        return (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}
          >
            <Text style={styles.contentText}>
              {game.howToPlay}
            </Text>
          </ScrollView>
        );
      case 'rules':
        return (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}
          >
            <Text style={styles.contentText}>
              {game.rules}
            </Text>
          </ScrollView>
        );
      case 'history':
        return (
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
        );
      default:
        return null;
    }
  };

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

        {/* Tab Selector */}
        <View style={styles.tabContainer}>
          <View style={styles.tabRow}>
            {tabs.map((tab, index) => {
              const isActive = activeTab === tab.id;
              return (
                <TouchableOpacity
                  key={tab.id}
                  onPress={() => setActiveTab(tab.id)}
                  style={[
                    styles.tab,
                    index > 0 && styles.tabSpacing,
                    isActive ? styles.tabActive : styles.tabInactive,
                  ]}
                >
                  <Text
                    style={[
                      styles.tabText,
                      isActive ? styles.tabTextActive : styles.tabTextInactive,
                    ]}
                  >
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Scrollable Content */}
        <View style={styles.contentContainer}>
          {renderContent()}
        </View>

        {/* Fixed Play Game Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={onPlay}
            style={styles.playButton}
            activeOpacity={0.8}
          >
            <Text style={styles.playButtonText}>
              Play Game
            </Text>
          </TouchableOpacity>
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
  tabContainer: {
    paddingHorizontal: 20, // px-5
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB', // border-gray-200
  },
  tabRow: {
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    paddingVertical: 12, // py-3
    borderBottomWidth: 2,
  },
  tabSpacing: {
    marginLeft: 4, // ml-1
  },
  tabActive: {
    borderBottomColor: COLORS.PRIMARY,
  },
  tabInactive: {
    borderBottomColor: 'transparent',
  },
  tabText: {
    textAlign: 'center',
    fontSize: 14, // text-sm
    fontWeight: '500', // font-medium
  },
  tabTextActive: {
    color: COLORS.PRIMARY,
  },
  tabTextInactive: {
    color: '#6B7280', // text-gray-500
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20, // px-5
    paddingTop: 16, // pt-4
    paddingBottom: 96, // pb-24
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
  playButton: {
    backgroundColor: '#F97316', // bg-orange-500
    padding: 16, // p-4
    borderRadius: 12, // rounded-xl
  },
  playButtonText: {
    color: '#FFFFFF', // text-white
    textAlign: 'center',
    fontWeight: '600', // font-semibold
    fontSize: 16, // text-base
  },
});
