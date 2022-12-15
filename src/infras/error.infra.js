export function UnauthorizedError(message) {
  const error = new Error(message)
  error.name = 'UnauthorizedError'

  return error
}
