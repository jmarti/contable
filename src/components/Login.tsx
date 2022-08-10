import { TokenResponse, useGoogleLogin } from '@react-oauth/google'
import { useAppContext } from '../App.context'
import { Button } from 'antd'

type LoginProps = {
    onSuccess?: () => void
}

const Login = ({ onSuccess }: LoginProps) => {
    const { setAccessToken } = useAppContext()
    
    const handleLogin = useGoogleLogin({
        scope: 'https://www.googleapis.com/auth/spreadsheets',
        onSuccess: (tokenResponse: TokenResponse) => {
            setAccessToken(tokenResponse.access_token)
            onSuccess && onSuccess()
        },
    })
    return (
        <Button onClick={() => handleLogin()}>Login</Button>
    )
}

export default Login