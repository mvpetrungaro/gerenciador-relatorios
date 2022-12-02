import { edata } from './api.service'
import { local } from './api.service'

export async function getTabela(idTabela) {
  if (!idTabela) throw Error('Selecione uma tabela')

  return edata.get(`/tabelas/${idTabela}`)
}

export async function getTabelasByProjeto(idProjeto) {
  if (!idProjeto) throw Error('Selecione um projeto')

  return edata.get(`/tabelas?idProjeto=${idProjeto}`)
}

export async function getArquivoTabela(arquivo) {
  if (!arquivo) throw Error('Selecione uma tabela')

  return local.get(`/tabelas/${arquivo}`)
}
