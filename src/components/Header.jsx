import { Link } from 'react-router-dom'
import { Button } from 'primereact/button'

export default function Header({ theme, onThemeChange = () => {} }) {
  return (
    <header className="grid grid-nogutter align-items-center p-2 pr-3 bg-ibge border-bottom-1">
      <div className="col-6 md:col">
        <Link to="/" className="ml-5 no-underline w-min block">
          <h1 className="m-0 text-white">GRAC</h1>
        </Link>
      </div>
      {theme && (
        <div className="col-6 md:col-1 flex justify-content-end">
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
