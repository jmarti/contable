import { AppContextProvider } from './App.context'
import { Routes, Route } from 'react-router-dom'
import { Layout, Typography } from 'antd'

import 'antd/dist/antd.css'
import DashboardView from './views/Dashboard.view'
import ConfigurationView from './views/Configuration.view'
import LoginView from './views/LoginView.view'
import RequireAuth from './components/RequireAuth'
// import reactLogo from './assets/react.svg'

const { Header, Content } = Layout


const App = () => (
    <AppContextProvider>
        <Layout>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <Typography.Title level={1} style={{ margin: 0, color: 'white' }}>Contable</Typography.Title>
            </Header>
            <Content>
                <Routes>
                    <Route path="/" element={
                        <RequireAuth>
                            <DashboardView />
                        </RequireAuth>
                    } />
                    <Route path="/login" element={<LoginView />} />
                    <Route path="/onboarding" element={<ConfigurationView />} />
                </Routes>
            </Content>
        </Layout>
    </AppContextProvider>
)

export default App
