import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors, Typography } from "@styles"
import CONFIG from "../../config";
import axios from "axios";
import { useEffect, useState } from "react";

export default function UserViewMedium({ user, action, style }) {

    const [imageUrl, setImageUrl] = useState();

    useEffect(() => {
        if (user) {
            axios.get(`${CONFIG.BACKEND_URL}/v1/upload/image/${user.profil_picture}`)
                .then((response) => setImageUrl(response.data.imageUrl))
                .catch((error) => console.log(error))
        }
    }, [user])

    return (
        <Pressable onPress={action} style={style || ''}>
            <View style={styles.container}>
                <Image
                    style={styles.profilPicture}
                    source={imageUrl ? { uri: imageUrl } : require('../../assets/images/adaptive-icon.png')} />

                <View style={styles.textContainer}>
                    <Text style={styles.name}>{user.firstname} {user.lastname}</Text>
                    <Text style={styles.description}>{user.description}</Text>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
    },
    profilPicture: {
        width: 56,
        height: 56,
        borderRadius: 28,
        objectFit: 'fit',
    },
    textContainer: {
        gap: 2
    },
    name: {
        fontFamily: Typography.FONT_BOLD.fontFamily,
        fontWeight: Typography.FONT_BOLD.fontWeight,
        fontSize: Typography.FONT_SIZE_16,
    },
    description: {
        fontFamily: Typography.FONT_REGULAR.fontFamily,
        fontWeight: Typography.FONT_REGULAR.fontWeight,
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.PRIMARY_800
    }
})