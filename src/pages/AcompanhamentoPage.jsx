import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import SockJsClient from 'react-stomp'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { api, API_BASE_URL, edata } from '../services/api.service'
import {
  isSolicitacaoComFalhas,
  isSolicitacaoComSucessos,
  reexecutarRelatorios,
} from '../services/relatorio.service'
import { FormatoDado } from '../models/FormatoDado'
import { TipoDado } from '../models/TipoDado'
import { PosicaoTerritorio } from '../models/PosicaoTerritorio'
import { StatusExecucao } from '../models/StatusExecucao'
import Loading from '../components/Loading'
import { ToastContext } from '../contexts/ToastContext'

const getParamErrorMsg = (param) => `Falha ao carregar ${param}`
const MSG_ERRO_STATUS_RELATORIO =
  'Falha ao atualizar status dos relatórios, talvez seja necessário recarregar a página'
const MSG_ERRO_REEXECUCAO_RELATORIO =
  'Falha ao reexecutar relatórios, talvez seja necessário recarregar a página'

export default function AcompanhamentoPage() {
  const { idSolicitacao } = useParams()
  const { showError } = useContext(ToastContext)

  const [loading, setLoading] = useState(true)
  const [solicitacao, setSolicitacao] = useState(null)
  const [mensagemErroVisualizada, setMensagemErroVisualizada] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        const solicitacao = await api.get(
          `/relatorios/solicitacao/${idSolicitacao}`
        )

        const tabelas = await Promise.all([
          ...solicitacao.relatorios.map((rel) =>
            edata.get(`/tabelas/${rel.idTabelaEdata}`)
          ),
        ])

        solicitacao.relatorios.forEach((rel) => {
          rel.tabela = tabelas.find((t) => t.id === rel.idTabelaEdata)
        })

        setSolicitacao(solicitacao)
      } catch (err) {
        showError(err.message ?? err)
      } finally {
        setLoading(false)
      }
    })()
  }, [idSolicitacao, showError])

  function onWebSocketMessage(statusRelatorio) {
    const {
      id: idRelatorio,
      statusExecucao,
      dataExecucao,
      duracaoExecucao,
      mensagemErro,
    } = statusRelatorio

    const idxRelatorio = solicitacao.relatorios.findIndex(
      (rel) => rel.id === idRelatorio
    )

    if (idxRelatorio < 0) {
      showError(MSG_ERRO_STATUS_RELATORIO)
      console.log('WebSocket: Relatório não encontrado', statusRelatorio)
      return
    }

    const solicitacaoClone = { ...solicitacao }
    solicitacaoClone.relatorios[idxRelatorio].statusExecucao = statusExecucao
    solicitacaoClone.relatorios[idxRelatorio].dataExecucao = dataExecucao
    solicitacaoClone.relatorios[idxRelatorio].duracaoExecucao = duracaoExecucao
    solicitacaoClone.relatorios[idxRelatorio].mensagemErro = mensagemErro

    setSolicitacao(solicitacaoClone)
  }

  async function onClickReexecucao(idRelatorio) {
    try {
      const relatorios = await reexecutarRelatorios({
        idsRelatorios: [idRelatorio],
      })

      if (!Array.isArray(relatorios)) {
        throw Error(MSG_ERRO_REEXECUCAO_RELATORIO)
      }

      onReexecucao(relatorios)
    } catch (err) {
      showError(err.message ?? err)
    }
  }

  async function onClickReexecucaoTotal() {
    try {
      const idsRelatorios = solicitacao.relatorios
        .filter((rel) => rel.statusExecucao === StatusExecucao.FALHA.key)
        .map((rel) => rel.id)

      if (idsRelatorios.length) {
        const relatorios = await reexecutarRelatorios({ idsRelatorios })

        if (!Array.isArray(relatorios)) {
          throw Error(MSG_ERRO_REEXECUCAO_RELATORIO)
        }

        onReexecucao(relatorios)
      }
    } catch (err) {
      showError(err.message ?? err)
    }
  }

  function onReexecucao(relatorios) {
    const solicitacaoClone = { ...solicitacao }

    for (const idRelatorio of relatorios.map((s) => s.id)) {
      const idxSolicitacao = solicitacao.relatorios.findIndex(
        (rel) => rel.id === idRelatorio
      )

      const idxReexecucao = relatorios.findIndex((st) => st.id === idRelatorio)

      if (idxSolicitacao < 0 || idxReexecucao < 0) {
        showError(MSG_ERRO_STATUS_RELATORIO)
        console.log('Reexecução: Relatório não encontrado', relatorios)
        continue
      }

      const { statusExecucao } = relatorios[idxReexecucao]

      if (
        solicitacao.relatorios[idxSolicitacao].statusExecucao !==
        StatusExecucao.EM_EXECUCAO.key
      ) {
        solicitacaoClone.relatorios[idxSolicitacao].statusExecucao =
          statusExecucao
      }
    }

    setSolicitacao(solicitacaoClone)
  }

  let content = <></>

  if (loading) {
    content = <Loading />
  } else if (!solicitacao) {
    content = (
      <div className="text-center">{getParamErrorMsg('os relatórios')}</div>
    )
  } else {
    content = (
      <div className="m-5">
        <div className="text-center">
          <h1>Andamento da Solicitação</h1>

          <div className="flex gap-3 flex-wrap justify-content-center align-items-baseline">
            <div className="m-3">
              <span className="mr-1">
                <span className="font-semibold underline">
                  Data da solicitação
                </span>
                :
              </span>
              {solicitacao.dataSolicitacao}
            </div>

            <div className="m-3">
              <span className="mr-1">
                <span className="font-semibold underline">Projeto</span>:
              </span>
              {solicitacao.idProjetoEdata}
            </div>

            <div className="m-3 grid">
              <div className="mr-1">
                <span className="font-semibold underline">Territórios</span>:
              </div>
              <ul className="m-0 p-0 list-none text-left">
                {solicitacao.territorios.map((t) => (
                  <li key={t.idTerritorioEdata}>
                    {t.idTerritorioEdata} - {t.nome} (
                    {PosicaoTerritorio[t.posicao].value})
                  </li>
                ))}
              </ul>
            </div>

            {!!solicitacao.tiposDado?.length && (
              <div className="m-3 grid">
                <div className="mr-1">
                  <span className="font-semibold underline">Tipos de Dado</span>
                  :
                </div>
                <ul className="m-0 p-0 list-none text-left">
                  {solicitacao.tiposDado.map((td, i) => (
                    <li key={i}>{TipoDado[td].value}</li>
                  ))}
                </ul>
              </div>
            )}

            {!!solicitacao.formatosDado?.length && (
              <div className="m-3 grid">
                <div className="mr-1">
                  <span className="font-semibold underline">
                    Formatos de Dado
                  </span>
                  :
                </div>
                <ul className="m-0 p-0 list-none text-left">
                  {solicitacao.formatosDado.map((fd, i) => (
                    <li key={i}>{FormatoDado[fd].value}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="m-3">
              <span className="mr-1">
                <span className="font-semibold underline">
                  Formato do Arquivo
                </span>
                :
              </span>
              {solicitacao.formatoArquivo}
            </div>

            {!!solicitacao.paginacao && (
              <div className="m-3">
                <span className="mr-1">
                  <span className="font-semibold underline">Paginação</span>:
                </span>
                {solicitacao.paginacao}
              </div>
            )}
          </div>

          <div className="mt-5">
            <DataTable
              value={solicitacao.relatorios}
              dataKey="id"
              header={
                <div className="text-center">
                  <h2>Relatórios</h2>
                </div>
              }
              responsiveLayout="scroll"
              className="text-left"
            >
              <Column field="tabela.nome" header="Relatório"></Column>
              <Column
                header="Status da Execução"
                body={(rel) => {
                  if (
                    rel.statusExecucao === StatusExecucao.FALHA.key &&
                    rel.mensagemErro
                  ) {
                    return (
                      <button
                        className="cleanButtonStyle underline text-danger"
                        onClick={() =>
                          setMensagemErroVisualizada(rel.mensagemErro)
                        }
                      >
                        {StatusExecucao[rel.statusExecucao].value}
                      </button>
                    )
                  }

                  return StatusExecucao[rel.statusExecucao].value
                }}
              ></Column>
              <Column field="dataExecucao" header="Data da Execução"></Column>
              <Column
                header="Duração da Execução"
                body={(rel) => {
                  if (rel.statusExecucao === StatusExecucao.EM_EXECUCAO.key) {
                    return <ProgressSpinner className="w-2rem h-2rem" />
                  }

                  if (rel.duracaoExecucao) {
                    return rel.duracaoExecucao + 's'
                  }
                }}
              ></Column>
              {(isSolicitacaoComFalhas(solicitacao) ||
                isSolicitacaoComSucessos(solicitacao)) && (
                <Column
                  header=""
                  body={(rel) => {
                    switch (rel.statusExecucao) {
                      case StatusExecucao.SUCESSO.key:
                        return (
                          <div className="text-center">
                            <Button
                              icon="pi pi-download"
                              className="p-button-rounded p-button-success"
                              aria-label="Download"
                              onClick={() => {}}
                            />
                          </div>
                        )

                      case StatusExecucao.FALHA.key:
                        return (
                          <div className="text-center">
                            <Button
                              icon="pi pi-refresh"
                              className="p-button-rounded p-button-danger"
                              aria-label="Reexecutar"
                              onClick={() => onClickReexecucao(rel.id)}
                            />
                          </div>
                        )

                      default:
                        return <></>
                    }
                  }}
                ></Column>
              )}
            </DataTable>
          </div>
        </div>

        <div className="mt-5 text-right">
          {isSolicitacaoComFalhas(solicitacao) && (
            <Button
              label="Reexecutar Falhas"
              icon="pi pi-refresh"
              className="ml-2 p-button-rounded p-button-danger"
              aria-label="Reexecutar Falhas"
              onClick={onClickReexecucaoTotal}
            />
          )}

          {isSolicitacaoComSucessos(solicitacao) && (
            <Button
              label="Baixar Sucessos"
              icon="pi pi-download"
              className="ml-2 p-button-rounded p-button-success"
              aria-label="Baixar Sucessos"
              onClick={() => {}}
            />
          )}
        </div>

        <Dialog
          header="Mensagem de Erro"
          visible={!!mensagemErroVisualizada}
          style={{ maxWidth: '75vw' }}
          onHide={() => setMensagemErroVisualizada(null)}
        >
          {mensagemErroVisualizada}
        </Dialog>

        <SockJsClient
          url={`${API_BASE_URL}/ws`}
          topics={['/topic/relatorios']}
          onConnect={() => {
            console.log('Connected to WebSocket')
          }}
          onDisconnect={() => {
            console.log('Disconnected from WebSocket')
          }}
          onMessage={onWebSocketMessage}
        />
      </div>
    )
  }

  return <div>{content}</div>
}
