import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'primereact/card'
import { getPesquisas } from '../services/pesquisa.service'
import Passos from '../components/Passos'
import Loading from '../components/Loading'

export default function HomePage() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [pesquisas, setPesquisas] = useState([])

  useEffect(() => {
    ;(async () => {
      try {
        const pesquisas = await getPesquisas()
        setPesquisas(pesquisas)
      } catch (err) {
        setError(err.message ?? err)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  let content = <></>

  if (error) {
    content = <div className="text-center">{error}</div>
  } else if (loading) {
    content = <Loading />
  } else if (!pesquisas) {
    content = <div className="text-center">Nenhuma pesquisa disponível</div>
  } else {
    content = (
      <>
        <div className="text-center">
          <h4>Selecione uma pesquisa</h4>
        </div>
        <div className="flex m-5 gap-3 flex-wrap justify-content-center">
          {pesquisas.map((p) => (
            <Link key={p.id} to={`/pesquisas/${p.id}`} className="no-underline">
              <Card className="w-15rem h-10rem flex align-items-center justify-content-center">
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
      <Passos indice={0} />
      {content}
    </div>
  )
}
