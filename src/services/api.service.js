import fetcher from '../infras/fetch.infra'

const API_BASE_URL = 'http://localhost:3001'

export async function get(path) {
  if (!(path?.[0] === '/')) {
    path = '/' + path
  }

  return fetcher.getJson(API_BASE_URL + path)
}

const api = {
  get,
}

export default api
