import { edata } from './api.service'

export async function getProjeto(idProjeto) {
  if (!idProjeto) throw Error('Selecione um projeto')

  return edata.get(`/projetos/${idProjeto}`)
}

export async function getProjetosByPesquisa(idPesquisa) {
  if (!idPesquisa) throw Error('Selecione uma pesquisa')

  return edata.get(`/projetos?idPesquisa=${idPesquisa}`)
}
