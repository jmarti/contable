import { useEffect, useState } from 'react'
import loadScript from '../utils/loadScripts'

type Props = {
    onSuccess: Function,
    onFailure: Function,
    onScriptLoadFailure?: Function
}

function onGoogleApiScriptLoad() {
    window.gapi.load('auth2', onGapiLoad)
}

async function onGapiLoad() {
    const GoogleAuth = window.gapi.auth2.getAuthInstance()
    if (!GoogleAuth) {
        const res = await window.gapi.auth2.init({
            apiKey: 'AIzaSyCMNViZbQHCh00Q9eaZDXOYs5wE6t7A7ko',
            clientId: '756887229436-ost5bntlsu294jmsiuns8ffnj3fav1vv.apps.googleusercontent.com',
            scope: 'https://www.googleapis.com/auth/spreadsheets'
        })

        console.log(res)
    }
}

const useGoogleLogin = (
    props: Props = { onSuccess: () => {}, onFailure: () => {} }
) => {

    const { onSuccess, onFailure, onScriptLoadFailure } = props

    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        const onLoadFailure = onScriptLoadFailure || onFailure
        loadScript(
            'google-login',
            'https://apis.google.com/js/api.js',
            onGoogleApiScriptLoad
        )
    }, [])

    return {}
    
}

export default useGoogleLogin