import { lazy } from "react";

export const DashboardView = lazy(() => import('./Dashboard.view'))
export const SettingsView = lazy(() => import('./Settings.view'))
export const LoginView = lazy(() => import('./Login.view'))