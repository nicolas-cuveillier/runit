import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView } from "react-native";
import { Link, router } from "expo-router";
import { Typography, Colors } from "@styles"
import TextHeader from "../../../components/core/text-header";
import { PrimaryButton } from "../../../components/core/buttons";
import { useAuth } from "@/contexts/auth-context";
import { useClub } from "@/contexts/club-context";
import { useState } from "react";

export default function Login() {

    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { onLogin } = useAuth();
    const { onSelect } = useClub();

    const login = async () => {
        if (!mail || !password) {
            setError("Fields cannot be empty.")
            return
        }

        setError("")

        const response = await onLogin(mail, password);
        switch (response.status) {
            case 200:
                // try to set the club context
                if (response.user.clubs.length > 0) {
                    // TODO manage which club to select
                    await onSelect(response.user.clubs[0]);
                }

                router.replace(`/user/${response.user._id}`);
                break;
            case 400:
                setError("Invalid credentials.")
                break;
            case 404:
                setError("User not found.")
                break;
            default:
                setError("An error occured.")
                break;
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <TextHeader
                title="Happy to see you !"
                subtitle="Log to see what happened" />

            <View style={{ gap: 10 }}>
                <TextInput
                    placeholder="Email" style={styles.input}
                    placeholderTextColor={Colors.PRIMARY_400}
                    onChangeText={text => setMail(text)} />
                <TextInput
                    placeholder="Password" style={styles.input}
                    placeholderTextColor={Colors.PRIMARY_400}
                    onChangeText={text => setPassword(text)} />
                <Text style={styles.linkText}>Forgot password ?</Text>

            </View>

            <View style={{ gap: 10 }}>
                <Text style={styles.erroMessage}>{error}</Text>
                <PrimaryButton
                    action={login} //router.replace("/user")} // TODO dynamically link to log in user
                    text="Log in"
                />

                <Text style={styles.linkTextCentered}>
                    Don't have an account yet ?
                    <Link href="register" >
                        <Text style={{ color: Colors.PRIMARY_400 }}> Sign up</Text>
                    </Link>
                </Text>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 16,
        gap: 50,
        backgroundColor: Colors.WHITE
    },
    title: {
        fontFamily: Typography.FONT_BOLD.fontFamily,
        fontWeight: Typography.FONT_BOLD.fontWeight,
        fontSize: Typography.FONT_SIZE_32,
    },
    subtitle: {
        fontFamily: Typography.FONT_REGULAR.fontFamily,
        fontWeight: Typography.FONT_REGULAR.fontWeight,
        fontSize: Typography.FONT_SIZE_16,
    },
    erroMessage: {
        fontFamily: Typography.FONT_REGULAR.fontFamily,
        fontWeight: Typography.FONT_REGULAR.fontWeight,
        fontSize: Typography.FONT_SIZE_16,
        color: Colors.WARNING
    },
    input: {
        fontFamily: Typography.FONT_REGULAR.fontFamily,
        fontWeight: Typography.FONT_REGULAR.fontWeight,
        fontSize: Typography.FONT_SIZE_16,
        padding: 20,
        borderRadius: 8,
        backgroundColor: Colors.PRIMARY_100,
        placeholderTextColor: 'red'
    },
    linkText: {
        fontFamily: Typography.FONT_REGULAR.fontFamily,
        fontWeight: Typography.FONT_REGULAR.fontWeight,
        fontSize: Typography.FONT_SIZE_14,
    },
    linkTextCentered: {
        fontFamily: Typography.FONT_REGULAR.fontFamily,
        fontWeight: Typography.FONT_REGULAR.fontWeight,
        fontSize: Typography.FONT_SIZE_14,
        textAlign: 'center'
    }
})