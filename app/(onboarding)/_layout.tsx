import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="welcome" />
      <Stack.Screen name="name-collection" />
      <Stack.Screen name="role-selection" />
      <Stack.Screen name="feature-tour" />
      <Stack.Screen name="complete" />
    </Stack>
  );
}