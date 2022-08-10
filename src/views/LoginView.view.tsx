import { useLocation, useNavigate } from "react-router";
import Login from "../components/Login"


const LoginView = () => {
    const location = useLocation() as unknown as LocationProps
    let navigate = useNavigate()

    const from = location.state?.from?.pathname || '/'

    const handleLoginSuccess = () => {
        navigate(from, { replace: true })
    }

    return <Login onSuccess={handleLoginSuccess}/>
}
export default LoginView