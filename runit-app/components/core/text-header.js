import { View, Text, StyleSheet } from "react-native";
import { Typography } from "@styles"

export default function TextHeader({title, subtitle}){
    return (
        <View style={{ gap: 8 }}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontFamily: Typography.FONT_BOLD.fontFamily,
        fontWeight: Typography.FONT_BOLD.fontWeight,
        fontSize: Typography.FONT_SIZE_32,
    },
    subtitle: {
        fontFamily: Typography.FONT_REGULAR.fontFamily,
        fontWeight: Typography.FONT_REGULAR.fontWeight,
        fontSize: Typography.FONT_SIZE_16,
    }
})