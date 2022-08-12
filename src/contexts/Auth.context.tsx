import { CodeResponse, useGoogleLogin } from "@react-oauth/google"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import authService, { GoogleCredentials, GoogleUserDetails } from "../services/auth.service"

type Logged = boolean | null

type UserDetails = {
    firstName: string
    picture: string
    locale: string
} | null

type AuthContextType = {
    logged: Logged,
    userDetails: UserDetails,
    doLogin: () => void,
}

export const AuthContext = createContext<AuthContextType>({
    logged: null,
    userDetails: null,
    doLogin: () => {},
})

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [logged, setLogged] = useState<Logged>(null)
    const [userDetails, setUserDetails] = useState<UserDetails>(null)

    useEffect(() => {
        async function getAuthInfo() {
            const gAuthInfo = await authService.getAuthInfo()
            if (gAuthInfo) {
                handleLogged(gAuthInfo)
            } else {
                setLogged(false)
            }
        }

        getAuthInfo()
    }, [])

    const doLogin = useGoogleLogin({
        scope: 'https://www.googleapis.com/auth/spreadsheets',
        flow: 'auth-code',
        onSuccess: async (codeResponse: CodeResponse) => {
            const authDetails = await authService.doLogin(codeResponse.code)
            setUserDetails({
               firstName: authDetails.userFirstName,
               picture: authDetails.userPicture,
               locale: authDetails.userLocale
            })
            setLogged(true)
        },
        onError: errorResponse => console.error(errorResponse)
    })

    const handleLogged = (authDetails: GoogleCredentials & GoogleUserDetails) => {
        setUserDetails({
            firstName: authDetails.userFirstName,
            picture: authDetails.userPicture,
            locale: authDetails.userLocale
        })
        setLogged(true)
    }

    return (
        <AuthContext.Provider value={{
            logged,
            userDetails,
            doLogin,
        }}>
            
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)