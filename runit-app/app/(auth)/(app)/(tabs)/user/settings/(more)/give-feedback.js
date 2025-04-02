import { View } from "react-native";
import TextHeader from "../../../../../../../components/core/text-header";
import {PrimaryButton} from "../../../../../../../components/core/buttons";
import InputPageLayout from "../../../../../../../components/core/input-page-layout";

export default function GiveFeedback() {
    return (
        <InputPageLayout>
            <TextHeader
                title="Feedback"
                subtitle="Thanks for giving us some feedback." />

            <View style={{ gap: 4 }}>
                <MultilineInput
                    label="Feedback"
                    value={""}
                    placeholder="Give us some feedback"
                    onChangetext />
            </View>

            <PrimaryButton text="Send it" />
        </InputPageLayout>
    )
}