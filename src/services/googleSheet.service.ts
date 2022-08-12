import { authAxios } from "../utils/axios.utils"
import { getGoogleSheetId } from "../utils/googleSheet.utils"

const verifyGoogleSheet = async (googleSheetUrl: string) => {
    const googleSheetId = getGoogleSheetId(googleSheetUrl)

    if (!googleSheetId) {
        return false
    }

    try {
        await authAxios.get(`https://content-sheets.googleapis.com/v4/spreadsheets/${googleSheetId}`, {
            params: {
                key: import.meta.env.VITE_API_KEY
            }
        })
        return true

    } catch (err) {
        return false
    }
}

export default {
    verifyGoogleSheet
}