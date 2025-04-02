import { Typography } from "@/styles";
import { Ionicons } from "@expo/vector-icons";
import { Stack, Link, router, useLocalSearchParams, useGlobalSearchParams } from "expo-router";
import { Pressable, TouchableOpacity } from "react-native";
import { useAuth } from "@/contexts/auth-context";

export default function UserLayout() {

    const { id } = useGlobalSearchParams();
    const { authState } = useAuth();

    const renderHeader = () => {
        if (id && id !== authState?.user) {
            return (
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back-outline" style={{ fontSize: 32 }} />
                </TouchableOpacity>
            )
        }
        return null
    }
    
    return (
        <Stack>
            <Stack.Screen
                name="[id]"
                options={{
                    title: 'Profil',
                    headerTitleStyle: {
                        fontFamily: Typography.FONT_BOLD.fontFamily,
                        fontSize: Typography.FONT_SIZE_18,
                    },
                    headerShadowVisible: false,
                    headerBackTitleVisible: true,
                    headerLeft: renderHeader,
                    headerRight: () =>
                        <Link href="/user/settings">
                            <Ionicons name="settings-outline" style={{ fontSize: 24 }} />
                        </Link>
                }} />

            <Stack.Screen
                name="settings/index"
                options={{
                    headerBackTitleVisible: false,
                    headerShadowVisible: false,
                    title: '',
                }} />

            <Stack.Screen
                name="settings/(account)/edit-profil"
                options={{
                    headerBackTitleVisible: false,
                    headerShadowVisible: false,
                    title: '',
                }} />
            <Stack.Screen
                name="settings/(account)/change-password"
                options={{
                    headerBackTitleVisible: false,
                    headerShadowVisible: false,
                    title: '',
                }} />

            <Stack.Screen
                name="settings/(clubs)/my-clubs"
                options={{
                    headerBackTitleVisible: false,
                    headerShadowVisible: false,
                    title: '',
                }} />

            <Stack.Screen
                name="settings/(more)/give-feedback"
                options={{
                    headerBackTitleVisible: false,
                    headerShadowVisible: false,
                    title: '',
                }} />
        </Stack>
    );
}