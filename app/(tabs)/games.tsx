import { View, Text, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

export default function GamesScreen() {
  const isFocused = useIsFocused();
  
  if (!isFocused) {
    return null;  // Don't render when not focused to prevent stacking
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Games</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  text: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

