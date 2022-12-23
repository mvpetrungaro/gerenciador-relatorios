import { Link } from 'react-router-dom'
import { Button } from 'primereact/button'
import { loggedIn, logout } from '../services/login.service'

export default function Header({ theme, onThemeChange = () => {} }) {
  async function onLogout() {
    await logout()
  }

  return (
    <header className="pl-5 grid grid-nogutter align-items-center p-2 pr-3 bg-ibge border-bottom-1 gap-3">
      <div className="col">
        <Link to="/" className="no-underline w-fit block">
          <h1 className="m-0 text-white">Gerenciador de Relatórios</h1>
        </Link>
      </div>
      {loggedIn() && (
        <div className="col-fixed flex justify-content-end">
          <Button
            icon="pi pi-sign-out"
            onClick={onLogout}
            className="p-button-rounded p-button-secondary"
            aria-label="Logout"
          />
        </div>
      )}
      {theme && (
        <div className="col-fixed flex justify-content-end">
          <Button
            icon={`pi pi-${theme.icon}`}
            onClick={onThemeChange}
            className="p-button-rounded p-button-secondary"
            aria-label="Theme"
          />
        </div>
      )}
    </header>
  )
}
