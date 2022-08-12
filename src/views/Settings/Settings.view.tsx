import { Button, Card, Form, Input } from "antd"
import { ValidateStatus } from "antd/es/form/FormItem"
import { useEffect, useState } from "react"
import { useSettingsContext } from "./Settings.context"
import { SettingsContextProvider } from "./Settings.context"

const SettingsView = () => {
    const {googleSheetUrl, isFetching, setGoogleSheetUrl} = useSettingsContext()
    const [linkGoogleSheetFormStatus, setLinkGoogleSheetFormStatus] = useState<{
        status: ValidateStatus,
        messsage: string
    }>({ status: '', messsage: ''})
    const [linkGoogleSheetForm] = Form.useForm<{ googleSheetUrl: string }>()

    // Disable submit when necessary at first.
    const [, forceUpdate] = useState({})
    useEffect(() => forceUpdate({}), [])

    useEffect(() => linkGoogleSheetForm.resetFields(), [googleSheetUrl])

    const handleSubmit = async ({ googleSheetUrl }: { googleSheetUrl: string }) => {
        try {
            setLinkGoogleSheetFormStatus({ status: 'validating', messsage: 'Validating...' })
            await setGoogleSheetUrl(googleSheetUrl)
            setLinkGoogleSheetFormStatus({ status: 'success', messsage: '' })
        } catch(err: any) {
            setLinkGoogleSheetFormStatus({ status: 'error', messsage: err.message })
        }
    }
    return (
        <>
            {isFetching ? <>Loading...</> : (
                <Card title="Link your Google GoogleSheet" bordered={false}>
                    <Form
                        form={linkGoogleSheetForm}
                        layout="vertical"
                        autoComplete="off"
                        onFinish={handleSubmit}
                        initialValues={{ googleSheetUrl }}
                    >
                        <Form.Item
                            name="googleSheetUrl"
                            label="Google Sheet URL"
                            rules={[{ required: true, message: 'Please enter your Google Sheet URL.' }]}
                            hasFeedback
                            validateStatus={linkGoogleSheetFormStatus.status}
                            help={linkGoogleSheetFormStatus.messsage}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item shouldUpdate>
                            {() => (
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    disabled={
                                        !linkGoogleSheetForm.isFieldsTouched(true) ||
                                        !!linkGoogleSheetForm.getFieldsError().filter(({ errors }) => errors.length).length
                                    }
                                >
                                    Save
                                </Button>
                            )}
                        </Form.Item>
                    </Form>
                </Card>
            )}
        </>
    )
}

export default () => <SettingsContextProvider><SettingsView /></SettingsContextProvider>