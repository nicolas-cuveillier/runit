import { StyleSheet, Text, View } from "react-native";
import TextHeader from "../../../../../../../components/core/text-header";
import Input from "../../../../../../../components/core/inputs/input";
import { PrimaryButton } from "../../../../../../../components/core/buttons";
import { Colors, Typography } from "@styles";
import { useEffect, useState } from "react";
import { useClub } from "@/contexts/club-context";
import CONFIG from "../../../../../../../config";
import axios from "axios";
import LocationInput from "../../../../../../../components/core/inputs/location-input";
import InputPageLayout from "../../../../../../../components/core/input-page-layout";
import MultilineInput from "../../../../../../../components/core/inputs/multiline-input";

export default function EditInformation() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");

    const { clubState } = useClub();

    useEffect(() => {
        if (clubState.club) {
            axios.get(`${CONFIG.BACKEND_URL}/v1/club/${clubState.club}`)
                .then(response => {
                    setName(response.data.name)
                    setDescription(response.data.description)
                    setLocation(response.data.location)
                })
        }
    }, [clubState])

    const [errorMessage, setErrorMessage] = useState("");

    async function updateClub() {
        if (!name && !description && !location) {
            setErrorMessage("Fields must be filled.")
            return
        }

        const response = await axios.post(`${CONFIG.BACKEND_URL}/v1/club/${clubState.club}`, {
            name: name,
            description: description,
            location: location
        })

        switch (response.status) {
            case 200:
                setErrorMessage("Your club has been correctly updated !")
                break
            default:
                setErrorMessage(response.data.message)
                break
        }
    }
    return (
        <InputPageLayout>
            <TextHeader
                title="Edit the club's information"
                subtitle="Try not to change it too often." />

            <View style={{ gap: 16 }}>
                <Input
                    label="Club name"
                    value={name}
                    onChangetext={setName} />
                <MultilineInput
                    label="Description"
                    value={description}
                    onChangetext={setDescription} />
                <LocationInput
                    label={"Location"}
                    value={location}
                    onChangetext={setLocation}
                    placeholder="City" />

                <Text style={styles.errorMessage}>{errorMessage}</Text>
            </View>

            <PrimaryButton text="Save club information" action={updateClub} />
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