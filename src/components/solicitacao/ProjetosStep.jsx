import { useState, useEffect, useContext } from 'react'
import { Card } from 'primereact/card'
import { getProjetosByPesquisa } from '../../services/projeto.service'
import Loading from '../Loading'
import { ToastContext } from '../../contexts/ToastContext'
import ErrorContent from '../error/ErrorContent'

export default function ProjetosStep({ pesquisa, onProjetoSelect }) {
  const { showError } = useContext(ToastContext)

  const [loading, setLoading] = useState(true)
  const [projetos, setProjetos] = useState([])

  useEffect(() => {
    ;(async () => {
      try {
        const projetos = await getProjetosByPesquisa(pesquisa.id)
        setProjetos(projetos)
      } catch (err) {
        showError(err.message ?? err)
      } finally {
        setLoading(false)
      }
    })()
  }, [pesquisa, showError])

  let content = <></>

  if (loading) {
    content = <Loading />
  } else if (!pesquisa) {
    content = <ErrorContent />
  } else if (!projetos?.length) {
    content = (
      <ErrorContent icon="pi-info-circle" message="Nenhum projeto disponível" />
    )
  } else {
    content = (
      <div>
        <div className="text-center">
          <h1>{pesquisa.nome}</h1>
          <h4>Selecione um projeto</h4>
        </div>
        <div className="flex m-5 gap-3 flex-wrap justify-content-center">
          {projetos.map((p) => (
            <button
              key={p.id}
              className="cleanButtonStyle"
              onClick={() => onProjetoSelect(p)}
            >
              <Card className="w-15rem h-10rem flex align-items-center justify-content-center text-center hover:surface-hover">
                {p.nome}
              </Card>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return <>{content}</>
}
