import { View, StyleSheet, Text } from "react-native";
import { Colors, Typography } from "@styles"
import Input from "../../../components/core/inputs/input";
import TextHeader from "../../../components/core/text-header";
import { PrimaryButton } from "../../../components/core/buttons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import InputPageLayout from "../../../components/core/input-page-layout";

export default function RegisterStep1() {

    const local = useLocalSearchParams();

    const [password, setPassword] = useState("");
    const [passwordSnd, setPasswordSnd] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    function navigateToNextPage() {
        if (!password.trim() || !passwordSnd.trim()) {
            setErrorMessage("Fields cannot be empty.")
            return
        }

        if (password.trim() != passwordSnd.trim()) {
            setErrorMessage("Passwords don't correspond.")
            return
        }

        router.navigate(`/register/register-step2?firstname=${local.firstname}&lastname=${local.lastname}&mail=${local.mail}&phone=${local.phone}&password=${password.trim()}`)
    }

    return (
        <InputPageLayout>

            <TextHeader
                title="Set a password"
                subtitle="Please enter a password that is at least 8 characters." />

            <View style={{ gap: 16 }}>
                <Input
                    label={"Password"}
                    value={password}
                    onChangetext={setPassword} />

                <Input
                    label={"Again, password"}
                    value={passwordSnd}
                    onChangetext={setPasswordSnd} />

                <Text style={styles.errorMessage}>{errorMessage}</Text>
            </View>

            <PrimaryButton action={navigateToNextPage} text="Continue" />
        </InputPageLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        gap: 50,
        backgroundColor: Colors.WHITE
    },
    errorMessage: {
        fontFamily: Typography.FONT_FAMILY_SEMIBOLD.fontFamily,
        fontWeight: Typography.FONT_FAMILY_SEMIBOLD.fontWeight,
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.WARNING
    }
})