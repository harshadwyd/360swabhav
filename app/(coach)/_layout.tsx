import { Stack } from 'expo-router';

export default function CoachLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="students" />
      <Stack.Screen name="analytics" />
      <Stack.Screen name="tools" />
      <Stack.Screen name="sessions" />
    </Stack>
  );
}