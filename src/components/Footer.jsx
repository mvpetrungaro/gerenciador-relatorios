const Website = ({ url, label, icon, className }) => (
  <a href={url} aria-label={label} className="no-underline">
    <div
      className={`p-button p-button-icon-only p-button-rounded p-button-outlined ${className}`}
    >
      <i className={`pi ${icon}`}></i>
    </div>
  </a>
)

export default function Footer() {
  return (
    <footer className="flex justify-content-center align-items-center p-2 bg-ibge border-top-1 gap-3">
      <Website
        url="https://github.com/mvpetrungaro/"
        label="Github"
        icon="pi-github"
        className="text-white bg-black-alpha-90"
      />
      <Website
        url="https://linkedin.com/mvpetrungaro/"
        label="Linkedin"
        icon="pi-linkedin"
        className="text-blue-700 bg-white-alpha-90"
      />
      <Website
        url="mailto:marcos.petrungaro@gmail.com"
        label="Mail"
        icon="pi-at"
        className="text-white bg-transparent"
      />
    </footer>
  )
}
