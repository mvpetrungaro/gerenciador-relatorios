import { api } from './api.service'

export async function solicitarRelatorios(solicitacao) {
  if (!solicitacao) throw Error('Solicitação inválida')

  return api.post('/relatorios/solicitacao', solicitacao)
}

export async function reexecutarRelatorios(reexecucao) {
  if (!reexecucao) throw Error('Reexecução inválida')

  return api.post('/relatorios/reexecucao', reexecucao)
}
