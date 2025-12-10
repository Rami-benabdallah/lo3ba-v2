import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Sheet from '../../components/Sheet';

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
            className="flex-1"
          >
            <Text className="text-gray-800 text-base leading-6">
              {game.description}
            </Text>
          </ScrollView>
        );
      case 'howToPlay':
        return (
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="flex-1"
          >
            <Text className="text-gray-800 text-base leading-6">
              {game.howToPlay}
            </Text>
          </ScrollView>
        );
      case 'rules':
        return (
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="flex-1"
          >
            <Text className="text-gray-800 text-base leading-6">
              {game.rules}
            </Text>
          </ScrollView>
        );
      case 'history':
        return (
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="flex-1"
          >
            {game.history.length > 0 ? (
              <View>
                {game.history.map((entry, index) => (
                  <View
                    key={index}
                    className={`bg-gray-50 p-4 rounded-xl border border-gray-200 ${
                      index > 0 ? 'mt-3' : ''
                    }`}
                  >
                    <Text className="text-gray-800 text-sm leading-5">
                      {entry}
                    </Text>
                  </View>
                ))}
              </View>
            ) : (
              <View className="flex-1 items-center justify-center py-8">
                <Text className="text-gray-500 text-base">
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
      <View className="flex-1">
        {/* Game Image/Banner */}
        <View className="w-full h-48 overflow-hidden">
          <Image
            source={{ uri: game.image }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>

        {/* Game Name */}
        <View className="px-5 pt-4 pb-3">
          <Text className="text-2xl font-bold text-gray-900">
            {game.name}
          </Text>
        </View>

        {/* Tab Selector */}
        <View className="px-5 border-b border-gray-200">
          <View className="flex-row">
            {tabs.map((tab, index) => {
              const isActive = activeTab === tab.id;
              return (
                <TouchableOpacity
                  key={tab.id}
                  onPress={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3 border-b-2 ${
                    index > 0 ? 'ml-1' : ''
                  } ${
                    isActive
                      ? 'border-orange-500'
                      : 'border-transparent'
                  }`}
                >
                  <Text
                    className={`text-center text-sm font-medium ${
                      isActive ? 'text-orange-500' : 'text-gray-500'
                    }`}
                  >
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Scrollable Content */}
        <View className="flex-1 px-5 pt-4 pb-24">
          {renderContent()}
        </View>

        {/* Fixed Play Game Button */}
        <View className="absolute bottom-0 left-0 right-0 px-5 pb-5 bg-white border-t border-gray-100 pt-4">
          <TouchableOpacity
            onPress={onPlay}
            className="bg-orange-500 p-4 rounded-xl"
            activeOpacity={0.8}
          >
            <Text className="text-white text-center font-semibold text-base">
              Play Game
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Sheet>
  );
}
