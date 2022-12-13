import { StatusExecucao } from '../models/StatusExecucao'
import { api, API_BASE_URL } from './api.service'
import { getProjeto } from './projeto.service'
import { getTerritorio } from './territorio.service'

export async function buscarSolicitacoesRelatorios() {
  const solicitacoes = await api.get('/relatorios/solicitacao')

  for (let s of solicitacoes) {
    s.projeto = await getProjeto(s.idProjetoEdata)

    for (let i = 0; i < s.territorios.length; i++) {
      const t = s.territorios[i]
      const territorio = await getTerritorio(t.idTerritorioEdata)

      s.territorios[i] = {
        ...t,
        ...territorio,
      }
    }
  }

  return solicitacoes.sort((a, b) => b.id - a.id)
}

export async function solicitarRelatorios(solicitacao) {
  if (!solicitacao) throw Error('Solicitação inválida')

  return api.post('/relatorios/solicitacao', solicitacao)
}

export async function interromperSolicitacao(idSolicitacao) {
  if (!idSolicitacao) throw Error('Solicitação inválida')

  return api.get(`/relatorios/solicitacao/interrupcao/${idSolicitacao}`)
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

export function isSolicitacaoAbortada(solicitacao) {
  return hasRelatorioComStatus(solicitacao, StatusExecucao.ABORTADO)
}

export function isSolicitacaoEmAndamento(solicitacao) {
  return (
    hasRelatorioComStatus(solicitacao, StatusExecucao.AGUARDANDO_EXECUCAO) ||
    hasRelatorioComStatus(solicitacao, StatusExecucao.EM_EXECUCAO)
  )
}
