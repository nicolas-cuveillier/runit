import { Text, StyleSheet, View, } from "react-native";
import PageLayout from "../../../../../../../components/core/page-layout";
import RunViewSmall from "../../../../../../../components/run/run-view-small";
import { Typography, Colors } from "@/styles";
import TextHeader from "../../../../../../../components/core/text-header";
import { useClub } from "@/contexts/club-context";
import { useEffect, useState } from "react";
import axios from "axios";
import CONFIG from "../../../../../../../config";

export default function ManageRuns() {

    const { clubState } = useClub();
    const [periodicRuns, setPeriodicRuns] = useState([])
    const [onetimeRuns, setOnetimeRuns] = useState([])

    useEffect(() => {
        if (clubState.club) {
            axios.get(`${CONFIG.BACKEND_URL}/v1/club/${clubState.club}`)
                .then(response => {
                    setPeriodicRuns(response.data.runs.filter(run => run.recurrence !== "none"))
                    setOnetimeRuns(response.data.runs.filter(run => run.recurrence === "none"))
                })
        }
    }, [clubState])

    return (
        <PageLayout>
            <TextHeader
                title="Your runs"
                subtitle="Here manage and organize your runs." />

            <View style={styles.container}>
                <Text style={styles.title}>Recurrent runs</Text>

                {
                    periodicRuns.length > 0 ?
                        periodicRuns.map((run) => (
                            <RunViewSmall key={run._id} run={run}/>
                        )) :
                        <Text style={styles.descritpion}>No periodic runs for now..</Text>
                }
            </View>

            <View style={styles.container}>
                <Text style={styles.title}>One-time runs</Text>

                {
                    onetimeRuns.length > 0 ?
                        onetimeRuns.map((run) => (
                            <RunViewSmall key={run._id} run={run}/>
                        )) :
                        <Text style={styles.descritpion}>No one-time runs for now..</Text>
                }
            </View>
        </PageLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 16
    },
    title: {
        fontFamily: Typography.FONT_BOLD.fontFamily,
        fontWeight: Typography.FONT_BOLD.fontWeight,
        fontSize: Typography.FONT_SIZE_20
    },
    descritpion: {
        fontFamily: Typography.FONT_REGULAR.fontFamily,
        fontWeight: Typography.FONT_REGULAR.fontWeight,
        fontSize: Typography.FONT_SIZE_14
    }
})