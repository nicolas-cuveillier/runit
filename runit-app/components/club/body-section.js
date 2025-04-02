import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Typography } from "@styles";
import { useEffect, useState } from 'react';
import { Link, router } from 'expo-router';
import UserViewSmall from '../user/user-view-small';
import axios from 'axios';
import CONFIG from '../../config';

export function About({ description }) {
    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.bodyTitle}>About</Text>
            <Text style={styles.bodyText}>{description}</Text>
        </View>
    )
}

export function Members({ members }) {

    const [membersList, setMembersList] = useState(members);

    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.bodyTitle}>Members</Text>
            <View style={{ flexDirection: 'row', gap: 4 }}>
                {membersList.map((member) => (<UserViewSmall key={member._id} user={member} />))}
            </View>
        </View>
    )
}

export function IncomingRuns({ runs }) {
    return (
        <View style={{ gap: 6 }}>
            <View style={{ paddingLeft: 16 }}>
                <Text style={styles.bodyTitle}>Incomings Runs</Text>
            </View>

            <ScrollView horizontal={true} >
                <View style={{ flexDirection: 'row', gap: 16, paddingLeft: 16, paddingRight: 16 }}>

                    {runs.length > 0 ?
                        runs.map((data, index) => (
                            <IncomingRun key={data._id} run={data} />
                        )) :
                        <Text>It is too quite here..</Text>}
                </View>
            </ScrollView>
        </View>
    )
}

function IncomingRun({ run }) {

    const [incomingRun, setIncomingRun] = useState();

    useEffect(() => {
        if (!incomingRun) {
            axios.get(`${CONFIG.BACKEND_URL}/v1/run/${run._id}`)
                .then((response) => setIncomingRun(response.data))
                .catch((error) => setIncomingRun(null))
        }

    }, [run])

    if (!incomingRun) {
        //TODO loader
        return
    } else {
        function formatDate(date) {
            const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

            const day = days[date.getDay()];
            const dayOfMonth = date.getDate();
            let hours = date.getHours();

            const ampm = hours >= 12 ? 'PM' : 'AM';

            hours = hours % 12;
            hours = hours ? hours : 12;

            return `${day}. ${dayOfMonth} - ${hours}${ampm}`;
        }

        const title = incomingRun.title.length > 20 ? incomingRun.title.substring(0, 18) + "..." : incomingRun.title;
        return (
            <TouchableOpacity
                style={{width: 350}}
                onPress={() => router.push(`/run/${run._id}`)}>
                <View style={{ flexDirection: 'row', gap: 16 }}>
                    <Image
                        style={{ height: 135, width: 135, borderRadius: 6, resizeMode: 'cover' }}
                        source={require('../../assets/images/trail.png')} />
                    <View style={{ gap: 8 }}>
                        <Text style={styles.runTitle}>{title}</Text>
                        <Text style={styles.runDescription}>{formatDate(new Date(incomingRun.start_date))}</Text>
                        <Text style={styles.runDescription}>{incomingRun.distance} km - {incomingRun.pace} min/km</Text>
                        <Text style={styles.runDescription}>Lead by</Text>

                        <View style={{ flexDirection: 'row', gap: 4 }}>
                            <Image
                                style={{ height: 24, width: 24, borderRadius: 12 }}
                                source={require('../../assets/images/pp.png')} />
                            <Image
                                style={{ height: 24, width: 24, borderRadius: 12 }}
                                source={require('../../assets/images/pp.png')} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

export function FrequentlyAskedQuestions() {

    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.bodyTitle}>Frequently Asked Questions</Text>

            <Question
                question="How do I join ?"
                answer="Select 'Join' in the top left corner." />
            <Question
                question="How do I join ?"
                answer="Select 'Join' in the top left corner." />
        </View>
    )
}

function Question({ question, answer }) {
    const [expand, setExpand] = useState(false);

    return (
        <View style={styles.questionContainer}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} onPress={() => setExpand(!expand)}>
                <Text style={styles.question}>{question}</Text>
                <Ionicons name="chevron-down-outline" />
            </TouchableOpacity>

            {expand && <Text style={styles.answer}>{answer}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        gap: 4,
        paddingLeft: 16,
        paddingRight: 16
    },
    bodyTitle: {
        fontFamily: Typography.FONT_BOLD.fontFamily,
        fontWeight: Typography.FONT_BOLD.fontWeight,
        fontSize: Typography.FONT_SIZE_20
    },
    bodyText: {
        fontFamily: Typography.FONT_REGULAR.fontFamily,
        fontWeight: Typography.FONT_REGULAR.fontWeight,
        fontSize: Typography.FONT_SIZE_14,
    },
    runTitle: {
        fontFamily: Typography.FONT_BOLD.fontFamily,
        fontWeight: Typography.FONT_BOLD.fontWeight,
        fontSize: Typography.FONT_SIZE_18
    },
    runDescription: {
        fontFamily: Typography.FONT_REGULAR.fontFamily,
        fontWeight: Typography.FONT_REGULAR.fontWeight,
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.GRAY_DARK
    },
    questionContainer: {
        backgroundColor: Colors.PRIMARY_100,
        padding: 12,
        borderRadius: 6,
        gap: 8
    },
    question: {
        fontFamily: Typography.FONT_REGULAR.fontFamily,
        fontWeight: Typography.FONT_REGULAR.fontWeight,
        fontSize: Typography.FONT_SIZE_14,
    },
    answer: {
        fontFamily: Typography.FONT_REGULAR.fontFamily,
        fontWeight: Typography.FONT_REGULAR.fontWeight,
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.GRAY_DARK
    }
})