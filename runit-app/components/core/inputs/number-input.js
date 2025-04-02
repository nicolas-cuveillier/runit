import { Button, StyleSheet, Text, View } from "react-native"
import { Colors, Typography } from "@styles"

export default function NumberInput({ label, value, onChange }) {

    const handleIncrement = () => {
        onChange((prev) => prev + 1)
    }

    const handleDecrement = () => {
        onChange((prev) => prev - 1)
    }

    return (
        <View style={{ gap: 4 }}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.container}>
                <Button
                    title="+"
                    color={Colors.GRAY_DARK}
                    onPress={handleIncrement} />
                <Text>{value}</Text>
                <Button
                    title="-"
                    color={Colors.GRAY_DARK}
                    onPress={handleDecrement} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        fontFamily: Typography.FONT_SEMIBOLD.fontFamily,
        fontWeight: Typography.FONT_SEMIBOLD.fontWeight,
        color: Colors.BLACK,
        fontSize: Typography.FONT_SIZE_16,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.GRAY_LIGHT,
        padding: 4,
        width: 100,
        gap: 16,
        borderWidth: 1.5,
        borderRadius: 6,
        borderColor: Colors.GRAY_MEDIUM
    }
})