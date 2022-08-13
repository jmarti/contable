import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { GOOGLE_SHEET_URL_KEY } from "../../constants/settings.constants";
import googleSheetService from "../../services/googleSheet.service";
import persistDataService from "../../services/persistData.service";

type GoogleSheetUrl = string | null

type SettingsContextType = {
    googleSheetUrl: GoogleSheetUrl,
    setGoogleSheetUrl: (googleSheetUrl: GoogleSheetUrl) => void
}


export const SettingsContext = createContext<SettingsContextType>({
    googleSheetUrl: null,
    setGoogleSheetUrl: () => {}
})

export const SettingsContextProvider = ({ children }: { children: ReactNode }) => {

    const [googleSheetUrl, setGoogleSheetUrl] = useState<GoogleSheetUrl>(null)

    useEffect(() => {
        const savedGoogleSheetUrl = persistDataService.get(GOOGLE_SHEET_URL_KEY)
        if (savedGoogleSheetUrl) {
            setGoogleSheetUrl(savedGoogleSheetUrl)
        }
    }, [])

    const handleSetGoogleSheetUrl = async (url: GoogleSheetUrl) => {
        if (!url) {
            return
        }

        const isCorrect = await googleSheetService.verifyGoogleSheet(url)

        if (!isCorrect) {
            throw Error('The Google Sheet URL is not correct.')
        }
        
        persistDataService.set(GOOGLE_SHEET_URL_KEY, url)
        setGoogleSheetUrl(url)
    }

    return (
        <SettingsContext.Provider value={{
            googleSheetUrl,
            setGoogleSheetUrl: handleSetGoogleSheetUrl
        }}>
            {children}
        </SettingsContext.Provider>
    )
}

export const useSettingsContext = () => useContext(SettingsContext)