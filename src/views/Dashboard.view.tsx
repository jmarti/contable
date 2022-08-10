import { useAuthContext } from '../App.context'
import Configure from '../components/Configure'


const DashboardView = () => {
    const { spreadsheetId } = useAuthContext()

    return (
        <>
            {!spreadsheetId && <Configure />}
        </>
    )
}

export default DashboardView