import { useState, useEffect } from 'react'
import { Card } from 'primereact/card'
import { getProjetosByPesquisa } from '../../services/projeto.service'
import Loading from '../Loading'

export default function ProjetosStep({ pesquisa, onProjetoSelect }) {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [projetos, setProjetos] = useState([])

  useEffect(() => {
    ;(async () => {
      try {
        const projetos = await getProjetosByPesquisa(pesquisa.id)
        setProjetos(projetos)
      } catch (err) {
        setError(err.message ?? err)
      } finally {
        setLoading(false)
      }
    })()
  }, [pesquisa])

  if (error) {
    return <div className="text-center">{error}</div>
  }

  let content = <></>

  if (loading) {
    content = <Loading />
  } else if (!pesquisa) {
    content = <div className="text-center">Pesquisa não encontrada</div>
  } else if (!projetos) {
    content = <div className="text-center">Nenhum projeto disponível</div>
  } else {
    content = (
      <>
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
              <Card className="w-15rem h-10rem flex align-items-center justify-content-center text-center">
                {p.nome}
              </Card>
            </button>
          ))}
        </div>
      </>
    )
  }

  return <div>{content}</div>
}
