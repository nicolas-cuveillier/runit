import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import { Typography, Colors } from "@/styles";
import { router } from "expo-router";
import { InferencePriority } from "typescript";
import { Ionicons } from "@expo/vector-icons";

export default function RunViewSmall({ run }) {

    const title = run.title.length > 25 ? run.title.substring(0, 25) + '...' : run.title
    
    // Retrieve format
    const date = new Date(run.start_date)
    const dayOfWeek = date.toLocaleString('en-US', { weekday: 'short' });
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();
    let hours = date.getHours() - 2;
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutes = date.getMinutes();
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    
    let info = "";
    switch (run.recurrence) {
        case 'none':
            const formattedDate = `${dayOfWeek}, ${month} ${day}, ${year} at ${hours}:${formattedMinutes} ${ampm}`;
            info = `${formattedDate} - ${run.location.formatted}`
            break
        case 'daily':
            info = `Every day at ${hours}:${formattedMinutes} ${ampm} - ${run.location.formatted}`
            break
        case 'weekly':
            info = `Every ${day} at ${hours}:${formattedMinutes} ${ampm} - ${run.location.formatted}`
            break
        case 'monthly':
            info = `Every month at ${hours}:${formattedMinutes} ${ampm} - ${run.location.formatted}`
            break
        default:
            info = `${run.start_date}`
            break
    }
    info = info.length > 25 ? info.substring(0, 25) + '...' : info

    return (
        <Pressable
            onPress={() => router.navigate(`/run/${run._id}`)}
            style={styles.container}>
            <Image
                style={{ height: 78, width: 78, borderRadius: 6 }}
                source={require('../../assets/images/trail.png')} />

            <View style={{ justifyContent: 'space-around' }}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{info}</Text>
                <Text style={styles.description}>{run.distance}km</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 8
    },
    title: {
        fontFamily: Typography.FONT_REGULAR.fontFamily,
        fontWeight: Typography.FONT_REGULAR.fontWeight,
        fontSize: Typography.FONT_SIZE_16
    },
    description: {
        fontFamily: Typography.FONT_REGULAR.fontFamily,
        fontWeight: Typography.FONT_REGULAR.fontWeight,
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.PRIMARY_800
    }
})