import { Stack } from "expo-router";

export default function ClubLayout() {

    return (
        <Stack>
            <Stack.Screen
                name="[id]"
                options={{
                    headerShown : false
                }} />

            <Stack.Screen
                name="settings/index"
                options={{
                    headerBackTitleVisible: false,
                    headerShadowVisible: false,
                    title: '',
                }} />

            <Stack.Screen
                name="settings/(organization)/edit-information"
                options={{
                    headerBackTitleVisible: false,
                    headerShadowVisible: false,
                    title: '',
                }} />
            <Stack.Screen
                name="settings/(organization)/manage-roles"
                options={{
                    headerBackTitleVisible: false,
                    headerShadowVisible: false,
                    title: '',
                }} />

            <Stack.Screen
                name="settings/(runs)/manage-runs"
                options={{
                    headerBackTitleVisible: false,
                    headerShadowVisible: false,
                    title: '',
                }} />
        </Stack>
    );
}