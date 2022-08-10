import { useAppContext } from '../App.context'
import Configure from '../components/Configure'


const DashboardView = () => {
    const { spreadsheetId } = useAppContext()

    return (
        <>
            {!spreadsheetId && <Configure />}
        </>
    )
}

export default DashboardView