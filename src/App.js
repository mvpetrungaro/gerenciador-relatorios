import 'primereact/resources/primereact.min.css' //core css
import 'primeicons/primeicons.css' //icons
import 'primeflex/primeflex.css'
import React, { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toast } from 'primereact/toast'
import {
  ToastContext,
  onSuccess,
  onInfo,
  onWarn,
  onError,
} from './contexts/ToastContext'
import Header from './components/Header'
import ExecucaoPage from './pages/ExecucaoPage'
import AcompanhamentoPage from './pages/AcompanhamentoPage'

const themes = {
  light: {
    label: 'light',
    href: '/themes/bootstrap4-light-blue.css',
    icon: 'moon',
  },
  dark: {
    label: 'dark',
    href: '/themes/bootstrap4-dark-blue.css',
    icon: 'sun',
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
  }, [selectedTheme])

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
        <div className="h-screen flex flex-column">
          <Header theme={selectedTheme} onThemeChange={onThemeChange} />
          <main className="flex-1 surface-ground relative">
            <Routes>
              <Route path="/" element={<ExecucaoPage />} />
              <Route
                path="/acompanhamento/:idSolicitacao"
                element={<AcompanhamentoPage />}
              />
            </Routes>
          </main>
          <footer className="flex justify-content-center align-items-center p-2 bg-ibge border-top-1">
            <h2 className="m-0 text-white">IBGE</h2>
          </footer>
        </div>
      </ToastContext.Provider>
    </BrowserRouter>
  )
}
