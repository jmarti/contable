import { AppContextProvider } from './App.context'
import { Routes, Route } from 'react-router-dom'

import 'antd/dist/antd.css'
import { DashboardView, SettingsView, LoginView } from './views'
import RequireAuth from './components/RequireAuth'
import PageLayout from './layouts/PageLayout'
import { Suspense } from 'react'

const App = () => (
    <AppContextProvider>
        <PageLayout>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Suspense fallback={<>...</>}>
                            <RequireAuth>
                                <DashboardView />
                            </RequireAuth>
                        </Suspense>
                    }
                />
                
                <Route
                    path="/login"
                    element={
                        <Suspense fallback={<>...</>}>
                            <LoginView />
                        </Suspense>
                    }
                />
                <Route
                    path="/onboarding"
                    element={
                        <Suspense fallback={<>...</>}>
                            <SettingsView />
                        </Suspense>
                    }
                />
            </Routes>    
        </PageLayout>
    </AppContextProvider>
)

export default App
