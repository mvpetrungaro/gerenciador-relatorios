import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import Loading from '../components/Loading'
import { ToastContext } from '../contexts/ToastContext'
import { buscarSolicitacoesRelatorios } from '../services/relatorio.service'
import { TipoDado } from '../models/TipoDado'
import { FormatoDado } from '../models/FormatoDado'

export default function HomePage() {
  const navigate = useNavigate()
  const { showError } = useContext(ToastContext)

  const [loading, setLoading] = useState(true)
  const [solicitacoes, setSolicitacoes] = useState([])

  console.log(solicitacoes)

  useEffect(() => {
    ;(async () => {
      try {
        const solicitacoes = await buscarSolicitacoesRelatorios()

        setSolicitacoes(solicitacoes)
        setLoading(false)
      } catch (err) {
        showError(err.message ?? err)
      } finally {
        setLoading(false)
      }
    })()
  }, [showError])

  function onAcompanhar(idSolicitacao) {
    navigate(`/acompanhamento/${idSolicitacao}`)
  }

  function onSolicitar() {
    navigate(`/solicitacao`)
  }

  let content = <></>

  if (loading) {
    content = <Loading />
  } else {
    content = (
      <div className="m-5">
        <div className="text-center">
          {!!solicitacoes?.length && (
            <DataTable
              value={solicitacoes}
              dataKey="id"
              header={
                <div className="text-center">
                  <h2>Solicitações</h2>
                </div>
              }
              responsiveLayout="scroll"
              className="text-left"
            >
              <Column
                header="Data da Solicitação"
                field="dataSolicitacao"
              ></Column>
              <Column header="Projeto" field="projeto.nome"></Column>
              <Column
                header="Relatórios"
                body={(s) => <>{s.relatorios.length + ' relatório(s)'}</>}
              ></Column>
              <Column
                header="Territórios"
                body={(s) => {
                  let territorios = s.territorios[0].nome

                  if (s.territorios.length > 1) {
                    territorios += ' ...'
                  }

                  return <>{territorios}</>
                }}
              ></Column>
              <Column
                header="Formato do Arquivo"
                field="formatoArquivo"
              ></Column>
              <Column
                header="Tipos de Dado"
                body={(s) => {
                  let tiposDado = ''

                  if (s.tiposDado?.length) {
                    tiposDado += TipoDado[s.tiposDado[0]].value

                    if (s.tiposDado.length > 1) {
                      tiposDado += ' ...'
                    }
                  }

                  return <>{tiposDado}</>
                }}
              ></Column>
              <Column
                header="Formatos de Dado"
                body={(s) => {
                  let formatosDado = ''

                  if (s.formatosDado?.length) {
                    formatosDado += FormatoDado[s.formatosDado[0]].value

                    if (s.formatosDado.length > 1) {
                      formatosDado += ' ...'
                    }
                  }

                  return <>{formatosDado}</>
                }}
              ></Column>
              <Column
                header="Paginação"
                body={(s) => <>{s.paginacao ? s.paginacao : ''}</>}
              ></Column>
              <Column
                header="Acompanhar"
                body={(s) => (
                  <div className="text-center">
                    <Button
                      icon="pi pi-search"
                      className="p-button-rounded"
                      aria-label="Acompanhar"
                      onClick={() => onAcompanhar(s.id)}
                    />
                  </div>
                )}
              ></Column>
            </DataTable>
          )}
        </div>

        <div className="m-auto p-3 text-right">
          <Button onClick={onSolicitar}>Nova Solicitação</Button>
        </div>
      </div>
    )
  }

  return <div>{content}</div>
}
