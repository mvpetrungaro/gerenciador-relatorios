import api from './api.service'

export async function getPesquisa(idPesquisa) {
  return api.get(`/pesquisas/${idPesquisa}`)
}

export async function getPesquisas() {
  return api.get('/pesquisas')
}
