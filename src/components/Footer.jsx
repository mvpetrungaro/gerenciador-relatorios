import { Button } from 'primereact/button'

export default function Footer() {
  return (
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
  )
}
