import { Stack } from "expo-router";

export default function WelcomLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown : false}}/>
    </Stack>
  );
}
