import { AppContextProvider } from './App.context'
import { Routes, Route } from 'react-router-dom'

import 'antd/dist/antd.min.css'
import { DashboardView, SettingsView } from './views'
import RequireAuth from './components/RequireAuth'
import PageLayout from './layouts/PageLayout'
import { Suspense } from 'react'
import { AuthContextProvider } from './contexts/Auth.context'
import { GoogleOAuthProvider } from '@react-oauth/google'

const App = () => (
    <AppContextProvider>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
            <AuthContextProvider>
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
                            path="/settings"
                            element={
                                <Suspense fallback={<>...</>}>
                                    <SettingsView />
                                </Suspense>
                            }
                        />
                    </Routes>    
                </PageLayout>
            </AuthContextProvider>
        </GoogleOAuthProvider>
    </AppContextProvider>
)

export default App
