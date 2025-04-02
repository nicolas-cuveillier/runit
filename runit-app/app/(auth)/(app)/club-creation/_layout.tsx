import { Ionicons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';

const _layout = () => {
    return (
        <Stack screenOptions={{headerBackTitleVisible : false}}>
            <Stack.Screen name="index" options={{
                title : '',
                headerShadowVisible : false,
                headerLeft : () => 
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="chevron-back-outline" style={{ fontSize: 32}} />
                    </TouchableOpacity>
            }} />
            <Stack.Screen name="club-creation-step1" options={{
                title : '',
                headerShadowVisible : false,
            }} />
            <Stack.Screen name="club-creation-step2" options={{
                title : '',
                headerShadowVisible : false,
            }} />
            <Stack.Screen name="club-creation-step3" options={{
                title : '',
                headerShadowVisible : false,
            }} />
            <Stack.Screen name="club-creation-step4" options={{
                headerShown: false
            }} />
        </Stack>
    );
};


export default _layout;