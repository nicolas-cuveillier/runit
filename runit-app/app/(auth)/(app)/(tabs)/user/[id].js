import { View, Text, Image, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { Colors, Typography } from "@styles";
import ClubViewMedium from "../../../../../components/club/club-view-medium";
import PageLayout from "../../../../../components/core/page-layout";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";
import CONFIG from "../../../../../config";
import { Ionicons } from "@expo/vector-icons";

export default function User() {

    const [user, setUser] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const params = useLocalSearchParams();

    useEffect(() => {
        if (params.id) {
            fetchData()
        }
    }, [params])

    function fetchData() {
        if (!user || user._id !== params.id) {
            setRefreshing(true);
            axios.get(`${CONFIG.BACKEND_URL}/v1/user/${params.id}`)
                .then(response => {
                    setUser(response.data)
                    setRefreshing(false)
                })
                .catch(error => {
                    setRefreshing(false)
                });
        }
    }

    if (!user) {
        // loading
    } else {
        return (
            <ScrollView
                style={styles.wrapper}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => fetchData()} />}>
                <View style={styles.container}>
                    <Image
                        style={styles.profilPicture}
                        source={{ uri: user.profil_picture_url.url }} />

                    <View>
                        <Text style={styles.name}>{user.firstname} {user.lastname}</Text>

                        <View style={{flexDirection : 'row', gap : 4}}>
                            <Ionicons name="location" size={20} color={Colors.PRIMARY_800} />
                            <Text style={styles.location}>{user.location}</Text>
                        </View>
                    </View>

                    <View>
                        <Text style={styles.description}>{user.description}</Text>
                    </View>

                    <View style={{ gap: 6 }}>
                        <Text style={styles.sectionTitle}>Clubs</Text>
                        {
                            user.clubs.length > 0 ?
                                user.clubs.map(item => {
                                    return <ClubViewMedium key={item._id} club={item} />
                                }) :
                                <Text style={styles.description}>You are not yet enrolled in a community...</Text>
                        }
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: Colors.WHITE
    },
    container: {
        padding: 16,
        flex: 1,
        gap: 32
    },
    profilPicture: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 2,
        borderColor: Colors.PRIMARY_800,
        objectFit: 'fit',
    },
    name: {
        fontFamily: Typography.FONT_BOLD.fontFamily,
        fontWeight: Typography.FONT_BOLD.fontWeight,
        fontSize: Typography.FONT_SIZE_24
    },
    location: {
        fontFamily: Typography.FONT_REGULAR.fontFamily,
        fontWeight: Typography.FONT_REGULAR.fontWeight,
        fontSize: Typography.FONT_SIZE_16,
        color: Colors.PRIMARY_800
    },
    description: {
        fontFamily: Typography.FONT_REGULAR.fontFamily,
        fontWeight: Typography.FONT_REGULAR.fontWeight,
        fontSize: Typography.FONT_SIZE_16,
    },
    sectionTitle: {
        fontFamily: Typography.FONT_BOLD.fontFamily,
        fontWeight: Typography.FONT_BOLD.fontWeight,
        fontSize: Typography.FONT_SIZE_20
    }
})