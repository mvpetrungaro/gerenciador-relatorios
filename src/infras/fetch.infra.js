import { UnauthorizedError } from './error.infra'

export async function getJson(url) {
  const response = await fetch(url, { credentials: 'include' })

  if (!response.ok && response.status === 401) {
    throw UnauthorizedError()
  }

  return await response.json()
}

export async function getJsonWithCredentials(url, credentials) {
  const response = await fetch(url, {
    headers: {
      Authorization: 'Basic ' + btoa(credentials),
    },
  })

  if (!response.ok && response.status === 401) {
    throw UnauthorizedError()
  }

  return await response.json()
}

export async function postJson(url, data) {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(data),
  })

  if (!response.ok && response.status === 401) {
    throw UnauthorizedError()
  }

  return await response.json()
}

export async function getHtml(url) {
  return await fetch(url)
}

const fetcher = {
  getJson,
  getJsonWithCredentials,
  postJson,
  getHtml,
}

export default fetcher
