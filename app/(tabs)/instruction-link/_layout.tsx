import { Stack } from 'expo-router';

export default function InstructionLinkLayout() {
  return (
    <Stack
    screenOptions={{
        headerShown: false,
    }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="instruction-link" options={{ title: "Instruction Link" }} />
      <Stack.Screen name="response-handout" options={{ title: "Response Handout" }} />
      <Stack.Screen name="response-videos" options={{ title: "Response Videos" }} />
    </Stack>
  );
}