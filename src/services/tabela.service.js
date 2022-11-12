import api from './api.service'
import public_ from './public.service'

export async function getTabela(idTabela) {
  if (!idTabela) throw Error('Selecione uma tabela')

  return api.get(`/tabelas/${idTabela}`)
}

export async function getTabelasByProjeto(idProjeto) {
  if (!idProjeto) throw Error('Selecione um projeto')

  return api.get(`/tabelas?idProjeto=${idProjeto}`)
}

export async function getArquivoTabela(arquivo) {
  if (!arquivo) throw Error('Selecione uma tabela')

  return public_.get(`/tabelas/${arquivo}`)
}
