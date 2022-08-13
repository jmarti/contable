import { lazy } from "react"

export const DashboardView = lazy(() => import('./Dashboard.view'))
export const NewExpenseView = lazy(() => import('./NewExpense'))
export const SettingsView = lazy(() => import('./Settings'))