import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import persistDataService from "./services/persistData.service";

type GoogleSheetId = string | null

type AppContextType = {
    googleSheetId: string | null,
    setGoogleSheetId: (googleSheetId: GoogleSheetId) => void,
}

const GOOGLE_SHEET_ID_KEY = 'googleSheetId'

const AppContext = createContext<AppContextType>({
    googleSheetId: null,
    setGoogleSheetId: () => {},
})

export const AppContextProvider = ({ children }: { children: ReactNode }) => {

    const [googleSheetId, setGoogleSheetId] = useState<GoogleSheetId>(null)

    useEffect(() => {
        const savedGoogleSheetId = persistDataService.get(GOOGLE_SHEET_ID_KEY)
        if (savedGoogleSheetId) {
            setGoogleSheetId(savedGoogleSheetId)
        }
    }, [])

    const handleSetGoogleSheetId = (id: GoogleSheetId) => {
        if (!id) {
            return
        }
        persistDataService.set(GOOGLE_SHEET_ID_KEY, id)
        setGoogleSheetId(id)
    }

    return (
        <AppContext.Provider value={{
            googleSheetId,
            setGoogleSheetId: handleSetGoogleSheetId,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)