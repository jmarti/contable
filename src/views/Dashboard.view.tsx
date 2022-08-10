import { useAppContext } from '../App.context'
import Configure from '../components/Configure'
import PageLayout from '../layouts/PageLayout'


const DashboardView = () => {
    const { spreadsheetId } = useAppContext()

    return (
        <>
            {!spreadsheetId && <Configure />}
        </>
    )
}

export default DashboardView