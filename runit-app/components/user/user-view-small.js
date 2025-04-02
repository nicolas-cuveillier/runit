import axios from 'axios';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Pressable } from 'react-native';
import CONFIG from '../../config';

export default function UserViewSmall({ user }) {

    const [imageUrl, setImageUrl] = useState();

    useEffect(() => {
        if (user) {
            axios.get(`${CONFIG.BACKEND_URL}/v1/upload/image/${user.profil_picture}`)
            .then((response) => setImageUrl(response.data.imageUrl))
            .catch((error) => console.log(error))
        }
    }, [user])

    return (
        <Pressable
            onPress={() => router.push(`/user/${user._id}`)}>
            <Image
                style={{ height: 36, width: 36, borderRadius: 18 }}
                source={imageUrl ? { uri: imageUrl } : require('../../assets/images/adaptive-icon.png')} />
        </Pressable>
    )
}