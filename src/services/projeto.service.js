import api from './api.service'

export async function getProjeto(idProjeto) {
  if (!idProjeto) throw Error('Selecione um projeto')

  return api.get(`/projetos/${idProjeto}`)
}

export async function getProjetosByPesquisa(idPesquisa) {
  if (!idPesquisa) throw Error('Selecione uma pesquisa')

  return api.get(`/projetos?idPesquisa=${idPesquisa}`)
}
