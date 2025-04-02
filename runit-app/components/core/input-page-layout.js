import { Keyboard, KeyboardAvoidingView, SafeAreaView, StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import { Colors } from "@styles";
import React from "react"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function InputPageLayout({ children }) {
    return (
        <SafeAreaView style={styles.wrapper}>
            <KeyboardAwareScrollView>
                    <View style={styles.container}>{children}</View>
            </KeyboardAwareScrollView>
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
