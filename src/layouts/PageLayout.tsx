import { ReactNode, useEffect } from "react"
import { Layout, Menu } from 'antd'
import type { MenuProps } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import { useAuthContext } from "../contexts/Auth.context"
import logo from '../assets/logo.svg'
import LoginButton from "../components/LoginButton"
import { Link, useLocation } from "react-router-dom"


const { Content, Sider } = Layout

const PageLayout = ({ children }: { children: ReactNode}) => {
    const { logged } = useAuthContext()
    const location = useLocation()

    const loggedMenuItems: MenuProps['items'] = [
        {
            key: '/settings',
            icon: <SettingOutlined />,
            label: <Link to="/settings">Settings</Link>
        }
    ]

    return (
        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                zeroWidthTriggerStyle={{ top: 0 }}
            >
                <div style={{ padding: 10 }}>
                    <img src={logo} width={120} />
                </div>
                    {logged === false && (
                        <div style={{ padding: 10 }}>
                            <LoginButton />
                        </div>
                    )}
                    {logged && (
                        <Menu
                            mode='inline'
                            theme='dark'
                            items={loggedMenuItems}
                            selectedKeys={[location.pathname]}
                            style={{ display: 'flex', justifyContent: 'flex-end', flex: 1 }}
                        />
                    )}
            </Sider>
            <Layout>
                <Content style={{ minHeight: '100vh', padding: 50 }}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
        
}

export default PageLayout