import { createContext, ReactNode, useContext, useState } from "react";

type SpreadsheetId = string | null

type AppContextType = {
    spreadsheetId: string | null,
    setSpreadSheetId: (spreadsheetId: SpreadsheetId) => void,
}

const AppContext = createContext<AppContextType>({
    spreadsheetId: null,
    setSpreadSheetId: () => {},
})

export const AppContextProvider = ({ children }: { children: ReactNode }) => {

    const [spreadsheetId, setSpreadSheetId] = useState<SpreadsheetId>(null)

    return (
        <AppContext.Provider value={{
            spreadsheetId,
            setSpreadSheetId,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAuthContext = () => useContext(AppContext)