import { StyleSheet, TextInput, Text, KeyboardAvoidingView } from "react-native";
import { Colors, Typography } from "@styles"
import TextHeader from "../../../../components/core/text-header";
import { PrimaryButton } from "../../../../components/core/buttons";
import { router } from "expo-router";
import PageLayout from "../../../../components/core/page-layout";
import Input from "../../../../components/core/inputs/input";
import MultilineInput from "../../../../components/core/inputs/multiline-input";
import { useState } from "react";
import InputPageLayout from "../../../../components/core/input-page-layout";

export default function ClubCreation() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    function goToNextPage() {
        if (!title.trim() || !description.trim()) {
            setErrorMessage("Fields cannot be empty.");
            return
        }

        if(description.trim().length < 10) {
            setErrorMessage("Description must be at least 10 characters long.");
            return
        }

        router.navigate(`/run-creation/run-creation-step1?title=${title.trim()}&description=${description.trim()}`)
    }

    return (
        <InputPageLayout>

            <TextHeader
                title="Create a new Run"
                subtitle="Let's start with the practical information." />

            <Input
                label={"Start with the title"}
                onChangetext={setTitle} />
            <MultilineInput
                label="Description"
                value={description}
                placeholder="Describe the run..."
                onChangetext={setDescription} />
            <Text style={styles.errorMessage}>{errorMessage}</Text>

            <PrimaryButton action={() => goToNextPage()} text="Go to next step" />
        </InputPageLayout>
    )
}

const styles = StyleSheet.create({
    input: {
        fontFamily: Typography.FONT_REGULAR.fontFamily,
        fontWeight: Typography.FONT_REGULAR.fontWeight,
        fontSize: Typography.FONT_SIZE_16,
        padding: 20,
        borderRadius: 8,
        backgroundColor: Colors.GRAY_LIGHT,
        borderColor: Colors.GRAY_MEDIUM,
        borderWidth: 1,
        height: 150,
        textAlignVertical: 'top'
    },
    errorMessage: {
        fontFamily: Typography.FONT_FAMILY_SEMIBOLD.fontFamily,
        fontWeight: Typography.FONT_FAMILY_SEMIBOLD.fontWeight,
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.WARNING
    }
})