import fetcher from '../infras/fetch.infra'

const EDATA_BASE_URL = 'http://localhost:3001'
export const API_BASE_URL = 'http://localhost:8080'
const LOCAL_BASE_URL = 'http://localhost:3000'

async function get(baseUrl, path, contentType) {
  if (!(path?.[0] === '/')) {
    path = '/' + path
  }

  if (contentType === 'html') {
    return fetcher.getHtml(baseUrl + path)
  }

  return fetcher.getJson(baseUrl + path)
}

async function post(baseUrl, path, data) {
  if (!(path?.[0] === '/')) {
    path = '/' + path
  }

  return fetcher.postJson(baseUrl + path, data)
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
