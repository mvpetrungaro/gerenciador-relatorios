import 'primereact/resources/primereact.min.css' //core css
import 'primeicons/primeicons.css' //icons
import 'primeflex/primeflex.css'
import React, { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Toast } from 'primereact/toast'
import { Button } from 'primereact/button'
import {
  ToastContext,
  onSuccess,
  onInfo,
  onWarn,
  onError,
} from './contexts/ToastContext'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import SolicitacaoPage from './pages/SolicitacaoPage'
import AcompanhamentoPage from './pages/AcompanhamentoPage'
import LoginPage from './pages/LoginPage'
import { loggedIn } from './services/login.service'

const themes = {
  light: {
    label: 'light',
    href: '/themes/bootstrap4-light-blue.css',
    icon: 'moon',
    customStyles: `
      .text-danger {
        color: #dc3545 !important
      }

      .text-danger:hover {
        color: #c82333 !important
      }
    `,
  },
  dark: {
    label: 'dark',
    href: '/themes/bootstrap4-dark-blue.css',
    icon: 'sun',
    customStyles: `
      .text-danger {
        color: #f19ea6 !important
      }

      .text-danger:hover {
        color: #e97984 !important
      }
    `,
  },
}

if (!localStorage.getItem('selectedTheme')) {
  localStorage.setItem('selectedTheme', themes.light.label)
}

export function App() {
  const toast = useRef(null)
  const [selectedTheme, setSelectedTheme] = useState(
    themes[localStorage.getItem('selectedTheme')]
  )

  function onThemeChange() {
    setSelectedTheme((currentTheme) => {
      let nextTheme

      if (currentTheme.label === themes.light.label) {
        nextTheme = themes.dark
      } else {
        nextTheme = themes.light
      }

      localStorage.setItem('selectedTheme', nextTheme.label)

      return nextTheme
    })
  }

  useEffect(() => {
    document.getElementById('theme-link').href = selectedTheme.href
    document.getElementById('custom-theme-styles').innerHTML =
      selectedTheme.customStyles
  }, [selectedTheme])

  const AuthorizedElement = ({ children }) =>
    loggedIn() ? <>{children}</> : <Navigate to="/login" />

  return (
    <BrowserRouter>
      <Toast ref={toast} />

      <ToastContext.Provider
        value={{
          toast,
          showSuccess: (msg) => onSuccess(toast, msg),
          showInfo: (msg) => onInfo(toast, msg),
          showWarn: (msg) => onWarn(toast, msg),
          showError: (msg) => onError(toast, msg),
        }}
      >
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
          <footer className="flex justify-content-center align-items-center p-2 bg-ibge border-top-1 gap-3">
            <Button
              icon="pi pi-github"
              onClick={() => window.open('https://github.com/mvpetrungaro/')}
              className="p-button-rounded p-button-outlined text-white bg-black-alpha-90"
              aria-label="Github"
            />
            <Button
              icon="pi pi-linkedin"
              onClick={() => window.open('https://linkedin.com/mvpetrungaro/')}
              className="p-button-rounded p-button-outlined text-blue-700 bg-white-alpha-90"
              aria-label="Linkedin"
            />
            <Button
              icon="pi pi-at"
              onClick={() => window.open('mailto:marcos.petrungaro@gmail.com')}
              className="p-button-rounded p-button-outlined text-white"
              aria-label="Linkedin"
            />
          </footer>
        </div>
      </ToastContext.Provider>
    </BrowserRouter>
  )
}
