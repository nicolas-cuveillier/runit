import { TextInput, View, Text, StyleSheet } from "react-native";
import { Typography, Colors } from "@styles"

export default function MultilineInput({ label, value, onChangetext, placeholder }) {
    return (
        <View style={{ gap: 4 }}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input} placeholder={placeholder}
                onChangeText={(e) => onChangetext(e)}
                value={value}
                placeholderTextColor={Colors.PRIMARY_400}
                multiline={true} maxLength={100} />
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
        borderWidth: 1,
        height: 150,
        textAlignVertical: 'top'
    },
    label: {
        fontFamily: Typography.FONT_SEMIBOLD.fontFamily,
        fontWeight: Typography.FONT_SEMIBOLD.fontWeight,
        color: Colors.BLACK,
        fontSize: Typography.FONT_SIZE_16,
    }
})