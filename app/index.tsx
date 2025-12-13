import { Redirect } from 'expo-router';

export default function Index() {
  // TODO: Add authentication state check here
  // For now, redirecting to home screen (not logged in state)
  return <Redirect href="/home" />;
}

