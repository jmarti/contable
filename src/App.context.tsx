import { GoogleOAuthProvider } from "@react-oauth/google";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import persistDataService from "./services/persistData.service";

type SpreadsheetId = string | null
type AccessToken = string | null
type Logged = boolean | null

type AppContextType = {
    spreadsheetId: string | null,
    setSpreadSheetId: (spreadsheetId: SpreadsheetId) => void,
    accessToken: AccessToken,
    setAccessToken: (accessToken: AccessToken) => void,
    logged: Logged
}

const ACCESS_TOKEN_KEY = 'accessToken'

const AppContext = createContext<AppContextType>({
    spreadsheetId: null,
    setSpreadSheetId: () => {},
    accessToken: null,
    setAccessToken: () => {},
    logged: null
})

export const AppContextProvider = ({ children }: { children: ReactNode }) => {

    const [spreadsheetId, setSpreadSheetId] = useState<SpreadsheetId>(null)
    const [accessToken, setAccessToken] = useState<AccessToken>(null)
    const [logged, setLogged] = useState<Logged>(null)

    const handleGetAccessToken = () => {
        const savedAccessToken = persistDataService.get(ACCESS_TOKEN_KEY)
        if (savedAccessToken) {
            setAccessToken(savedAccessToken)
            setLogged(true)
        }
    }

    useEffect(handleGetAccessToken, [])

    const handleSetAccessToken = (token: AccessToken) => {
        if (!token) {
            return
        }
        persistDataService.set(ACCESS_TOKEN_KEY, token)
        handleGetAccessToken()
    }

    return (
        <AppContext.Provider value={{
            spreadsheetId,
            setSpreadSheetId,
            accessToken,
            setAccessToken: handleSetAccessToken,
            logged
        }}>
            <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
                {children}
            </GoogleOAuthProvider>
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)