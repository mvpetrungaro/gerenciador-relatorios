import api from './api.service'

export async function getConfiguracoesGeografias() {
  return api.get('/configuracoes/geografias')
}

export async function getConfiguracoesDados() {
  return api.get('/configuracoes/dados')
}

export async function getConfiguracoesArquivos() {
  return api.get('/configuracoes/arquivos')
}
