import { View, StyleSheet, Text } from "react-native";
import { Colors, Typography } from "@styles"
import Input from "../../../components/core/inputs/input";
import TextHeader from "../../../components/core/text-header";
import { PrimaryButton } from "../../../components/core/buttons";
import { router } from "expo-router";
import { useState } from "react";
import InputPageLayout from "../../../components/core/input-page-layout";

export default function RegisterStep0() {

    const [fullName, setFullName] = useState("");
    const [mail, setMail] = useState("");
    const [phone, setPhone] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    function navigateToNextPage() {
        if (!fullName.trim() || !mail.trim() || !phone.trim()) {
            setErrorMessage("Fields cannot be empty.")
            return
        }

        if (fullName.split(' ').length !== 2) {
            setErrorMessage("Name not valid, format must be : firstname lastname.")
            return
        }

        router.navigate(`/register/register-step1?firstname=${fullName.split(' ')[0]}&lastname=${fullName.split(' ')[1]}&mail=${mail.trim()}&phone=${phone.trim()}`)
    }

    return (
        <InputPageLayout>
            <TextHeader
                title="Create an account"
                subtitle="Let start with the practical informations." />

            <View style={{ gap: 16 }}>
                <Input
                    label={"Full Name"} value={fullName} onChangetext={setFullName} />
                <Input
                    label={"Email"} value={mail} onChangetext={setMail} />
                <Input
                    label={"Phone Number"} value={phone} onChangetext={setPhone} />

                <Text style={styles.errorMessage}>{errorMessage}</Text>
            </View>

            <PrimaryButton
                action={navigateToNextPage}
                text="Continue" />
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