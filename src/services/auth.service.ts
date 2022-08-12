import { CodeResponse } from "@react-oauth/google"
import axios from "axios"
import { GAUTH_INFO_KEY } from "../constants/auth.constants";
import persistDataService from "./persistData.service";

export interface GoogleCredentials {
    /**
     * A token that can be sent to a Google API.
     */
    token: string
    /**
     * The timestamp at which this token is thought to expire.
     */
    tokenExpiration: number
    /**
     * For details, see Refresh tokens.
     */
    refreshToken: string
    /**
     * The scopes of access granted by the access_token expressed as a list of space-delimited, case-sensitive strings.
     */
    scopes: string[]
}

export interface GoogleUserDetails {
    userFirstName: string
    userPicture: string
    userLocale: string
}

export interface GoogleAuthDetails extends GoogleCredentials, GoogleUserDetails {} 

const getAuthInfo = async (): Promise<GoogleCredentials & GoogleUserDetails> => {
    try {
        return await persistDataService.get(GAUTH_INFO_KEY)
    } catch (err) {
        throw err
    }
}

const doLogin = async (code: CodeResponse['code']): Promise<GoogleAuthDetails> => {
    try {
        const res = await axios.post(import.meta.env.VITE_GOOGLE_AUTH_URL, { code })
        persistDataService.set(GAUTH_INFO_KEY, res.data)
        return res.data
    } catch (err) {
        throw err
    }
}

const getGAuthToken = async () => {
    try {
        const gAuthInfo: GoogleAuthDetails = await persistDataService.get(GAUTH_INFO_KEY)
        if (!gAuthInfo) {
            return
        }

        return (Date.now() + 5000 < gAuthInfo.tokenExpiration) ? gAuthInfo.token : await refreshToken()

    } catch (err) {
        throw err
    }
}

const refreshToken = async () => {
    try {
        const gAuthInfo: GoogleCredentials = await persistDataService.get(GAUTH_INFO_KEY)
        
        if (!gAuthInfo) {
            return
        }
        console.log(gAuthInfo)
        const res = await axios.post(`${import.meta.env.VITE_GOOGLE_AUTH_URL}/refresh`, {
            refreshToken: gAuthInfo.refreshToken,
            
        })
        
        await persistDataService.set(GAUTH_INFO_KEY, {
            ...gAuthInfo,
            token: res.data.token,
            tokenExpiration: res.data.tokenExpiration
        })
        return res.data.access_token

    } catch (err) {
        throw err
    }
}

export default {
    getAuthInfo,
    doLogin,
    getGAuthToken
}