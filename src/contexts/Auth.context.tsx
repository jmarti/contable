import { hasGrantedAnyScopeGoogle, TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import persistDataService from "../services/persistData.service";

type AccessToken = string | null
type Logged = boolean | null

type AuthContextType = {
    accessToken: AccessToken,
    doLogin: () => void,
    logged: Logged
}

const ACCESS_TOKEN_KEY = 'accessToken'

const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    doLogin: () => {},
    logged: null
})

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [accessToken, setAccessToken] = useState<AccessToken>(null)
    const [logged, setLogged] = useState<Logged>(null)

    const doLogin = useGoogleLogin({
        scope: 'https://www.googleapis.com/auth/spreadsheets',
        onSuccess: (tokenResponse: TokenResponse) => {
            handleSetAccessToken(tokenResponse)
        },
    })

    const handleGetAccessToken = () => {
        const savedAccessToken = persistDataService.get(ACCESS_TOKEN_KEY)
        if (savedAccessToken) {
            setAccessToken(savedAccessToken)
            setLogged(true)
        } else {
            setLogged(false)
        }
    }

    useEffect(handleGetAccessToken, [])

    const handleSetAccessToken = (tokenResponse: TokenResponse) => {
        if (!tokenResponse) {
            return
        }
        persistDataService.set(ACCESS_TOKEN_KEY, tokenResponse.access_token)
        handleGetAccessToken()
        if (hasGrantedAnyScopeGoogle(tokenResponse, 'spreadsheets')) {
            console.log('yes!')
        }
    }

    return (
        <AuthContext.Provider value={{
            accessToken,
            doLogin,
            logged
        }}>
            
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)