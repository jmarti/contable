import { ReactNode } from "react"
import { Button, Image, Layout, Menu, Divider } from 'antd'
import type { MenuProps } from 'antd'
import { LoginOutlined, SettingOutlined } from '@ant-design/icons'
import { useAppContext } from "../App.context"
import logo from '../assets/logo.svg'


const { Content, Sider } = Layout

const PageLayout = ({ children }: { children: ReactNode}) => {
    const { logged } = useAppContext()

    const loggedMenuItems: MenuProps['items'] = [
        {
            key: 'settings',
            icon: <SettingOutlined />,
            label: 'Settings'
        }
    ]

    return (
        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                zeroWidthTriggerStyle={{
                    top: 0
                }}
            >
                <div style={{
                    padding: 10
                }}>
                    {/* <Typography.Title level={2} style={{ margin: 0, color: 'white', textAlign: 'center', padding: 10 }}>Contable</Typography.Title> */}
                    <img src={logo} width={120} />
                    <Divider />
                    <Button type="primary" icon={<LoginOutlined />} ghost block>
                        Login
                    </Button>
                    {logged && (
                        <Menu
                            mode='inline'
                            theme='dark'
                            items={loggedMenuItems}
                            style={{ display: 'flex', justifyContent: 'flex-end', flex: 1 }}
                        />
                    )}
                </div>
            </Sider>
            <Layout>
                <Content>
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
        
}

export default PageLayout