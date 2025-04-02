import { View, StyleSheet, ScrollView, Text, RefreshControl } from "react-native";
import ClubHeader from "../../../../../components/club/header-section";
import { About, FrequentlyAskedQuestions, IncomingRuns, Members } from "../../../../../components/club/body-section";
import { useLocalSearchParams } from "expo-router";
import PageLayout from "../../../../../components/core/page-layout";
import { useEffect, useState } from "react";
import axios from "axios";
import CONFIG from "../../../../../config";
import { Colors, Typography } from "@styles";
import { Ionicons } from "@expo/vector-icons";

export default function Club() {

    const [club, setClub] = useState(null);

    const params = useLocalSearchParams();

    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (params.id !== "null") {
            fetchData()
        }
    }, [params])

    function fetchData() {
        setRefreshing(true);
        axios.get(`${CONFIG.BACKEND_URL}/v1/club/${params.id}`)
            .then(response => {
                setClub(response.data)
            })
            .catch(error => {
                console.log(error)
            })
            setRefreshing(false)
    }

    if (!club) {
        return (
            <View style={styles.container}>
                <Ionicons name="aperture-outline" style={{ fontSize: 100, color: Colors.PRIMARY_400 }} />
                <Text style={styles.text}>You don't have any community yet, let's discover it.</Text>
            </View>
        )
    } else {
        return (
            <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => fetchData()} />}>
                <ClubHeader club={club} handleClubChange={setClub} />

                <View style={styles.bodyContainer}>
                    <About description={club.description} />

                    <Members members={club.members} />

                    <IncomingRuns runs={club.runs.filter(r => new Date(r.start_date) > new Date()).slice(0, 4)} />

                    <FrequentlyAskedQuestions />
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    bodyContainer: {
        paddingTop: 16,
        gap: 16
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        gap: 16,
    },
    text: {
        fontFamily: Typography.FONT_REGULAR.fontFamily,
        fontWeight: Typography.FONT_REGULAR.fontWeight,
        fontSize: Typography.FONT_SIZE_20,
        textAlign: 'center'
    }
})