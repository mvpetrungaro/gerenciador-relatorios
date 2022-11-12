import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Card } from 'primereact/card'
import { getPesquisa } from '../services/pesquisa.service'
import { getProjetosByPesquisa } from '../services/projeto.service'
import Passos from '../components/Passos'
import Loading from '../components/Loading'

export default function PesquisaPage() {
  const { idPesquisa } = useParams()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [pesquisa, setPesquisa] = useState(null)
  const [projetos, setProjetos] = useState([])

  useEffect(() => {
    ;(async () => {
      try {
        const pesquisa = await getPesquisa(idPesquisa)
        setPesquisa(pesquisa)

        const projetos = await getProjetosByPesquisa(idPesquisa)
        setProjetos(projetos)
      } catch (err) {
        setError(err.message ?? err)
      } finally {
        setLoading(false)
      }
    })()
  }, [idPesquisa])

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
            <Link
              key={p.id}
              to={`/pesquisas/${pesquisa.id}/projetos/${p.id}`}
              className="no-underline"
            >
              <Card className="w-15rem h-10rem flex align-items-center justify-content-center text-center">
                {p.nome}
              </Card>
            </Link>
          ))}
        </div>
      </>
    )
  }

  return (
    <div>
      <Passos indice={1} idPesquisa={idPesquisa} />
      {content}
    </div>
  )
}
