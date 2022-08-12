const googleSheetBeginingURL = 'https://docs.google.com/spreadsheets/d/'

export const getGoogleSheetId = (googleSheetUrl: string) => {
    return verifyGoogleSheetURL(googleSheetUrl)
        ? googleSheetUrl.replace(googleSheetBeginingURL, '').split('/')[0]
        : null
}

export const verifyGoogleSheetURL = (googleSheetUrl: string) => {
    return googleSheetUrl && new RegExp(`^${googleSheetBeginingURL}`).test(googleSheetUrl)
}