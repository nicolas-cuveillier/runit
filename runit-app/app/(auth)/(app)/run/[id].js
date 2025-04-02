import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import PageLayout from '../../../../components/core/page-layout';
import TextHeader from '../../../../components/core/text-header';
import { PrimaryButton, SecondaryButton } from '../../../../components/core/buttons';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography } from '@styles';
import axios from 'axios';
import CONFIG from "../../../../config";
import { router, useLocalSearchParams } from 'expo-router';
import { useAuth } from "@/contexts/auth-context";
import UserViewSmall from '../../../../components/user/user-view-small';
import MapView, { Marker } from 'react-native-maps';

export default function RunPage() {

    const [run, setRun] = useState(null);
    const params = useLocalSearchParams();
    const { authState } = useAuth();

    useEffect(() => {
        if (params.id) {
            //fetch club
            axios.get(`${CONFIG.BACKEND_URL}/v1/run/${params.id}`)
                .then(response => setRun(response.data))
                .catch(error => console.log(error))
        }
    }, [params])

    const joinRun = () => {
        axios.post(`${CONFIG.BACKEND_URL}/v1/run/${run._id}`, {
            participants: run.participants.concat(authState.user)
        }).then((response) => setRun(prevData => ({ ...prevData, "participants": run.participants.concat(authState.user) })))
    }

    const leaveRun = () => {
        axios.post(`${CONFIG.BACKEND_URL}/v1/run/${run._id}`, {
            participants: run.participants.filter(p => p._id !== authState.user)
        }).then((response) => setRun(prevData => ({ ...prevData, "participants": run.participants.filter(p => p._id !== authState.user) })))
    }

    if (!run) {
        return (
            <View>
                <Text>Loading..</Text>
            </View>
        )
    } else {

        const date = new Date(run.start_date)
        const dayOfWeek = date.toLocaleString('en-US', { weekday: 'short' });
        const month = date.toLocaleString('en-US', { month: 'short' });
        const day = date.getDate();
        const year = date.getFullYear();
        let hours = date.getHours() - 2;
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const minutes = date.getMinutes();
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        const formattedDate = `${dayOfWeek}, ${month} ${day}, ${year} at ${hours}:${formattedMinutes} ${ampm}`;

        const initialRegion = {
            latitude: run.location.coordinates[0],
            longitude: run.location.coordinates[1],
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        };

        return (
            <PageLayout>
                <TextHeader
                    title={run.title}
                    subtitle={run.description} />

                <View style={{ gap: 16 }}>
                    <Information
                        title="Date & Time"
                        description={formattedDate}
                        icon="location-outline" />

                    <MapView
                        style={styles.map}
                        initialRegion={initialRegion}
                        zoomEnabled={true}>
                        <Marker
                            coordinate={{
                                latitude: run.location.coordinates[0],
                                longitude: run.location.coordinates[1]
                            }}
                            title={"Run's start location"} />
                    </MapView>

                    <Information
                        title="Distance"
                        description={`${run.distance} miles`}
                        icon="footsteps-outline" />

                    <Information
                        title="Pace"
                        description={`${run.pace} min/mile`}
                        icon="stopwatch-outline" />
                </View>

                {
                    !run.participants.map(p => p._id).includes(authState.user) ?
                        <PrimaryButton text="Join team" action={joinRun} /> :
                        <SecondaryButton text="Leave team" action={leaveRun} />
                }

                <View style={styles.sectionContainer}>
                    <Text style={styles.bodyTitle}>Participants ({run.participants.length})</Text>
                    <View style={{ flexDirection: 'row', gap: 4 }}>
                        {
                            run.participants.length > 0 ?
                                run.participants.map(participant => (<UserViewSmall key={participant._id} user={participant} />)) :
                                <Text style={styles.text}>No one is coming for now..</Text>
                        }
                    </View>
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={styles.bodyTitle}>Event details</Text>
                    <View style={{ gap: 12 }}>
                        <EventDetail label="Bag Drop" isValid={run.bag_drop} />
                        <EventDetail label="Water Spot" isValid={run.water_spot} />
                        <EventDetail label="Post-run event" isValid={run.post_event} />
                    </View>
                </View>

                <SecondaryButton text="Edit" action={() => router.navigate(`/run/update/${run._id}`)} />
            </PageLayout>
        );
    }
};

function Information({ title, description, icon }) {
    return (
        <View style={styles.infoContainer}>
            <View style={styles.infoIcon}>
                <Ionicons name={icon} style={{ fontSize: 24 }} />
            </View>
            <View>
                <Text style={styles.infoTitle}>{title}</Text>
                <Text style={styles.infoDescription}>{description}</Text>
            </View>
        </View>
    )
}

function EventDetail({ label, isValid }) {
    return (
        <View style={styles.eventDetailContainer}>
            <Text style={styles.eventDetailLabel}>{label}</Text>
            <Ionicons
                name={isValid ? "checkmark-outline" : "close-outline"}
                style={{ fontSize: 24 }} />
        </View>
    )
}

const styles = StyleSheet.create({
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    infoIcon: {
        fontSize: 20,
        backgroundColor: Colors.PRIMARY_100,
        padding: 12,
        borderRadius: 8,
    },
    infoTitle: {
        fontFamily: Typography.FONT_REGULAR.fontFamily,
        fontWeight: Typography.FONT_REGULAR.fontWeight,
        fontSize: Typography.FONT_SIZE_16,
    },
    infoDescription: {
        fontFamily: Typography.FONT_REGULAR.fontFamily,
        fontWeight: Typography.FONT_REGULAR.fontWeight,
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.PRIMARY_800
    },
    map: {
        width: "100%",
        height: 200,
        borderRadius: 8,
    },
    sectionContainer: {
        gap: 4,
    },
    bodyTitle: {
        fontFamily: Typography.FONT_BOLD.fontFamily,
        fontWeight: Typography.FONT_BOLD.fontWeight,
        fontSize: Typography.FONT_SIZE_20
    },
    eventDetailContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    eventDetailLabel: {
        fontFamily: Typography.FONT_REGULAR.fontFamily,
        fontWeight: Typography.FONT_REGULAR.fontWeight,
        fontSize: Typography.FONT_SIZE_16
    },
    text: {
        fontFamily: Typography.FONT_REGULAR.fontFamily,
        fontWeight: Typography.FONT_REGULAR.fontWeight,
        fontSize: Typography.FONT_SIZE_14,
    },
    map: {
        width: '100%',
        height: 200,
        borderRadius: 6
    }
});
