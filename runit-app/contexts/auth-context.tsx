import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import axios, { AxiosError } from "axios";
import CONFIG from "../config";

interface AuthProps {
    authState?: { token: string | null; authenticated: boolean | null, user: any | null };
    onRegister?: (user: any) => Promise<any>;
    onLogin?: (mail: String, password: String) => Promise<any>;
    onLogout?: () => Promise<any>;
}

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }: any) => {
    const [authState, setAuthState] = useState<{ token: string | null; authenticated: boolean | null, user: any | null }>({
        token: null,
        authenticated: null,
        user: null
    });

    useEffect(() => {
        const loadUser = async () => {
            const data = await SecureStore.getItemAsync("user")

            if (data) {
                setAuthState({
                    token: 'token',
                    authenticated: true,
                    user: JSON.parse(data)
                })
            }
        }

        loadUser()
    }, [])

    const register = async (user: any) => {
        // register user into db
        const response = await axios.post(`${CONFIG.BACKEND_URL}/v1/user`, user)
        if (response.status == 201) {
            // set state
            setAuthState({
                token: 'token',
                authenticated: true,
                user: response.data.user.id
            })

            // store data
            await SecureStore.setItemAsync("user", JSON.stringify(response.data.user.id))

            return response.data.user
        }

        return null;
    }

    const login = async (mail: String, password: String) => {
        // login user
        try {
            const response = await axios.post(`${CONFIG.BACKEND_URL}/v1/user/auth`, {
                mail: mail,
                password: password
            })

            if (response.status == 200) {
                // set state
                setAuthState({
                    token: 'token',
                    authenticated: true,
                    user: response.data.user._id
                })

                // store data
                await SecureStore.setItemAsync("user", JSON.stringify(response.data.user._id))

                return { status: 200, user: response.data.user }
            }
        } catch (error) {
            const err = error as AxiosError
            const errorData = err.response?.data as { message: string };
            return { status: err.response?.status, user: errorData.message }
        }
    }

    const logout = async () => {
        // delete from storage
        await SecureStore.deleteItemAsync("user")

        // reset state
        setAuthState({
            token: null,
            authenticated: false,
            user: null
        })

        await SecureStore.deleteItemAsync("club")

        router.replace("/welcom")
    }

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState: authState
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}