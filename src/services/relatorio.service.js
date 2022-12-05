import { StatusExecucao } from '../models/StatusExecucao'
import { api } from './api.service'

export async function solicitarRelatorios(solicitacao) {
  if (!solicitacao) throw Error('Solicitação inválida')

  return api.post('/relatorios/solicitacao', solicitacao)
}

export async function reexecutarRelatorios(reexecucao) {
  if (!reexecucao) throw Error('Reexecução inválida')

  return api.post('/relatorios/reexecucao', reexecucao)
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
