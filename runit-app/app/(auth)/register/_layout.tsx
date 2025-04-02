import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Stack } from "expo-router/stack";
import { TouchableOpacity } from "react-native";

export default function RegisterLayout() {
  return (
    <Stack
      screenOptions={{ headerShadowVisible: false }}>
      <Stack.Screen name="index" options={{
        headerBackTitleVisible: false,
        headerTitle: '',
        headerLeft: () =>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back-outline" style={{ fontSize: 32 }} />
          </TouchableOpacity>
      }} />
      <Stack.Screen
        name="register-step1"
        options={{
          headerBackTitleVisible: false,
          headerTitle: ''
        }} />
      <Stack.Screen
        name="register-step2"
        options={{
          headerBackTitleVisible: false,
          headerTitle: ''
        }} />
      <Stack.Screen
        name="register-step3"
        options={{
          headerShown: false
        }} />
    </Stack>
  )
}
