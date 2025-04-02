import { AuthProvider, useAuth } from "@/contexts/auth-context";
import { ClubProvider } from "@/contexts/club-context";
import { Stack } from "expo-router";

export default function Layout() {

  return (
    <ClubProvider>
      <Stack>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack>
    </ClubProvider>
  );
}