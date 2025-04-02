import { View, Text, StyleSheet, Image, Pressable, TextInput, TouchableOpacity, Button } from "react-native";
import { Typography, Colors } from "@styles"
import TextHeader from "../../../components/core/text-header";
import { PrimaryButton } from "../../../components/core/buttons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import MultilineInput from "../../../components/core/inputs/multiline-input";
import LocationInput from "../../../components/core/inputs/location-input";
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
import CONFIG from "../../../config";
import InputPageLayout from "../../../components/core/input-page-layout";

export default function RegisterStep2() {

    const { onRegister } = useAuth();
    const local = useLocalSearchParams();

    const [picture, setPicture] = useState(null);
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    async function registerUser() {
        if (!picture || !description || !location) {
            setErrorMessage("Fields cannot be empty.")
            return
        }

        const formData = new FormData()
        formData.append('image', {
            uri: picture,
            name: 'photo.jpg',
            type: 'image/jpeg'
        });
        formData.append("destination", "profil")

        axios.post(`${CONFIG.BACKEND_URL}/v1/upload/image`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(async (response) => {
            const result = await onRegister({
                firstname: local.firstname,
                lastname: local.lastname,
                mail: local.mail,
                password: local.password,
                phone: local.phone,
                profil_picture: response.data.imageName,
                description: description,
                location: location
            });

            if (result) {
                router.navigate("/register/register-step3")
            } else {
                setErrorMessage("Error creating your account, please contact us.")
            }
        }).catch(error => setErrorMessage("Error uploading the file, try again later."));
    }

    const pickImage = async () => {
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
            setPicture(result.assets[0].uri);
        }
    }

    return (
        <InputPageLayout>
            <TextHeader
                title="As you wish"
                subtitle="Time to shine." />

            <View style={{ alignItems: 'center', gap: 16 }}>
                <Image
                    style={styles.profilPicture}
                    source={picture ? { uri: picture } : require('../../../assets/images/adaptive-icon.png')} />
                <Button title="Pick an image from camera roll" onPress={pickImage} />
            </View>

            <View style={{ gap: 4 }}>
                <LocationInput
                    label={"Location"}
                    placeholder="City"
                    value={location}
                    onChangetext={setLocation} />
                <MultilineInput
                    label="Bio"
                    value={description}
                    placeholder="Enter bio"
                    onChangetext={setDescription} />

                <Text style={styles.errorMessage}>{errorMessage}</Text>
            </View>

            <PrimaryButton action={registerUser} text="Create an account" />
        </InputPageLayout>
    )
}

const styles = StyleSheet.create({
    profilPicture: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 2,
        borderColor: Colors.PRIMARY_400,
        objectFit: 'fill'
    },
    errorMessage: {
        fontFamily: Typography.FONT_FAMILY_SEMIBOLD.fontFamily,
        fontWeight: Typography.FONT_FAMILY_SEMIBOLD.fontWeight,
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.WARNING
    }
})