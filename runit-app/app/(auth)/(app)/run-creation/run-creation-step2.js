import { View, StyleSheet, Text } from "react-native";
import { Colors, Typography } from "@styles"
import TextHeader from "../../../../components/core/text-header";
import { PrimaryButton } from "../../../../components/core/buttons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import LocationInput from "../../../../components/core/inputs/location-input";
import InputPageLayout from "../../../../components/core/input-page-layout";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import CONFIG from "../../../../config";

export default function ClubCreationStep2() {

    const local = useLocalSearchParams();

    const [location, setLocation] = useState("")
    const [marker, setMarker] = useState([47.1535273716586, 2.4039312486363755])
    const [errorMessage, setErrorMessage] = useState("")

    function goToNextPage() {
        if (!location) {
            setErrorMessage("Field cannot be empty.");
            return
        }

        router.navigate(`/run-creation/run-creation-step3?title=${local.title}&description=${local.description}&start_date=${local.start_date}&recurrence=${local.recurrence}&location_formatted=${location}&location_lat=${marker[0]}&location_long=${marker[1]}`)
    }

    const retrieveFormattedLocation = () => {
        axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${marker[0]}&lon=${marker[1]}&apiKey=${CONFIG.GEOAPIFY_APIKEY}`)
            .then(response => {
                if (response.data.features && response.data.features.length > 0) {
                    const data = response.data.features[0]
                    setLocation(data.properties.city + ", " + data.properties.country)
                }
            })
            .catch(error => setErrorMessage(error))
    }

    useEffect(() => {
        retrieveFormattedLocation()
    }, [marker])

    return (
        <InputPageLayout>
            <TextHeader
                title="Create a new Run"
                subtitle="Choose your start location by pointing it on the map." />

            <View style={{ gap: 16 }}>
                <MapView
                    style={styles.map}
                    zoomEnabled={true}
                    onPress={(e) => setMarker([e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude])} >
                    <Marker
                        coordinate={{
                            latitude: marker[0],
                            longitude: marker[1]
                        }}
                        title={"Run's start location"} />
                </MapView>
                <LocationInput
                    value={location}
                    onChangetext={setLocation}
                    placeholder="City" />
                <Text style={styles.errorMessage}>{errorMessage}</Text>
            </View>

            <PrimaryButton action={() => goToNextPage()} text="Continue" />
        </InputPageLayout>
    )
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: 200,
    },
    errorMessage: {
        fontFamily: Typography.FONT_FAMILY_SEMIBOLD.fontFamily,
        fontWeight: Typography.FONT_FAMILY_SEMIBOLD.fontWeight,
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.WARNING
    }
})