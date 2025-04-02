import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import PageLayout from '../../../../../components/core/page-layout';
import { PrimaryButton, SecondaryButton } from '../../../../../components/core/buttons';
import { Colors, Typography } from '@styles';
import Input from "../../../../../components/core/inputs/input";
import axios from 'axios';
import CONFIG from "../../../../../config";
import { router, useLocalSearchParams } from 'expo-router';
import Checkbox from 'expo-checkbox';
import MultilineInput from '../../../../../components/core/inputs/multiline-input';
import DateInput from '../../../../../components/core/inputs/date-input';
import MapView, { Marker } from 'react-native-maps';
import PickerInput from '../../../../../components/core/inputs/picker-input';

export default function RunUpdatePage() {

    const [run, setRun] = useState(null);
    const [marker, setMarker] = useState([47.1535273716586, 2.4039312486363755])
    const [errorMessage, setErrorMessage] = useState("");

    const params = useLocalSearchParams();

    useEffect(() => {
        if (params.id && !run) {
            //fetch club
            axios.get(`${CONFIG.BACKEND_URL}/v1/run/${params.id}`)
                .then(response => {
                    setRun(response.data)
                    setMarker(response.data.location.coordinates)
                })
        }
    }, [params])

    const updateRun = () => {
        if (!run.title || !run.description || !run.location || !run.start_date) {
            setErrorMessage("Fields cannot be empty.")
            return
        }

        run.location.coordinates = marker

        axios.post(`${CONFIG.BACKEND_URL}/v1/run/${run._id}`, run)
            .then((response) => router.back())
            .catch((error) => setErrorMessage("Something went wrong, try later !"))

    }

    const deleteRun = () => {
        axios.delete(`${CONFIG.BACKEND_URL}/v1/run/${run._id}`)
            .then((response) => router.navigate("/feed"))
            .catch((error) => setErrorMessage("Something went wrong, try later !"))
    }

    if (!run) {
        return (
            <View>
                <Text>Loading..</Text>
            </View>
        )
    } else {

        const initialRegion = {
            latitude: run.location.coordinates[0],
            longitude: run.location.coordinates[1],
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        };

        return (
            <PageLayout>
                <Input
                    label="Title"
                    value={run.title}
                    onChangetext={(e) => setRun(prevData => ({ ...prevData, "title": e }))} />
                <MultilineInput
                    label="Description"
                    value={run.description}
                    placeholder="Describe the run..."
                    onChangetext={(e) => setRun(prevData => ({ ...prevData, "description": e }))} />

                <View style={{ gap: 4 }}>
                    <Text style={styles.sectionTitle}>Location</Text>
                    <MapView
                        style={styles.map}
                        initialRegion={initialRegion}
                        zoomEnabled={true}
                        onPress={(e) => setMarker([e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude])} >
                        <Marker
                            coordinate={{
                                latitude: marker[0],
                                longitude: marker[1]
                            }}
                            title={"Run's start location"} />
                    </MapView>
                </View>

                <DateInput
                    label="Change date & time"
                    value={new Date(run.start_date)}
                    onChange={(e) => setRun(prevData => ({ ...prevData, "start_date": e }))} />
                <PickerInput
                    label={"Recurrence"}
                    onChange={(e) => setRun(prevData => ({ ...prevData, "recurrence": e }))}
                    items={[
                        { label: 'None', value: 'none' },
                        { label: 'Daily', value: 'daily' },
                        { label: 'Weekly', value: 'weekly' },
                        { label: 'Monthly', value: 'monthly' },
                    ]}
                    value={run.recurrence} />

                <View style={{ gap: 4 }}>
                    <Text style={styles.sectionTitle}>Activities</Text>
                    <Link
                        label={"Water spot available"}
                        value={run.water_spot}
                        action={(e) => setRun(prevData => ({ ...prevData, "water_spot": e }))} />
                    <Link
                        label={"Bag drop available"}
                        value={run.bag_drop}
                        action={(e) => setRun(prevData => ({ ...prevData, "bag_drop": e }))} />
                    <Link
                        label={"Post-run event"}
                        value={run.post_event}
                        action={(e) => setRun(prevData => ({ ...prevData, "post_event": e }))} />
                </View>

                <Text style={styles.errorMessage}>{errorMessage}</Text>

                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <SecondaryButton text="Delete run" action={deleteRun} />
                    <PrimaryButton text="Update run" action={updateRun} />
                </View>
            </PageLayout>
        );
    }
};

function Link({ label, action, value }) {

    return (
        <Pressable style={styles.linkContainer}>
            <Text style={styles.label}>{label}</Text>
            <Checkbox
                style={styles.checkbox}
                value={value}
                onValueChange={action}
                color={value ? Colors.PRIMARY_400 : undefined}
            />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    input: {
        fontFamily: Typography.FONT_REGULAR.fontFamily,
        fontWeight: Typography.FONT_REGULAR.fontWeight,
        fontSize: Typography.FONT_SIZE_16,
        padding: 20,
        borderRadius: 8,
        backgroundColor: Colors.GRAY_LIGHT,
        borderColor: Colors.GRAY_MEDIUM,
        borderWidth: 1,
        height: 150,
        textAlignVertical: 'top'
    },
    linkContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        borderWidth: 2,
        borderRadius: 8,
        borderColor: Colors.GRAY_MEDIUM,
    },
    label: {
        fontFamily: Typography.FONT_BOLD.fontFamily,
        fontWeight: Typography.FONT_BOLD.fontWeight,
        fontSize: Typography.FONT_SIZE_14,
    },
    sectionTitle: {
        fontFamily: Typography.FONT_BOLD.fontFamily,
        fontWeight: Typography.FONT_BOLD.fontWeight,
        fontSize: Typography.FONT_SIZE_16,
    },
    checkbox: {
        margin: 8,
    },
    errorMessage: {
        fontFamily: Typography.FONT_FAMILY_SEMIBOLD.fontFamily,
        fontWeight: Typography.FONT_FAMILY_SEMIBOLD.fontWeight,
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.WARNING
    },
    map: {
        width: '100%',
        height: 200,
        borderRadius: 6
    }
});
