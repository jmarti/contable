import { ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"
import { Layout, Menu } from 'antd'
import type { MenuProps } from 'antd'
import { SettingOutlined, TagOutlined } from '@ant-design/icons'

import { useAuthContext } from "../contexts/Auth.context"
import logo from '../assets/logo.svg'
import LoginButton from "../components/LoginButton"

import classes from './PageLayout.module.css'

const { Content, Sider } = Layout

const PageLayout = ({ children }: { children: ReactNode}) => {
    const { logged } = useAuthContext()
    const location = useLocation()

    const loggedMenuItems: MenuProps['items'] = [
        {
            key: '/new-expense',
            icon: <TagOutlined />,
            label: <Link to="/new-expense">New expense</Link>
        },
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
                <div style={{ padding: '20px 22px' }}>
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
                        />
                    )}
            </Sider>
            <Layout>
                <Content className={classes.pageLayoutContent}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
        
}

export default PageLayout