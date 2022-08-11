import { Button, Card, Form, Input } from "antd"
import { useAppContext } from "../App.context"
import googleSheetService from "../services/googleSheet.service"

const SettingsView = () => {
    const {googleSheetId, setGoogleSheetId} = useAppContext()
    const [linkSpreadsheedForm] = Form.useForm<{ googleSheetId: string }>()

    const handleSubmit = ({ googleSheetId }: { googleSheetId: string}) => {
        googleSheetService.verifyGoogleSheet(googleSheetId)
        setGoogleSheetId(googleSheetId)
    }
    return (
        <>
            <Card title="Link your Google GoogleSheet" bordered={false}>
                <Form
                    form={linkSpreadsheedForm}
                    layout="vertical"
                    autoComplete="off"
                    initialValues={{ googleSheetId }}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="googleSheetId"
                        label="Spreadsheed ID"
                        rules={[{ required: true, message: 'Please enter a valid ID' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </>
    )
}

export default SettingsView