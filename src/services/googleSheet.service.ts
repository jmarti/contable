import axios from "axios"

const verifyGoogleSheet = (googleSheetId: string) => {
    axios.get(`https://content-sheets.googleapis.com/v4/spreadsheets/${googleSheetId}`, {
        params: {
            key: import.meta.env.VITE_API_KEY
        }
    })
}

export default {
    verifyGoogleSheet
}