import { View, Text, StyleSheet } from 'react-native';
import HeaderBar from '../components/HeaderBar';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <HeaderBar title="Profile" />
      <View style={styles.content}>
        <Text style={styles.text}>Profile</Text>
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

