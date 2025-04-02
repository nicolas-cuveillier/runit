import { TextInput, View, Text, StyleSheet } from "react-native";
import { Typography, Colors } from "@styles"

export default function Input({ label, value, onChangetext }) {
    return (
        <View style={{ gap: 4 }}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangetext}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        fontFamily: Typography.FONT_REGULAR.fontFamily,
        fontWeight: Typography.FONT_REGULAR.fontWeight,
        fontSize: Typography.FONT_SIZE_16,
        padding: 20,
        borderRadius: 8,
        backgroundColor: Colors.GRAY_LIGHT,
        borderColor: Colors.GRAY_MEDIUM,
        borderWidth: 1
    },
    label: {
        fontFamily: Typography.FONT_SEMIBOLD.fontFamily,
        fontWeight: Typography.FONT_SEMIBOLD.fontWeight,
        color: Colors.BLACK,
        fontSize: Typography.FONT_SIZE_16,
    }
})