import { View, StyleSheet, Text } from "react-native";
import { Colors, Typography } from "@styles"
import TextHeader from "../../../../components/core/text-header";
import { PrimaryButton } from "../../../../components/core/buttons";
import { router, useLocalSearchParams } from "expo-router";
import ClubHeader from "../../../../components/club/header-section";
import axios from "axios";
import CONFIG from "../../../../config"
import { useAuth } from "@/contexts/auth-context";
import { useClub } from "@/contexts/club-context";
import { useState } from "react";
import InputPageLayout from "../../../../components/core/input-page-layout";

export default function ClubCreationStep3() {

    const [errorMessage, setErrorMessage] = useState("")

    const local = useLocalSearchParams();
    const { authState } = useAuth();
    const { onSelect } = useClub();

    const club = {
        owner: authState.user,
        name: local.name,
        admins: [],
        leaders: [],
        members : [],
        description : local.description,
        location: local.location,
        logo : local.logo,
        cover_picture : local.cover_picture,
        runs: []
    }

    function createClub() {
        axios.post(`${CONFIG.BACKEND_URL}/v1/club`, club)
            .then(async (response) => {
                const res = await onSelect(response.data.club._id);
                if (res) {
                    router.navigate(`/club-creation/club-creation-step4?id=${response.data.club._id}`)
                } else {
                    setErrorMessage("An error occured, try again later.")
                }
            }).catch(error => setErrorMessage("An error occured, try again later." + error))

    }

    return (
        <InputPageLayout>
            <TextHeader
                title="Here is what it will look like"
                subtitle="Just a preview." />

            <View style={styles.previewContainer}>
                <ClubHeader club={club} />
            </View>
            <Text style={styles.errorMessage}>{errorMessage}</Text>

            <PrimaryButton
                action={() => createClub()}
                text="Create the club !" />
        </InputPageLayout>
    )
}

const styles = StyleSheet.create({
    previewContainer: {
        borderWidth: 0.5,
        borderRadius: 8,
        borderColor: Colors.GRAY_MEDIUM,
    },
    errorMessage: {
        fontFamily: Typography.FONT_FAMILY_SEMIBOLD.fontFamily,
        fontWeight: Typography.FONT_FAMILY_SEMIBOLD.fontWeight,
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.WARNING
    }
})