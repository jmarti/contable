import { useAppContext } from '../App.context'
import Configure from '../components/Configure'


const DashboardView = () => {
    const { googleSheetId } = useAppContext()

    return (
        <>
            {!googleSheetId && <Configure />}
        </>
    )
}

export default DashboardView