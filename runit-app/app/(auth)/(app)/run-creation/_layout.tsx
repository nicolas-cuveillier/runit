import { Ionicons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';

const _layout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{
                title : '',
                headerShadowVisible : false,
                headerLeft : () => 
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="chevron-back-outline" style={{ fontSize: 32}} />
                    </TouchableOpacity>
            }} />
            <Stack.Screen name="run-creation-step1" options={{
                title: '',
                headerBackTitleVisible: false,
                headerShadowVisible: false
            }} />
            <Stack.Screen name="run-creation-step2" options={{
                title: '',
                headerBackTitleVisible: false,
                headerShadowVisible: false
            }} />
            <Stack.Screen name="run-creation-step3" options={{
                title: '',
                headerBackTitleVisible: false,
                headerShadowVisible: false
            }} />
            <Stack.Screen name="run-creation-step4" options={{
                title: '',
                headerBackTitleVisible: false,
                headerShadowVisible: false
            }} />
        </Stack>
    );
};


export default _layout;