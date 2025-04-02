import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native"
import { Colors } from "@styles";
import React from "react"

export default function PageLayout({children}) {
    return (
        <SafeAreaView style={styles.wrapper}>
            <ScrollView>
                <View style={styles.container}>{children}</View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: Colors.WHITE
    },
    container: {
        padding: 16,
        gap: 32,
    }
})
