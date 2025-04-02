import { View, StyleSheet, Text, Pressable } from "react-native";
import Checkbox from 'expo-checkbox';
import { Colors, Typography } from "@styles";
import TextHeader from "../../../../components/core/text-header";
import { PrimaryButton } from "../../../../components/core/buttons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import axios from "axios";
import CONFIG from "../../../../config";
import { useClub } from "@/contexts/club-context";
import InputPageLayout from "../../../../components/core/input-page-layout";

export default function ClubCreationStep4() {

    const local = useLocalSearchParams();

    const [waterSpot, setWaterSpot] = useState(false);
    const [bagDrop, setBagDrop] = useState(false);
    const [postEvent, setPostEvent] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    const { clubState } = useClub();
    console.log(local)
    function createRun() {
        axios.post(`${CONFIG.BACKEND_URL}/v1/run`, {
            title: local.title,
            description: local.description,
            start_date: local.start_date,
            recurrence: "none",
            location: {
                formatted: local.location_formatted,
                coordinates: [local.location_lat, local.location_long]
            },
            distance: local.distance,
            pace: local.pace,
            recurrence: local.recurrence,
            club: clubState.club,
            water_spot: waterSpot,
            bag_drop: bagDrop,
            post_event: postEvent
        })
            .then((response) => router.navigate("/(tabs)/feed"))
            .catch(error => console.log(error))
    }

    return (
        <InputPageLayout>
            <TextHeader
                title="Create a new Run"
                subtitle="Select you run features." />

            <View style={{ gap: 16 }}>
                <Link
                    label={"Water spot available"}
                    value={waterSpot}
                    action={() => setWaterSpot(!waterSpot)} />
                <Link
                    label={"Bag drop available"}
                    value={bagDrop}
                    action={() => setBagDrop(!bagDrop)} />
                <Link
                    label={"Post-run event"}
                    value={postEvent}
                    action={() => setPostEvent(!postEvent)}
                />
                <Text style={styles.errorMessage}>{errorMessage}</Text>
            </View>

            <PrimaryButton
                action={() => createRun()}
                text="Create run" />
        </InputPageLayout>
    )
}

function Link({ label, action, value }) {

    return (
        <Pressable style={styles.linkContainer}>
            <Text style={styles.label}>{label}</Text>
            <Checkbox
                style={styles.checkbox}
                value={value}
                onValueChange={action}
                color={value ? Colors.PRIMARY_400 : undefined}
            />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    linkContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderWidth: 2,
        borderRadius: 8,
        borderColor: Colors.GRAY_MEDIUM,
    },
    label: {
        fontFamily: Typography.FONT_BOLD.fontFamily,
        fontWeight: Typography.FONT_BOLD.fontWeight,
        fontSize: Typography.FONT_SIZE_14,
    },
    checkbox: {
        margin: 8,
    },
    errorMessage: {
        fontFamily: Typography.FONT_FAMILY_SEMIBOLD.fontFamily,
        fontWeight: Typography.FONT_FAMILY_SEMIBOLD.fontWeight,
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.WARNING
    }
})