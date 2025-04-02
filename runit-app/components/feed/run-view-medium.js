import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Colors, Typography } from "@styles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function RunViewMedium({ run }) {

    const date = new Date(run.start_date);
    const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const day = date.getDate();
    let hours = date.getHours() - 2;
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;

    const title = run.title.length > 25 ? run.title.substring(0, 25) + '...' : run.title

    return (
        <Pressable
            style={styles.pastRunContainer}
            onPress={() => router.push(`/run/${run._id}`)}>
            <View style={styles.pastRunHeaderContainer}>
                <View style={styles.pastRunDateContainer}>
                    <Text style={styles.pastRunSubtitle}>{month}</Text>
                    <Text style={styles.pastRunTitle}>{day}</Text>
                </View>

                <View>
                    <Text style={styles.pastRunTitle}>{title}</Text>
                    <Text style={styles.pastRunSubtitle}>{hours + ampm} - {run.location.formatted}</Text>
                </View>
            </View>

            <View>
                <Image
                    style={{ borderRadius: 6, width: '100%', height: 350 }}
                    source={require('../../assets/images/trail.png')} />
            </View>

            <View>
                <Text>43 likes</Text>
                <View style={styles.pastRunActionContainer}>
                    <Ionicons name="heart-outline" size={24} color="black" />
                    <Ionicons name="chatbubble-outline" size={24} color="black" />
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    pastRunContainer: {
        gap: 8,
    },
    pastRunDateContainer: {
        borderWidth: 1,
        borderColor: Colors.GRAY_MEDIUM,
        borderRadius: 6,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 2,
        paddingBottom: 2,
        gap: 8,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1
    },
    pastRunHeaderContainer: {
        flexDirection: 'row',
        gap: 12
    },
    pastRunTitle: {
        fontFamily: Typography.FONT_BOLD.fontFamily,
        fontWeight: Typography.FONT_BOLD.fontWeight,
        fontSize: Typography.FONT_SIZE_18,
    },
    pastRunSubtitle: {
        fontFamily: Typography.FONT_REGULAR.fontFamily,
        fontWeight: Typography.FONT_REGULAR.fontWeight,
        fontSize: Typography.FONT_SIZE_14,
    },
    pastRunActionContainer: {
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})