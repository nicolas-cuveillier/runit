import { View, Text, StyleSheet } from "react-native";
import { Typography, Colors } from "@styles"
import RNPickerSelect from 'react-native-picker-select';


export default function PickerInput({ label, value, onChange, items }) {

    return (
        <View style={{ gap: 4 }}>
            <Text style={styles.label}>{label}</Text>
            <RNPickerSelect
                style={pickerSelectStyles}
                onValueChange={onChange}
                items={items}
                value={value}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        fontFamily: Typography.FONT_SEMIBOLD.fontFamily,
        fontWeight: Typography.FONT_SEMIBOLD.fontWeight,
        color: Colors.BLACK,
        fontSize: Typography.FONT_SIZE_16,
    }
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontFamily: Typography.FONT_REGULAR.fontFamily,
        fontWeight: Typography.FONT_REGULAR.fontWeight,
        fontSize: Typography.FONT_SIZE_16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: Colors.GRAY_MEDIUM,
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontFamily: Typography.FONT_REGULAR.fontFamily,
        fontWeight: Typography.FONT_REGULAR.fontWeight,
        fontSize: Typography.FONT_SIZE_16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: Colors.GRAY_MEDIUM,
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});
