import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, Typography } from "@styles";
import { Link, router } from 'expo-router';
import { useAuth } from "@/contexts/auth-context";
import { useClub } from "@/contexts/club-context";
import axios from 'axios';
import CONFIG from '../../config';

export default function ClubHeader({ club, handleClubChange }) {

    const { authState } = useAuth();
    const { onSelect, onUnselect } = useClub();

    const joinClub = async () => {
        axios.post(`${CONFIG.BACKEND_URL}/v1/club/${club._id}`, {
            members: club.members.map(m => m._id).concat(authState.user)
        }).then(async (response) => {

            await onSelect(response.data.club._id)

            club.members = club.members.map(m => m._id).concat(authState.user)
            handleClubChange(club)
        }).catch(error => console.log(error))
    }

    const leaveClub = async () => {
        axios.post(`${CONFIG.BACKEND_URL}/v1/club/${club._id}`, {
            members: club.members.filter(m => authState.user !== m._id)
        }).then(async (response) => {

            await onUnselect();

            club.members = club.members.filter(m => authState.user !== m._id)
            handleClubChange(club)
        }).catch(error => console.log(error))
    }

    return (
        <View style={styles.headerContainer}>
            <HeaderCover club={club} />

            <View style={styles.headerInformationContainer}>
                <Text style={styles.headerTitle}>{club.name}</Text>

                <Keypoints club={club} />
            </View>

            <ScrollView style={{ flexDirection: 'row' }} horizontal={true}>
                {!club.members.some(user => user._id === authState.user) &&
                    <Action
                        iconName="unlink-outline"
                        label="Join"
                        isPrimary
                        action={joinClub} />
                }

                {(authState.user == club.owner || club.admins.map(p => p._id).includes(authState.user) || club.leaders.map(p => p._id).includes(authState.user)) &&
                    <Action iconName="create-outline" label="Start a run" action={() => router.navigate("run-creation")} isPrimary />
                }

                {(authState.user == club.owner || club.admins.map(p => p._id).includes(authState.user)) &&
                    <Action iconName="settings-outline" label="Settings" action={() => router.navigate("/club/settings")} />
                }

                <Action iconName="share-outline" label="Share" />
                {(club.members.some(user => user._id === authState.user && authState.user !== club.owner) &&
                    <Action
                        iconName="close-circle-outline"
                        label="Leave"
                        action={leaveClub} />
                )}
            </ScrollView>
        </View>
    )
}

export function HeaderCover({ club }) {

    const id = club._id
    const { clubState } = useClub();

    const renderHeader = () => {
        if (id && id !== clubState?.club) {
            return (
                <TouchableOpacity
                    style={styles.headerLeftContainer}
                    onPress={() => router.back()}>
                    <Ionicons name="chevron-back-outline" style={styles.headerLeftIcon} />
                </TouchableOpacity>
            )
        }
        return null
    }

    return (
        <View style={{ height: 250, width: '100%' }} >
            {renderHeader()}
            <Image
                style={{ height: 210, width: '100%' }}
                source={club.cover_picture_url.url ? { uri: club.cover_picture_url.url } : require('../../assets/images/adaptive-icon.png')} />
            <Image
                style={{ height: 100, width: 100, position: 'absolute', left: 35, top: 140, borderRadius: 6 }}
                source={club.cover_picture_url.url ? { uri: club.logo_url.url } : require('../../assets/images/adaptive-icon.png')} />
        </View>
    )
}

export function Keypoints({ club }) {
    return (
        <View style={{ flexDirection: 'row', gap: 8 }}>
            <View style={{ flexDirection: 'row', gap: 2, color: Colors.GRAY_DARK, alignItems: 'center' }}>
                <Ionicons name="people-outline" style={{ color: Colors.GRAY_DARK }} />
                <Text style={styles.headerKeypoints}>{club.members.length} members</Text>
            </View>

            <View style={{ flexDirection: 'row', gap: 2, color: Colors.GRAY_DARK, alignItems: 'center' }}>
                <Ionicons name="footsteps-outline" style={{ color: Colors.GRAY_DARK }} />
                <Text style={styles.headerKeypoints}>{club.runs.length} runs</Text>
            </View>

            <View style={{ flexDirection: 'row', gap: 2, color: Colors.GRAY_DARK, alignItems: 'center' }}>
                <Ionicons name="earth-outline" style={{ color: Colors.GRAY_DARK }} />
                <Text style={styles.headerKeypoints}>{club.location}</Text>
            </View>
        </View>
    )
}

export function Action({ iconName, label, isPrimary, action }) {
    const iconStyle = {
        fontSize: 20,
        padding: 12,
        borderRadius: 22,
        overflow: 'hidden',
        backgroundColor: isPrimary ? Colors.PRIMARY_800 : Colors.PRIMARY_100
    }

    return (
        <TouchableOpacity onPress={action}>
            <View style={styles.actionContainer}>
                <Ionicons name={iconName} style={iconStyle} />
                <Text style={styles.actionLabel}>{label}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.GRAY_MEDIUM
    },
    headerTitle: {
        fontFamily: Typography.FONT_BOLD.fontFamily,
        fontWeight: Typography.FONT_BOLD.fontWeight,
        fontSize: Typography.FONT_SIZE_24
    },
    headerInformationContainer: {
        paddingLeft: 16,
        paddingTop: 8,
        paddingBottom: 8,
        gap: 4
    },
    headerKeypoints: {
        fontFamily: Typography.FONT_REGULAR.fontFamily,
        fontWeight: Typography.FONT_REGULAR.fontWeight,
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.GRAY_DARK,
    },
    actionContainer: {
        width: 83.5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 12,
        paddingBottom: 12,
        gap: 8,
    },
    actionIcon: {
        fontSize: 20,
        padding: 12,
        borderRadius: 22,
        overflow: 'hidden',
        backgroundColor: Colors.PRIMARY_800,
    },
    actionLabel: {
        fontFamily: Typography.FONT_REGULAR.fontFamily,
        fontWeight: Typography.FONT_REGULAR.fontWeight,
        fontSize: Typography.FONT_SIZE_14
    },
    headerLeftContainer: {
        position: 'absolute',
        left: 35,
        top: 50,
        borderRadius: 16,
        zIndex: 1,
        padding: 2,
        backgroundColor: 'white'
    },
    headerLeftIcon: {
        fontSize: 30,
    }
})