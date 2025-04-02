import { TextInput, View, Text, StyleSheet } from "react-native";
import { Typography, Colors } from "@styles"
import { Ionicons } from "@expo/vector-icons";

export default function SearchInput({ value, onChangetext, placeholder }) {
    return (
        <View style={styles.input}>
            <Ionicons name="search" size={24} color={Colors.PRIMARY_400} />
            <TextInput placeholder={placeholder}
                value={value}
                onChangeText={onChangetext}
                placeholderTextColor={Colors.PRIMARY_400} />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        fontFamily: Typography.FONT_REGULAR.fontFamily,
        fontWeight: Typography.FONT_REGULAR.fontWeight,
        fontSize: Typography.FONT_SIZE_16,
        padding: 16,
        borderRadius: 8,
        backgroundColor: Colors.PRIMARY_100,
        placeholderTextColor: 'red',
        flexDirection: 'row',
        gap: 8,
        width : '100%'
    }
})