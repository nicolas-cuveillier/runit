import { Stack } from "expo-router";

export default function FeedLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: "",
                    headerShadowVisible: false,
                }} />
        </Stack>
    );
}