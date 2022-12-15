import fetcher from '../infras/fetch.infra'
import { API_BASE_URL } from './api.service'

export async function login(usuario, senha) {
  const user = await fetcher.getJsonWithCredentials(
    `${API_BASE_URL}/login`,
    `${usuario}:${senha}`
  )
  localStorage.setItem('user', JSON.stringify(user))
}

export async function logout() {
  await fetcher.getJson(`${API_BASE_URL}/logout`)
  limparSessao()
}

export function limparSessao() {
  localStorage.removeItem('user')
  global.location.reload()
}
