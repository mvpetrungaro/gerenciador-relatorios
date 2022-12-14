import { api } from './api.service'

export async function login(usuario, senha) {
  const user = await api.get('/login')

  console.log(user)

  return user
}
