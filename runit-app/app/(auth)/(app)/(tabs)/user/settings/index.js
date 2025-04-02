import { Text, View, SafeAreaView, StyleSheet, Image, Pressable } from "react-native";
import TextHeader from "../../../../../../components/core/text-header";
import { ScrollView } from "react-native-gesture-handler";
import { Colors, Typography } from "@styles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from "@/contexts/auth-context";
import axios from "axios";
import CONFIG from "../../../../../../config";

export default function Settings() {
    const { onLogout, authState } = useAuth();

    const logout = async () => {
        const response = await onLogout();
    }

    async function deleteAccount() {
        const response = await axios.delete(`${CONFIG.BACKEND_URL}/v1/user/${authState.user}`)
        if (response.status == 201) {
            logout()
        }
    }

    return (
        <SafeAreaView style={styles.wrapper}>
            <ScrollView>
                <View style={styles.container}>
                    <TextHeader title="Settings" />

                    <View>
                        <View style={styles.sectionContainer}>
                            <Ionicons name="person-outline" style={{ fontSize: 20, color: Colors.PRIMARY_800 }} />
                            <Text style={styles.sectionTitle}>Account</Text>
                        </View>

                        <View style={styles.separator} />

                        <Setting title="Edit profil" action={() => router.navigate("/user/settings/edit-profil")} icon />
                        <Setting title="Change password" action={() => router.navigate("/user/settings/change-password")} icon />
                        <Setting title="Log out" action={logout} />
                    </View>

                    <View>
                        <View style={styles.sectionContainer}>
                            <Ionicons name="aperture-outline" style={{ fontSize: 20, color: Colors.PRIMARY_800 }} />
                            <Text style={styles.sectionTitle}>Clubs</Text>
                        </View>

                        <View style={styles.separator} />

                        <Setting title="My clubs" action={() => router.navigate("/user/settings/my-clubs")} icon />
                    </View>

                    <View>
                        <View style={styles.sectionContainer}>
                            <Ionicons name="add-circle-outline" style={{ fontSize: 20, color: Colors.PRIMARY_800 }} />
                            <Text style={styles.sectionTitle}>More</Text>
                        </View>

                        <View style={styles.separator} />

                        <Setting title="Give us feedback" action={() => router.navigate("/user/settings/give-feedback")} icon />
                        <Setting title="Create a club" action={() => router.navigate("/club-creation")} icon />
                    </View>

                    <View style={styles.sectionDanger}>
                        <View style={styles.sectionContainer}>
                            <Ionicons name="flame-outline" style={{ fontSize: 20, color: Colors.WARNING }} />
                            <Text style={styles.dangerTitle}>Danger zone</Text>
                        </View>

                        <View style={styles.dangerSeparator} />

                        <Pressable onPress={deleteAccount}>
                            <View style={styles.settingContainer}>
                                <Text style={styles.dangerSettingTitle}>Delete account</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const Setting = ({ title, action, icon }) => {
    return (

        <Pressable onPress={action}>
            <View style={styles.settingContainer}>

                <Text style={styles.settingTitle}>{title}</Text>
                <Ionicons name={icon ? "chevron-forward-outline" : ""} style={{ fontSize: 22, color: Colors.PRIMARY_800 }} />
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: Colors.WHITE
    },
    container: {
        padding: 16,
        gap: 20
    },
    separator: {
        backgroundColor: Colors.GRAY_MEDIUM,
        height: 1
    },
    sectionContainer: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
        paddingTop: 8,
        paddingBottom: 8
    },
    sectionTitle: {
        fontFamily: Typography.FONT_BOLD.fontFamily,
        fontWeight: Typography.FONT_BOLD.fontWeight,
        fontSize: Typography.FONT_SIZE_20
    },
    settingContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 12,
    },
    settingTitle: {
        fontFamily: Typography.FONT_REGULAR.fontFamily,
        fontWeight: Typography.FONT_REGULAR.fontWeight,
        fontSize: Typography.FONT_SIZE_16
    },
    sectionDanger: {
        borderWidth: 1,
        borderColor: Colors.WARNING,
        borderRadius: 5,
        backgroundColor: Colors.WARNING_100
    },
    dangerTitle: {
        fontFamily: Typography.FONT_BOLD.fontFamily,
        fontWeight: Typography.FONT_BOLD.fontWeight,
        fontSize: Typography.FONT_SIZE_20,
        color: Colors.WARNING
    },
    dangerSeparator: {
        backgroundColor: Colors.WARNING,
        height: 1
    },
    dangerSettingTitle: {
        fontFamily: Typography.FONT_REGULAR.fontFamily,
        fontWeight: Typography.FONT_REGULAR.fontWeight,
        fontSize: Typography.FONT_SIZE_16,
        color: Colors.WARNING,
        paddingLeft: 4
    }

})