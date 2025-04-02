import { View, StyleSheet, Text } from "react-native";
import { Colors, Typography } from "@styles"
import Input from "../../../../components/core/inputs/input";
import TextHeader from "../../../../components/core/text-header";
import { PrimaryButton } from "../../../../components/core/buttons";
import { router } from "expo-router";
import { useState } from "react";
import MultilineInput from "../../../../components/core/inputs/multiline-input";
import LocationInput from "../../../../components/core/inputs/location-input";
import InputPageLayout from "../../../../components/core/input-page-layout";

export default function ClubCreationStep1() {

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");

    const [errorMessage, setErrorMessage] = useState("")

    function goToNextStep() {
        if (!name.trim() || !description.trim() || !location.trim()) {
            setErrorMessage("Fields cannot be empty.")
            return;
        }

        if (description.length < 10) {
            setErrorMessage("Provide a better description for describing the experience")
            return;
        }

        router.navigate(`/club-creation/club-creation-step2?name=${name.trim()}&description=${description.trim()}&location=${location.trim()}`)
    }


    return (
        <InputPageLayout>
            <TextHeader
                title="Create the base of the club"
                subtitle="Let start with praticl information." />

            <View style={{ gap: 16 }}>
                <Input
                    label={"Name"}
                    value={name}
                    onChangetext={setName} />
                <LocationInput
                    label={"Location"}
                    value={location}
                    onChangetext={setLocation}
                    placeholder="City" />
                <MultilineInput
                    label="Description"
                    value={description}
                    placeholder="Describe the experience"
                    onChangetext={setDescription} />

                <Text style={styles.errorMessage}>{errorMessage}</Text>
            </View>

            <PrimaryButton action={() => goToNextStep()} text="Continue" />
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