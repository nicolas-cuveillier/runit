import { View, StyleSheet, Text } from "react-native";
import { Colors, Typography } from "@styles"
import { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DateInput({ label, value, onChange }) {

    const [date, setDate] = useState(value)
    const [time, setTime] = useState(value)

    function computeDate() {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        const hours = time.getHours();
        const minutes = time.getMinutes();

        const combinedDate = new Date(year, month - 1, day, hours, minutes);
        onChange(new Date(combinedDate))
    }

    return (
        <View style={{gap : 4}}>
            <Text style={styles.label}>{label}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <DateTimePicker
                    value={date}
                    minimumDate={new Date()}
                    onChange={(event, value) => {
                        setDate(value)
                        computeDate()
                    }}
                    mode="date" />
                <DateTimePicker
                    value={time}
                    onChange={(event, value) => {
                        setTime(value)
                        computeDate()
                    }}
                    mode="time" />
            </View>
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