import fetcher from '../infras/fetch.infra'
import { limparSessao } from './login.service'

const EDATA_BASE_URL = 'http://localhost:3001'
export const API_BASE_URL = 'http://localhost:8080'
const LOCAL_BASE_URL = 'http://localhost:3000'

function parsePath(path) {
  let parsedPath = path

  if (!(path?.[0] === '/')) {
    parsedPath = '/' + path
  }

  return parsedPath
}

async function get(baseUrl, path, contentType) {
  try {
    if (contentType === 'html') {
      return await fetcher.getHtml(baseUrl + parsePath(path))
    }

    return await fetcher.getJson(baseUrl + parsePath(path))
  } catch (err) {
    if (err.name && err.name === 'UnauthorizedError') {
      limparSessao()
    }

    throw err
  }
}

async function post(baseUrl, path, data) {
  try {
    return await fetcher.postJson(baseUrl + parsePath(path), data)
  } catch (err) {
    if (err.name && err.name === 'UnauthorizedError') {
      limparSessao()
    }

    throw err
  }
}

export const edata = {
  get: (path) => get(EDATA_BASE_URL, path),
  post: (path, data) => post(EDATA_BASE_URL, path, data),
}

export const api = {
  get: (path) => get(API_BASE_URL, path),
  post: (path, data) => post(API_BASE_URL, path, data),
}

export const local = {
  get: (path) => get(LOCAL_BASE_URL, path, 'html'),
}
