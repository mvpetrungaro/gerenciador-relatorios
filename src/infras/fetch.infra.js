import { UnauthorizedError } from './error.infra'

export async function getJson(url) {
  const response = await fetch(url, {
    credentials: 'include',
  })

  if (response.status === 401) {
    throw UnauthorizedError()
  }

  const body = await response.json()

  if (!response.ok) {
    throw Error(body.message)
  }

  return body
}

export async function getJsonWithCredentials(url, credentials) {
  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${btoa(credentials)}`,
    },
    credentials: 'include',
  })

  if (response.status === 401) {
    throw UnauthorizedError()
  }

  const body = await response.json()

  if (!response.ok) {
    throw Error(body.message)
  }

  return body
}

export async function postJson(url, data) {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify(data),
  })

  if (response.status === 401) {
    throw UnauthorizedError()
  }

  const body = await response.json()

  if (!response.ok) {
    throw Error(body.message)
  }

  return body
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
