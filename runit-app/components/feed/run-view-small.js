import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Colors, Typography } from "@styles";
import { Link, router } from "expo-router";

export default function RunViewSmall({ run }) {

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
            style={styles.upcomingRunContainer}
            onPress={() => router.push(`/run/${run._id}`)}>
            <View style={styles.upcomingRunHeaderContainer}>
                <View style={styles.upcomingRunDateContainer}>
                    <Text style={styles.upcomingRunSubtitle}>{month}</Text>
                    <Text style={styles.upcomingRunTitle}>{day}</Text>
                </View>

                <View>
                    <Text style={styles.upcomingRunTitle}>{title}</Text>
                    <Text style={styles.upcomingRunSubtitle}>{hours + ampm} - {run.location.formatted}</Text>
                </View>
            </View>
            {/*
            <View style={{ flexDirection: 'row', gap: 4, alignItems: 'baseline' }}>
                <Image
                    style={{ height: 36, width: 36, borderRadius: 18 }}
                    source={require('../../assets/images/pp.png')} />
                <Image
                    style={{ height: 36, width: 36, borderRadius: 18 }}
                    source={require('../../assets/images/pp.png')} />
                <Image
                    style={{ height: 36, width: 36, borderRadius: 18 }}
                    source={require('../../assets/images/pp.png')} />
                <Text style={styles.upcomingRunSubtitle}>and 40 runners are joing</Text>
            </View>
            */}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    upcomingRunContainer: {
        borderWidth: 1,
        borderColor: Colors.GRAY_MEDIUM,
        borderRadius: 6,
        padding: 8,
        gap: 8,
    },
    upcomingRunDateContainer: {
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
    upcomingRunHeaderContainer: {
        flexDirection: 'row',
        gap: 12
    },
    upcomingRunTitle: {
        fontFamily: Typography.FONT_BOLD.fontFamily,
        fontWeight: Typography.FONT_BOLD.fontWeight,
        fontSize: Typography.FONT_SIZE_18,
    },
    upcomingRunSubtitle: {
        fontFamily: Typography.FONT_REGULAR.fontFamily,
        fontWeight: Typography.FONT_REGULAR.fontWeight,
        fontSize: Typography.FONT_SIZE_14,
    }
})