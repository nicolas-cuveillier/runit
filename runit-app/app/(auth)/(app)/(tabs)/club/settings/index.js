import { Text, View, SafeAreaView, StyleSheet, Image, Pressable } from "react-native";
import TextHeader from "../../../../../../components/core/text-header";
import { ScrollView } from "react-native-gesture-handler";
import { Colors, Typography } from "@styles";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useClub } from "@/contexts/club-context";
import axios from "axios";
import CONFIG from "../../../../../../config";

export default function Settings() {

    const { clubState, onUnselect } = useClub();

    async function deleteClub() {
        const response = await axios.delete(`${CONFIG.BACKEND_URL}/v1/club/${clubState.club}`)
        if (response.status == 200) {
            await onUnselect();
            router.navigate("/discovery")
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
                            <Text style={styles.sectionTitle}>Club</Text>
                        </View>

                        <View style={styles.separator} />

                        <Setting title="Edit information" href="/club/settings/edit-information" icon />
                        <Setting title="Manage roles" href="/club/settings/manage-roles" icon />
                    </View>

                    <View>
                        <View style={styles.sectionContainer}>
                            <Ionicons name="aperture-outline" style={{ fontSize: 20, color: Colors.PRIMARY_800 }} />
                            <Text style={styles.sectionTitle}>Runs</Text>
                        </View>

                        <View style={styles.separator} />

                        <Setting title="Manage runs" href="/club/settings/manage-runs" icon />
                        <Setting title="Create a run" href="/run-creation" icon />
                    </View>

                    <View style={styles.sectionDanger}>
                        <View style={styles.sectionContainer}>
                            <Ionicons name="flame-outline" style={{ fontSize: 20, color: Colors.WARNING }} />
                            <Text style={styles.dangerTitle}>Danger zone</Text>
                        </View>

                        <View style={styles.dangerSeparator} />

                        <Pressable onPress={() => deleteClub()} >
                            <View style={styles.settingContainer}>
                                <Text style={styles.dangerSettingTitle}>Delete club</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const Setting = ({ title, href, icon }) => {
    return (
        <Link href={href ? href : ""}>
            <View style={styles.settingContainer}>

                <Text style={styles.settingTitle}>{title}</Text>
                <Ionicons name={icon ? "chevron-forward-outline" : ""} style={{ fontSize: 22, color: Colors.PRIMARY_800 }} />
            </View>
        </Link>
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
        paddingLeft: 6,
        paddingBottom : 6
    }

})