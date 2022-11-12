import 'primereact/resources/primereact.min.css' //core css
import 'primeicons/primeicons.css' //icons
import 'primeflex/primeflex.css'
import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import PesquisaPage from './pages/PesquisaPage'
import ProjetoPage from './pages/ProjetoPage'

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
      <div className="h-screen flex flex-column">
        <Header theme={selectedTheme} onThemeChange={onThemeChange} />
        <main className="flex-1 surface-ground relative">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pesquisas/:idPesquisa" element={<PesquisaPage />} />
            <Route
              path="/pesquisas/:idPesquisa/projetos/:idProjeto"
              element={<ProjetoPage />}
            />
          </Routes>
        </main>
        <footer className="flex justify-content-center align-items-center p-2 bg-ibge border-top-1">
          <h2 className="m-0 text-white">IBGE</h2>
        </footer>
      </div>
    </BrowserRouter>
  )
}
