import { View, Text, StyleSheet } from "react-native";
import TextHeader from "../../../../../../../components/core/text-header";
import Input from "../../../../../../../components/core/inputs/input";
import { PrimaryButton } from "../../../../../../../components/core/buttons";
import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import CONFIG from "../../../../../../../config";
import { Colors, Typography } from "@styles";
import InputPageLayout from "../../../../../../../components/core/input-page-layout";

export default function ChangePassword() {

    const [password, setPassword] = useState("");
    const [passwordSnd, setPasswordSnd] = useState("");

    const { authState } = useAuth();

    const [errorMessage, setErrorMessage] = useState("");

    async function updateUser() {
        if (!password || !passwordSnd) {
            setErrorMessage("Fields must be filled.")
            return
        }

        if (password !== passwordSnd) {
            setErrorMessage("Passwords don't match.")
            return
        }

        const response = await axios.put(`${CONFIG.BACKEND_URL}/v1/user/${authState.user}`, {
            password: password
        })

        switch (response.status) {
            case 200:
                setErrorMessage("Your profile has been correctly updated !")
                break
            default:
                setErrorMessage(response.data.message)
                break
        }
    }

    return (
        <InputPageLayout>
            <TextHeader
                title="Change your password"
                subtitle="Give us some great security here." />

            <View style={{ gap: 16 }}>
                <Input
                    label="New password"
                    value={password}
                    onChangetext={setPassword} />

                <Input
                    label="Again, new password"
                    value={passwordSnd}
                    onChangetext={setPasswordSnd} />

                <Text style={style.errorMessage}>{errorMessage}</Text>
            </View>

            <PrimaryButton text="Save new password" action={updateUser} />
        </InputPageLayout>
    )
}

const style = StyleSheet.create({
    errorMessage: {
        fontFamily: Typography.FONT_FAMILY_SEMIBOLD.fontFamily,
        fontWeight: Typography.FONT_FAMILY_SEMIBOLD.fontWeight,
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.WARNING
    }
})