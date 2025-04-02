import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors, Typography } from "@styles";
import { PrimaryButton, SecondaryButton } from "../../components/core/buttons";
import UserViewMedium from "../../components/user/user-view-medium";
import { useEffect, useState } from "react";
import { useClub } from "@/contexts/club-context";
import axios from "axios";
import CONFIG from "../../config";
import SearchInput from "../core/inputs/search-input";

export default function MembersList({ type, users }) {

    const [members, setMembers] = useState(users)

    const { clubState } = useClub();

    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState("");
    const [possibleUsers, setPossibleUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (showModal) {

            const to = setTimeout(() => {
                axios.get(`${CONFIG.BACKEND_URL}/v1/user` + (search !== "" ? `?search=${search}` : ""))
                    .then(({ data }) => setPossibleUsers(data.filter(user => !members.map(mbr => mbr._id).includes(user._id))))
            }, 500);

            return () => clearTimeout(to);
        }
    }, [showModal, search])

    function updateClub(action) {
        if (selectedUsers.length > 0) {
            let update = null
            switch (type + action) {
                case "adminadd":
                    update = {
                        admins: members.concat(selectedUsers)
                    }
                    break
                case "leaderadd":
                    update = {
                        leaders: members.concat(selectedUsers)
                    }
                    break
                case "adminremove":
                    update = {
                        admins: members.filter(member => !selectedUsers.includes(member))
                    }
                    break
                case "leaderremove":
                    update = {
                        leaders: members.filter(member => !selectedUsers.includes(member))
                    }
                    break
                default:
                    break;
            }

            axios.post(`${CONFIG.BACKEND_URL}/v1/club/${clubState.club}`, update)
                .then((response) => {
                    setErrorMessage(`Users ${action}ed !`)
                    switch (action) {
                        case "add":
                            setMembers(prevItems => [...prevItems, ...selectedUsers])
                            break
                        case "remove":
                            setMembers(prevItems => prevItems.filter(mbr => !selectedUsers.includes(mbr)))
                            break
                        default:
                            break;
                    }
                    setShowModal(false)
                })
                .catch((error) => {
                    setErrorMessage("An error occured, please try again.")
                    setShowModal(false)
                })

            setSelectedUsers([])
        } else {
            setErrorMessage("You didn't select any user.")
            setShowModal(false)
        }
    }

    function selectUser(member) {
        if (!selectedUsers.includes(member)) {
            setSelectedUsers(prevItems => [...prevItems, member])
        } else {
            setSelectedUsers(prevItems => prevItems.filter(mbr => mbr !== member))
        }
    }

    if (!members) {
        return (
            <Text>Loading..</Text>
        )
    } else {

        return (
            <>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showModal}>

                    <Pressable
                        onPress={(event) => event.target == event.currentTarget && setShowModal(false)}>

                        <View style={styles.modalView}>
                            <SearchInput
                                value={search}
                                onChangetext={setSearch}
                                placeholder="Search users" />

                            <View style={{ gap: 6, width: '100%' }}>
                                {
                                    possibleUsers.map((member, index) => (
                                        <UserViewMedium
                                            style={selectedUsers.map(u => u._id).includes(member._id) ? styles.selectedUser : ""}
                                            action={() => selectUser(member)}
                                            key={member._id}
                                            user={member} />
                                    ))
                                }
                            </View>

                            <View style={styles.buttonsContainer}>
                                <PrimaryButton text={`Add ${type}`} action={() => updateClub("add")} />
                                <SecondaryButton text={`Exit`} action={() => setShowModal(false)} />
                            </View>
                        </View>
                    </Pressable>
                </Modal>

                <View style={{ gap: 6 }}>
                    {
                        members.length > 0 ?
                            members.map((member, index) => (
                                <UserViewMedium
                                    style={selectedUsers.map(u => u._id).includes(member._id) ? styles.selectedUser : ""}
                                    action={() => selectUser(member)}
                                    key={member._id}
                                    user={member} />
                            )) :
                            <Text>The club doesn't have any {type} yet, add one !</Text>
                    }
                    <Text>{errorMessage}</Text>
                </View>

                <View style={styles.buttonsContainer}>
                    {
                        type !== "member" && <PrimaryButton text={`Add ${type}`} action={() => {
                            setShowModal(true)
                            setSelectedUsers([])
                        }} />
                    }
                    <SecondaryButton text={`Delete ${type}`} action={() => updateClub("remove")} />
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    modalView: {
        backgroundColor: 'white',
        borderRadius: 6,
        padding: 16,
        alignItems: 'center',
        top: 100,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        gap: 6,
        height: '100%'
    },
    profilPicture: {
        width: 70,
        height: 70,
        borderRadius: 35,
        objectFit: 'fit',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    input: {
        fontFamily: Typography.FONT_REGULAR.fontFamily,
        fontWeight: Typography.FONT_REGULAR.fontWeight,
        fontSize: Typography.FONT_SIZE_16,
        padding: 12,
        backgroundColor: 'red',
        width: '100%',
        borderRadius: 8,
        backgroundColor: Colors.PRIMARY_100,
        placeholderTextColor: 'red',
        flexDirection: 'row',
        gap: 8
    },
    selectedUser: {
        backgroundColor: Colors.PRIMARY_100,
        borderRadius: 4,
    }
})