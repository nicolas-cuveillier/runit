import { View, SafeAreaView, FlatList, StyleSheet, TextInput } from "react-native";
import ClubViewMedium from "../../../../../components/club/club-view-medium";
import { Colors, Typography } from "@styles";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import CONFIG from "../../../../../config";
import SearchInput from "../../../../../components/core/inputs/search-input";

export default function Discovery() {

    const [search, setSearch] = useState("");
    const [clubs, setClubs] = useState([])

    useEffect(() => {
        const to = setTimeout(() => {
            axios.get(`${CONFIG.BACKEND_URL}/v1/club` + (search !== "" ? `?search=${search}` : ""))
                .then(({ data }) => setClubs(data))
        }, 500);

        return () => clearTimeout(to);
    }, [search]);

    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.container}>
                <SearchInput
                    value={search}
                    onChangetext={setSearch}
                    placeholder="Search clubs"/>

                <FlatList
                    style={{ height: 1000 }}
                    data={clubs}
                    renderItem={({ item }) => <ClubViewMedium club={item} />}
                    keyExtractor={item => item.name} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: Colors.WHITE
    },
    container: {
        padding: 16,
        gap: 16,
    },
    input: {
        fontFamily: Typography.FONT_REGULAR.fontFamily,
        fontWeight: Typography.FONT_REGULAR.fontWeight,
        fontSize: Typography.FONT_SIZE_16,
        padding: 16,
        borderRadius: 8,
        backgroundColor: Colors.PRIMARY_100,
        placeholderTextColor: 'red',
        flexDirection: 'row',
        gap: 8
    }
})