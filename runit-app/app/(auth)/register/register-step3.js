import { View, Text, StyleSheet } from "react-native";
import { Colors, Typography } from "@styles";
import { Link } from "expo-router";

export default function RegisterStep3() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Well done, you did it !</Text>

            <View style={styles.linksContainer}>
                <Link style={styles.button} href="discovery" replace={true}>
                    <Text style={styles.buttonText}>Discover clubs</Text>
                </Link>
                <Link style={styles.button} href="/club-creation">
                    <Text style={styles.buttonText}>Create a club</Text>
                </Link>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: Colors.PRIMARY_100,
        gap : 200,
        paddingBottom : 100
    },
    title: {
        fontFamily: Typography.FONT_BOLD.fontFamily,
        fontWeight: Typography.FONT_BOLD.fontWeight,
        fontSize: Typography.FONT_SIZE_48,
        textAlign: 'center'
    },
    linksContainer: {
        flexDirection: 'row',
        gap: 20
    },
    button: {
        backgroundColor: Colors.PRIMARY_400,
        borderRadius: 24,
        padding: 16,
        overflow: 'hidden',
    },
    buttonText: {
        fontFamily: Typography.FONT_BOLD.fontFamily,
        fontWeight: Typography.FONT_BOLD.fontWeight,
        color: Colors.WHITE,
        fontSize: Typography.FONT_SIZE_16,
    }
})