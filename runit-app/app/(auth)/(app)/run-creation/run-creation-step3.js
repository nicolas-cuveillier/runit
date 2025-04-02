import { View, StyleSheet, Text } from "react-native";
import { Colors, Typography } from "@styles"
import TextHeader from "../../../../components/core/text-header";
import { PrimaryButton } from "../../../../components/core/buttons";
import { router, useLocalSearchParams } from "expo-router";
import Input from "../../../../components/core/inputs/input";
import { useState } from "react";
import InputPageLayout from "../../../../components/core/input-page-layout";
import NumberInput from "../../../../components/core/inputs/number-input";

export default function ClubCreationStep3() {

    const local = useLocalSearchParams();

    const [distance, setDistance] = useState(0);
    const [pace, setPace] = useState(0);
    const [errorMessage, setErrorMessage] = useState("")

    function goToNextPage() {
        if (!distance || !pace) {
            setErrorMessage("Fields cannot be empty.");
            return
        }

        if (isNaN(distance) || isNaN(pace)) {
            setErrorMessage("Please provide numeric values.")
            return
        }

        router.navigate(`/run-creation/run-creation-step4?title=${local.title}&description=${local.description}&start_date=${local.start_date}&start_date=${local.start_date}&recurrence=${local.recurrence}&location_formatted=${local.location_formatted}&location_lat=${local.location_lat}&location_long=${local.location_long}&distance=${distance}&pace=${pace}`)
    }

    return (
        <InputPageLayout>
            <TextHeader
                title="Create a new Run"
                subtitle="What should the runners expect." />

            <View style={{ gap: 24, alignItems: 'center' }}>
                <NumberInput
                    label={"Distance (km)"}
                    value={distance}
                    onChange={setDistance} />
                <NumberInput
                    label={"Pace (min/km)"}
                    value={pace}
                    onChange={setPace} />
                <Text style={styles.errorMessage}>{errorMessage}</Text>
            </View>

            <PrimaryButton
                action={() => goToNextPage()}
                text="Go to next step" />
        </InputPageLayout>
    )
}

const styles = StyleSheet.create({
    errorMessage: {
        fontFamily: Typography.FONT_FAMILY_SEMIBOLD.fontFamily,
        fontWeight: Typography.FONT_FAMILY_SEMIBOLD.fontWeight,
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.WARNING
    }
})