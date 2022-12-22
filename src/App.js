import 'primereact/resources/primereact.min.css' //core css
import 'primeicons/primeicons.css' //icons
import 'primeflex/primeflex.css'
import React, { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Toast } from 'primereact/toast'
import {
  ToastContext,
  onSuccess,
  onInfo,
  onWarn,
  onError,
} from './contexts/ToastContext'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import SolicitacaoPage from './pages/SolicitacaoPage'
import AcompanhamentoPage from './pages/AcompanhamentoPage'
import LoginPage from './pages/LoginPage'
import { loggedIn } from './services/login.service'
import { getInitialTheme, toggleTheme } from './services/theme.service'

const AuthorizedElement = ({ children }) =>
  loggedIn() ? <>{children}</> : <Navigate to="/login" />

export function App() {
  const toast = useRef(null)
  const [toastContextValue, setToastContextValue] = useState({
    showSuccess: () => {},
    showInfo: () => {},
    showWarn: () => {},
    showError: () => {},
  })
  const [selectedTheme, setSelectedTheme] = useState(getInitialTheme())

  useEffect(() => {
    setToastContextValue({
      toast,
      showSuccess: (msg) => onSuccess(toast, msg),
      showInfo: (msg) => onInfo(toast, msg),
      showWarn: (msg) => onWarn(toast, msg),
      showError: (msg) => onError(toast, msg),
    })
  }, [toast])

  useEffect(() => {
    document.getElementById('theme-link').href = selectedTheme.href
    document.getElementById('custom-theme-styles').innerHTML =
      selectedTheme.customStyles
  }, [selectedTheme])

  function onThemeChange() {
    setSelectedTheme(toggleTheme)
  }

  return (
    <BrowserRouter>
      <Toast ref={toast} />

      <ToastContext.Provider value={toastContextValue}>
        <div className="h-screen flex flex-column" style={{ minWidth: 400 }}>
          <Header theme={selectedTheme} onThemeChange={onThemeChange} />
          <main className="flex-1 surface-ground relative">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/"
                element={
                  <AuthorizedElement>
                    <HomePage />
                  </AuthorizedElement>
                }
              />
              <Route
                path="/solicitacao"
                element={
                  <AuthorizedElement>
                    <SolicitacaoPage />
                  </AuthorizedElement>
                }
              />
              <Route
                path="/acompanhamento/:idSolicitacao"
                element={
                  <AuthorizedElement>
                    <AcompanhamentoPage />
                  </AuthorizedElement>
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ToastContext.Provider>
    </BrowserRouter>
  )
}
