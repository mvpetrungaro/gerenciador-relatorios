import { edata } from './api.service'

export async function getTerritorio(idTerritorio) {
  if (!idTerritorio) throw Error('Selecione um territorio')

  return edata.get(`/territorios/${idTerritorio}`)
}
