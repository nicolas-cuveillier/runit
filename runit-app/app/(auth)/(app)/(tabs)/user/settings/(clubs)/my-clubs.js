import { View, SafeAreaView, FlatList, StyleSheet } from "react-native";
import ClubViewMedium from "../../../../../../../components/club/club-view-medium";
import { Colors, Typography } from "@styles";
import TextHeader from "../../../../../../../components/core/text-header";
import { useEffect, useState } from "react";
import axios from "axios";
import CONFIG from "../../../../../../../config";
import { useAuth } from "@/contexts/auth-context";

export default function MyClubs() {

    const [clubs, setClubs] = useState([]);
    const { authState } = useAuth();

    useEffect(() => {
        axios.get(`${CONFIG.BACKEND_URL}/v1/user/${authState.user}`)
            .then(response => setClubs(response.data.clubs))
    }, [])

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <TextHeader title="My clubs" subtitle="Here are your clubs." />
                <FlatList
                    style={{ height: 1000 }}
                    data={clubs}
                    renderItem={({ item }) => <ClubViewMedium club={item} />}
                    keyExtractor={item => item.name} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 16,
        backgroundColor: Colors.WHITE
    },
    input: {
        fontFamily: Typography.FONT_REGULAR.fontFamily,
        fontWeight: Typography.FONT_REGULAR.fontWeight,
        fontSize: Typography.FONT_SIZE_16,
        padding: 16,
        borderRadius: 8,
        backgroundColor: Colors.PRIMARY_100,
        placeholderTextColor: 'red'
    }
})