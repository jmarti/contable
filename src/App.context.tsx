import { createContext, ReactNode, useContext } from "react";


type AppContextType = {}

export const AppContext = createContext<AppContextType>({})

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    return (
        <AppContext.Provider value={{
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)