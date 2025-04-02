import { View, StyleSheet, Image } from "react-native";
import { Colors } from "@styles"
import TextHeader from "../../../../components/core/text-header";
import {PrimaryButton} from "../../../../components/core/buttons";
import { router } from "expo-router";
import PageLayout from "../../../../components/core/page-layout";

export default function ClubCreation() {
    return (
        <PageLayout>
            <TextHeader
                title="Thanks for joining the community of organizers !"
                subtitle="What's more rewarding than creating your own club ?" />

            <Image 
                style={styles.image}
                source={require("../../../../assets/images/cover-nike.png")} />

            <PrimaryButton action={() => router.navigate("/club-creation/club-creation-step1")} text="Start the experience" />
        </PageLayout>
    )
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
    }
})