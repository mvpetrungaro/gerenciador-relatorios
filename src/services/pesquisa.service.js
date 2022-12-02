import { edata } from './api.service'

export async function getPesquisa(idPesquisa) {
  return edata.get(`/pesquisas/${idPesquisa}`)
}

export async function getPesquisas() {
  return edata.get('/pesquisas')
}
