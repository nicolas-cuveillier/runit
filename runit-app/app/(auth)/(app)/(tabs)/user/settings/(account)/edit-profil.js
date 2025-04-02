import { StyleSheet, Text, View, Image, Button } from "react-native";
import TextHeader from "../../../../../../../components/core/text-header";
import Input from "../../../../../../../components/core/inputs/input";
import { PrimaryButton } from "../../../../../../../components/core/buttons";
import { useEffect, useState } from "react";
import { Colors, Typography } from "@styles";
import axios from "axios";
import CONFIG from "../../../../../../../config";
import { useAuth } from "@/contexts/auth-context";
import LocationInput from "../../../../../../../components/core/inputs/location-input";
import { router } from "expo-router";
import InputPageLayout from "../../../../../../../components/core/input-page-layout";

export default function EditProfil() {

    const [fullName, setFullName] = useState("");
    const [picture, setPicture] = useState();
    const [hasPictureChanged, setHasPictureChanged] = useState(false);

    const [user, setUser] = useState(null);

    const { authState } = useAuth();

    useEffect(() => {
        if (authState.user) {
            fetchData()
        }
    }, [authState])

    function fetchData() {
        if (!user || user._id !== authState.user) {
            axios.get(`${CONFIG.BACKEND_URL}/v1/user/${authState.user}`)
                .then(response => {
                    setUser(response.data)
                    setFullName(response.data.firstname + ' ' + response.data.lastname) 
                    setPicture(response.data.profil_picture_url.url)
                })
                .catch(error => {
                    setErrorMessage("An error occured.") 
                });
        }
    }

    const [errorMessage, setErrorMessage] = useState("");

    async function updateUser() {
        if (!user.fullName && !user.mail && !user.phone && !user.location) {
            setErrorMessage("Fields must be filled.")
            return
        }

        if (fullName && fullName.split(' ').length !== 2) {
            setErrorMessage("Name not valid, format must be : firstname lastname.")
            return
        }

        if (hasPictureChanged) {
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
            }).then((response) => setPicture(response.data.imageName))
                .catch(error => setErrorMessage("Error uploading the file, try again later."));
        }

        const update = {}

        if (fullName && fullName.split(' ').length === 2) {
            update.firstname = fullName.split(' ')[0]
            update.lastname = fullName.split(' ')[1]
        }
        update.mail = user.mail
        update.phone = user.phone
        update.location = user.location
        update.profil_picture = picture

        console.log(update)
        const response = await axios.put(`${CONFIG.BACKEND_URL}/v1/user/${authState.user}`, update)

        switch (response.status) {
            case 200:
                setErrorMessage("Your profile has been correctly updated !")
                break
            default:
                setErrorMessage(response.data.message)
                break
        }

        router.back()
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
            setHasPictureChanged(true);
        }
    }

    if (!user) {
        return <Text>Loading...</Text>
    }
    else {

        return (
            <InputPageLayout>
                <TextHeader
                    title="Edit your personal information"
                    subtitle="Let's dive in your personal information" />

                <View style={{ gap: 16 }}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Image
                            style={style.profilPicture}
                            source={picture ? { uri: picture } : require('../../../../../../../assets/images/adaptive-icon.png')} />
                        <Button title="Pick a logo from camera roll" onPress={pickImage} />
                    </View>

                    <Input
                        label="Full name"
                        value={fullName}
                        onChangetext={setFullName} />
                    <Input
                        label="Email"
                        value={user.mail}
                        onChangetext={(e) => setUser((prevData) => ({...prevData, "mail" : e}))} />

                    <Input
                        label="Phone"
                        value={user.phone}
                        onChangetext={(e) => setUser((prevData) => ({...prevData, "phone" : e}))} />

                    <LocationInput
                        value={user.location}
                        onChangetext={(e) => setUser((prevData) => ({...prevData, "location" : e}))} 
                        label="Location"
                    />

                    <Text style={style.errorMessage}>{errorMessage}</Text>
                </View>

                <PrimaryButton text="Save" action={updateUser} />
            </InputPageLayout>
        )
    }
}

const style = StyleSheet.create({
    profilPicture: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 2,
        borderColor: Colors.PRIMARY_800,
        objectFit: 'fit',
    },
    errorMessage: {
        fontFamily: Typography.FONT_FAMILY_SEMIBOLD.fontFamily,
        fontWeight: Typography.FONT_FAMILY_SEMIBOLD.fontWeight,
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.WARNING
    }
})