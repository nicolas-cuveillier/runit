import { createContext, useContext, useEffect, useState } from "react"
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import CONFIG from "@/config";
import { router } from "expo-router";

interface ClubProps {
    clubState?: { selected: Boolean | null, club: any | null },
    onSelect?: (id: String) => Promise<any>,
    onUnselect?: () => Promise<any>
}

const ClubContext = createContext<ClubProps>({});

export const useClub = () => {
    return useContext(ClubContext);
}

export const ClubProvider = ({ children }: any) => {
    const [clubState, setClubState] = useState<{ selected: Boolean | null, club: any | null }>({
        selected: null,
        club: null
    })

    useEffect(() => {
        const loadClub = async () => {
            const data = await SecureStore.getItemAsync("club")

            if (data) {
                setClubState({
                    selected: true,
                    club: JSON.parse(data)
                })
            }
        }

        loadClub();
    }, [])

    const select = async (id: String) => {
        const response = await axios.get(`${CONFIG.BACKEND_URL}/v1/club/${id}`)

        if (response.status == 200) {
            // set state
            setClubState({
                selected: true,
                club: response.data._id
            })

            // store data
            await SecureStore.setItemAsync("club", JSON.stringify(response.data._id))

            return response.data._id
        }

        return null
    }

    const unselect = async () => {
        // delete from storage
        await SecureStore.deleteItemAsync("club")

        // reset state
        setClubState({
            selected: false,
            club: null
        })

        //router.replace("/welcom")
    }

    const value = {
        clubState: clubState,
        onSelect: select,
        onUnselect : unselect
    }

    return (
        <ClubContext.Provider value={value}>
            {children}
        </ClubContext.Provider>
    )
}