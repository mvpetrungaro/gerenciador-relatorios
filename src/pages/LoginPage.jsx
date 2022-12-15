import { useState, useEffect, useContext } from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import Loading from '../components/Loading'
import { ToastContext } from '../contexts/ToastContext'
import { login } from '../services/login.service'

export default function LoginPage() {
  const { showError } = useContext(ToastContext)

  const [loading, setLoading] = useState(true)
  const [usuario, setUsuario] = useState(null)
  const [senha, setSenha] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        setUsuario('')
        setSenha('')
      } catch (err) {
        showError(err.message ?? err)
      } finally {
        setLoading(false)
      }
    })()
  }, [showError])

  async function onLogin(e) {
    e.preventDefault()

    try {
      await login(usuario, senha)
      global.location.href = '/'
    } catch (err) {
      if (err.name && err.name === 'UnauthorizedError') {
        showError('Usuário ou senha incorretos')
      }
    }
  }

  let content = <></>

  if (loading) {
    content = <Loading />
  } else {
    content = (
      <div className="flex h-full justify-content-center align-items-center">
        <div style={{ width: 400 }}>
          <form onSubmit={onLogin}>
            <div className="p-float-label">
              <InputText
                id="usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="w-full"
              />
              <label htmlFor="usuario">Usuário</label>
            </div>

            <div className="mt-5 p-float-label">
              <Password
                id="senha"
                value={senha}
                feedback={false}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full"
                inputClassName="w-full"
              />
              <label htmlFor="senha">Senha</label>
            </div>

            <div className="mt-5 w-full">
              <Button type="submit" className="w-full justify-content-center">
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return <>{content}</>
}
