import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import Loading from '../components/Loading'
import { ToastContext } from '../contexts/ToastContext'
import { login } from '../services/login.service'

export default function LoginPage() {
  const navigate = useNavigate()
  const { showError } = useContext(ToastContext)

  const [loading, setLoading] = useState(true)
  const [usuario, setUsuario] = useState(null)
  const [senha, setSenha] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(false)
      } catch (err) {
        showError(err.message ?? err)
      } finally {
        setLoading(false)
      }
    })()
  }, [showError])

  function onLogin() {
    login(usuario, senha)
    //navigate('/')
  }

  let content = <></>

  if (loading) {
    content = <Loading />
  } else {
    content = (
      <div className="flex h-full justify-content-center align-items-center">
        <div style={{ width: 400 }}>
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
            <Button onClick={onLogin} className="w-full justify-content-center">
              Login
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return <>{content}</>
}
