import { StatusExecucao } from '../models/StatusExecucao'
import { api, API_BASE_URL } from './api.service'

export async function solicitarRelatorios(solicitacao) {
  if (!solicitacao) throw Error('Solicitação inválida')

  return api.post('/relatorios/solicitacao', solicitacao)
}

export async function reexecutarRelatorios(reexecucao) {
  if (!reexecucao) throw Error('Reexecução inválida')

  return api.post('/relatorios/reexecucao', reexecucao)
}

export function getDownloadRelatorioURL(idRelatorio) {
  if (!idRelatorio) throw Error('Relatório inválido')

  return `${API_BASE_URL}/relatorios/download/${idRelatorio}`
}

export function getDownloadSolicitacaoURL(idSolicitacao) {
  if (!idSolicitacao) throw Error('Solicitação inválida')

  return `${API_BASE_URL}/relatorios/solicitacao/download/${idSolicitacao}`
}

function hasRelatorioComStatus(solicitacao, status) {
  return (
    solicitacao.relatorios.filter((rel) => rel.statusExecucao === status.key)
      .length > 0
  )
}

export function isSolicitacaoComFalhas(solicitacao) {
  return hasRelatorioComStatus(solicitacao, StatusExecucao.FALHA)
}

export function isSolicitacaoComSucessos(solicitacao) {
  return hasRelatorioComStatus(solicitacao, StatusExecucao.SUCESSO)
}
