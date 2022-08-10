import { TokenResponse, useGoogleLogin } from '@react-oauth/google'
import { useAuthContext } from '../contexts/Auth.context'
import { Button } from 'antd'
import { LoginOutlined } from '@ant-design/icons'

type LoginProps = {
    onSuccess?: () => void,
    buttonProps?: {
        block: boolean
    }
}

const LoginButton = ({ buttonProps }: LoginProps) => {
    const { doLogin } = useAuthContext()
    
    return (
        <Button
            type="primary"
            icon={<LoginOutlined />}
            ghost
            block
            onClick={() => doLogin()}
            {...buttonProps}
        >
            Login
        </Button>
    )
}

export default LoginButton