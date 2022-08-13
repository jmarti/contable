import { createContext, ReactNode, useContext, useState } from "react";


type AppContextType = {
    baseCurrency: string | null
}

export const AppContext = createContext<AppContextType>({
    baseCurrency: null
})

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [baseCurrency] = useState<string>('COP')
    
    return (
        <AppContext.Provider value={{
            baseCurrency
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)