import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '../components/Button';
import GamingIllustration from '../components/GamingIllustration';
import { COLORS } from '../constants/colors';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleSignUp = () => {
    router.push('/sign-up' as any);
  };

  const handleSignIn = () => {
    router.push('/sign-in' as any);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 40, paddingBottom: insets.bottom + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text style={styles.title}>Let's get started</Text>

        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <GamingIllustration />
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <Button
            text="Sign Up"
            variant="primary"
            size="lg"
            onPress={handleSignUp}
            containerStyle={styles.signUpButton}
          />

          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Already have an account? </Text>
            <Text style={styles.signInLink} onPress={handleSignIn}>
              Sign in
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 40,
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 300,
  },
  buttonContainer: {
    paddingBottom: 20,
  },
  signUpButton: {
    marginBottom: 16,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    fontSize: 14,
    color: COLORS.gray[400],
    textAlign: 'center',
  },
  signInLink: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

