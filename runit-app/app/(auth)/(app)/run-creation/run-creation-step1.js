import TextHeader from "../../../../components/core/text-header";
import { PrimaryButton } from "../../../../components/core/buttons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import DateInput from "../../../../components/core/inputs/date-input";
import InputPageLayout from "../../../../components/core/input-page-layout";
import RNPickerSelect from 'react-native-picker-select';
import { Text } from "react-native";
import PickerInput from "../../../../components/core/inputs/picker-input";

export default function ClubCreationStep1() {

    const local = useLocalSearchParams();

    const [date, setDate] = useState(new Date())
    const [recurrence, setRecurrence] = useState("none")

    return (
        <InputPageLayout>
            <TextHeader
                title="Create a new Run"
                subtitle="Set the date & time." />

            <DateInput
                label="Start date of the run"
                value={date}
                onChange={setDate} />

            <PickerInput
                label={"Recurrence"}
                onChange={(value) => setRecurrence(value)}
                items={[
                    { label: 'None', value: 'none' },
                    { label: 'Daily', value: 'daily' },
                    { label: 'Weekly', value: 'weekly' },
                    { label: 'Monthly', value: 'monthly' },
                ]}
                value={recurrence} />

            <PrimaryButton action={() => router.navigate(`/run-creation/run-creation-step2?title=${local.title}&description=${local.description}&start_date=${date}&recurrence=${recurrence}`)} text="Continue" />
        </InputPageLayout>
    )
}