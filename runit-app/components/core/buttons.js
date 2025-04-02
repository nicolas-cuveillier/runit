import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors, Typography } from "@styles";

export function PrimaryButton({ text, action }) {
    return (
        <Pressable onPress={action}>
            <View style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>{text}</Text>
            </View>
        </Pressable>
    )
}

export function SecondaryButton({ action, text }) {
    return (
        <Pressable onPress={action}>
            <View style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>{text}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    primaryButton: {
        backgroundColor: Colors.PRIMARY_400,
        borderRadius: 8,
        padding: 16,
    },
    primaryButtonText: {
        fontFamily: Typography.FONT_BOLD.fontFamily,
        fontWeight: Typography.FONT_BOLD.fontWeight,
        color: Colors.WHITE,
        fontSize: Typography.FONT_SIZE_16,
    },
    secondaryButton: {
        borderColor: Colors.GRAY_DARK,
        borderWidth: 2,
        borderRadius: 8,
        padding: 16,
    },
    secondaryButtonText: {
        fontFamily: Typography.FONT_BOLD.fontFamily,
        fontWeight: Typography.FONT_BOLD.fontWeight,
        color: Colors.BLACK,
        fontSize: Typography.FONT_SIZE_16,
    }
})