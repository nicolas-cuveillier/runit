import { TextInput, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Typography, Colors } from "@styles"
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import CONFIG from "../../../config";

export default function LocationInput({ label, value, onChangetext, placeholder }) {

    const [features, setFeatures] = useState([])
    const [hasBeenWritten, setHasBeenWritten] = useState(false)

    useEffect(() => {
        if (value && hasBeenWritten) {
            axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&type=city&apiKey=${CONFIG.GEOAPIFY_APIKEY}`)
                .then(response => {
                    setFeatures(response.data.features)
                })
        } else {
            setFeatures([])
        }
    }, [value])


    return (
        <View style={{ gap: 4 }}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={styles.container}>
                <TextInput placeholder={placeholder || ''}
                    value={value}
                    style={styles.input}
                    onChangeText={(e) => {
                        onChangetext(e)
                        setHasBeenWritten(true)
                    }}
                    placeholderTextColor={Colors.PRIMARY_400} />
                <Ionicons name="location" size={24} color={Colors.PRIMARY_400} />
            </View>

            {features.length > 0 &&
                <View style={styles.featuresContainer}>
                    {features.map((feature, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    setFeatures([])
                                    setHasBeenWritten(false)
                                    onChangetext(feature.properties.formatted)
                                }}>
                                <Text style={styles.input}>{feature.properties.formatted}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderRadius: 8,
        backgroundColor: Colors.GRAY_LIGHT,
        borderColor: Colors.GRAY_MEDIUM,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 8,
        width: '100%'
    },
    input: {
        fontFamily: Typography.FONT_REGULAR.fontFamily,
        fontWeight: Typography.FONT_REGULAR.fontWeight,
        fontSize: Typography.FONT_SIZE_16,
    },
    label: {
        fontFamily: Typography.FONT_SEMIBOLD.fontFamily,
        fontWeight: Typography.FONT_SEMIBOLD.fontWeight,
        color: Colors.BLACK,
        fontSize: Typography.FONT_SIZE_16,
    },
    featuresContainer: {
        borderWidth: 1,
        bborderRadius: 8,
        backgroundColor: Colors.GRAY_LIGHT,
        borderColor: Colors.GRAY_MEDIUM,
        borderRadius: 8,
        padding: 12,
        gap: 6,
    }
})