export function UnauthorizedError(message = 'Sessão expirada') {
  const error = new Error(message)
  error.name = 'UnauthorizedError'

  return error
}
