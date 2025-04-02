import { Ionicons } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function Layout() {
  return (
    <Stack >
      <Stack.Screen
        name="[id]"
        options={{
          title: '',
          headerShadowVisible: false,
          headerLeft: () =>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back-outline" style={{ fontSize: 32 }} />
            </TouchableOpacity>
        }} />
      <Stack.Screen
        name="update/[id]"
        options={{
          title : '',
          headerShadowVisible : false,
          headerBackTitleVisible : false
        }} />
    </Stack>
  );
}
