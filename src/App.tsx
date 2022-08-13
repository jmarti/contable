import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import 'antd/dist/antd.min.css'

import { AppContextProvider } from './App.context'
import { AuthContextProvider } from './contexts/Auth.context'
import { DashboardView, NewExpenseView, SettingsView } from './views'
import PageLayout from './layouts/PageLayout'
import RequireAuth from './components/RequireAuth'

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
                        <Route
                            path="/new-expense"
                            element={
                                <Suspense fallback={<>...</>}>
                                    <NewExpenseView />
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
