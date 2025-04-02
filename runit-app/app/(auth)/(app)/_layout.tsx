import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  return (
      <GestureHandlerRootView>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="club-creation" options={{ headerShown: false }}  />
          <Stack.Screen name="run-creation" options={{ headerShown: false }} />
          <Stack.Screen name="run" options={{ headerShown: false }} />
        </Stack>
      </GestureHandlerRootView>
  );
}