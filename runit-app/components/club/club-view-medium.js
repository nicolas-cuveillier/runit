import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors, Typography } from "@styles";
import { router } from "expo-router";

export default function ClubViewMedium({ club }) {

    return (
        <TouchableOpacity onPress={() => router.push(`/club/${club._id}`)}>
            <View style={{ flexDirection: 'row', gap: 16, marginTop: 12 }}>
                <View>
                    <Image
                        style={styles.image}
                        source={require('../../assets/images/nike.png')} />
                </View>

                <View style={{ gap: 4 }}>
                    <Text style={styles.name}>{club.name}</Text>
                    <Text style={styles.keyPoints}>{club.members.length} members - {club.runs.length} runs</Text>
                    <Text style={styles.keyPoints}>{club.location}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 72,
        height: 72,
        borderRadius: 8,
        objectFit: 'fill'
    },
    name: {
        fontFamily: Typography.FONT_SEMIBOLD.fontFamily,
        fontWeight: Typography.FONT_SEMIBOLD.fontWeight,
        fontSize: Typography.FONT_SIZE_16,
    },
    keyPoints: {
        fontFamily: Typography.FONT_REGULAR.fontFamily,
        fontWeight: Typography.FONT_REGULAR.fontWeight,
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.PRIMARY_800
    }
})