import { View, Text, ScrollView, StyleSheet, Image, RefreshControl, ActivityIndicator } from "react-native";
import TextHeader from "../../../../../components/core/text-header";
import { Colors, Typography } from "@styles";
import RunViewSmall from "../../../../../components/feed/run-view-small";
import RunViewMedium from "../../../../../components/feed/run-view-medium";
import { useClub } from "@/contexts/club-context";
import { useEffect, useState } from "react";
import axios from "axios";
import CONFIG from "../../../../../config";
import { Ionicons } from "@expo/vector-icons";

export default function Feed() {

    const { clubState } = useClub();

    const [upcomingRuns, setUpcomingRuns] = useState([]);
    const [pastRuns, setPastRuns] = useState([]);

    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (clubState.selected) {
            fetchData()
        }
    }, [clubState])

    function fetchData() {
        setRefreshing(true);
        axios.get(`${CONFIG.BACKEND_URL}/v1/club/${clubState.club}`)
            .then((response) => {
                const runs = response.data.runs.filter(run => run.recurrence === "none");
                setUpcomingRuns(runs.filter(run => new Date(run.start_date) >= new Date()).sort((a, b) => new Date(b.start_date) - new Date(a.start_date)))
                setPastRuns(runs.filter(run => new Date(run.start_date) < new Date()).sort((a, b) => new Date(b.start_date) - new Date(a.start_date)))
                setRefreshing(false);
            }).catch((error) => {
                setRefreshing(false);
            })
    }

    if (!clubState.selected) {
        return (
            <View style={styles.defaultContainer}>
                <Ionicons name="body-outline" style={{ fontSize: 100, color: Colors.PRIMARY_400 }} />
                <Text style={styles.defaultText}>Select a club to see the feed.</Text>
            </View>
        )
    } else {
        return (
            <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => fetchData()} />}
                style={styles.container}
                contentContainerStyle={{rowGap : 8}}>

                <View style={styles.runsContainer}>
                    {upcomingRuns.length > 0 ?
                        upcomingRuns.map((run) => (
                            <RunViewSmall key={run._id} run={run} />
                        )) :
                        <Text style={styles.text}>No runs ahead..</Text>
                    }

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <Text style={styles.title}>Upcoming</Text>
                        <Ionicons name="caret-up-outline" style={{ fontSize: 32 }} />
                    </View>
                </View>

                <View style={{ height: 1, backgroundColor: Colors.GRAY_DARK }} />

                <View style={styles.runsContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <Text style={styles.title}>Past</Text>
                        <Ionicons name="caret-down-outline" style={{ fontSize: 32 }} />
                    </View>
                    {pastRuns.length > 0 ?
                        pastRuns.map((run) => (
                            <RunViewMedium key={run._id} run={run} />
                        )) :
                        <Text style={styles.text}>No runs..</Text>
                    }
                </View>

                <View style={{ height: 64 }} />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: Colors.WHITE,
    },
    defaultContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        gap: 16,
    },
    runsContainer: {
        gap: 12
    },
    text: {
        fontFamily: Typography.FONT_REGULAR.fontFamily,
        fontWeight: Typography.FONT_REGULAR.fontWeight,
        fontSize: Typography.FONT_SIZE_16,
    },
    defaultText: {
        fontFamily: Typography.FONT_REGULAR.fontFamily,
        fontWeight: Typography.FONT_REGULAR.fontWeight,
        fontSize: Typography.FONT_SIZE_20,
    },
    title: {
        fontFamily: Typography.FONT_BOLD.fontFamily,
        fontWeight: Typography.FONT_BOLD.fontWeight,
        fontSize: Typography.FONT_SIZE_32
    }
})