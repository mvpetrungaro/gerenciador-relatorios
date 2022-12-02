import { edata } from './api.service'

export async function getConfiguracoesGeografias() {
  return edata.get('/configuracoes/geografias')
}

export async function getConfiguracoesDados() {
  return edata.get('/configuracoes/dados')
}

export async function getConfiguracoesArquivos() {
  return edata.get('/configuracoes/arquivos')
}
