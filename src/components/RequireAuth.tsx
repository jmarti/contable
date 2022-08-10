import { useAuthContext } from "../contexts/Auth.context";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const { logged } = useAuthContext()
  
    if (logged === null) {
        return <>Loading...</>
    } else if (logged === false) {
        return <>Login needed</>
    }
  
    return children;
}

export default RequireAuth