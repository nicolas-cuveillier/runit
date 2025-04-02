import { View, StyleSheet, Text, Pressable } from "react-native";
import { Colors, Typography } from "@styles";
import TextHeader from "../../../../components/core/text-header";
import { PrimaryButton } from "../../../../components/core/buttons";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import InputPageLayout from "../../../../components/core/input-page-layout";

export default function ClubCreationStep4() {

    const local = useLocalSearchParams();

    return (
        <InputPageLayout>
            <TextHeader
                title="Awesome !"
                subtitle="You can now start organizing your club 
                by picking one of this task or pass and find the 
                to-do list in your club’s settings.." />

            <View style={{ gap: 16 }}>
                <Link
                    label={"Invite & define admin and leader"}
                    action={() => router.push("/(tabs)/club/settings/(organization)/manage-roles")}
                />
                <Link
                    label={"Create runs"}
                    action={() => router.push("/run-creation")}
                />
                <Link
                    label={"Answer Frequently Asked Questions"}

                />
                <Link
                    label={"Invite runners to join the club"}
                    action={() => router.navigate(`/(tabs)/club/${local.id}`)}
                />
            </View>

            <PrimaryButton
                action={() => router.navigate(`/(tabs)/club/${local.id}`)}
                text="I'll do it later" />
        </InputPageLayout>
    )
}

function Link({ label, action }) {
    return (
        <Pressable style={styles.linkContainer} onPress={action}>
            <Text style={styles.label}>{label}</Text>
            <Ionicons name="chevron-forward" size={24} color="gray" />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    linkContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderWidth: 2,
        borderRadius: 8,
        borderColor: Colors.GRAY_MEDIUM,
    },
    label: {
        fontFamily: Typography.FONT_BOLD.fontFamily,
        fontWeight: Typography.FONT_BOLD.fontWeight,
        fontSize: Typography.FONT_SIZE_14,
    }
})