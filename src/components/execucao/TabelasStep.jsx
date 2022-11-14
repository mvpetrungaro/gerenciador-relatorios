import { useState, useEffect } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import {
  getArquivoTabela,
  getTabelasByProjeto,
} from '../../services/tabela.service'
import Loading from '../Loading'

export default function ProjetoPage({ projeto, onTabelasSelect }) {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [tabelas, setTabelas] = useState([])
  const [tabelasSelecionadas, setTabelasSelecionadas] = useState([])
  const [tabelaVisualizada, setTabelaVisualizada] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        const tabelas = await getTabelasByProjeto(projeto.id)
        setTabelas(tabelas)
      } catch (err) {
        setError(err.message ?? err)
      } finally {
        setLoading(false)
      }
    })()
  }, [projeto])

  const bodyVisualizarTabela = (tabela) => {
    return (
      <div className="text-center">
        <Button
          onClick={() => visualizarTabela(tabela)}
          icon="pi pi-search"
          className="p-button-rounded p-button-success"
          aria-label="Search"
        />
      </div>
    )
  }

  async function visualizarTabela(tabela) {
    try {
      const tabelaHtml = await (await getArquivoTabela(tabela.arquivo)).text()
      setTabelaVisualizada({ __html: tabelaHtml })
    } catch (err) {
      alert('Erro ao carregar a tabela')
      setTabelaVisualizada(null)
    }
  }

  if (error) {
    return <div className="text-center">{error}</div>
  }

  let content = <></>

  if (loading) {
    content = <Loading />
  } else if (!projeto) {
    content = <div className="text-center">Projeto não encontrado</div>
  } else if (!tabelas) {
    content = <div className="text-center">Nenhuma tabela disponível</div>
  } else {
    content = (
      <>
        <div className="text-center">
          <h1>{projeto.nome}</h1>
          <h4>Selecione as tabelas que deseja carregar</h4>
        </div>
        <div className="flex m-5 gap-3 flex-wrap justify-content-center">
          <div className="grid">
            <DataTable
              value={tabelas}
              selection={tabelasSelecionadas}
              onSelectionChange={(e) => setTabelasSelecionadas(e.value)}
              dataKey="id"
              responsiveLayout="scroll"
              className="col-12"
            >
              <Column
                selectionMode="multiple"
                headerStyle={{ width: '3em' }}
              ></Column>
              <Column field="nome" header="Nome"></Column>
              <Column field="titulo" header="Titulo"></Column>
              <Column header="Visualizar" body={bodyVisualizarTabela}></Column>
            </DataTable>

            <div className="col-12 text-right">
              <Button value="Avançar" disabled={!tabelasSelecionadas?.length}>
                Avançar
              </Button>
            </div>
          </div>
        </div>

        <Dialog
          header="Visualização da tabela"
          visible={!!tabelaVisualizada}
          style={{ maxWidth: '75vw' }}
          onHide={() => setTabelaVisualizada(null)}
        >
          <div dangerouslySetInnerHTML={tabelaVisualizada}></div>
        </Dialog>
      </>
    )
  }

  return <div>{content}</div>
}
