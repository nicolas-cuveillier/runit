import { StyleSheet, Text, View } from "react-native";
import { Colors, Typography } from "@styles";
import PageLayout from "../../../../../../../components/core/page-layout";
import { useEffect, useState } from "react";
import { useClub } from "@/contexts/club-context";
import axios from "axios";
import CONFIG from "../../../../../../../config";
import MembersList from "../../../../../../../components/club/manage-roles-list";

export default function ManageRoles() {

    const [club, setClub] = useState(null);
    const { clubState } = useClub();

    useEffect(() => {
        if (clubState.club) {
            axios.get(`${CONFIG.BACKEND_URL}/v1/club/${clubState.club}`)
                .then(response => setClub(response.data))
        }
    }, [clubState])

    if (!club) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    } else {

        return (
            <PageLayout>
                <Text style={styles.title}>Admins</Text>
                <Text style={styles.description}>
                    An admin has nearly the same privileges as the owner,
                    except important modifications concerning the run club
                    status.
                </Text>

                <MembersList type="admin" users={club.admins} />

                <View style={styles.separator} />

                <Text style={styles.title}>Leaders</Text>
                <Text style={styles.description}>
                    A leader is here to support runs before, during and
                    after it took place. However, he has no rights
                    concerning the club organization.
                </Text>
                <MembersList type="leader" users={club.leaders} />

                <View style={styles.separator} />

                <Text style={styles.title}>Members</Text>
                <Text style={styles.description}>
                    Members are the fuel of the community. They can
                    participate to everything that the club proposes
                    without any rights concerning its organization.
                </Text>
                <MembersList type="member" users={club.members} />
            </PageLayout>
        )
    }
}

const styles = StyleSheet.create({
    separator: {
        backgroundColor: Colors.GRAY_MEDIUM,
        height: 1
    },
    title: {
        fontFamily: Typography.FONT_BOLD.fontFamily,
        fontWeight: Typography.FONT_BOLD.fontWeight,
        fontSize: Typography.FONT_SIZE_20,
    },
    description: {
        fontFamily: Typography.FONT_REGULAR.fontFamily,
        fontWeight: Typography.FONT_REGULAR.fontWeight,
        fontSize: Typography.FONT_SIZE_14,
    }
})