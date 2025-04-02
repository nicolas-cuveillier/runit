import { View, StyleSheet, Image, Button } from "react-native";
import TextHeader from "../../../../components/core/text-header";
import { PrimaryButton } from "../../../../components/core/buttons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
import CONFIG from "../../../../config";
import InputPageLayout from "../../../../components/core/input-page-layout";

export default function ClubCreationStep2() {

    const local = useLocalSearchParams();

    const [logo, setLogo] = useState();
    const [coverPicture, setCoverpicture] = useState();
    const [errorMessage, setErrorMessage] = useState("");

    async function goToNextStep() {
        if (!logo || !coverPicture) {
            setErrorMessage("Please, provide a logo and a cover picture to make your club memorable");
            return
        }

        const formData = new FormData()
        formData.append('image', {
            uri: logo,
            name: 'photo.jpg',
            type: 'image/jpeg'
        });
        formData.append("destination", "logo")

        axios.post(`${CONFIG.BACKEND_URL}/v1/upload/image`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((logoResponse) => {

            const formData = new FormData()
            formData.append('image', {
                uri: coverPicture,
                name: 'photo.jpg',
                type: 'image/jpeg'
            });
            formData.append("destination", "cover")

            axios.post(`${CONFIG.BACKEND_URL}/v1/upload/image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((coverResponse) => {
                router.navigate(`/club-creation/club-creation-step3?name=${local.name}&description=${local.description}&location=${local.location}&logo=${logoResponse.data.imageName}&cover_picture=${coverResponse.data.imageName}`)
            }).catch(error => setErrorMessage("Error uploading the file, try again later."));
        }).catch(error => setErrorMessage("Error uploading the file, try again later."));
    }

    const pickImage = async (type) => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            if (type === "logo") {
                setLogo(result.assets[0].uri);
            } else {
                setCoverpicture(result.assets[0].uri);
            }
        }
    }

    return (
        <InputPageLayout>
            <TextHeader
                title="Make it look spectacular"
                subtitle="Time to forge your own identity that makes your club unforgettable." />

            <View style={{ gap: 16, alignItems: 'center' }}>
                <Image
                    style={{ height: 100, width: 100, borderRadius: 6 }}
                    source={logo ? { uri: logo } : require('../../../../assets/images/adaptive-icon.png')} />
                <Button title="Pick a logo from camera roll" onPress={() => pickImage("logo")} />

                <Image
                    style={{ width: '100%', height: 200 }}
                    source={coverPicture ? { uri: coverPicture } : require('../../../../assets/images/adaptive-icon.png')} />
                <Button title="Pick a cover picture from camera roll" onPress={() => pickImage("cover")} />
            </View>

            <PrimaryButton action={() => goToNextStep()} text="Continue" />
        </InputPageLayout>
    )
}

const styles = StyleSheet.create({
})